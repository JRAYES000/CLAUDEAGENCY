# Référence d'implémentation consolidée — claudepartners.fr (Astro statique + Tailwind v4 + Blog MDX + SEO + Cloudflare Pages)

> Versions et API vérifiées le 2026-06-14 contre la doc officielle Astro (via context7 `/withastro/docs`), la doc Tailwind, et le registre npm. Toutes les commandes/snippets ci-dessous sont à jour 2026 et cohérents entre eux.

---

## 0. Décisions cadres (verrouillées)

| Sujet | Décision |
|---|---|
| Version Astro | **Astro 6.4.6** (npm sert la branche 6 en 2026). Le brief dit « Astro 5 » : la méthode Tailwind v4 (plugin Vite) et la Content Layer API sont **identiques** dès Astro 5.2+. Aucun snippet ne change. Astro 6 est la version maintenue/sécurité → recommandée. Repli possible : `astro@^5` (minimum 5.2 pour le plugin Vite Tailwind). |
| Sortie | **`output: 'static'`** (défaut Astro). 100% prérendu → SEO/perf maximal. **Aucun adapter Cloudflare** (l'adapter `@astrojs/cloudflare` ne sert QUE pour le SSR). |
| Tailwind | **`@tailwindcss/vite` UNIQUEMENT** via `npx astro add tailwind`. `@astrojs/tailwind` est **officiellement déprécié**. Config **CSS-first** dans `global.css` via `@theme` — pas de `tailwind.config.js` par défaut. |
| Polices | **API Fonts native d'Astro** (`fontProviders.google()` + `<Font>`), stable en Astro 6 : self-host, subset latin, fallbacks, `font-display:swap`, `<link rel=preload>` auto. Zéro requête tierce (RGPD + Core Web Vitals). |
| Content Layer | Fichier **`src/content.config.ts`** à la RACINE de `src/` (pas `src/content/config.ts`). Loader `glob()` **obligatoire**. `entry.id` (PAS `entry.slug`, supprimé) → route **`src/pages/blog/[...id].astro`**. `render()` importé de `astro:content` (pas `entry.render()`). |
| DNS | **Déléguer les nameservers Hostinger → Cloudflare** (Full setup). Indispensable pour servir l'APEX `claudepartners.fr` (Cloudflare Pages exige que l'apex soit une zone Cloudflare ; CNAME flattening). |
| SEO | `site:` dans `astro.config.mjs` = prérequis #1 (sinon canonical/OG/sitemap cassés). |

---

## 1. Matrice de versions (vérifiée npm, 2026-06-14)

```
node            >=22.12.0   (versions PAIRES : Node 22 ou 24 LTS ; v23/v25 NON supportées)
npm             >=9.6.5     (ou pnpm >=7.1.0)
astro           6.4.6
tailwindcss     4.3.1
@tailwindcss/vite 4.3.1
@astrojs/mdx    6.0.3
@astrojs/sitemap 3.7.3
@astrojs/rss    4.0.18
reading-time    1.5.0
mdast-util-to-string 4.0.0
wrangler        latest (devDependency, optionnel)
zod             via 'astro/zod' — NE PAS installer
```

---

## 2. Commandes d'installation (Windows / PowerShell)

```bash
# 1) Vérifier Node (doit être 22.x ou 24.x — PAIR)
node -v

# 2) Création du projet (Astro 6 ; TS strict appliqué d'office, plus de question TypeScript)
npm create astro@latest claudepartners -- --template minimal --no-git --typescript strict
cd claudepartners
npm install

# 3) Intégrations (la CLI câble tout : plugin Vite, integrations[], global.css)
npx astro add tailwind     # installe tailwindcss + @tailwindcss/vite, crée src/styles/global.css
npx astro add mdx          # @astrojs/mdx
npx astro add sitemap      # @astrojs/sitemap

# 4) Flux RSS + plugin temps de lecture
npm install @astrojs/rss
npm install reading-time mdast-util-to-string

# 5) Dev / build / preview (= vérification "TDD léger")
npm run dev
npm run build
npm run preview
```

