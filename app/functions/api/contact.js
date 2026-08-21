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
  barometre: 'Nouvelle réponse au Baromètre IA',
};

// Garde-fous sur les lignes envoyées par le client (mode barometre) : l'endpoint est public.
const MAX_ROWS = 40;
const MAX_VALUE = 500;

export async function onRequestGet() {
  // Health-check + détecteur de version de déploiement.
  return json({ ok: true, endpoint: 'contact', mode: 'hostinger-v1' });
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

  const form = String(data.form || '');
  const email = String(data.email || '').trim();
  const name = String(data.name || '').trim();
  let subject;
  let rows;

  if (form === 'barometre') {
    // Réponse au Baromètre : anonyme par conception, ni nom ni email exigés.
    // Les libellés viennent du questionnaire, qui seul connaît l'intitulé de ses questions.
    rows = (Array.isArray(data.fields) ? data.fields : [])
      .filter((r) => Array.isArray(r) && String(r[0] || '').trim() && String(r[1] || '').trim())
      .slice(0, MAX_ROWS)
      .map((r) => [String(r[0]).trim().slice(0, 120), String(r[1]).trim().slice(0, MAX_VALUE)]);
    if (!rows.length) return json({ ok: false, message: 'Réponse vide.' }, 400);
    subject = email ? `${SUBJECTS.barometre} — ${email}` : `${SUBJECTS.barometre} — anonyme`;
  } else {
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, message: 'Merci de saisir un email valide.' }, 400);
    }
    if (!name) return json({ ok: false, message: 'Merci de saisir votre nom.' }, 400);
    subject = `${SUBJECTS[form] || SUBJECTS.contact} — ${name}`;
    rows = FIELDS.filter(([key]) => String(data[key] || '').trim()).map(([key, label]) => [
      label,
      String(data[key]).trim(),
    ]);
  }

  const text = rows.map(([label, value]) => `${label} : ${value}`).join('\n');
  const html = buildHtml(rows, email, name);

  if (!env.HOSTINGER_MAIL_TOKEN) return json({ ok: false, message: 'Configuration serveur manquante.' }, 500);
  const sent = await sendViaHostinger(env.HOSTINGER_MAIL_TOKEN, { subject, text, html });

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

// L'API Hostinger n'accepte pas de Reply-To : on rend l'adresse du prospect cliquable
// (mailto pré-rempli) pour qu'un clic ouvre une réponse qui lui est bien adressée.
// Une réponse au Baromètre peut être anonyme : dans ce cas, aucun lien de réponse.
function buildHtml(rows, email, name) {
  const cell = 'padding:6px 14px 6px 0;color:#666;vertical-align:top;white-space:nowrap';
  const reply = email
    ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Votre demande sur claudeagency.fr')}`
    : '';
  const table =
    '<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:15px">' +
    rows
      .map(([label, value]) => {
        const shown =
          reply && value === email
            ? `<a href="${reply}" style="color:#0b5fff">${escapeHtml(value)}</a>`
            : escapeHtml(value).replace(/\n/g, '<br>');
        return `<tr><td style="${cell}">${escapeHtml(label)}</td><td style="padding:6px 0"><strong>${shown}</strong></td></tr>`;
      })
      .join('') +
    '</table>';
  if (!reply) return table;
  return (
    table +
    `<p style="font-family:system-ui,sans-serif;font-size:13px;color:#666;margin-top:14px">` +
    `<a href="${reply}" style="color:#0b5fff">Répondre à ${escapeHtml(name || email)}</a></p>`
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
