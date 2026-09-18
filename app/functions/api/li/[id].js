// Cloudflare Pages Function — GET /api/li/<identifiant-public-linkedin>
// Rend les derniers posts publics d'un profil LinkedIn au format RSS 2.0.
//
// Pourquoi (18/09/2026) : LinkedIn ne publie aucun flux RSS, et aucun relais gratuit n'en
// fabrique — rss-bridge compte 548 ponts, pas un pour LinkedIn. La seule voie praticable est
// un service de collecte ; on passe par l'Actor Apify harvestapi/linkedin-profile-posts, qui
// lit les posts publics sans cookie ni compte LinkedIn.
//
// POURQUOI LE FLUX EST SERVI DEPUIS KV, ET JAMAIS COLLECTE PENDANT LA REQUETE :
// Buffer abandonne un flux qui tarde — son message exact est « The feed took too long to
// load ». Or une collecte Apify prend une dizaine de secondes. Un endpoint qui collecte en
// direct est donc refuse par Buffer une fois sur deux, ce qui se lit a tort comme un flux
// invalide. Ici la reponse sort de KV en quelques millisecondes ; quand le contenu a vieilli,
// il est servi tel quel et la collecte part EN ARRIERE-PLAN (waitUntil) pour la fois d'apres.
// Ne pas « simplifier » en rendant la collecte bloquante : c'est le bug qu'on vient de corriger.
//
// CE QUE CET ENDPOINT COUTE : chaque collecte reelle facture environ 0,002 $ par post sur le
// compte Apify de Julien. D'ou les deux garde-fous ci-dessous, qui ne sont pas decoratifs :
//   1. LISTE BLANCHE. L'endpoint est public. Sans elle, n'importe qui pourrait demander
//      n'importe quel profil en boucle et vider le credit Apify. Ajouter un profil ici est
//      un geste volontaire.
//   2. FRAICHEUR DE 12 HEURES. Buffer interroge ses flux plusieurs fois par jour ; sans ce
//      seuil, chaque passage relancerait la collecte.
// Avec ces deux reglages : 3 profils x 2 collectes par jour x 10 posts, soit environ 3,60 $
// par mois. Allonger la liste ou raccourcir le seuil augmente la facture proportionnellement.
//
// Reglages Cloudflare Pages (Production + Preview) :
//   APIFY_TOKEN = jeton du compte Apify julien_r — pose en secret_text, jamais en clair.
//   FEEDS       = espace KV « claudeagency-feeds », ou dort le RSS deja fabrique.

// Les profils autorises, par leur identifiant public (le dernier segment de l'URL LinkedIn).
// La cle sert aussi de titre au flux, pour que Buffer n'affiche pas un slug.
const PROFILS = {
  andrewyng: 'Andrew Ng',
  alliekmiller: 'Allie K. Miller',
  'yann-lecun': 'Yann LeCun',
};

const POSTS_PAR_COLLECTE = 10;
const FRAICHEUR_MS = 12 * 60 * 60 * 1000; // au-dela, on recollecte en arriere-plan
const ACTOR = 'harvestapi~linkedin-profile-posts';

// Le contenu vient d'une reponse JSON, donc il n'est echappe pour personne :
// contrairement au relais YouTube, qui recopie de l'XML deja echappe, ici il faut le faire.
const echapper = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Un post LinkedIn n'a pas de titre : on prend sa premiere ligne utile, coupee proprement.
function titreDuPost(texte) {
  const brut = String(texte || '').replace(/\s+/g, ' ').trim();
  if (!brut) return 'Post LinkedIn';
  if (brut.length <= 90) return brut;
  const coupe = brut.slice(0, 90);
  const espace = coupe.lastIndexOf(' ');
  return (espace > 40 ? coupe.slice(0, espace) : coupe) + '…';
}