> **Repli Windows** si `npx astro add tailwind` échoue (politique d'exécution PowerShell) : `npm i tailwindcss @tailwindcss/vite`, ajouter `tailwindcss()` dans `vite.plugins` de `astro.config.mjs`, créer `src/styles/global.css` avec `@import "tailwindcss";`, l'importer dans `BaseLayout.astro`.

---

## 3. Arborescence

```
claudepartners/
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt            # statique (recommandé)
│  ├─ og-default.jpg        # image OG par défaut
│  ├─ _headers              # Cloudflare : cache + sécurité + noindex previews
│  ├─ _redirects            # Cloudflare : canonicalisation www↔apex
│  └─ images/ logo.png
├─ src/
│  ├─ assets/               # images optimisées (astro:assets)
│  ├─ components/  Header.astro Footer.astro BaseHead.astro Schema.astro ContactForm.astro CalendlyInline.astro
│  ├─ content/blog/         # articles .mdx (+ images relatives ./images/)
│  ├─ layouts/   BaseLayout.astro  BlogLayout.astro
│  ├─ pages/
│  │  ├─ index.astro services.astro contact.astro merci.astro
│  │  ├─ blog/  index.astro  [...id].astro
│  │  └─ llms.txt.ts        # endpoint statique GEO
│  ├─ styles/global.css
│  └─ content.config.ts     # RACINE de src/
├─ remark-reading-time.mjs
├─ astro.config.mjs
├─ tsconfig.json
└─ package.json
```

---

## 4. `astro.config.mjs` (consolidé : site + statique + Fonts + Tailwind + MDX + sitemap + remark)

```js
// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import { remarkReadingTime } from './remark-reading-time.mjs';

export default defineConfig({
  // PRÉREQUIS SEO #1 : sans `site`, Astro.site = undefined -> canonical/OG/sitemap cassés.
  site: 'https://claudepartners.fr',
  output: 'static',          // défaut ; explicite pour clarté. PAS d'adapter Cloudflare.
  trailingSlash: 'never',    // cohérent avec _redirects et les canonical
  build: { format: 'directory', assets: '_astro' },

  // Polices auto-hébergées (subset latin, preload, fallbacks générés)
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',                 // titres serif
      cssVariable: '--font-fraunces',
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
      display: 'swap',
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',                    // corps
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
      display: 'swap',
    },
  ],

  // @astrojs/mdx hérite de markdown.* (extendMarkdownConfig:true) -> remark s'applique aux .md ET .mdx
  markdown: { remarkPlugins: [remarkReadingTime] },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        page !== 'https://claudepartners.fr/merci/' && !page.includes('/404'),
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

  // Tailwind v4 = plugin Vite (PAS @astrojs/tailwind, déprécié)
  vite: { plugins: [tailwindcss()] },
});
```

`tsconfig.json` (créé d'office par Astro, à vérifier) :
```json
{ "extends": "astro/tsconfigs/strict", "include": [".astro/types.d.ts", "**/*"], "exclude": ["dist"] }
```

---

## 5. `src/styles/global.css` (Tailwind v4 @theme : polices mappées + couleurs marque)

```css
@import "tailwindcss";

/* CSS-first : chaque variable @theme génère des utilitaires (font-sans, font-serif, bg-brand-500...) */
@theme {
  /* Polices : on RÉUTILISE les variables générées par l'API Fonts d'Astro */
  --font-sans: var(--font-inter), system-ui, sans-serif;        /* corps -> classe font-sans */
  --font-serif: var(--font-fraunces), Georgia, serif;          /* titres -> classe font-serif */

  /* Couleurs de marque -> bg-brand-500, text-brand-700, border-brand-200, etc. */
  --color-brand-50:  oklch(0.97 0.02 50);
  --color-brand-100: oklch(0.94 0.04 50);
  --color-brand-200: oklch(0.88 0.07 50);
  --color-brand-300: oklch(0.80 0.10 50);
  --color-brand-400: oklch(0.72 0.14 50);
  --color-brand-500: oklch(0.64 0.17 50);
  --color-brand-600: oklch(0.55 0.16 50);
  --color-brand-700: oklch(0.45 0.13 50);
  --color-brand-800: oklch(0.37 0.10 50);
  --color-brand-900: oklch(0.30 0.07 50);
  --color-ink:       oklch(0.22 0.01 250);
}

@layer base {
  body { font-family: var(--font-sans); color: var(--color-ink); }
  h1, h2, h3, h4 { font-family: var(--font-serif); }
}
```

> NB : avec l'API Fonts d'Astro, **aucun `@import url(fonts.googleapis...)`** (on n'utilise pas le CDN Google). Si on choisissait Fontsource à la place, les `@import` de polices DOIVENT précéder `@import "tailwindcss"`.

---

## 6. `src/content.config.ts` (Content Layer : glob + Zod + image() + draft)

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  // Loader EXPLICITE obligatoire (sinon ContentCollectionMissingALoaderError).
  // [^_] ignore les fichiers commençant par _ (partials/brouillons).
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  // Schéma EN FONCTION pour accéder au helper image().
  schema: ({ image }) =>
    z.object({
      title: z.string().max(70),
      description: z.string().max(160),     // meta description SEO
      pubDate: z.coerce.date(),             // z.coerce (pas z.date) pour parser 'YYYY-MM-DD'
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('Claude Partners'),
      image: image(),                        // image de couverture optimisée (astro:assets)
      imageAlt: z.string(),                  // a11y + SEO
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
```

Exemple d'article `src/content/blog/integrer-ia-organisme-formation.mdx` :
```mdx
---
title: "Intégrer l'IA dans votre organisme de formation"
description: "Guide pratique pour automatiser vos process pédagogiques et administratifs avec l'IA."
pubDate: 2026-06-10
updatedDate: 2026-06-14
author: "Claude Partners"
image: "./images/ia-of-cover.jpg"   # chemin relatif validé par image()
imageAlt: "Formateur utilisant un outil d'IA devant un tableau"
tags: ["IA", "automatisation", "Qualiopi"]
draft: false
---

## Pourquoi automatiser maintenant
Contenu MDX (composants Astro/React utilisables ici).
```

---

## 7. Blog : route dynamique + index (filtrage drafts + temps de lecture + tri)

`src/pages/blog/[...id].astro` :
```astro
---
import { getCollection, render } from 'astro:content';
import type { GetStaticPaths } from 'astro';
import { Image } from 'astro:assets';
import BlogLayout from '../../layouts/BlogLayout.astro';
import JsonLd from '../../components/Schema.astro';

export const getStaticPaths = (async () => {
  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true);     // pas de pages drafts en PROD
  return posts.map((post) => ({ params: { id: post.id }, props: { post } }));
}) satisfies GetStaticPaths;

const { post } = Astro.props;
const { Content, remarkPluginFrontmatter } = await render(post);   // render() depuis astro:content
const { title, description, pubDate, updatedDate, author, image, imageAlt, tags } = post.data;
const dateFmt = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' });

const articleSchema = {
  '@context': 'https://schema.org', '@type': 'BlogPosting',
  '@id': new URL(`/blog/${post.id}/#article`, Astro.site).href,
  mainEntityOfPage: { '@type': 'WebPage', '@id': new URL(`/blog/${post.id}`, Astro.site).href },
  headline: title, description,
  image: [new URL(image.src, Astro.site).href],
  datePublished: pubDate.toISOString(),
  dateModified: (updatedDate ?? pubDate).toISOString(),
  author: { '@type': 'Person', name: author },
  publisher: { '@id': new URL('/#organization', Astro.site).href },
  inLanguage: 'fr-FR',
};
---
<BlogLayout title={title} description={description} type="article" image={image.src} pageSchema={[articleSchema]}>
  <article class="prose mx-auto max-w-2xl px-4 py-16">
    <Image src={image} alt={imageAlt} width={1200} height={630} loading="eager" />
    <h1 class="font-serif text-4xl font-semibold text-brand-700">{title}</h1>
    <p class="mt-2 text-sm text-gray-500">
      Par {author} &middot;
      <time datetime={pubDate.toISOString()}>{dateFmt.format(pubDate)}</time>
      {updatedDate && <> &middot; Mis à jour le <time datetime={updatedDate.toISOString()}>{dateFmt.format(updatedDate)}</time></>}
      &middot; {remarkPluginFrontmatter.minutesRead}
    </p>
    {tags.length > 0 && (
      <ul class="not-prose flex flex-wrap gap-2">{tags.map((t) => <li><a href={`/blog/tags/${t}`}>#{t}</a></li>)}</ul>
    )}
    <div class="prose mt-8 max-w-none"><Content /></div>
  </article>
</BlogLayout>
```

`src/pages/blog/index.astro` :
```astro
---
import { getCollection } from 'astro:content';
import { Image } from 'astro:assets';
import BaseLayout from '../../layouts/BaseLayout.astro';

const posts = (await getCollection('blog', ({ data }) =>
  import.meta.env.PROD ? !data.draft : true))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());   // antéchronologique
const dateFmt = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' });
---
<BaseLayout title="Blog" description="Conseils IA et automatisation pour organismes de formation.">
  <h1 class="font-serif text-4xl">Blog</h1>
  <ul class="grid gap-8 sm:grid-cols-2">
    {posts.map((post) => (
      <li class="overflow-hidden rounded-lg border">
        <a href={`/blog/${post.id}`}>
          <Image src={post.data.image} alt={post.data.imageAlt} width={600} height={315} loading="lazy" />
          <div class="p-4">
            <h2 class="font-serif text-xl">{post.data.title}</h2>
            <p class="text-gray-600">{post.data.description}</p>
            <time datetime={post.data.pubDate.toISOString()} class="text-sm text-gray-500">{dateFmt.format(post.data.pubDate)}</time>
          </div>
        </a>
      </li>
    ))}
  </ul>
</BaseLayout>
```

`remark-reading-time.mjs` :
```js
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
  return function (tree, { data }) {
    const rt = getReadingTime(toString(tree), { wordsPerMinute: 200 });
    data.astro.frontmatter.minutesRead = `${Math.max(1, Math.round(rt.minutes))} min de lecture`;
  };
}
```

---

## 8. Layout + SEO (`BaseHead` + `BaseLayout` avec lang fr, Fonts, Plausible)

`src/components/BaseHead.astro` :
```astro
---
interface Props {
  title: string; description: string; image?: string;
  canonical?: string; type?: 'website' | 'article'; noindex?: boolean;
}
const { title, description, image = '/og-default.jpg', canonical, type = 'website', noindex = false } = Astro.props;
const canonicalURL = new URL(canonical ?? Astro.url.pathname, Astro.site);
const socialImageURL = new URL(image, Astro.site);
---
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="generator" content={Astro.generator} />
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />
{noindex && <meta name="robots" content="noindex, nofollow" />}
<link rel="sitemap" href="/sitemap-index.xml" />
<meta property="og:type" content={type} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:image" content={socialImageURL} />
<meta property="og:image:alt" content={title} />
<meta property="og:locale" content="fr_FR" />
<meta property="og:site_name" content="Claude Partners" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={socialImageURL} />
```

`src/layouts/BaseLayout.astro` :
```astro
---
import { Font } from 'astro:assets';
import BaseHead from '../components/BaseHead.astro';
import JsonLd from '../components/Schema.astro';
import '../styles/global.css';

interface Props { title: string; description: string; image?: string; type?: 'website' | 'article'; pageSchema?: Record<string, unknown>[]; }
const { title, description, image, type, pageSchema = [] } = Astro.props;
const site = Astro.site!.toString().replace(/\/$/, '');

const organization = {
  '@context': 'https://schema.org', '@type': 'ProfessionalService',
  '@id': `${site}/#organization`, name: 'Claude Partners', url: site,
  logo: `${site}/images/logo.png`,
  description: "Claude Partners accompagne les organismes de formation français dans l'intégration de l'IA et l'automatisation de leurs process.",
  areaServed: { '@type': 'Country', name: 'France' },
  email: 'contact@claudepartners.fr',
  sameAs: ['https://www.linkedin.com/company/claude-partners'],
};
const website = {
  '@context': 'https://schema.org', '@type': 'WebSite',
  '@id': `${site}/#website`, url: site, name: 'Claude Partners',
  inLanguage: 'fr-FR', publisher: { '@id': `${site}/#organization` },
};
---
<!doctype html>
<html lang="fr">
  <head>
    <BaseHead title={title} description={description} image={image} type={type} />
    <Font cssVariable="--font-fraunces" preload />
    <Font cssVariable="--font-inter" preload />
    <script defer data-domain="claudepartners.fr" src="https://plausible.io/js/script.js"></script>
    <script is:inline>window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}</script>
    <JsonLd schema={[organization, website, ...pageSchema]} />
  </head>
  <body class="font-sans">
    <slot />
  </body>
</html>
```

---

## 9. JSON-LD : composant + entités (Organization, Service, BreadcrumbList, FAQPage)

`src/components/Schema.astro` (set:html obligatoire — sinon JSON échappé/invalide) :
```astro
---
interface Props { schema: Record<string, unknown> | Record<string, unknown>[]; }
const { schema } = Astro.props;
const blocks = Array.isArray(schema) ? schema : [schema];
---
{blocks.map((b) => <script type="application/ld+json" set:html={JSON.stringify(b)} />)}
```

- **Racine** : `ProfessionalService` (hérite LocalBusiness/Organization ; idéal conseil B2B). Si pas de local recevant du public, omettre `address`, garder `areaServed: France`. `@id` stable `…/#organization`.
- **Page service** : `Service` avec `provider: { "@id": "…/#organization" }`, `hasOfferCatalog`, `audience: BusinessAudience`.
- **Article** : `BlogPosting` avec `publisher: { "@id": "…/#organization" }`, `author` (nom seul), `datePublished`/`dateModified` ISO 8601, `image` absolue.
- **BreadcrumbList** : dernier `ListItem` SANS `item`. Reste un rich result actif.
- **FAQPage** : garder pour le **GEO** (citations IA), mais le rich result Google FAQ a été retiré (déprécié 7 mai 2026). Contenu DOIT être visible sur la page.

Toutes les URLs JSON-LD doivent être **absolues** (`new URL(path, Astro.site)`).

---

## 10. robots.txt + llms.txt (GEO)

`public/robots.txt` (statique — toujours pointer vers l'INDEX) :
```text
User-agent: *
Allow: /

Sitemap: https://claudepartners.fr/sitemap-index.xml
```

`src/pages/llms.txt.ts` (endpoint statique prérendu, format llmstxt.org) :
```ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://claudepartners.fr';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const postLines = posts.map((p) => `- [${p.data.title}](${SITE}/blog/${p.id}/): ${p.data.description}`).join('\n');
  const body = `# Claude Partners

> Cabinet de conseil qui aide les organismes de formation (OF) français à intégrer l'IA et automatiser leurs processus. Site en français.

Claude Partners propose audits, stratégies et déploiements d'outils d'IA et d'automatisation adaptés aux organismes de formation (Qualiopi, gestion administrative, contenus pédagogiques). RDV via Calendly, contact via formulaire.

## Pages principales

- [Accueil](${SITE}/): Présentation de Claude Partners et de son offre pour les OF.
- [Services](${SITE}/services): Détail des prestations de conseil en IA et automatisation.
- [Contact](${SITE}/contact): Formulaire de contact et prise de rendez-vous.

## Blog

${postLines}

## Optional

- [Mentions légales](${SITE}/mentions-legales)
- [Politique de confidentialité](${SITE}/confidentialite)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
```

> Choisir UN seul robots.txt : statique OU endpoint `robots.txt.ts`, jamais les deux (conflit de route).

---

## 11. Web3Forms — formulaire de contact (AJAX + honeypot, sans back-end)

`src/components/ContactForm.astro` :
```astro
<form id="contact-form" action="https://api.web3forms.com/submit" method="POST" class="space-y-4">
  <input type="hidden" name="access_key" value="VOTRE_ACCESS_KEY" /> <!-- clé PUBLIQUE par design, obtenue par email sur web3forms.com -->
  <input type="hidden" name="subject" value="Nouveau message depuis claudepartners.fr" />
  <input type="hidden" name="redirect" value="https://claudepartners.fr/merci" /> <!-- repli no-JS -->
  <!-- Honeypot : nom EXACT 'botcheck', caché, non coché, pas required -->
  <input type="checkbox" name="botcheck" class="hidden" style="display:none" tabindex="-1" autocomplete="off" />

  <div><label for="name" class="block text-sm font-medium">Nom et prénom</label>
    <input type="text" id="name" name="name" required autocomplete="name" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></div>
  <div><label for="email" class="block text-sm font-medium">Email professionnel</label>
    <input type="email" id="email" name="email" required autocomplete="email" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></div>
  <div><label for="organisme" class="block text-sm font-medium">Nom de votre organisme de formation</label>
    <input type="text" id="organisme" name="organisme" required class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></div>
  <div><label for="message" class="block text-sm font-medium">Votre message</label>
    <textarea id="message" name="message" rows="5" required class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"></textarea></div>

  <button type="submit" class="rounded-lg bg-brand-500 px-5 py-2.5 font-semibold text-white hover:bg-brand-600">Envoyer</button>
  <p id="form-result" class="text-sm" role="status" aria-live="polite"></p>
</form>

<script is:inline>
  const form = document.getElementById('contact-form');
  const result = document.getElementById('form-result');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const json = JSON.stringify(Object.fromEntries(new FormData(form)));
    result.textContent = 'Envoi en cours...'; result.className = 'text-sm text-gray-500';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: json });
      const data = await res.json();
      if (res.status === 200) {
        result.textContent = 'Merci, votre message a bien été envoyé.'; result.className = 'text-sm text-green-600';
        form.reset();
        if (window.plausible) window.plausible('Contact Form Submit');   // goal créé au préalable dans Plausible
      } else { result.textContent = data.message || 'Une erreur est survenue.'; result.className = 'text-sm text-red-600'; }
    } catch { result.textContent = 'Erreur réseau. Réessayez.'; result.className = 'text-sm text-red-600'; }
    finally { setTimeout(() => { result.textContent = ''; }, 6000); }
  });
