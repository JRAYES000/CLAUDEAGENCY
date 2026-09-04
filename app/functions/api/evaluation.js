// Cloudflare Pages Function — POST /api/evaluation
// Enregistre le résultat d'un passage du test /evaluation-claude-code/ dans la base Notion
// « Resultats du test Claude Code ».
//
// L'endpoint est PUBLIC : la page est indexable et liée depuis le pied de page du site.
// D'où les garde-fous ci-dessous — honeypot, validation stricte, bornes numériques.
// Ils ne rendent pas le score infalsifiable : il est calculé dans le navigateur, donc
// n'importe qui peut poster 20/20. Repère de formation, pas mesure opposable.
//
// Variables d'env Cloudflare Pages (Production + Preview) :
//   NOTION_TOKEN   = jeton d'intégration Notion — voir _notion.js
//   NOTION_EVAL_DB = id de la base « Resultats du test Claude Code »
import { createResultat, emailDejaPasse } from './_notion.js';

// Le test ne se passe qu'une fois par an et par adresse — un an, parce que le badge
// posé sur l'annuaire Claude Partners vaut un an et doit pouvoir se renouveler. Le
// controle a lieu deux fois : avant le depart (action « verifier », pour refuser en une
// seconde plutot qu'apres 20 questions) et avant l'ecriture (pour que deux onglets
// ouverts ne creent pas deux lignes).
// Ce n'est pas une authentification : changer d'adresse suffit a le contourner.
const REFUS_DEJA_PASSE = "Cette adresse a déjà servi à passer le test il y a moins d'un an. Le test ne se passe qu'une fois par an.";

// Le nombre de questions vient de la page : elle seule le connaît, et il changera.
// Bornes de sécurité uniquement, pour qu'un POST fabriqué ne pose pas n'importe quoi.
const TOTAL_MAX = 100;
const SECONDES_PAR_QUESTION = 30;

// À partir de ce score, la personne reçoit une invitation à déposer sa fiche dans
// l'annuaire Claude Partners. Même seuil que le palier « Autonome » ci-dessous, exprès :
// deux seuils voisins qui divergent d'un point produiraient un écran qui félicite
// quelqu'un sans l'inviter.
//
// Claude Partners est un autre produit, sur son propre domaine. C'est la seule exception
// à la règle « ne pas pointer vers ce domaine » du CLAUDE.md — décidée le 04/09/2026.
const SEUIL_ANNUAIRE = 75;
const URL_ANNUAIRE = 'https://claudepartners.fr/prestataires/inscription/';
// Ce que le badge prouve et ne prouve pas, côté annuaire. Même exception que l'URL
// au-dessus : la page est le seul endroit où l'on renvoie vers ce domaine.
const URL_LABEL = 'https://claudepartners.fr/label-claude-code/';

// Boîte d'envoi, identique à /api/subscribe et /api/contact. L'identifiant de boîte est
// public (GET /api/v1/me le renvoie) ; le jeton, lui, vient de l'environnement.
const FROM_NAME = 'Julien Rayes — Claude Agency';
const MAILBOX_ID = 'ACcae43ae70041b0ddda143fd8795d';
const HOSTINGER_API = `https://api.mail.hostinger.com/api/v1/mailboxes/${MAILBOX_ID}/send`;

// Plancher de la vitesse, en secondes par question : en dessous, on n'a pas lu l'énoncé.
// Le plafond, lui, est SECONDES_PAR_QUESTION — le chrono de la page.
const SECONDES_PLANCHER = 8;

// Score sur 100 : la justesse fixe le plafond, la vitesse en récupère au plus un
// cinquième. Multiplicatif et non additif, exprès — sinon quelqu'un qui clique au hasard
// en trois secondes par question empocherait les points de vitesse sans rien savoir.
// Un sans-faute vaut 80 au plus lent et 100 au plus rapide ; un zéro vaut zéro.
//
// Le serveur recalcule ce score au lieu de croire la page : le navigateur peut poster
// ce qu'il veut. Sur un score fabriqué de bout en bout, ça ne change rien — c'est un
// repère de formation, pas une mesure opposable — mais la colonne reste cohérente avec
// les deux autres, et la formule se change ici sans redéployer la page.
function calculeScore(justes, total, secondes) {
  const justesse = justes / total;
  const plancher = total * SECONDES_PLANCHER;
  const plafond = total * SECONDES_PAR_QUESTION;
  const brut = (plafond - secondes) / (plafond - plancher);
  const rapidite = Math.min(1, Math.max(0, brut));
  return Math.round(100 * justesse * (0.8 + 0.2 * rapidite));
}

