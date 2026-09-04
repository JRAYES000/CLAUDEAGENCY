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

// Le test ne se passe qu'une fois par adresse. Le controle a lieu deux fois : avant le
// depart (action « verifier », pour refuser en une seconde plutot qu'apres 20 questions)
// et avant l'ecriture (pour que deux onglets ouverts ne creent pas deux lignes).
// Ce n'est pas une authentification : changer d'adresse suffit a le contourner.
const REFUS_DEJA_PASSE = "Cette adresse a déjà servi à passer le test. Le test ne se passe qu'une fois.";

// Le nombre de questions vient de la page : elle seule le connaît, et il changera.
// Bornes de sécurité uniquement, pour qu'un POST fabriqué ne pose pas n'importe quoi.
const TOTAL_MAX = 100;
const SECONDES_PAR_QUESTION = 30;

// Les paliers sont accentués côté page ; les options du select Notion sont en ASCII
// (règle de nommage : pas d'accent dans un identifiant). Tout palier hors de cette table
// est refusé plutôt que de créer une option parasite dans la base.
const PALIERS = {
  Autonome: 'Autonome',
  'Opérationnel sur cadrage': 'Operationnel sur cadrage',
  'À former avant de démarrer': 'A former avant de demarrer',
};

export async function onRequestGet({ env }) {
  // Health-check + détecteur de version de déploiement.
  return json({
    ok: true,
    endpoint: 'evaluation',
    notion: Boolean(env.NOTION_TOKEN && env.NOTION_EVAL_DB),
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
  const palier = PALIERS[String(data.palier || '')];
  if (justes === null || sansReponse === null || secondes === null || !palier) {
    return json({ ok: false, message: 'Résultat invalide.' }, 400);
  }

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
    palier,
  });

  if (!ecrit) return json({ ok: false, message: "L'enregistrement dans Notion a échoué." });
  return json({ ok: true });
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
