// Cloudflare Pages Function — POST /api/contact
// Notifie contact@claudeagency.fr à chaque soumission des formulaires /contact/ et /diagnostic/,
// via l'API transactionnelle Mailjet (mêmes clés que /api/subscribe).
// Remplace Web3Forms, dont la clé pointait vers une boîte inaccessible (aucun lead reçu).
//
// Variables d'env Cloudflare Pages (Production + Preview) :
//   MJ_APIKEY    = clé API Mailjet (Primary)
//   MJ_SECRETKEY = secret key Mailjet
const TO_EMAIL = 'contact@claudeagency.fr';
const FROM_EMAIL = 'contact@claudeagency.fr';
const FROM_NAME = 'Formulaire claudeagency.fr';

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

export async function onRequestGet() {
  // Health-check + détecteur de version de déploiement.
  return json({ ok: true, endpoint: 'contact', mode: 'mailjet-v1' });
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

  const apiKey = env.MJ_APIKEY;
  const secret = env.MJ_SECRETKEY;
  if (!apiKey || !secret) return json({ ok: false, message: 'Configuration serveur manquante.' }, 500);

  const subject = SUBJECTS[String(data.form || '')] || SUBJECTS.contact;
  const rows = FIELDS.filter(([key]) => String(data[key] || '').trim()).map(([key, label]) => [
    label,
    String(data[key]).trim(),
  ]);

  const textPart = rows.map(([label, value]) => `${label} : ${value}`).join('\n');
  const htmlPart =
    '<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:15px">' +
    rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:6px 14px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>` +
          `<td style="padding:6px 0"><strong>${escapeHtml(value).replace(/\n/g, '<br>')}</strong></td></tr>`
      )
      .join('') +
    '</table>';

  let sendRes;
  try {
    sendRes = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: { Authorization: 'Basic ' + btoa(`${apiKey}:${secret}`), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Messages: [
          {
            From: { Email: FROM_EMAIL, Name: FROM_NAME },
            To: [{ Email: TO_EMAIL, Name: 'Claude Agency' }],
            ReplyTo: { Email: email, Name: name },
            Subject: `${subject} — ${name}`,
            TextPart: textPart,
            HTMLPart: htmlPart,
          },
        ],
      }),
    });
  } catch {
    return json({ ok: false, message: "L'envoi a échoué. Réessayez dans un instant." }, 502);
  }

  if (!sendRes.ok) {
    return json({ ok: false, message: "L'envoi a échoué. Réessayez dans un instant." }, 502);
  }

  return json({ ok: true });
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
