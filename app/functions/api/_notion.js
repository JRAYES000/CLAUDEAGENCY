// Écriture d'un lead dans la base Notion « Leads entrants — claudeagency.fr ».
// Partagé par /api/subscribe (guide 10 automatisations) et /api/contact (contact,
// diagnostic, Baromètre). Un fichier préfixé par « _ » n'est pas routé par Pages.
//
// Variables d'env Cloudflare Pages (Production + Preview) :
//   NOTION_TOKEN    = jeton d'intégration interne Notion (ntn_…) — REQUIS
//   NOTION_LEADS_DB = id de la base « Leads entrants — claudeagency.fr »
//   NOTION_EVAL_DB  = id de la base « Resultats du test Claude Code » (createResultat)
//
// Sans ces variables, la fonction ne fait rien et rend false : l'appelant continue.
// Toujours appeler en non bloquant — un incident Notion ne doit jamais coûter un lead.
//
// L'intégration doit être connectée à CHAQUE base : un jeton valide sur « Leads entrants »
// reçoit un 404 sur une base à laquelle il n'a pas été ajouté.
const NOTION_API = 'https://api.notion.com/v1/pages';
const NOTION_DB_API = 'https://api.notion.com/v1/databases';
const NOTION_VERSION = '2022-06-28';

// Les noms de propriétés sont sans accent, côté Notion comme ici : un identifiant accentué
// casse silencieusement les intégrations qui le relisent.
export async function createLead(env, lead) {
  if (!env.NOTION_TOKEN || !env.NOTION_LEADS_DB) return false;

  const societe = trim(lead.societe) || trim(lead.email) || 'Lead sans identifiant';
  const properties = {
    Societe: { title: [{ text: { content: societe.slice(0, 200) } }] },
    Formulaire: { select: { name: lead.formulaire } },
    Statut: { select: { name: 'Nouveau' } },
    'Recu le': { date: { start: new Date().toISOString() } },
    Consentement: { checkbox: !!lead.consentement },
  };
  if (trim(lead.email)) properties.Email = { email: trim(lead.email) };
  if (trim(lead.telephone)) properties.Telephone = { phone_number: trim(lead.telephone) };
  for (const key of ['Prenom', 'Role', 'Priorite', 'Maturite', 'Message']) {
    const value = trim(lead[key.toLowerCase()]);
    if (value) properties[key] = { rich_text: [{ text: { content: value.slice(0, 1900) } }] };
  }

  return postPage(env, env.NOTION_LEADS_DB, properties);
}

// Résultat d'un passage du test /evaluation-claude-code/.
// Base « Resultats du test Claude Code », alimentée par /api/evaluation.
export async function createResultat(env, r) {
  if (!env.NOTION_TOKEN || !env.NOTION_EVAL_DB) return false;

  // « Email » est la propriete titre de la base : dans Notion le titre est toujours
  // la premiere colonne et ne se deplace pas, et c'est l'adresse que Julien veut voir
  // en tete. Un titre ne porte pas le type email, donc pas de lien mailto : la meme
  // adresse est recopiee en fin de tableau dans « Email (lien) », elle cliquable.
  // Minuscules : l'adresse sert de cle d'unicite (un seul passage par personne) et le
  // filtre Notion `title.equals` respecte la casse. Sans cette normalisation, Jean@X et
  // jean@x seraient deux personnes differentes pour emailDejaPasse.
  const email = trim(r.email).toLowerCase();
  return postPage(env, env.NOTION_EVAL_DB, {
    Email: { title: [{ text: { content: email.slice(0, 200) } }] },
    'Email (lien)': { email },
    Prenom: { rich_text: [{ text: { content: trim(r.prenom).slice(0, 200) } }] },
    Nom: { rich_text: [{ text: { content: trim(r.nom).slice(0, 200) } }] },
    'Bonnes reponses': { number: r.justes },
    Score: { number: r.score },
    Duree: { rich_text: [{ text: { content: trim(r.duree).slice(0, 100) } }] },
    'Duree (s)': { number: r.secondes },
    'Sans reponse': { number: r.sansReponse },
    Palier: { select: { name: r.palier } },
    'Passe le': { date: { start: new Date().toISOString() } },
  });
}

// Le test ne se passe qu'une fois : cette adresse a-t-elle deja une ligne dans la base ?
// Renvoie true, false, ou null quand la question n'a pas pu etre posee (variables
// absentes, Notion injoignable, reponse illisible). L'appelant traite null en laissant
// passer : une panne Notion ne doit pas fermer le test a tout le monde. Le risque assume
// est un doublon occasionnel, visible dans la base.
//
// Le filtre `title.equals` de Notion respecte la casse ; l'adresse est donc comparee en
// minuscules, comme createResultat l'ecrit.
export async function emailDejaPasse(env, email) {
  if (!env.NOTION_TOKEN || !env.NOTION_EVAL_DB) return null;
  const adresse = trim(email).toLowerCase();
  if (!adresse) return null;

  try {
    const res = await fetch(`${NOTION_DB_API}/${env.NOTION_EVAL_DB}/query`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + env.NOTION_TOKEN,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_size: 1,
        filter: { property: 'Email', title: { equals: adresse.slice(0, 200) } },
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data.results) ? data.results.length > 0 : null;
  } catch {
    return null;
  }
}

async function postPage(env, database_id, properties) {
  try {
    const res = await fetch(NOTION_API, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + env.NOTION_TOKEN,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parent: { database_id }, properties }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function trim(v) {
  return String(v == null ? '' : v).trim();
}
