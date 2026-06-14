// src/data/mailjet.ts
// Configuration PUBLIQUE du widget d'inscription Mailjet (lead magnet).
// Source des valeurs : Mailjet → Contacts → Widgets → (votre widget) → Manage → View code.
// Aucune clé secrète ici : un widget d'inscription est public par nature.
export const MAILJET_FORM = {
  // URL d'action du <form> généré par Mailjet.
  actionUrl: 'REMPLIR_DEPUIS_MAILJET',
  // Noms EXACTS des champs attendus par le widget (à recopier depuis le code généré).
  fields: {
    email: 'email',
    firstName: 'name',
    organisation: 'organisation',
  },
  // Champs cachés requis par le widget (id de liste, jetons, locale…). Coller tels quels.
  hidden: [] as { name: string; value: string }[],
  // Page de remerciement à configurer DANS le widget Mailjet (thank-you page).
  redirectUrl: '/merci-ressource/',
} as const;
