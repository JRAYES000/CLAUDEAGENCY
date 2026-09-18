// Cloudflare Pages Function — GET /api/yt/<id-de-chaine-youtube>
// Rend le flux d'une chaîne YouTube au format RSS 2.0, à destination des lecteurs
// qui refusent le flux natif — Buffer en particulier.
//
// Pourquoi cet endpoint existe (18/09/2026) :
//   YouTube publie bien un flux par chaîne, mais à une adresse qui porte un paramètre
//   de requête : /feeds/videos.xml?channel_id=UC…  Buffer refuse cette URL avec un
//   « Couldn't load Feed », et refuse de la même façon un relais tiers dont l'adresse
//   porte elle aussi une query string, alors qu'il accepte sans broncher un flux
//   Substack en /feed. D'où le choix d'une route où l'identifiant est dans le CHEMIN.
//   Ne pas « simplifier » en ?c=UC… : ce serait revenir exactement au cas qui échoue.
//
// L'endpoint est PUBLIC et sans secret : il ne fait que relayer un flux déjà public.
// Le filtre sur la forme de l'identifiant évite qu'il serve de proxy vers autre chose.

// Un identifiant de chaîne YouTube : « UC » suivi de 22 caractères base64url.
const ID_CHAINE = /^UC[A-Za-z0-9_-]{22}$/;

// Une demi-heure : les chaînes suivies publient au mieux une fois par jour, et Buffer
// ne rafraîchit ses feeds que quelques fois par jour. Inutile d'aller chercher plus souvent.
const CACHE_SECONDES = 1800;

const bloc = (source, balise) => {
  const m = source.match(new RegExp('<' + balise + '[^>]*>([\\s\\S]*?)</' + balise + '>'));
  return m ? m[1] : '';
};

const attribut = (source, balise, nom) => {
  const m = source.match(new RegExp('<' + balise + '[^>]*\\b' + nom + '="([^"]*)"'));
  return m ? m[1] : '';
};

// Les valeurs extraites de l'Atom sont déjà échappées pour du XML (&amp;, &lt;, &#39;…).
// On les recopie telles quelles : les ré-échapper afficherait « &amp; » en toutes lettres
// dans le lecteur, et les mettre en CDATA ferait exactement la même chose.
function atomVersRss(atom, urlSource) {
  const titreChaine = bloc(atom, 'title');
  const lienChaine = attribut(atom, 'link rel="alternate"', 'href') ||
    attribut(atom, 'link', 'href');

  const articles = [...atom.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => {
    const lien = attribut(e, 'link', 'href');
    const publie = bloc(e, 'published');
    const vignette = attribut(e, 'media:thumbnail', 'url');
    const date = publie ? new Date(publie) : null;
    return [
      '    <item>',
      '      <title>' + bloc(e, 'title') + '</title>',
      '      <link>' + lien + '</link>',
      '      <guid isPermaLink="true">' + lien + '</guid>',
      date && !isNaN(date) ? '      <pubDate>' + date.toUTCString() + '</pubDate>' : '',
      '      <description>' + bloc(e, 'media:description') + '</description>',
      vignette ? '      <media:thumbnail url="' + vignette + '" />' : '',
      '    </item>',
    ].filter(Boolean).join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    '    <title>' + titreChaine + '</title>',
    '    <link>' + lienChaine + '</link>',
    '    <description>' + titreChaine + ' — vidéos YouTube</description>',
    '    <language>fr</language>',
    '    <atom:link href="' + urlSource + '" rel="self" type="application/rss+xml" />',
    articles.join('\n'),
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}

export async function onRequestGet({ params, request }) {
  // Un lecteur RSS ajoute parfois « .xml » de lui-même : on l'accepte sans broncher.
  const id = String(params.id || '').replace(/\.xml$/, '');

  if (!ID_CHAINE.test(id)) {
    return new Response('Identifiant de chaîne YouTube attendu : UC suivi de 22 caractères.\n', {
      status: 400,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }

  const amont = await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=' + id, {
    headers: { 'user-agent': 'claudeagency.fr feed relay' },
    cf: { cacheTtl: CACHE_SECONDES, cacheEverything: true },
  });

  if (!amont.ok) {
    return new Response('YouTube a répondu ' + amont.status + ' pour la chaîne ' + id + '.\n', {
      status: 502,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }

  const atom = await amont.text();
  const self = new URL(request.url).origin + '/api/yt/' + id;

  return new Response(atomVersRss(atom, self), {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=' + CACHE_SECONDES,
    },
  });
}
