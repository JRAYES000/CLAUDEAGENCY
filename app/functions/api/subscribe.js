// Cloudflare Pages Function — POST /api/subscribe
// 1) Ajoute le contact à la liste Mailjet (pour la liste + relances futures).
// 2) Envoie immédiatement le PDF via l'API transactionnelle Mailjet (GRATUITE — pas de Premium ni d'automation).
//
// Variables d'env Cloudflare Pages (Production + Preview) :
//   MJ_APIKEY    = clé API Mailjet (Primary)
//   MJ_SECRETKEY = secret key Mailjet
const LIST_ID = '10523019'; // Ressources – 10 automatisations IA
const REDIRECT = '/merci-ressource/';
const PDF_URL = 'https://claudepartners.fr/ressources/10-automatisations-ia.pdf';
const FROM_EMAIL = 'contact@claudepartners.fr';
const FROM_NAME = 'Julien Rayes — Claude Agency';

export async function onRequestGet() {
  // Health-check + détecteur de version de déploiement.
  return json({ ok: true, endpoint: 'subscribe', mode: 'transactional-v2' });
}

export async function onRequestPost({ request, env }) {
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');
  const ok = () => (wantsJson ? json({ ok: true }) : Response.redirect(new URL(REDIRECT, request.url), 303));
  const fail = (msg, status) =>
    wantsJson ? json({ ok: false, error: msg }, status) : Response.redirect(new URL(REDIRECT, request.url), 303);

  let data;
  try {
    const ct = request.headers.get('content-type') || '';
    data = ct.includes('application/json') ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return fail('Requête invalide.', 400);
  }

  if (data.botcheck) return ok(); // honeypot rempli => bot, on ignore silencieusement

  const email = String(data.email || '').trim();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fail('Email invalide.', 400);
  if (!data.consent) return fail('Le consentement est requis.', 400);

  const apiKey = env.MJ_APIKEY;
  const secret = env.MJ_SECRETKEY;
  if (!apiKey || !secret) return fail('Configuration serveur manquante (clés Mailjet).', 500);
  const auth = 'Basic ' + btoa(`${apiKey}:${secret}`);

  const firstname = String(data.firstname || '').trim();
  const properties = {};
  if (firstname) properties['firstname'] = firstname;
  if (data.societe) properties['société'] = String(data.societe).trim();
  if (data.telephone) properties['téléphone'] = String(data.telephone).trim();

  // 1) Ajout à la liste (best-effort : utile pour la liste & les relances futures, non bloquant)
  try {
    await fetch(`https://api.mailjet.com/v3/REST/contactslist/${LIST_ID}/managecontact`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email: email, Name: firstname, Action: 'addnoforce', Properties: properties }),
    });
  } catch {
    /* non bloquant */
  }

  // 2) Envoi immédiat du guide (API transactionnelle gratuite)
  const hello = firstname ? `Bonjour ${escapeHtml(firstname)},` : 'Bonjour,';
  const helloText = firstname ? `Bonjour ${firstname},` : 'Bonjour,';
  let sendRes;
  try {
    sendRes = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Messages: [
          {
            From: { Email: FROM_EMAIL, Name: FROM_NAME },
            To: [{ Email: email, Name: firstname || email }],
            Subject: 'Votre guide : 10 automatisations IA pour votre organisme',
            TextPart:
              `${helloText}\n\nVoici votre guide, comme promis : ${PDF_URL}\n\n` +
              `Chaque automatisation y est expliquée avec le temps qu'elle fait gagner et l'outil utilisé — ` +
              `toutes déployées dans un organisme de formation réel.\n\n` +
              `Une question en le lisant ? Répondez simplement à cet email.\n\n— Julien Rayes, Claude Agency`,
            HTMLPart:
              `<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#2B2A28;">` +
              `<p>${hello}</p>` +
              `<p>Voici votre guide, comme promis :</p>` +
              `<p style="margin:24px 0;"><a href="${PDF_URL}" style="background:#BE5B3A;color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Télécharger le guide (PDF)</a></p>` +
              `<p>Chaque automatisation y est expliquée avec le temps qu'elle fait gagner et l'outil utilisé — toutes déployées dans un organisme de formation réel.</p>` +
              `<p>Une question en le lisant ? Répondez simplement à cet email.</p>` +
              `<p>— Julien Rayes, Claude Agency</p>` +
              `</div>`,
          },
        ],
      }),
    });
  } catch {
    return fail('Envoi de l\'email impossible.', 502);
  }

  if (!sendRes.ok) {
    const detail = (await sendRes.text().catch(() => '')).slice(0, 300);
    return wantsJson ? json({ ok: false, error: 'Erreur Mailjet (envoi).', detail }, 502) : fail('Erreur envoi.', 502);
  }

  return ok();
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