</script>
```

---

## 12. Plausible (analytics) + Calendly (RDV)

**Plausible** : script unique (modèle 2026) déjà placé dans `BaseLayout` §8. Mesures (clics sortants, downloads, soumissions) activées DANS le dashboard, sans changer le snippet. Événements perso via `window.plausible('Nom', { props })`. `data-domain` doit matcher EXACTEMENT le domaine enregistré. Goals à créer AVANT (pas de backfill). Anti-adblock : proxy first-party via Cloudflare Worker (transmettre `X-Forwarded-For` = `CF-Connecting-IP`).

**Calendly** `src/components/CalendlyInline.astro` (un seul widget `data-resize` par page ; script en `defer` pour ne pas pénaliser le LCP) :
```astro
<div class="calendly-inline-widget"
     data-url="https://calendly.com/claudepartners/30min"
     data-resize="true" style="min-width:320px;height:700px;"></div>
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" defer></script>
```

---

## 13. Déploiement Cloudflare Pages (Git) + fichiers _headers/_redirects

**Build settings (dashboard → Workers & Pages → Pages → Connect to Git)** :
```
Framework preset:        Astro
Build command:           npm run build
Build output directory:  dist
Production branch:        main          (autres branches/PR -> Preview Deployments)
Environment variables:   NODE_VERSION = 22   (à mettre pour Production ET Preview)
```
Alternative Wrangler : `npx wrangler pages deploy ./dist --project-name=claudepartners`.

`public/_headers` (copié à la racine de dist/) :
```text
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
/fonts/*
  Cache-Control: public, max-age=31536000, immutable
/*
  Cache-Control: public, max-age=0, must-revalidate
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
https://:project.pages.dev/*
  X-Robots-Tag: noindex
```

`public/_redirects` (canonicalisation 301) :
```text
https://www.claudepartners.fr/* https://claudepartners.fr/:splat 301
```

---

## 14. DNS — délégation Hostinger → Cloudflare (obligatoire pour l'apex)

1. Cloudflare → **Add a domain** `claudepartners.fr` (plan Free OK).
2. Cloudflare scanne les DNS existants → **recopier MX/SPF/DKIM** si email @claudepartners.fr existe (sinon l'email casse).
3. Cloudflare donne 2 nameservers `*.ns.cloudflare.com`.
4. Hostinger (hPanel → Domaines → Nameservers) : **désactiver DNSSEC d'abord**, puis remplacer les NS dns-parking par les 2 NS Cloudflare.
5. Attendre activation (< 1h à 24h).
6. Projet Pages → **Custom domains → Set up a domain** : ajouter `claudepartners.fr` PUIS `www.claudepartners.fr`. Cloudflare crée auto :
   - `CNAME @ -> claudepartners.pages.dev` (Proxied, via CNAME flattening)
   - `CNAME www -> claudepartners.pages.dev` (Proxied)
7. TLS auto. Tester apex + www en HTTPS. Canonicaliser via `_redirects` (§13).

> Ne PAS créer le CNAME custom manuellement avant de passer par « Set up a domain » (sinon erreur 522).

---

## 15. Pièges critiques (récapitulatif)

- **JAMAIS** `@astrojs/tailwind` (déprécié) ni adapter `@astrojs/cloudflare` (statique). Tailwind = plugin Vite ; pas de `tailwind.config.js`.
- `entry.slug` **n'existe plus** → `entry.id` + route `[...id].astro` (rest param car id peut contenir des sous-dossiers).
- `render()` depuis `astro:content`, PAS `entry.render()`.
- `src/content.config.ts` à la RACINE ; loader `glob()` obligatoire ; `z.coerce.date()` (pas `z.date()`).
- `image()` seulement si schéma déclaré EN FONCTION ; chemins d'image relatifs au .mdx.
- JSON-LD uniquement via `set:html={JSON.stringify(...)}` ; URLs absolues.
- `site:` dans config = sans lui, sitemap/canonical/OG cassent ; robots.txt → sitemap-**index**.xml.
- Web3Forms : `access_key` publique (normal) ; honeypot nommé exactement `botcheck`, non required ; `redirect` ignoré en AJAX.
- Plausible : `data-domain` exact, goals créés avant.
- Apex sur DNS externe = impossible → déléguer les NS à Cloudflare ; désactiver DNSSEC avant migration ; recopier MX.
- `_headers`/`_redirects` doivent finir à la racine de dist/ → les placer dans `public/`. `NODE_VERSION` à mettre aussi pour Preview (bug connu).
- Node : versions PAIRES uniquement (22/24).

---

## Sources officielles consultées (2026-06-14)

- Astro install/setup, styling (Tailwind v4, dépréciation @astrojs/tailwind), config reference (site, output, fonts), Content Collections, MDX, images, recipes/reading-time, endpoints, directives (set:html), deploy/cloudflare, upgrade-to v5/v6 — via context7 `/withastro/docs` + https://docs.astro.build
- Astro Fonts API (`fontProviders.google()`, `<Font cssVariable preload />`) — context7 `/withastro/docs` (configuration-reference.mdx, modules/astro-assets.mdx, guides/fonts.mdx)
- Tailwind v4 : https://tailwindcss.com/docs/installation/using-vite , /blog/tailwindcss-v4 , /docs/font-family , /docs/upgrade-guide
- npm registry (versions vérifiées) : astro 6.4.6 (node>=22.12.0), tailwindcss 4.3.1, @tailwindcss/vite 4.3.1, @astrojs/mdx 6.0.3, @astrojs/sitemap 3.7.3, @astrojs/rss 4.0.18
- Cloudflare : pages/framework-guides/deploy-an-astro-site, get-started/git-integration, configuration/custom-domains, build-image, headers, redirects ; dns/cname-flattening, create-zone-apex, full-setup
- Web3Forms : docs.web3forms.com (html-and-javascript, ajax-contact-form, installation)
- Plausible : plausible.io/docs (plausible-script, custom-event-goals, proxy/introduction)
- Calendly : calendly.com/help advanced-embed, help.calendly.com embed-options-overview
- schema.org / Google : developers.google.com structured-data (organization, article, faqpage, breadcrumb, local-business) ; schema.org/Service ; schema.org/ProfessionalService ; llmstxt.org
- Hostinger : support pointer-domain-via-cloudflare

---

## Corrections (post-revue 2026-06-14) — LE PLAN PRÉVAUT

La revue adversariale a relevé des divergences entre cette référence et le plan. **En cas de doute, suivre le PLAN** (`plans/2026-06-14-claudepartners-site.md`). Décisions actées :

1. **Trailing slash : `trailingSlash: 'always'`** (et non `'never'`). Cloudflare Pages sert les pages `format:'directory'` AVEC slash (308 sinon). Toutes les URLs (canonical, og:url, liens internes, JSON-LD, sitemap, llms.txt) portent un **slash final**. L'affirmation du §0/§4/§13 selon laquelle `'never'` est « cohérent » est **erronée** pour Cloudflare Pages.
2. **Palette = HEX Direction B** (et non l'OKLCH ton 50 du §5). Variables `@theme` : `--color-cream-50:#FBF7F1`, `--color-cream-100:#F5EFE6`, `--color-sand:#E5D9C7`, `--color-ink:#2B2724`, `--color-muted:#7A6E60`, terracotta `--color-brand-500:#CC785C` (ramp 50→900). Le §5 ne définissait pas cream/sand/muted : utiliser ceux du plan.
3. **Logo : `public/logo.png` → `/logo.png`** (pas `/images/logo.png`). Et dans le JSON-LD, `logo` est un **`ImageObject`** (pas une simple chaîne) sur un nœud **`Organization`** (pas `ProfessionalService`, qui déclenche des warnings LocalBusiness sans adresse).
4. **Pas de `BlogLayout`** : tout passe par `BaseLayout` (le §3/§7 le mentionnait à tort).
5. **www→apex et `*.pages.dev`→apex : via Cloudflare Redirect Rules**, PAS via `_redirects` (le §13 est faux : `_redirects` ne gère pas les sources par hostname).
6. **`_headers`** : supprimer le bloc `/fonts/*` (mort) ; les polices sont sous `/_astro/fonts/` (couvert par `/_astro/*`).
7. **`sameAs` LinkedIn** : ne l'ajouter que si la page existe réellement (sinon l'omettre).
8. **`.node-version` = `22.16.0`** (version complète paire) ; il prime sur la variable `NODE_VERSION` du dashboard Cloudflare.
9. **Pages `noindex` exclues du sitemap** : `/merci/`, `/mentions-legales/`, `/confidentialite/`.
10. **`Schema.astro`** échappe `<` (`JSON.stringify(b).replace(/</g,'\\u003c')`) pour blinder le JSON-LD.