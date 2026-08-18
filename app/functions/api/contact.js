// Cloudflare Pages Function — POST /api/contact
// Notifie contact@claudeagency.fr à chaque soumission des formulaires /contact/ et /diagnostic/.
//
// Envoi direct depuis la boîte contact@claudeagency.fr via l'API Hostinger : aucun service
// d'emailing tiers dans la boucle, et le message atterrit aussi dans les Envoyés de la boîte.
// Remplace Web3Forms, dont la clé pointait vers une boîte inaccessible (aucun lead reçu
// entre le 14/06/2026 et le 18/08/2026).
//
// Variable d'env Cloudflare Pages (Production + Preview) :
//   HOSTINGER_MAIL_TOKEN = jeton API Hostinger Mail (hPanel), portée : boîte contact@claudeagency.fr
//
// Repli : tant que HOSTINGER_MAIL_TOKEN est absent, on passe par Mailjet (MJ_APIKEY /
// MJ_SECRETKEY, mêmes clés que /api/subscribe). À retirer une fois la bascule confirmée.
const TO_EMAIL = 'contact@claudeagency.fr';
const FROM_NAME = 'Formulaire claudeagency.fr';
// Identifiant public de la boîte côté API Hostinger (pas un secret) — GET /api/v1/me le renvoie.
const MAILBOX_ID = 'ACcae43ae70041b0ddda143fd8795d';
const HOSTINGER_API = `https://api.mail.hostinger.com/api/v1/mailboxes/${MAILBOX_ID}/send`;

// Libellé lisible pour chaque champ attendu, dans l'ordre d'affichage de l'e-mail.
const FIELDS = [
  ['name', 'Nom et prénom'],
  ['email', 'Email'],
  ['organisme', 'Organisme'],
  ['role', 'Rôle'],
  ['priorite', 'Priorité n°1'],
  ['maturite', 'Maturité'],
  ['message', 'Message'],
];

const SUBJECTS = {
  contact: 'Nouveau message depuis claudeagency.fr',
  diagnostic: 'Nouveau diagnostic — claudeagency.fr',
};

export async function onRequestGet({ env }) {
  // Health-check + détecteur de version de déploiement.
  return json({ ok: true, endpoint: 'contact', mode: env.HOSTINGER_MAIL_TOKEN ? 'hostinger-v1' : 'mailjet-fallback' });
}

export async function onRequestPost({ request, env }) {
  let data;
  try {
    const ct = request.headers.get('content-type') || '';
    data = ct.includes('application/json') ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return json({ ok: false, message: 'Requête invalide.' }, 400);
  }

  if (data.botcheck) return json({ ok: true }); // honeypot rempli => bot, on ignore silencieusement

  const email = String(data.email || '').trim();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, message: 'Merci de saisir un email valide.' }, 400);
  }
  const name = String(data.name || '').trim();
  if (!name) return json({ ok: false, message: 'Merci de saisir votre nom.' }, 400);

  const subject = `${SUBJECTS[String(data.form || '')] || SUBJECTS.contact} — ${name}`;
  const rows = FIELDS.filter(([key]) => String(data[key] || '').trim()).map(([key, label]) => [
    label,
    String(data[key]).trim(),
  ]);

  const text = rows.map(([label, value]) => `${label} : ${value}`).join('\n');
  const html = buildHtml(rows, email, name);

  const sent = env.HOSTINGER_MAIL_TOKEN
    ? await sendViaHostinger(env.HOSTINGER_MAIL_TOKEN, { subject, text, html })
    : await sendViaMailjet(env, { subject, text, html, email, name });

  if (!sent) return json({ ok: false, message: "L'envoi a échoué. Réessayez dans un instant." }, 502);
  return json({ ok: true });
}

async function sendViaHostinger(token, { subject, text, html }) {
  try {
    const res = await fetch(HOSTINGER_API, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: [TO_EMAIL], displayName: FROM_NAME, subject, text, html }),
    });
    return res.ok; // 204 attendu
  } catch {
    return false;
  }
}

// Repli temporaire — à supprimer une fois HOSTINGER_MAIL_TOKEN en place et vérifié.
async function sendViaMailjet(env, { subject, text, html, email, name }) {
  const apiKey = env.MJ_APIKEY;
  const secret = env.MJ_SECRETKEY;
  if (!apiKey || !secret) return false;
  try {
    const res = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: { Authorization: 'Basic ' + btoa(`${apiKey}:${secret}`), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Messages: [
          {
            From: { Email: TO_EMAIL, Name: FROM_NAME },
            To: [{ Email: TO_EMAIL, Name: 'Claude Agency' }],
            ReplyTo: { Email: email, Name: name },
            Subject: subject,
            TextPart: text,
            HTMLPart: html,
          },
        ],
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// L'API Hostinger n'accepte pas de Reply-To : on rend l'adresse du prospect cliquable
// (mailto pré-rempli) pour qu'un clic ouvre une réponse qui lui est bien adressée.
function buildHtml(rows, email, name) {
  const cell = 'padding:6px 14px 6px 0;color:#666;vertical-align:top;white-space:nowrap';
  const reply = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Votre demande sur claudeagency.fr')}`;
  return (
    '<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:15px">' +
    rows
      .map(([label, value]) => {
        const shown =
          label === 'Email'
            ? `<a href="${reply}" style="color:#0b5fff">${escapeHtml(value)}</a>`
            : escapeHtml(value).replace(/\n/g, '<br>');
        return `<tr><td style="${cell}">${escapeHtml(label)}</td><td style="padding:6px 0"><strong>${shown}</strong></td></tr>`;
      })
      .join('') +
    '</table>' +
    `<p style="font-family:system-ui,sans-serif;font-size:13px;color:#666;margin-top:14px">` +
    `<a href="${reply}" style="color:#0b5fff">Répondre à ${escapeHtml(name)}</a></p>`
  );
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
