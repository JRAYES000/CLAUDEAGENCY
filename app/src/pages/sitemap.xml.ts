import type { APIRoute } from 'astro';

// Redirige /sitemap.xml vers /sitemap-index.xml (301 permanent).
// Certains crawlers et outils SEO cherchent /sitemap.xml par convention ;
// le robots.txt pointe vers /sitemap-index.xml mais cette redirection
// garantit que les deux URLs fonctionnent.
export const GET: APIRoute = ({ redirect }) => redirect('/sitemap-index.xml', 301);