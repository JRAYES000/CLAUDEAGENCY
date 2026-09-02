// Écriture d'un lead dans la base Notion « Leads entrants — claudeagency.fr ».
// Partagé par /api/subscribe (guide 10 automatisations) et /api/contact (contact,
// diagnostic, Baromètre). Un fichier préfixé par « _ » n'est pas routé par Pages.
//
// Variables d'env Cloudflare Pages (Production + Preview) :
//   NOTION_TOKEN    = jeton d'intégration interne Notion (ntn_…) — REQUIS
//   NOTION_LEADS_DB = id de la base « Leads entrants — claudeagency.fr »
//
// Sans ces deux variables, la fonction ne fait rien et rend false : l'appelant continue.
// Toujours appeler en non bloquant — un incident Notion ne doit jamais coûter un lead.
const NOTION_API = 'https://api.notion.com/v1/pages';
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

  try {
    const res = await fetch(NOTION_API, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + env.NOTION_TOKEN,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parent: { database_id: env.NOTION_LEADS_DB }, properties }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function trim(v) {
  return String(v == null ? '' : v).trim();
}
