// Cloudflare Pages Function — POST /api/subscribe
// Inscrit un contact à la liste Mailjet « Ressources – 10 automatisations IA »,
// ce qui déclenche l'automation (livraison du PDF). La clé API reste côté serveur.
//
// Variables d'environnement requises (Cloudflare Pages → Settings → Environment variables) :
//   MJ_APIKEY    = clé API Mailjet (Primary)
//   MJ_SECRETKEY = secret key Mailjet
//
// Note : la liste et les propriétés sont fixes (non secrètes).
const LIST_ID = '10523019'; // Ressources – 10 automatisations IA
const REDIRECT = '/merci-ressource/';

export async function onRequestPost({ request, env }) {
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');
  const fail = (msg, status) =>
    wantsJson
      ? json({ ok: false, error: msg }, status)
      : Response.redirect(new URL(REDIRECT, request.url), 303); // dégradation gracieuse

  let data;
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) data = await request.json();
    else data = Object.fromEntries(await request.formData());
  } catch {
    return fail('Requête invalide', 400);
  }

  // Honeypot : si rempli, on ignore silencieusement (succès simulé).
  if (data.botcheck) return wantsJson ? json({ ok: true }) : Response.redirect(new URL(REDIRECT, request.url), 303);

  const email = String(data.email || '').trim();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fail('Email invalide.', 400);
  if (!data.consent) return fail('Le consentement est requis.', 400);

  const apiKey = env.MJ_APIKEY;
  const secret = env.MJ_SECRETKEY;
  if (!apiKey || !secret) return fail('Configuration serveur manquante (clés Mailjet).', 500);

  const properties = {};
  if (data.firstname) properties['firstname'] = String(data.firstname).trim();
  if (data.societe) properties['société'] = String(data.societe).trim();
  if (data.telephone) properties['téléphone'] = String(data.telephone).trim();

  let mjRes;
  try {
    mjRes = await fetch(`https://api.mailjet.com/v3/REST/contactslist/${LIST_ID}/managecontact`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${apiKey}:${secret}`),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: email,
        Name: properties['firstname'] || '',
        Action: 'addnoforce',
        Properties: properties,
      }),
    });
  } catch (e) {
    return fail('Mailjet injoignable.', 502);
  }

  if (!mjRes.ok) {
    const detail = (await mjRes.text().catch(() => '')).slice(0, 300);
    return wantsJson ? json({ ok: false, error: 'Erreur Mailjet.', detail }, 502) : fail('Erreur Mailjet.', 502);
  }

  return wantsJson ? json({ ok: true }) : Response.redirect(new URL(REDIRECT, request.url), 303);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