function postsVersRss(posts, nom, identifiant, urlSource) {
  const items = posts.map((p) => {
    const lien = p.linkedinUrl || p.shareLinkedinUrl || '';
    const date = p.postedAt && p.postedAt.date ? new Date(p.postedAt.date) : null;
    const image = Array.isArray(p.postImages) && p.postImages.length ? p.postImages[0].url : '';
    const likes = p.engagement && p.engagement.likes;
    const pied = likes ? '\n\n(' + likes + " j'aime sur LinkedIn)" : '';
    return [
      '    <item>',
      '      <title>' + echapper(titreDuPost(p.content)) + '</title>',
      '      <link>' + echapper(lien) + '</link>',
      '      <guid isPermaLink="true">' + echapper(lien) + '</guid>',
      date && !isNaN(date) ? '      <pubDate>' + date.toUTCString() + '</pubDate>' : '',
      '      <description>' + echapper(String(p.content || '') + pied) + '</description>',
      image ? '      <media:thumbnail url="' + echapper(image) + '" />' : '',
      '    </item>',
    ].filter(Boolean).join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    '    <title>' + echapper(nom) + '</title>',
    '    <link>https://www.linkedin.com/in/' + echapper(identifiant) + '/</link>',
    '    <description>' + echapper(nom) + ' — posts LinkedIn</description>',
    '    <atom:link href="' + echapper(urlSource) + '" rel="self" type="application/rss+xml" />',
    items.join('\n'),
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}

const texte = (corps, status) =>
  new Response(corps + '\n', { status, headers: { 'content-type': 'text/plain; charset=utf-8' } });

const rss = (corps) =>
  new Response(corps, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });

// Collecte chez Apify et range le RSS obtenu dans KV. Rend le RSS, ou null si la collecte
// a echoue — auquel cas l'appelant sert ce qu'il avait deja plutot que de rendre une erreur.
async function collecter(env, id, nom, self) {
  const amont = await fetch(
    'https://api.apify.com/v2/acts/' + ACTOR + '/run-sync-get-dataset-items?timeout=90',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + env.APIFY_TOKEN,
      },
      body: JSON.stringify({
        targetUrls: ['https://www.linkedin.com/in/' + id + '/'],
        maxPosts: POSTS_PAR_COLLECTE,
        includeReposts: false,
        includeQuotePosts: false,
        scrapeReactions: false,
        scrapeComments: false,
      }),
    }
  );
  if (!amont.ok) return null;

  const posts = await amont.json();
  if (!Array.isArray(posts) || !posts.length) return null;

  const corps = postsVersRss(posts, nom, id, self);
  await env.FEEDS.put('li:' + id, JSON.stringify({ rss: corps, at: Date.now() }));
  return corps;
}

export async function onRequestGet({ params, request, env, waitUntil }) {
  const id = String(params.id || '').replace(/\.xml$/, '');
  const nom = PROFILS[id];

  if (!nom) {
    return texte(
      'Profil non autorise. Les profils suivis sont : ' + Object.keys(PROFILS).join(', ') + '.',
      404
    );
  }
  if (!env.APIFY_TOKEN) return texte("APIFY_TOKEN n'est pas pose sur ce deploiement.", 500);
  if (!env.FEEDS) return texte("L'espace KV FEEDS n'est pas lie a ce deploiement.", 500);

  const self = new URL(request.url).origin + '/api/li/' + id;
  const stocke = await env.FEEDS.get('li:' + id, { type: 'json' });

  if (stocke && stocke.rss) {
    // Servi immediatement. Si le contenu a vieilli, la collecte suivante part derriere la
    // reponse : le lecteur n'attend jamais, et il aura le nouveau contenu au prochain passage.
    if (Date.now() - (stocke.at || 0) > FRAICHEUR_MS) {
      waitUntil(collecter(env, id, nom, self).catch(() => {}));
    }
    return rss(stocke.rss);
  }

  // Rien en reserve : premiere visite pour ce profil, la collecte est bloquante une seule fois.
  const frais = await collecter(env, id, nom, self);
  if (!frais) return texte('Collecte impossible pour ' + id + ' et rien en reserve.', 502);
  return rss(frais);
}
