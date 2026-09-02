// Cloudflare Pages Function — POST /api/subscribe
// 1) Envoie le guide PDF depuis la boîte contact@claudeagency.fr via l'API Hostinger.
// 2) Ajoute le contact à la liste Brevo (best-effort, pour les relances futures).
//
// Mailjet a été retiré des deux étapes : l'envoi passe par la boîte elle-même (même circuit
// que /api/contact), la liste par Brevo.
//
// 3) Crée la fiche dans la base Notion « Leads entrants » (best-effort).
// 4) Prévient contact@claudeagency.fr qu'un lead vient d'entrer (best-effort).
//
// Variables d'env Cloudflare Pages (Production + Preview) :
//   HOSTINGER_MAIL_TOKEN = jeton API Hostinger Mail — REQUIS (sans lui, pas d'envoi du guide)
//   BREVO_API_KEY        = clé API Brevo v3 — facultative : sans elle, le guide part quand même,
//                          seul l'ajout à la liste est sauté.
//   NOTION_TOKEN         = jeton d'intégration Notion — facultatif, voir _notion.js
//   NOTION_LEADS_DB      = id de la base « Leads entrants — claudeagency.fr » — facultatif
import { createLead } from './_notion.js';

const LIST_ID = 12; // Brevo — « Claude Agency - 10 automatisations IA »
const ALERT_TO = 'contact@claudeagency.fr';
const REDIRECT = '/merci-ressource/';
const PDF_URL = 'https://claudeagency.fr/ressources/10-automatisations-ia.pdf';
const FROM_EMAIL = 'contact@claudeagency.fr';
const FROM_NAME = 'Julien Rayes — Claude Agency';
// Identifiant public de la boîte côté API Hostinger (pas un secret) — GET /api/v1/me le renvoie.
const MAILBOX_ID = 'ACcae43ae70041b0ddda143fd8795d';
const HOSTINGER_API = `https://api.mail.hostinger.com/api/v1/mailboxes/${MAILBOX_ID}/send`;

export async function onRequestGet({ env }) {
  // Health-check + détecteur de version de déploiement. `brevo` dit seulement si la clé est
  // présente (jamais sa valeur) : sans elle, le guide part quand même, sans ajout à la liste.
  return json({ ok: true, endpoint: 'subscribe', mode: 'hostinger-brevo-v1', brevo: !!env.BREVO_API_KEY });
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
  const societe = String(data.societe || '').trim();
  const telephone = String(data.telephone || '').trim();

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
    if (telephone) attributes.SMS = telephone;
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

  // 3) Fiche Notion — non bloquant : le visiteur a déjà son guide.
  const inNotion = await createLead(env, {
    formulaire: 'Guide 10 automatisations',
    email,
    prenom: firstname,
    societe,
    telephone,
    consentement: true,
  });

  // 4) Alerte interne — non bloquante elle aussi, et jamais avant que le guide soit parti.
  await notifyInternal(token, { email, firstname, societe, telephone, inNotion });

  return ok();
}

// Prévient contact@claudeagency.fr, depuis la boîte elle-même (même circuit que le guide).
// Indique si la fiche Notion a bien été créée : sans ce signal, une panne d'écriture Notion
// resterait invisible jusqu'à ce qu'on constate un trou dans la base.
async function notifyInternal(token, { email, firstname, societe, telephone, inNotion }) {
  const rows = [
    ['Societe', societe],
    ['Prenom', firstname],
    ['Email', email],
    ['Telephone', telephone],
    ['Fiche Notion', inNotion ? 'creee' : 'NON creee — a saisir a la main'],
  ].filter(([, value]) => value);
  const subject = 'Nouveau lead — ' + (societe || email);
  const cell = 'padding:6px 14px 6px 0;color:#666;vertical-align:top;white-space:nowrap';
  const html =
    '<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:15px">' +
    rows
      .map(
        ([label, value]) =>
          '<tr><td style="' + cell + '">' + escapeHtml(label) + '</td>' +
          '<td style="padding:6px 0"><strong>' + escapeHtml(value) + '</strong></td></tr>',
      )
      .join('') +
    '</table>' +
    '<p style="font-family:system-ui,sans-serif;font-size:13px;color:#666;margin-top:14px">' +
    'Guide « 10 automatisations IA » demandé sur claudeagency.fr.</p>';
  try {
    await fetch(HOSTINGER_API, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: [ALERT_TO],
        displayName: 'Formulaire claudeagency.fr',
        subject,
        text: rows.map(([label, value]) => `${label} : ${value}`).join('\n'),
        html,
      }),
    });
  } catch {
    /* non bloquant */
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
