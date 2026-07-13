// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import { remarkReadingTime } from './remark-reading-time.mjs';
import { rehypeArticleCta } from './rehype-article-cta.mjs';

// lastmod réel des articles (updatedDate sinon pubDate) — un lastmod « date du build »
// sur toutes les URLs est un faux signal de fraîcheur que Google finit par ignorer.
const BLOG_DIR = new URL('./src/content/blog/', import.meta.url);
const blogLastmod = Object.fromEntries(
  readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => {
      const src = readFileSync(new URL(f, BLOG_DIR), 'utf8');
      const date =
        src.match(/^updatedDate:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1] ??
        src.match(/^pubDate:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
      return [f.replace(/\.mdx?$/, ''), date];
    }),
);

export default defineConfig({
  site: 'https://claudeagency.fr',          // PRÉREQUIS SEO #1
  output: 'static',                            // défaut ; aucun adapter Cloudflare
  trailingSlash: 'always',                     // cohérent avec build.format:'directory' + le 308 par défaut de Cloudflare Pages
  build: { format: 'directory', assets: '_astro' },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Bricolage Grotesque',      // display / titres (Pairing B)
      cssVariable: '--font-bricolage',
      weights: [400, 600, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
      display: 'swap',
    },
    {
      provider: fontProviders.google(),
      name: 'Schibsted Grotesk',        // corps (Pairing B)
      cssVariable: '--font-schibsted',
      weights: [400, 500, 700, 900],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
      display: 'swap',
    },
  ],

  markdown: { remarkPlugins: [remarkReadingTime], rehypePlugins: [rehypeArticleCta] },

  integrations: [
    mdx(),
    sitemap({
      // Exclut toutes les pages noindex — jamais d'URL noindex dans le sitemap.
      // NB: la page résultats du baromètre est en noindex tant qu'elle est vide (scaffold) → exclue ici.
      //     La landing du baromètre, elle, reste indexable et présente dans le sitemap.
      filter: (page) => !['/merci', '/mentions-legales', '/confidentialite', '/blog/tags/', '/barometre-ia-organismes-formation/resultats', '/barometre-ia-organismes-formation/questionnaire'].some((p) => page.includes(p)),
      serialize(item) {
        if (item.url === 'https://claudeagency.fr/') {
          item.changefreq = ChangeFreqEnum.WEEKLY; item.priority = 1.0;
        } else if (/\/agence-marketing-claude\/$/.test(item.url)) {
          // Landing requête cible « agence marketing claude » : priorité haute.
          item.changefreq = ChangeFreqEnum.WEEKLY; item.priority = 0.9;
        } else if (/\/blog\//.test(item.url)) {
          item.changefreq = ChangeFreqEnum.WEEKLY; item.priority = 0.7;
          const slug = item.url.match(/\/blog\/([^/]+)\/$/)?.[1];
          const lastmod = slug && blogLastmod[slug];
          if (lastmod) item.lastmod = new Date(lastmod).toISOString();
        } else {
          item.changefreq = ChangeFreqEnum.MONTHLY; item.priority = 0.5;
        }
        return item;
      },
    }),
  ],

  vite: { plugins: [tailwindcss()] },
});
