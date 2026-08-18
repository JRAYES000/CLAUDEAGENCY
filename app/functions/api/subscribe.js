// Cloudflare Pages Function — POST /api/subscribe
// 1) Envoie le guide PDF depuis la boîte contact@claudeagency.fr via l'API Hostinger.
// 2) Ajoute le contact à la liste Brevo (best-effort, pour les relances futures).
//
// Mailjet a été retiré des deux étapes : l'envoi passe par la boîte elle-même (même circuit
// que /api/contact), la liste par Brevo.
//
// Variables d'env Cloudflare Pages (Production + Preview) :
//   HOSTINGER_MAIL_TOKEN = jeton API Hostinger Mail — REQUIS (sans lui, pas d'envoi du guide)
//   BREVO_API_KEY        = clé API Brevo v3 — facultative : sans elle, le guide part quand même,
//                          seul l'ajout à la liste est sauté.
const LIST_ID = 12; // Brevo — « Claude Agency - 10 automatisations IA »
const REDIRECT = '/merci-ressource/';
const PDF_URL = 'https://claudeagency.fr/ressources/10-automatisations-ia.pdf';
const FROM_EMAIL = 'contact@claudeagency.fr';
const FROM_NAME = 'Julien Rayes — Claude Agency';
// Identifiant public de la boîte côté API Hostinger (pas un secret) — GET /api/v1/me le renvoie.
const MAILBOX_ID = 'ACcae43ae70041b0ddda143fd8795d';
const HOSTINGER_API = `https://api.mail.hostinger.com/api/v1/mailboxes/${MAILBOX_ID}/send`;

export async function onRequestGet() {
  // Health-check + détecteur de version de déploiement.
  return json({ ok: true, endpoint: 'subscribe', mode: 'hostinger-brevo-v1' });
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

  const token = env.HOSTINGER_MAIL_TOKEN;
  if (!token) return fail('Configuration serveur manquante (jeton Hostinger).', 500);

  const firstname = String(data.firstname || '').trim();

  // 1) Envoi immédiat du guide, depuis la boîte contact@claudeagency.fr.
  const hello = firstname ? `Bonjour ${escapeHtml(firstname)},` : 'Bonjour,';
  const helloText = firstname ? `Bonjour ${firstname},` : 'Bonjour,';
  let sendRes;
  try {
    sendRes = await fetch(HOSTINGER_API, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: [email],
        displayName: FROM_NAME,
        subject: 'Votre guide : 10 automatisations IA pour votre organisme',
        text:
          `${helloText}\n\nVoici votre guide, comme promis : ${PDF_URL}\n\n` +
          `Chaque automatisation y est expliquée avec le temps qu'elle fait gagner et l'outil utilisé — ` +
          `toutes déployées dans un organisme de formation réel.\n\n` +
          `Une question en le lisant ? Répondez simplement à cet email.\n\n— Julien Rayes, Claude Agency`,
        html:
          `<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#2B2A28;">` +
          `<p>${hello}</p>` +
          `<p>Voici votre guide, comme promis :</p>` +
          `<p style="margin:24px 0;"><a href="${PDF_URL}" style="background:#BE5B3A;color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Télécharger le guide (PDF)</a></p>` +
          `<p>Chaque automatisation y est expliquée avec le temps qu'elle fait gagner et l'outil utilisé — toutes déployées dans un organisme de formation réel.</p>` +
          `<p>Une question en le lisant ? Répondez simplement à cet email.</p>` +
          `<p>— Julien Rayes, Claude Agency</p>` +
          `</div>`,
      }),
    });
  } catch {
    return fail("Envoi de l'email impossible.", 502);
  }

  if (!sendRes.ok) {
    const detail = (await sendRes.text().catch(() => '')).slice(0, 300);
    return wantsJson ? json({ ok: false, error: 'Erreur Hostinger (envoi).', detail }, 502) : fail('Erreur envoi.', 502);
  }

  // 2) Ajout à la liste Brevo — non bloquant : le visiteur a déjà son guide.
  // Attributs limités à ceux qui existent dans le compte (un attribut inconnu fait échouer
  // l'appel) : MARQUE et SOURCE servent à distinguer les activités qui partagent ce compte.
  // La société saisie n'a pas d'attribut correspondant côté Brevo — elle n'est pas transmise.
  if (env.BREVO_API_KEY) {
    const attributes = { MARQUE: 'Claude Agency', SOURCE: 'Guide 10 automatisations IA' };
    if (firstname) attributes.PRENOM = firstname;
    if (data.telephone) attributes.SMS = String(data.telephone).trim();
    try {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'api-key': env.BREVO_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, attributes, listIds: [LIST_ID], updateEnabled: true }),
      });
    } catch {
      /* non bloquant */
    }
  }

  return ok();
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