// Le palier découle du score, donc de la justesse ET du temps de réponse. Les seuils
// sont calés sur les anciens (17/20 et 12/20) à la durée médiane constatée le 04/09/2026,
// soit ~7 min 25 : les paliers des passages déjà enregistrés sont inchangés. Le seul
// durcissement : à 17/20, il faut désormais répondre en moins de 7 minutes pour rester
// « Autonome ». Options ASCII, comme le select Notion (pas d'accent dans un identifiant).
const PALIERS = [
  { min: 75, notion: 'Autonome' },
  { min: 50, notion: 'Operationnel sur cadrage' },
  { min: 0, notion: 'A former avant de demarrer' },
];

export async function onRequestGet({ env }) {
  // Health-check + détecteur de version de déploiement.
  return json({
    ok: true,
    endpoint: 'evaluation',
    notion: Boolean(env.NOTION_TOKEN && env.NOTION_EVAL_DB),
    // Sans ce jeton, l'invitation à l'annuaire ne part pas — en silence, par conception.
    mail: Boolean(env.HOSTINGER_MAIL_TOKEN),
    seuilAnnuaire: SEUIL_ANNUAIRE,
  });
}

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, message: 'Requête invalide.' }, 400);
  }

  if (data.botcheck) return json({ ok: true }); // honeypot rempli => bot, ignoré en silence

  const nom = texte(data.nom, 80);
  const prenom = texte(data.prenom, 80);
  const email = texte(data.email, 150);

  // Controle d'unicite demande par la page avant de lancer le chrono. Pas de nom ni de
  // score a ce stade : seule l'adresse compte.
  if (data.action === 'verifier') {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, message: 'Adresse e-mail invalide.' }, 400);
    }
    // null (Notion muet) vaut false : on laisse passer plutot que de fermer le test.
    return json({ ok: true, dejaPasse: (await emailDejaPasse(env, email)) === true });
  }

  if (!nom || !prenom) return json({ ok: false, message: 'Nom et prénom requis.' }, 400);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, message: 'Adresse e-mail invalide.' }, 400);
  }

  const total = entier(data.total, 1, TOTAL_MAX);
  if (total === null) return json({ ok: false, message: 'Résultat invalide.' }, 400);
  const justes = entier(data.justes, 0, total);
  const sansReponse = entier(data.sansReponse, 0, total);
  const secondes = entier(data.secondes, 0, total * SECONDES_PAR_QUESTION);
  if (justes === null || sansReponse === null || secondes === null) {
    return json({ ok: false, message: 'Résultat invalide.' }, 400);
  }

  // `data.palier` est ignoré : score et palier sont recalculés ici à partir des trois
  // chiffres déjà bornés ci-dessus, pour que la base reste cohérente avec sa formule.
  const score = calculeScore(justes, total, secondes);
  const palier = PALIERS.find((p) => score >= p.min).notion;

  // Statut 200 même en cas d'échec : Cloudflare remplace le corps des réponses 5xx par sa
  // propre page d'erreur, et la page perdrait le message. C'est `ok` qui fait foi.
  if (!env.NOTION_TOKEN || !env.NOTION_EVAL_DB) {
    return json({ ok: false, message: 'Configuration serveur manquante.' });
  }

  // Second controle, juste avant d'ecrire : la page a deja verifie au depart, mais rien
  // n'empeche un second onglet d'avoir commence entre-temps.
  if ((await emailDejaPasse(env, email)) === true) {
    return json({ ok: false, dejaPasse: true, message: REFUS_DEJA_PASSE });
  }

  const ecrit = await createResultat(env, {
    nom,
    prenom,
    email,
    justes,
    sansReponse,
    secondes,
    duree: texte(data.duree, 100) || `${secondes} s`,
    score,
    palier,
  });

  if (!ecrit) return json({ ok: false, message: "L'enregistrement dans Notion a échoué." });

  // Best-effort, et après l'écriture : un incident d'envoi ne doit pas faire perdre un
  // résultat déjà enregistré. La page reçoit `invite` pour l'annoncer à l'écran.
  let invite = false;
  if (score >= SEUIL_ANNUAIRE) {
    invite = await inviteAnnuaire(env, { prenom, email, score });
    // L'annuaire lit cette base à chaque build et pose le badge « Test Claude Code
    // réussi » sur la fiche qui porte la même adresse (claudepartners-fr,
    // src/server/label.js). Sans ce hook, le badge attendrait le prochain build
    // déclenché par autre chose — parfois plusieurs jours. Best-effort aussi.
    if (env.CP_DEPLOY_HOOK_URL) await fetch(env.CP_DEPLOY_HOOK_URL, { method: 'POST' }).catch(() => {});
  }

  return json({ ok: true, invite });
}

