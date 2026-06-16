// Entité auteur partagée — source de vérité unique pour le byline, la page auteur
// (/a-propos/#julien-rayes) et le schema Person référencé par les BlogPosting.
// Signal E-E-A-T : auteur humain nommé, expert du domaine, rattaché à l'Organization.

export const AUTHOR = {
  name: 'Julien Rayes',
  jobTitle: 'Fondateur de Claude Partners',
  // Bio factuelle, alignée sur la page /a-propos/. Aucune affirmation inventée.
  bio:
    "Julien Rayes est le fondateur de Claude Partners. Directeur commercial et marketing " +
    "d'un organisme de formation professionnelle (plus de 3 M€ de chiffre d'affaires depuis 2021), " +
    "il en a automatisé seul tout le back-office (administratif, commercial et marketing) avec " +
    "des outils comme Make et Claude Code. Il aide aujourd'hui les organismes de formation à " +
    "intégrer l'IA de façon concrète et mesurable.",
  knowsAbout: [
    'Intelligence artificielle',
    'Automatisation des process',
    'Make (automatisation no-code)',
    'Organismes de formation',
    'Qualiopi',
    'Formation professionnelle',
  ],
} as const;

// Schema.org Person. `site` = Astro.site (URL).
// sameAs : profils réels et vérifiés de l'auteur (LinkedIn). Ne jamais inventer de profil.
const AUTHOR_SAMEAS = ['https://www.linkedin.com/in/julien-rayes/'];
export function authorPerson(site: URL) {
  const base = site.toString().replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${base}/a-propos/#julien-rayes`,
    name: AUTHOR.name,
    url: `${base}/a-propos/`,
    jobTitle: AUTHOR.jobTitle,
    description: AUTHOR.bio,
    knowsAbout: [...AUTHOR.knowsAbout],
    sameAs: [...AUTHOR_SAMEAS],
    worksFor: { '@id': `${base}/#organization` },
  };
}
