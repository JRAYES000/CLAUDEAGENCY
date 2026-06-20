import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://claudeagency.fr';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const services = (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
  const serviceLines = services.map((s) => `- [${s.data.title}](${SITE}/services/${s.id}/): ${s.data.description}`).join('\n');
  const postLines = posts.map((p) => `- [${p.data.title}](${SITE}/blog/${p.id}/): ${p.data.description}`).join('\n');
  const body = `# Claude Agency

> Cabinet de conseil qui aide les organismes de formation (OF) français à intégrer l'IA et automatiser leurs processus. Site en français.

Claude Agency propose audits, formation, automatisation et outils d'IA sur mesure pour les organismes de formation (Qualiopi, gestion administrative, contenus pédagogiques). RDV via Calendly, contact via formulaire.

## Services

${serviceLines}

## Pages principales

- [Accueil](${SITE}/): Présentation de Claude Agency et de son offre pour les OF.
- [Contact](${SITE}/contact/): Formulaire de contact et prise de rendez-vous.
- [À propos](${SITE}/a-propos/): Mission et approche.

## Blog

${postLines}

## Optional

- [Mentions légales](${SITE}/mentions-legales/)
- [Politique de confidentialité](${SITE}/confidentialite/)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