// Invitation à déposer une fiche dans l'annuaire Claude Partners, envoyée depuis la boîte
// contact@claudeagency.fr. Le texte dit la commission : elle est de toute façon dans une
// case obligatoire du formulaire, et la découvrir à la dernière étape fait abandonner.
// Il ne promet pas non plus une sélection humaine — la fiche est vérifiée sur sa
// complétude, pas sur les compétences.
async function inviteAnnuaire(env, { prenom, email, score }) {
  const token = env.HOSTINGER_MAIL_TOKEN;
  if (!token) return false;

  const bonjour = prenom ? `Bonjour ${prenom},` : 'Bonjour,';
  const conditions =
    "Inscription gratuite ; une commission de 20 % HT s'applique aux missions engagées via " +
    'la plateforme. Comptez cinq minutes pour la fiche : spécialités, secteurs, tarif ' +
    'journalier, disponibilité.';

  try {
    const res = await fetch(HOSTINGER_API, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: [email],
        displayName: FROM_NAME,
        subject: `Test Claude Code : ${score}/100 — déposez votre fiche prestataire`,
        text:
          `${bonjour}\n\n` +
          `${score}/100 au test Claude Code : c'est le niveau que nous recherchons pour nos ` +
          `missions clients.\n\n` +
          `Déposez votre fiche prestataire dans l'annuaire Claude Partners :\n${URL_ANNUAIRE}\n\n` +
          `Déposée avec cette adresse e-mail, votre fiche portera le badge « Test Claude Code ` +
          `réussi · ${score}/100 » pendant un an. Ce qu'il prouve, et ce qu'il ne prouve pas :\n${URL_LABEL}\n\n` +
          `Dès qu'une mission correspond à votre profil, nous vous contactons pour vous la ` +
          `proposer.\n\n${conditions}\n\n` +
          `Une question ? Répondez à cet e-mail.\n\n— Julien Rayes, Claude Agency`,
        html:
          `<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#2B2A28;">` +
          `<p>${escapeHtml(bonjour)}</p>` +
          `<p><strong>${score}/100</strong> au test Claude Code : c'est le niveau que nous ` +
          `recherchons pour nos missions clients.</p>` +
          `<p>Déposez votre fiche prestataire dans l'annuaire Claude Partners. Dès qu'une ` +
          `mission correspond à votre profil, nous vous contactons pour vous la proposer.</p>` +
          `<p style="margin:24px 0;"><a href="${URL_ANNUAIRE}" style="background:#BE5B3A;color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Déposer ma fiche prestataire</a></p>` +
          `<p>Déposée avec cette adresse e-mail, votre fiche portera le badge « Test Claude Code ` +
          `réussi · <strong>${score}/100</strong> » pendant un an. ` +
          `<a href="${URL_LABEL}">Ce qu'il prouve, et ce qu'il ne prouve pas.</a></p>` +
          `<p style="font-size:14px;color:#5b5955;">${escapeHtml(conditions)}</p>` +
          `<p>Une question ? Répondez à cet e-mail.</p>` +
          `<p>— Julien Rayes, Claude Agency</p>` +
          `</div>`,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function texte(v, max) {
  return String(v == null ? '' : v).trim().slice(0, max);
}

// Rend null — et non 0 — quand la valeur est absente ou hors bornes : le POST est refusé
// plutôt qu'enregistré avec un chiffre inventé.
function entier(v, min, max) {
  const n = Number(v);
  if (!Number.isFinite(n)) return null;
  const arrondi = Math.round(n);
  return arrondi >= min && arrondi <= max ? arrondi : null;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
