// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import { remarkReadingTime } from './remark-reading-time.mjs';

export default defineConfig({
  site: 'https://claudepartners.fr',          // PRÉREQUIS SEO #1
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

  markdown: { remarkPlugins: [remarkReadingTime] },

  integrations: [
    mdx(),
    sitemap({
      // Exclut toutes les pages noindex — jamais d'URL noindex dans le sitemap.
      filter: (page) => !['/merci', '/mentions-legales', '/confidentialite'].some((p) => page.includes(p)),
      serialize(item) {
        if (item.url === 'https://claudepartners.fr/') {
          item.changefreq = ChangeFreqEnum.WEEKLY; item.priority = 1.0;
        } else if (/\/blog\//.test(item.url)) {
          item.changefreq = ChangeFreqEnum.WEEKLY; item.priority = 0.7;
          item.lastmod = new Date().toISOString();
        } else {
          item.changefreq = ChangeFreqEnum.MONTHLY; item.priority = 0.5;
        }
        return item;
      },
    }),
  ],

  vite: { plugins: [tailwindcss()] },
});
