# Site Claude Partners — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire et déployer claudepartners.fr — un site vitrine + blog, statique, optimisé SEO, pour une activité de conseil aidant les organismes de formation (OF) à intégrer l'IA et automatiser leurs process.

**Architecture:** Site 100 % statique généré par Astro 6 (sortie `static`, aucun back-end), stylé avec Tailwind CSS v4 (config CSS-first), blog en MDX via la Content Layer API. SEO de bout en bout (canonical absolus, OG, sitemap, JSON-LD schema.org, llms.txt). Hébergement Cloudflare Pages avec déploiement continu depuis Git. Identité visuelle « Direction B » (crème + terracotta + encre, titres Fraunces / corps Inter).

**Tech Stack:** Astro 6.4.x · Tailwind CSS 4.3.x (`@tailwindcss/vite`) · `@astrojs/mdx` · `@astrojs/sitemap` · API Fonts native d'Astro (self-host Fraunces + Inter) · Web3Forms (formulaire) · Plausible (analytics) · Calendly (RDV) · Cloudflare Pages (hébergement) · Node 22 LTS.

> 📎 Référence d'implémentation détaillée (snippets vérifiés contre la doc officielle le 2026-06-14) : [`docs/superpowers/_research-reference.md`](../_research-reference.md). **En cas de divergence, CE PLAN prévaut** sur la référence (voir la section « Corrections (post-revue) » en fin de référence). La référence sert d'appui sur les API/versions Astro.

---

## Conventions (corrections post-revue 2026-06-14)

Ces conventions résolvent les problèmes remontés par la revue adversariale. Elles s'appliquent à **tout** le plan.

1. **Trailing slash — `trailingSlash: 'always'`.** Cloudflare Pages sert les pages `format:'directory'` AVEC slash final (308 sinon). Donc **toutes** les URLs internes, canonical, `og:url`, JSON-LD et sitemap portent un **slash final** : `/contact/`, `/services/audit-ia/`, `/blog/<id>/`. Dans chaque snippet, les `href` internes et les `new URL(...)` doivent finir par `/`. Une porte `curl -I` en Phase 6 vérifie que la forme canonique répond **200** (pas 308).
2. **Pages `noindex` exclues du sitemap.** `/merci/`, `/mentions-legales/`, `/confidentialite/` sont `noindex` ET filtrées du sitemap (jamais d'URL noindex dans le sitemap).
3. **Le PLAN prévaut sur la référence** pour : la palette (HEX Direction B), l'emplacement du logo (`public/logo.png` → `/logo.png`), l'absence de `BlogLayout` (tout passe par `BaseLayout`).
4. **Répertoire de travail.** Le projet Astro est dans `app/`. Les commandes `npm …` s'exécutent **depuis `app/`** ; les commandes `git …` **depuis la racine du repo** (`CLAUDEPARTNERS/`). Chaque bloc le suppose ; ajouter un `cd` si le cwd a été réinitialisé.
5. **Redirections au niveau domaine** (www→apex, `*.pages.dev`→apex) : **NON** gérées par `_redirects` (non supporté par Cloudflare Pages) → **Cloudflare Redirect Rules** (Phase 6, Task 6.3).

---

## Approche de vérification (« TDD léger »)

Un site vitrine statique n'a pas de logique unitaire à tester façon TDD classique. La vérification de chaque tâche repose donc sur des **portes concrètes et observables** :

1. **`npm run build`** réussit sans erreur ni warning bloquant.
2. **Inspection de `dist/`** : présence et contenu corrects des fichiers générés (HTML, sitemap, robots, JSON-LD…).
3. **`npm run dev` / `npm run preview`** + inspection navigateur (rendu, polices, styles, comportement JS).
4. **Validateurs externes** quand pertinent : `validator.schema.org` (JSON-LD), Google Rich Results Test, Lighthouse (perf/SEO/a11y ≥ 95).

Chaque tâche se termine par une **étape de vérification** puis un **commit**.

---

## Prérequis externes à fournir (entrées de configuration, pas du code)

Ces valeurs viennent de l'extérieur. Le site **build et fonctionne avec les placeholders ci-dessous** ; remplacer dès que les vraies valeurs sont disponibles (suivi en Phase 4/6).

- [ ] **Web3Forms** : créer une clé sur https://web3forms.com (saisir l'email de réception) → `access_key`. Placeholder build-safe : `"PLACEHOLDER-WEB3FORMS-ACCESS-KEY"`.
- [ ] **Plausible** : créer un compte, ajouter le site `claudepartners.fr`, créer les goals (`Contact Form Submit`, clics CTA). `data-domain` = `claudepartners.fr`.
- [ ] **Calendly** : URL de l'événement (ex. `https://calendly.com/<compte>/30min`). Placeholder : `https://calendly.com/claudepartners/30min`.
- [ ] **LinkedIn** : URL de la page entreprise (pour `sameAs` JSON-LD). Sinon retirer la ligne.
- [ ] **Mentions légales** : raison sociale, statut, SIRET, adresse, directeur de publication, email. Hébergeur = Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA).
- [ ] **Git** : dépôt distant (GitHub recommandé) pour brancher Cloudflare Pages.
- [ ] **Cloudflare** : compte (plan Free suffisant).

---

## Carte des fichiers

```
app/                                 # racine du projet Astro (sous le repo CLAUDEPARTNERS/)
├─ public/
│  ├─ favicon.svg · og-default.jpg · logo.png
│  ├─ robots.txt · _headers · _redirects
├─ src/
│  ├─ assets/                      # images optimisées (astro:assets)
│  ├─ components/  BaseHead.astro · Schema.astro · Header.astro · Footer.astro
│  │               · ContactForm.astro · CalendlyInline.astro · ServiceCard.astro · Faq.astro
│  ├─ content/
│  │   ├─ blog/                    # articles .mdx (+ ./images/)
│  │   └─ services/                # 4 fiches services .mdx
│  ├─ layouts/    BaseLayout.astro
│  ├─ pages/
│  │   ├─ index.astro · a-propos.astro · contact.astro · merci.astro
│  │   ├─ mentions-legales.astro · confidentialite.astro
│  │   ├─ services/  index.astro · [...id].astro
│  │   ├─ blog/      index.astro · [...id].astro
│  │   └─ llms.txt.ts
│  ├─ styles/global.css
│  └─ content.config.ts
├─ remark-reading-time.mjs
├─ astro.config.mjs · tsconfig.json · package.json
├─ .node-version                   # "22"
```

Chaque fichier a une responsabilité unique. `BaseLayout` orchestre `<head>` (SEO + fonts + analytics + JSON-LD global) et le shell (Header/Footer). Les pages fournissent le contenu et le JSON-LD spécifique via la prop `pageSchema`.

---

# PHASE 0 — Initialisation (projet Astro statique amorçable)

### Task 0.1 : Vérifier Node et créer le projet

**Files:**
- Create: tout le squelette `claudepartners/` (généré par la CLI)

- [ ] **Step 1 : Vérifier la version de Node**

Run : `node -v`
Expected : `v22.x.x` ou `v24.x.x` (versions **paires** uniquement ; v23/v25 non supportées par Astro). Si autre version, installer Node 22 LTS avant de continuer.

- [ ] **Step 2 : Créer le projet Astro dans le dossier courant**

> Le repo Git existe déjà (dossier `CLAUDEPARTNERS` avec `docs/`). On scaffolde dans un sous-dossier `app/` pour ne pas mélanger avec `docs/`, OU directement à la racine si `docs/` est conservé. Ici : sous-dossier `app/`.

Run :
```bash
npm create astro@latest app -- --template minimal --no-git --typescript strict
cd app
npm install
```
Expected : projet créé, `npm install` OK, présence de `app/astro.config.mjs`, `app/package.json`, `app/tsconfig.json`.

- [ ] **Step 3 : Vérifier le tsconfig strict**

Lire `app/tsconfig.json`.
Expected : contient `"extends": "astro/tsconfigs/strict"`. (Astro 5+ l'applique d'office.)

- [ ] **Step 4 : Build baseline**

Run : `cd app && npm run build`
Expected : build OK, dossier `app/dist/` généré avec `index.html`.

- [ ] **Step 5 : Commit**

```bash
git add -A
git commit -m "feat: init projet Astro statique (app/)"
```

### Task 0.2 : Ajouter les intégrations (Tailwind v4, MDX, sitemap, RSS, reading-time)

**Files:**
- Modify: `app/astro.config.mjs` (auto par la CLI), `app/package.json`
- Create: `app/src/styles/global.css` (auto par `astro add tailwind`)

- [ ] **Step 1 : Ajouter Tailwind v4 (plugin Vite)**

Run : `cd app && npx astro add tailwind --yes`
Expected : installe `tailwindcss` + `@tailwindcss/vite`, ajoute `tailwindcss()` dans `vite.plugins` de `astro.config.mjs`, crée `src/styles/global.css` avec `@import "tailwindcss";`.
> ⚠️ Ne **jamais** installer `@astrojs/tailwind` (déprécié). Repli Windows si la CLI échoue : `npm i tailwindcss @tailwindcss/vite` puis édition manuelle (voir référence §2).

- [ ] **Step 2 : Ajouter MDX et sitemap**

Run :
```bash
npx astro add mdx --yes
npx astro add sitemap --yes
```
Expected : `@astrojs/mdx` et `@astrojs/sitemap` ajoutés à `integrations[]`.

- [ ] **Step 3 : Installer RSS et le plugin temps de lecture**

Run : `npm install @astrojs/rss reading-time mdast-util-to-string`
Expected : ajoutés à `package.json`.

- [ ] **Step 4 : Build de vérification**

Run : `npm run build`
Expected : build OK (les intégrations ne cassent rien).

- [ ] **Step 5 : Commit**

```bash
git add -A
git commit -m "feat: ajoute Tailwind v4, MDX, sitemap, RSS, reading-time"
```

---

# PHASE 1 — Design system (Tailwind v4 + thème Direction B + polices)

### Task 1.1 : Configuration Astro consolidée (site, statique, fonts, remark, sitemap)

**Files:**
- Create: `app/remark-reading-time.mjs`
- Modify: `app/astro.config.mjs`

- [ ] **Step 1 : Créer le plugin remark temps de lecture**

Create `app/remark-reading-time.mjs` :
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

- [ ] **Step 2 : Remplacer `app/astro.config.mjs` par la version consolidée**

```js
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
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
      display: 'swap',
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
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
```

- [ ] **Step 3 : Build de vérification**

Run : `npm run build`
Expected : build OK ; au premier build, l'API Fonts télécharge et self-host Fraunces + Inter (présence de fichiers de police dans `dist/_astro/fonts/` ou `dist/_fonts/`).

- [ ] **Step 4 : Commit**

```bash
git add -A
git commit -m "feat: config Astro (site, fonts self-host, remark, sitemap)"
```

### Task 1.2 : Thème Tailwind (palette Direction B + polices)

**Files:**
- Modify: `app/src/styles/global.css`

- [ ] **Step 1 : Écrire le thème CSS-first**

Remplacer `app/src/styles/global.css` :
```css
@import "tailwindcss";

@theme {
  /* Polices — réutilise les variables générées par l'API Fonts d'Astro */
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-serif: var(--font-fraunces), Georgia, serif;

  /* Direction B — crème / sable / encre */
  --color-cream-50:  #FBF7F1;
  --color-cream-100: #F5EFE6;
  --color-sand:      #E5D9C7;
  --color-ink:       #2B2724;
  --color-muted:     #7A6E60;

  /* Accent terracotta (clay) -> bg-brand-500, text-brand-700, etc. */
  --color-brand-50:  #FAF0EB;
  --color-brand-100: #F5E0D6;
  --color-brand-200: #EBC0AD;
  --color-brand-300: #E0A084;
  --color-brand-400: #D88B68;
  --color-brand-500: #CC785C;
  --color-brand-600: #B5634A;
  --color-brand-700: #934E3A;
  --color-brand-800: #6E3B2C;
  --color-brand-900: #4A271D;
}

@layer base {
  body { font-family: var(--font-sans); color: var(--color-ink); background-color: var(--color-cream-50); }
  h1, h2, h3, h4 { font-family: var(--font-serif); color: var(--color-ink); }
  a { color: inherit; }
}
```

- [ ] **Step 2 : Vérification visuelle (différée jusqu'au layout)**

> Les utilitaires (`font-serif`, `bg-brand-500`, `text-muted`…) seront vérifiés visuellement en Task 1.3 via une page de test, puis confirmés en Phase 4.

- [ ] **Step 3 : Commit**

```bash
git add -A
git commit -m "feat: thème Tailwind Direction B (crème/terracotta/encre + polices)"
```

### Task 1.3 : BaseLayout minimal + page de test (vérifier polices & couleurs)

**Files:**
- Create: `app/src/layouts/BaseLayout.astro` (version minimale — enrichie en Phase 2)
- Modify: `app/src/pages/index.astro`

- [ ] **Step 1 : Créer un BaseLayout minimal**

Create `app/src/layouts/BaseLayout.astro` :
```astro
---
import { Font } from 'astro:assets';
import '../styles/global.css';

interface Props { title: string; description?: string; }
const { title, description = '' } = Astro.props;
---
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    <Font cssVariable="--font-fraunces" preload />
    <Font cssVariable="--font-inter" preload />
  </head>
  <body class="font-sans">
    <slot />
  </body>
</html>
```

- [ ] **Step 2 : Page de test**

Remplacer `app/src/pages/index.astro` :
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Claude Partners — test design system">
  <main class="mx-auto max-w-2xl px-4 py-16">
    <h1 class="font-serif text-5xl font-semibold text-brand-700">Claude Partners</h1>
    <p class="mt-4 text-lg text-muted">L'IA au service de votre organisme de formation.</p>
    <button class="mt-8 rounded-lg bg-brand-500 px-5 py-2.5 font-medium text-white hover:bg-brand-600">
      Prendre rendez-vous
    </button>
  </main>
</BaseLayout>
```

- [ ] **Step 3 : Vérifier dans le navigateur**

Run : `npm run dev`
Expected : le titre s'affiche en **Fraunces** (serif), le corps en **Inter** ; le `<h1>` est terracotta foncé, le bouton terracotta. Inspecter `<head>` : `@font-face` self-host + `<link rel="preload">` des polices générés automatiquement. Aucune requête vers `fonts.googleapis.com`.

- [ ] **Step 4 : Build + commit**

```bash
npm run build
git add -A
git commit -m "feat: BaseLayout minimal + page de test design system"
```

---

# PHASE 2 — SEO technique (BaseHead, JSON-LD, sitemap, robots)

### Task 2.1 : Composant BaseHead (canonical, OG, Twitter)

**Files:**
- Create: `app/src/components/BaseHead.astro`

- [ ] **Step 1 : Créer BaseHead**

```astro
---
interface Props {
  title: string; description: string; image?: string; imageAlt?: string;
  canonical?: string; type?: 'website' | 'article'; noindex?: boolean;
}
const {
  title, description, image = '/og-default.jpg',
  imageAlt = 'Claude Partners — IA et automatisation pour organismes de formation',
  canonical, type = 'website', noindex = false,
} = Astro.props;
// trailingSlash:'always' => Astro.url.pathname porte déjà le slash final ; on garantit la cohérence.
const rawPath = canonical ?? Astro.url.pathname;
const path = rawPath.endsWith('/') ? rawPath : `${rawPath}/`;
const canonicalURL = new URL(path, Astro.site);
const socialImageURL = new URL(image, Astro.site);
const fullTitle = title === 'Claude Partners' ? title : `${title} — Claude Partners`;
---
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="generator" content={Astro.generator} />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />
{noindex && <meta name="robots" content="noindex, nofollow" />}
<link rel="sitemap" href="/sitemap-index.xml" />
<meta property="og:type" content={type} />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:image" content={socialImageURL} />
<meta property="og:image:alt" content={imageAlt} />
<meta property="og:locale" content="fr_FR" />
<meta property="og:site_name" content="Claude Partners" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={socialImageURL} />
<meta name="twitter:image:alt" content={imageAlt} />
```

- [ ] **Step 2 : Commit**

```bash
git add -A && git commit -m "feat: composant BaseHead (SEO meta, canonical, OG, Twitter)"
```

### Task 2.2 : Composant Schema (JSON-LD) + BaseLayout enrichi

**Files:**
- Create: `app/src/components/Schema.astro`
- Modify: `app/src/layouts/BaseLayout.astro`

- [ ] **Step 1 : Créer Schema.astro**

```astro
---
interface Props { schema: Record<string, unknown> | Record<string, unknown>[]; }
const { schema } = Astro.props;
const blocks = Array.isArray(schema) ? schema : [schema];
// Échappe `<` pour qu'un éventuel `</script>` dans une valeur ne casse pas le bloc JSON-LD.
const json = (b: Record<string, unknown>) => JSON.stringify(b).replace(/</g, '\\u003c');
---
{blocks.map((b) => <script type="application/ld+json" set:html={json(b)} />)}
```

- [ ] **Step 2 : Créer les stubs Header/Footer AVANT le BaseLayout (qui les importe)**

> Ordre important : le BaseLayout enrichi (Step 3) importe `Header`/`Footer`. On crée donc ces stubs d'abord pour qu'un build/dev intermédiaire reste vert. Versions définitives en Phase 4 (Task 4.1).

Create `app/src/components/Header.astro` :
```astro
<header class="border-b border-sand"><nav class="mx-auto max-w-5xl px-4 py-4">Claude Partners</nav></header>
```
Create `app/src/components/Footer.astro` :
```astro
<footer class="border-t border-sand"><div class="mx-auto max-w-5xl px-4 py-8 text-sm text-muted">© Claude Partners</div></footer>
```

- [ ] **Step 3 : Enrichir BaseLayout (BaseHead + Plausible + JSON-LD global)**

Remplacer `app/src/layouts/BaseLayout.astro` :
```astro
---
import { Font } from 'astro:assets';
import BaseHead from '../components/BaseHead.astro';
import Schema from '../components/Schema.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string; description: string; image?: string; imageAlt?: string;
  type?: 'website' | 'article'; noindex?: boolean;
  pageSchema?: Record<string, unknown>[];
}
const { title, description, image, imageAlt, type, noindex, pageSchema = [] } = Astro.props;
const site = Astro.site!.toString().replace(/\/$/, '');

const organization = {
  '@context': 'https://schema.org', '@type': 'Organization',
  '@id': `${site}/#organization`, name: 'Claude Partners', url: site,
  // logo en ImageObject = attendu par le rich result Article (publisher.logo).
  logo: { '@type': 'ImageObject', url: `${site}/logo.png`, width: 512, height: 512 },
  description: "Claude Partners aide les organismes de formation français à intégrer l'IA et automatiser leurs process.",
  areaServed: { '@type': 'Country', name: 'France' },
  email: 'contact@claudepartners.fr',
  // sameAs: ajouter UNIQUEMENT des profils réels existants, ex. LinkedIn (sinon laisser vide).
  // sameAs: ['https://www.linkedin.com/company/<page-reelle>'],
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
    <BaseHead title={title} description={description} image={image} imageAlt={imageAlt} type={type} noindex={noindex} />
    <Font cssVariable="--font-fraunces" preload />
    <Font cssVariable="--font-inter" preload />
    <script defer data-domain="claudepartners.fr" src="https://plausible.io/js/script.js"></script>
    <script is:inline>window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}</script>
    <Schema schema={[organization, website, ...pageSchema]} />
  </head>
  <body class="flex min-h-screen flex-col font-sans">
    <Header />
    <main class="flex-1"><slot /></main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 4 : Mettre à jour la page de test pour utiliser le nouveau layout**

Dans `app/src/pages/index.astro`, ajouter la prop `description` requise :
```astro
<BaseLayout title="Claude Partners" description="L'IA au service de votre organisme de formation.">
```

- [ ] **Step 5 : Vérifier le build et le JSON-LD**

Run : `npm run build`
Expected : build OK. Ouvrir `dist/index.html` : présence de `<link rel="canonical" href="https://claudepartners.fr/">`, des balises OG, et de **deux** blocs `<script type="application/ld+json">` (Organization + WebSite) avec des URLs absolues.

- [ ] **Step 6 : Valider le JSON-LD**

Copier un bloc JSON-LD dans https://validator.schema.org.
Expected : 0 erreur.

- [ ] **Step 7 : Commit**

```bash
git add -A && git commit -m "feat: JSON-LD global (Organization+WebSite), Plausible, BaseLayout complet"
```

### Task 2.3 : robots.txt + favicon + assets + page 404

**Files:**
- Create: `app/public/robots.txt`, `app/public/favicon.svg`, `app/public/og-default.jpg`, `app/public/logo.png`, `app/src/pages/404.astro`

- [ ] **Step 1 : Créer robots.txt**

Create `app/public/robots.txt` :
```text
User-agent: *
Allow: /

Sitemap: https://claudepartners.fr/sitemap-index.xml
```

- [ ] **Step 2 : Favicon + images**

Create `app/public/favicon.svg` (monogramme « CP » sur fond terracotta — placeholder SVG valide) :
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#CC785C"/><text x="32" y="42" font-family="Georgia, serif" font-size="30" fill="#FBF7F1" text-anchor="middle">CP</text></svg>
```
Ajouter `app/public/og-default.jpg` (1200×630, visuel Direction B) et `app/public/logo.png` (carré, ~512×512). **Doivent être de vrais fichiers image décodables** (pas des fichiers vides). Placeholders acceptables jusqu'à la livraison des visuels définitifs.

- [ ] **Step 3 : Page 404**

Create `app/src/pages/404.astro` :
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Page introuvable" description="Cette page n'existe pas." noindex={true}>
  <section class="mx-auto max-w-2xl px-4 py-24 text-center">
    <h1 class="font-serif text-5xl font-semibold text-brand-700">404</h1>
    <p class="mt-4 text-muted">Cette page n'existe pas (ou plus).</p>
    <a href="/" class="mt-8 inline-block rounded-lg bg-brand-500 px-5 py-2.5 font-medium text-white hover:bg-brand-600">Retour à l'accueil</a>
  </section>
</BaseLayout>
```

- [ ] **Step 4 : Vérifier le sitemap et les assets**

Run : `npm run build`
Expected : `dist/sitemap-index.xml` et `dist/sitemap-0.xml` présents ; `dist/robots.txt`, `dist/favicon.svg`, `dist/404.html` générés. Les pages noindex (`/merci/`, légales) **absentes** du sitemap.

- [ ] **Step 5 : Commit**

```bash
git add -A && git commit -m "feat: robots.txt, favicon, assets, page 404"
```

---

# PHASE 3 — Blog (Content Layer MDX)

### Task 3.1 : Collection blog + typographie prose

**Files:**
- Create: `app/src/content.config.ts`
- Modify: `app/src/styles/global.css` (plugin typography)
- Modify: `app/package.json` (`@tailwindcss/typography`)

- [ ] **Step 1 : Installer le plugin typography**

Run : `npm install -D @tailwindcss/typography`

- [ ] **Step 2 : Activer le plugin dans global.css**

Ajouter en haut de `app/src/styles/global.css`, **juste après** `@import "tailwindcss";` :
```css
@plugin "@tailwindcss/typography";
```

- [ ] **Step 3 : Créer la collection blog**

Create `app/src/content.config.ts` :
```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(70),
      description: z.string().max(160),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('Claude Partners'),
      image: image(),
      imageAlt: z.string(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
```

- [ ] **Step 4 : Build (collection vide tolérée)**

Run : `npm run build`
Expected : build OK (Astro génère les types de contenu ; collection vide = pas de page blog encore).

- [ ] **Step 5 : Commit**

```bash
git add -A && git commit -m "feat: collection blog (Content Layer) + plugin typography"
```

### Task 3.2 : Article d'exemple + image de couverture

**Files:**
- Create: `app/src/content/blog/integrer-ia-organisme-formation.mdx`
- Create: `app/src/content/blog/images/ia-of-cover.jpg`

- [ ] **Step 1 : Ajouter une image de couverture (vrai fichier binaire)**

Placer `app/src/content/blog/images/ia-of-cover.jpg` (1200×630).
⚠️ Le helper `image()` du schéma **valide le fichier au build** : il doit être un **JPEG/PNG/WebP décodable**, pas un fichier vide (sinon `npm run build` échoue). Si pas de visuel définitif, télécharger un placeholder réel (ex. via la skill de génération d'images, ou un placeholder libre de droits) — ne jamais créer un `.jpg` de 0 octet.

- [ ] **Step 2 : Créer l'article**

Create `app/src/content/blog/integrer-ia-organisme-formation.mdx` :
```mdx
---
title: "Intégrer l'IA dans votre organisme de formation : par où commencer"
description: "Guide pratique pour automatiser vos process pédagogiques et administratifs avec l'IA, sans complexité technique."
pubDate: 2026-06-10
author: "Claude Partners"
image: "./images/ia-of-cover.jpg"
imageAlt: "Formatrice utilisant un outil d'IA devant un tableau"
tags: ["IA", "automatisation", "Qualiopi"]
draft: false
---

## Pourquoi s'y mettre maintenant

Les organismes de formation font face à une charge administrative croissante
(Qualiopi, suivi des stagiaires, reporting) qui grignote le temps pédagogique.
L'IA et l'automatisation permettent de récupérer ces heures.

## Trois chantiers à fort impact

1. **La création de supports pédagogiques** assistée par IA.
2. **L'automatisation administrative** (dossiers, relances, émargement).
3. **Le suivi qualité Qualiopi** semi-automatisé.

## Comment démarrer sans se tromper

Commencez par un audit des process les plus chronophages, puis automatisez
un seul flux de bout en bout avant de généraliser.
```

- [ ] **Step 3 : Build**

Run : `npm run build`
Expected : build OK ; l'image est optimisée vers `dist/_astro/`.

- [ ] **Step 4 : Commit**

```bash
git add -A && git commit -m "content: premier article de blog + image de couverture"
```

### Task 3.3 : Index du blog + route article

**Files:**
- Create: `app/src/pages/blog/index.astro`, `app/src/pages/blog/[...id].astro`

- [ ] **Step 1 : Index du blog**

Create `app/src/pages/blog/index.astro` :
```astro
---
import { getCollection } from 'astro:content';
import { Image } from 'astro:assets';
import BaseLayout from '../../layouts/BaseLayout.astro';

const posts = (await getCollection('blog', ({ data }) =>
  import.meta.env.PROD ? !data.draft : true))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
const dateFmt = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' });
---
<BaseLayout title="Blog" description="Conseils IA et automatisation pour organismes de formation.">
  <section class="mx-auto max-w-5xl px-4 py-16">
    <h1 class="font-serif text-4xl font-semibold">Le blog</h1>
    <p class="mt-2 text-muted">Idées concrètes pour faire entrer l'IA dans votre OF.</p>
    <ul class="mt-10 grid gap-8 sm:grid-cols-2">
      {posts.map((post) => (
        <li class="overflow-hidden rounded-xl border border-sand bg-cream-50">
          <a href={`/blog/${post.id}/`} class="block">
            <Image src={post.data.image} alt={post.data.imageAlt} width={600} height={315} loading="lazy" class="aspect-[40/21] w-full object-cover" />
            <div class="p-5">
              <h2 class="font-serif text-xl font-medium">{post.data.title}</h2>
              <p class="mt-2 text-sm text-muted">{post.data.description}</p>
              <time datetime={post.data.pubDate.toISOString()} class="mt-3 block text-xs text-muted">{dateFmt.format(post.data.pubDate)}</time>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </section>
</BaseLayout>
```

- [ ] **Step 2 : Route article**

Create `app/src/pages/blog/[...id].astro` :
```astro
---
import { getCollection, render } from 'astro:content';
import type { GetStaticPaths } from 'astro';
import { Image } from 'astro:assets';
import BaseLayout from '../../layouts/BaseLayout.astro';

export const getStaticPaths = (async () => {
  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true);
  return posts.map((post) => ({ params: { id: post.id }, props: { post } }));
}) satisfies GetStaticPaths;

const { post } = Astro.props;
const { Content, remarkPluginFrontmatter } = await render(post);
const { title, description, pubDate, updatedDate, author, image, imageAlt, tags } = post.data;
const dateFmt = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' });
const site = Astro.site!;

const articleSchema = {
  '@context': 'https://schema.org', '@type': 'BlogPosting',
  '@id': new URL(`/blog/${post.id}/#article`, site).href,
  mainEntityOfPage: { '@type': 'WebPage', '@id': new URL(`/blog/${post.id}/`, site).href },
  headline: title, description,
  image: [new URL(image.src, site).href],
  datePublished: pubDate.toISOString(),
  dateModified: (updatedDate ?? pubDate).toISOString(),
  author: { '@type': 'Person', name: author },
  publisher: { '@id': new URL('/#organization', site).href },
  inLanguage: 'fr-FR',
};
---
<BaseLayout title={title} description={description} type="article" image={image.src} pageSchema={[articleSchema]}>
  <article class="mx-auto max-w-2xl px-4 py-16">
    <Image src={image} alt={imageAlt} width={1200} height={630} loading="eager" class="rounded-xl" />
    <h1 class="mt-8 font-serif text-4xl font-semibold text-brand-700">{title}</h1>
    <p class="mt-3 text-sm text-muted">
      Par {author} &middot;
      <time datetime={pubDate.toISOString()}>{dateFmt.format(pubDate)}</time>
      {updatedDate && <> &middot; Mis à jour le <time datetime={updatedDate.toISOString()}>{dateFmt.format(updatedDate)}</time></>}
      &middot; {remarkPluginFrontmatter.minutesRead}
    </p>
    {tags.length > 0 && (
      <ul class="mt-4 flex flex-wrap gap-2">{tags.map((t) => <li class="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-700">#{t}</li>)}</ul>
    )}
    <div class="prose prose-stone mt-8 max-w-none"><Content /></div>
  </article>
</BaseLayout>
```

- [ ] **Step 3 : Vérifier**

Run : `npm run build`
Expected : `dist/blog/index.html` et `dist/blog/integrer-ia-organisme-formation/index.html` générés ; le second contient le JSON-LD `BlogPosting` et le temps de lecture. En dev, vérifier que l'article s'affiche avec la typographie `prose`.

- [ ] **Step 4 : Valider BlogPosting**

Tester l'URL de l'article (ou son JSON-LD) dans le Rich Results Test.
Expected : `Article` détecté, 0 erreur.

- [ ] **Step 5 : Commit**

```bash
git add -A && git commit -m "feat: index blog + route article (BlogPosting JSON-LD, temps de lecture)"
```

---

# PHASE 4 — Pages vitrine + intégrations

### Task 4.1 : Header et Footer définitifs

**Files:**
- Modify: `app/src/components/Header.astro`, `app/src/components/Footer.astro`

- [ ] **Step 1 : Header avec navigation**

Remplacer `app/src/components/Header.astro` :
```astro
---
const links = [
  { href: '/services/', label: 'Services' },
  { href: '/blog/', label: 'Blog' },
  { href: '/a-propos/', label: 'À propos' },
];
---
<header class="border-b border-sand bg-cream-50">
  <nav class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
    <a href="/" class="font-serif text-xl font-semibold text-ink">Claude Partners</a>
    <ul class="flex items-center gap-6 text-sm">
      {links.map((l) => <li><a href={l.href} class="text-muted hover:text-ink">{l.label}</a></li>)}
      <li><a href="/contact/" class="rounded-lg bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-600">Prendre RDV</a></li>
    </ul>
  </nav>
</header>
```

- [ ] **Step 2 : Footer avec liens légaux**

Remplacer `app/src/components/Footer.astro` :
```astro
<footer class="border-t border-sand bg-cream-100">
  <div class="mx-auto grid max-w-5xl gap-6 px-4 py-10 text-sm text-muted sm:grid-cols-3">
    <div>
      <p class="font-serif text-base text-ink">Claude Partners</p>
      <p class="mt-2">L'IA au service des organismes de formation.</p>
    </div>
    <div>
      <p class="font-medium text-ink">Navigation</p>
      <ul class="mt-2 space-y-1">
        <li><a href="/services/" class="hover:text-ink">Services</a></li>
        <li><a href="/blog/" class="hover:text-ink">Blog</a></li>
        <li><a href="/a-propos/" class="hover:text-ink">À propos</a></li>
        <li><a href="/contact/" class="hover:text-ink">Contact</a></li>
      </ul>
    </div>
    <div>
      <p class="font-medium text-ink">Légal</p>
      <ul class="mt-2 space-y-1">
        <li><a href="/mentions-legales/" class="hover:text-ink">Mentions légales</a></li>
        <li><a href="/confidentialite/" class="hover:text-ink">Confidentialité</a></li>
      </ul>
    </div>
  </div>
  <div class="border-t border-sand px-4 py-4 text-center text-xs text-muted">© 2026 Claude Partners</div>
</footer>
```

- [ ] **Step 3 : Build + commit**

```bash
npm run build
git add -A && git commit -m "feat: Header et Footer définitifs"
```

### Task 4.2 : Formulaire de contact (Web3Forms) + Calendly + pages contact/merci

**Files:**
- Create: `app/src/components/ContactForm.astro`, `app/src/components/CalendlyInline.astro`
- Create: `app/src/pages/contact.astro`, `app/src/pages/merci.astro`

- [ ] **Step 1 : ContactForm (Web3Forms AJAX + honeypot)**

Create `app/src/components/ContactForm.astro` (remplacer `PLACEHOLDER-WEB3FORMS-ACCESS-KEY` dès la clé obtenue) :
```astro
<form id="contact-form" action="https://api.web3forms.com/submit" method="POST" class="space-y-4">
  <input type="hidden" name="access_key" value="PLACEHOLDER-WEB3FORMS-ACCESS-KEY" />
  <input type="hidden" name="subject" value="Nouveau message depuis claudepartners.fr" />
  <input type="hidden" name="redirect" value="https://claudepartners.fr/merci/" />
  <input type="checkbox" name="botcheck" class="hidden" style="display:none" tabindex="-1" autocomplete="off" />

  <div>
    <label for="name" class="block text-sm font-medium">Nom et prénom</label>
    <input type="text" id="name" name="name" required autocomplete="name"
           class="mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 focus:border-brand-500 focus:outline-none" />
  </div>
  <div>
    <label for="email" class="block text-sm font-medium">Email professionnel</label>
    <input type="email" id="email" name="email" required autocomplete="email"
           class="mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 focus:border-brand-500 focus:outline-none" />
  </div>
  <div>
    <label for="organisme" class="block text-sm font-medium">Nom de votre organisme de formation</label>
    <input type="text" id="organisme" name="organisme" required
           class="mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 focus:border-brand-500 focus:outline-none" />
  </div>
  <div>
    <label for="message" class="block text-sm font-medium">Votre message</label>
    <textarea id="message" name="message" rows="5" required
              class="mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 focus:border-brand-500 focus:outline-none"></textarea>
  </div>

  <button type="submit" class="rounded-lg bg-brand-500 px-5 py-2.5 font-medium text-white hover:bg-brand-600">Envoyer</button>
  <p id="form-result" class="text-sm" role="status" aria-live="polite"></p>
</form>

<script is:inline>
  const form = document.getElementById('contact-form');
  const result = document.getElementById('form-result');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const json = JSON.stringify(Object.fromEntries(new FormData(form)));
    result.textContent = 'Envoi en cours...'; result.className = 'text-sm text-muted';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: json });
      const data = await res.json();
      if (res.status === 200) {
        result.textContent = 'Merci, votre message a bien été envoyé.'; result.className = 'text-sm text-green-700';
        form.reset();
        if (window.plausible) window.plausible('Contact Form Submit');
      } else { result.textContent = data.message || 'Une erreur est survenue.'; result.className = 'text-sm text-red-700'; }
    } catch { result.textContent = 'Erreur réseau. Réessayez.'; result.className = 'text-sm text-red-700'; }
    finally { setTimeout(() => { result.textContent = ''; }, 6000); }
  });
</script>
```

- [ ] **Step 2 : CalendlyInline**

Create `app/src/components/CalendlyInline.astro` :
```astro
---
interface Props { url?: string; }
const { url = 'https://calendly.com/claudepartners/30min' } = Astro.props;
---
<div class="calendly-inline-widget" data-url={url} data-resize="true" style="min-width:320px;height:700px;"></div>
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" defer></script>
```

- [ ] **Step 3 : Page contact**

Create `app/src/pages/contact.astro` :
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ContactForm from '../components/ContactForm.astro';
import CalendlyInline from '../components/CalendlyInline.astro';

const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: new URL('/', Astro.site).href },
    { '@type': 'ListItem', position: 2, name: 'Contact' },
  ],
};
---
<BaseLayout title="Contact" description="Discutons de votre projet d'intégration de l'IA. Prenez rendez-vous ou écrivez-nous." pageSchema={[breadcrumb]}>
  <section class="mx-auto max-w-5xl px-4 py-16">
    <h1 class="font-serif text-4xl font-semibold">Parlons de votre organisme</h1>
    <p class="mt-2 text-muted">Réservez un créneau de 30 minutes, ou laissez-nous un message.</p>
    <div class="mt-10 grid gap-12 lg:grid-cols-2">
      <div>
        <h2 class="font-serif text-2xl">Prendre rendez-vous</h2>
        <div class="mt-4"><CalendlyInline /></div>
      </div>
      <div>
        <h2 class="font-serif text-2xl">Nous écrire</h2>
        <div class="mt-4"><ContactForm /></div>
        <div class="mt-8 border-t border-sand pt-6 text-sm text-muted">
          <p class="font-medium text-ink">Coordonnées</p>
          <p class="mt-2">Email : <a href="mailto:contact@claudepartners.fr" class="text-brand-700 hover:underline">contact@claudepartners.fr</a></p>
          <p class="mt-1">Zone d'intervention : France entière (à distance).</p>
          <!-- Ajouter ici LinkedIn / téléphone quand disponibles (et synchroniser avec le sameAs du JSON-LD). -->
        </div>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 4 : Page merci (noindex)**

Create `app/src/pages/merci.astro` :
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Merci" description="Votre message a bien été envoyé." noindex={true}>
  <section class="mx-auto max-w-2xl px-4 py-24 text-center">
    <h1 class="font-serif text-4xl font-semibold text-brand-700">Merci !</h1>
    <p class="mt-4 text-muted">Votre message a bien été envoyé. Nous revenons vers vous rapidement.</p>
    <a href="/" class="mt-8 inline-block rounded-lg bg-brand-500 px-5 py-2.5 font-medium text-white hover:bg-brand-600">Retour à l'accueil</a>
  </section>
</BaseLayout>
```

- [ ] **Step 5 : Vérifier**

Run : `npm run dev`
Expected : page `/contact` affiche le widget Calendly et le formulaire. Soumettre le formulaire (avec la vraie clé) → email reçu + redirection/affichage succès. `/merci` contient `<meta name="robots" content="noindex, nofollow">`.

- [ ] **Step 6 : Commit**

```bash
npm run build
git add -A && git commit -m "feat: page contact (Web3Forms + Calendly) + page merci"
```

### Task 4.3 : Collection services + route + 4 fiches

**Files:**
- Modify: `app/src/content.config.ts` (ajouter collection `services`)
- Create: `app/src/pages/services/index.astro`, `app/src/pages/services/[...id].astro`
- Create: `app/src/content/services/{audit-ia,formation-ia,automatisation,outils-ia-sur-mesure}.mdx`

- [ ] **Step 1 : Ajouter la collection services**

Dans `app/src/content.config.ts`, ajouter avant `export const collections` :
```ts
const services = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    tagline: z.string(),
    order: z.number().default(99),
    problem: z.string(),
    deliverables: z.array(z.string()),
    benefits: z.array(z.string()),
    process: z.array(z.object({ step: z.string(), detail: z.string() })),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});
```
Et modifier l'export :
```ts
export const collections = { blog, services };
```

- [ ] **Step 2 : Route service**

Create `app/src/pages/services/[...id].astro` :
```astro
---
import { getCollection, render } from 'astro:content';
import type { GetStaticPaths } from 'astro';
import BaseLayout from '../../layouts/BaseLayout.astro';

export const getStaticPaths = (async () => {
  const services = await getCollection('services');
  return services.map((s) => ({ params: { id: s.id }, props: { service: s } }));
}) satisfies GetStaticPaths;

const { service } = Astro.props;
const { Content } = await render(service);
const d = service.data;
const site = Astro.site!;

const serviceSchema = {
  '@context': 'https://schema.org', '@type': 'Service',
  '@id': new URL(`/services/${service.id}/#service`, site).href,
  name: d.title, description: d.description, serviceType: d.title,
  provider: { '@id': new URL('/#organization', site).href },
  areaServed: { '@type': 'Country', name: 'France' },
  audience: { '@type': 'BusinessAudience', name: 'Organismes de formation' },
};
const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: new URL('/', site).href },
    { '@type': 'ListItem', position: 2, name: 'Services', item: new URL('/services/', site).href },
    { '@type': 'ListItem', position: 3, name: d.title },
  ],
};
const faqSchema = d.faq.length ? {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: d.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
} : null;
const schema = [serviceSchema, breadcrumb, ...(faqSchema ? [faqSchema] : [])];
---
<BaseLayout title={d.title} description={d.description} pageSchema={schema}>
  <section class="mx-auto max-w-3xl px-4 py-16">
    <p class="text-sm font-medium uppercase tracking-wide text-brand-600">Service</p>
    <h1 class="mt-2 font-serif text-4xl font-semibold">{d.title}</h1>
    <p class="mt-3 text-lg text-muted">{d.tagline}</p>

    <h2 class="mt-12 font-serif text-2xl">Le problème</h2>
    <p class="mt-3">{d.problem}</p>

    <h2 class="mt-12 font-serif text-2xl">Ce que nous faisons</h2>
    <ul class="mt-3 space-y-2">{d.deliverables.map((x) => <li class="flex gap-2"><span class="text-brand-500">→</span>{x}</li>)}</ul>

    <h2 class="mt-12 font-serif text-2xl">Bénéfices</h2>
    <ul class="mt-3 space-y-2">{d.benefits.map((x) => <li class="flex gap-2"><span class="text-brand-500">✓</span>{x}</li>)}</ul>

    <h2 class="mt-12 font-serif text-2xl">Comment ça se passe</h2>
    <ol class="mt-3 space-y-4">{d.process.map((p, i) => (
      <li class="flex gap-4"><span class="font-serif text-2xl text-brand-300">{i + 1}</span><div><p class="font-medium">{p.step}</p><p class="text-muted">{p.detail}</p></div></li>
    ))}</ol>

    <div class="prose prose-stone mt-12 max-w-none"><Content /></div>

    {d.faq.length > 0 && (
      <section class="mt-12">
        <h2 class="font-serif text-2xl">Questions fréquentes</h2>
        <dl class="mt-4 space-y-4">{d.faq.map((f) => (
          <div class="rounded-lg border border-sand bg-cream-50 p-4"><dt class="font-medium">{f.q}</dt><dd class="mt-1 text-muted">{f.a}</dd></div>
        ))}</dl>
      </section>
    )}

    <div class="mt-16 rounded-xl bg-brand-50 p-8 text-center">
      <p class="font-serif text-2xl">Prêt à passer à l'action ?</p>
      <a href="/contact/" class="mt-4 inline-block rounded-lg bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600">Demander un audit offert</a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 3 : Index des services**

Create `app/src/pages/services/index.astro` :
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
const services = (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
---
<BaseLayout title="Nos services" description="Audit IA, formation des équipes, automatisation des process et outils sur mesure pour organismes de formation.">
  <section class="mx-auto max-w-5xl px-4 py-16">
    <h1 class="font-serif text-4xl font-semibold">Nos services</h1>
    <p class="mt-2 text-muted">Le partenaire unique pour faire entrer l'IA dans votre organisme de formation.</p>
    <ul class="mt-10 grid gap-6 sm:grid-cols-2">
      {services.map((s) => (
        <li class="rounded-xl border border-sand bg-cream-50 p-6">
          <a href={`/services/${s.id}/`} class="block">
            <h2 class="font-serif text-xl font-medium text-brand-700">{s.data.title}</h2>
            <p class="mt-2 text-muted">{s.data.tagline}</p>
            <span class="mt-4 inline-block text-sm font-medium text-brand-600">En savoir plus →</span>
          </a>
        </li>
      ))}
    </ul>
  </section>
</BaseLayout>
```

- [ ] **Step 4 : Créer les 4 fiches services**

Create `app/src/content/services/audit-ia.mdx` :
```mdx
---
title: "Audit & diagnostic IA"
description: "Nous analysons vos process et identifions où l'IA et l'automatisation feront gagner du temps et de la qualité."
tagline: "Savoir précisément où l'IA peut vous faire gagner du temps."
order: 1
problem: "Vous savez que l'IA peut vous aider, mais vous ne savez pas par où commencer ni où elle aura le plus d'impact dans votre organisme."
deliverables:
  - "Cartographie de vos process pédagogiques et administratifs"
  - "Identification des tâches automatisables à fort ROI"
  - "Feuille de route priorisée (quick wins puis chantiers de fond)"
  - "Estimation du temps et des coûts économisés"
benefits:
  - "Une vision claire avant d'investir"
  - "Des priorités basées sur le ROI réel"
  - "Aucun risque de se disperser"
process:
  - { step: "Entretien de cadrage", detail: "On comprend votre activité, vos outils et vos irritants." }
  - { step: "Analyse des process", detail: "On cartographie et on mesure le temps passé." }
  - { step: "Restitution", detail: "Une feuille de route concrète et chiffrée." }
faq:
  - { q: "Combien de temps dure un audit ?", a: "En général une à deux semaines selon la taille de l'organisme." }
  - { q: "L'audit est-il engageant ?", a: "Non. Vous repartez avec la feuille de route, libre à vous de la mettre en œuvre avec ou sans nous." }
---

L'audit est la meilleure porte d'entrée : il évite d'investir au hasard et
garantit que chaque euro et chaque heure investis dans l'IA produisent un retour mesurable.
```

Create `app/src/content/services/formation-ia.mdx` :
```mdx
---
title: "Formation des équipes à l'IA"
description: "Nous formons vos formateurs et votre équipe administrative à utiliser l'IA au quotidien, concrètement."
tagline: "Rendre vos équipes autonomes et efficaces avec l'IA."
order: 2
problem: "Vos équipes entendent parler de ChatGPT et de Claude, mais ne savent pas comment les utiliser efficacement et en sécurité dans leur métier."
deliverables:
  - "Ateliers pratiques adaptés aux métiers de la formation"
  - "Bibliothèque de prompts prêts à l'emploi"
  - "Bonnes pratiques de confidentialité et de fiabilité"
  - "Accompagnement post-formation"
benefits:
  - "Des équipes autonomes, pas dépendantes d'un prestataire"
  - "Un gain de productivité immédiat sur la création de contenus"
  - "Une montée en compétence durable"
process:
  - { step: "Évaluation des besoins", detail: "On identifie les usages prioritaires par métier." }
  - { step: "Ateliers pratiques", detail: "On forme sur vos cas réels, pas sur des exemples génériques." }
  - { step: "Suivi", detail: "On consolide les acquis et on lève les blocages." }
faq:
  - { q: "Faut-il des prérequis techniques ?", a: "Aucun. Les formations sont conçues pour des profils non techniques." }
  - { q: "Les formations sont-elles finançables ?", a: "Selon votre situation ; nous vous orientons sur les dispositifs adaptés." }
---

Former vos équipes, c'est l'investissement avec le meilleur effet de levier :
le gain se diffuse dans toute l'organisation et se renouvelle chaque jour.
```

Create `app/src/content/services/automatisation.mdx` :
```mdx
---
title: "Automatisation des process"
description: "Nous automatisons vos tâches répétitives : administratif, dossiers Qualiopi, CRM, relances et reporting."
tagline: "Récupérer des heures sur l'administratif et le suivi qualité."
order: 3
problem: "La gestion administrative et le suivi Qualiopi vous prennent un temps considérable, au détriment de votre cœur de métier : la pédagogie."
deliverables:
  - "Automatisation des dossiers et de l'émargement"
  - "Relances automatiques (inscriptions, paiements, évaluations)"
  - "Préparation semi-automatisée des audits Qualiopi"
  - "Tableaux de bord et reporting automatiques"
benefits:
  - "Des heures récupérées chaque semaine"
  - "Moins d'erreurs et d'oublis"
  - "Un suivi qualité serein"
process:
  - { step: "Sélection du flux", detail: "On choisit un process à fort impact pour démarrer." }
  - { step: "Mise en place", detail: "On automatise de bout en bout avec vos outils." }
  - { step: "Industrialisation", detail: "On généralise aux autres flux." }
faq:
  - { q: "Avec quels outils travaillez-vous ?", a: "Make, n8n, Zapier et vos logiciels existants. On s'adapte à votre stack." }
  - { q: "Mes données sont-elles en sécurité ?", a: "Oui. Nous privilégions des solutions conformes RGPD et hébergées dans l'UE quand c'est possible." }
---

L'automatisation transforme le temps perdu en administratif en temps disponible
pour vos stagiaires — sans changer toute votre organisation.
```

Create `app/src/content/services/outils-ia-sur-mesure.mdx` :
```mdx
---
title: "Outils IA sur mesure"
description: "Nous concevons des assistants, chatbots et générateurs de contenus pédagogiques adaptés à votre organisme."
tagline: "Des outils IA pensés pour votre activité, pas génériques."
order: 4
problem: "Les outils du marché ne collent pas exactement à vos besoins, et vous aimeriez un assistant qui connaisse vraiment votre offre et vos contenus."
deliverables:
  - "Chatbots et assistants entraînés sur vos contenus"
  - "Générateurs de supports pédagogiques"
  - "Correcteurs et évaluateurs automatisés"
  - "Intégration dans vos outils existants"
benefits:
  - "Un outil qui parle votre langage métier"
  - "Un avantage concurrentiel difficile à copier"
  - "Une expérience améliorée pour vos stagiaires"
process:
  - { step: "Cadrage du besoin", detail: "On définit l'usage et les données disponibles." }
  - { step: "Prototype", detail: "On livre une première version testable rapidement." }
  - { step: "Déploiement", detail: "On met en production et on forme vos équipes." }
faq:
  - { q: "Combien de temps pour un premier outil ?", a: "Souvent quelques semaines pour un prototype exploitable." }
  - { q: "Qui est propriétaire de l'outil ?", a: "Vous. Les outils et contenus produits vous appartiennent." }
---

Un outil sur mesure, c'est la différence entre subir l'IA et en faire un
véritable atout différenciant pour votre organisme.
```

- [ ] **Step 5 : Vérifier**

Run : `npm run build`
Expected : `/services`, `/services/audit-ia`, `/services/formation-ia`, `/services/automatisation`, `/services/outils-ia-sur-mesure` générés. Chaque fiche contient `Service` + `BreadcrumbList` + `FAQPage` en JSON-LD. Valider une fiche dans validator.schema.org.

- [ ] **Step 6 : Commit**

```bash
git add -A && git commit -m "feat: collection services + 4 fiches (Service/Breadcrumb/FAQ JSON-LD)"
```

### Task 4.4 : Page d'accueil

**Files:**
- Modify: `app/src/pages/index.astro`

- [ ] **Step 1 : Écrire la home**

Remplacer `app/src/pages/index.astro` :
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';

const services = (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
const faq = [
  { q: "Travaillez-vous uniquement avec des organismes de formation ?", a: "Oui, c'est notre spécialité : nous connaissons vos contraintes (Qualiopi, pédagogie, administratif)." },
  { q: "Faut-il être à l'aise avec la technique ?", a: "Non. Nous prenons en charge la complexité technique et formons vos équipes en langage clair." },
  { q: "Comment démarrer ?", a: "Par un audit offert : on identifie ensemble vos opportunités prioritaires." },
];
const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};
---
<BaseLayout
  title="Claude Partners"
  description="Claude Partners aide les organismes de formation à intégrer l'IA et automatiser leurs process pour gagner en efficacité."
  pageSchema={[faqSchema]}
>
  <!-- Hero -->
  <section class="bg-cream-100">
    <div class="mx-auto max-w-4xl px-4 py-24 text-center">
      <h1 class="font-serif text-5xl font-semibold leading-tight">L'IA au service de votre organisme de formation</h1>
      <p class="mx-auto mt-6 max-w-2xl text-lg text-muted">
        Du diagnostic aux outils sur mesure, nous aidons les organismes de formation à intégrer l'IA et à automatiser leurs process — pour gagner du temps et monter en qualité.
      </p>
      <div class="mt-8 flex justify-center gap-4">
        <a href="/contact/" class="rounded-lg bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600">Demander un audit offert</a>
        <a href="/services/" class="rounded-lg border border-sand px-6 py-3 font-medium hover:bg-cream-50">Découvrir nos services</a>
      </div>
    </div>
  </section>

  <!-- Problème -->
  <section class="mx-auto max-w-3xl px-4 py-20 text-center">
    <h2 class="font-serif text-3xl font-semibold">Vos équipes débordées, l'administratif chronophage</h2>
    <p class="mt-4 text-muted">
      Qualiopi, suivi des stagiaires, création de supports : ces tâches grignotent le temps pédagogique.
      L'IA bien intégrée vous rend ces heures — sans bouleverser votre organisation.
    </p>
  </section>

  <!-- Services -->
  <section class="bg-cream-100">
    <div class="mx-auto max-w-5xl px-4 py-20">
      <h2 class="text-center font-serif text-3xl font-semibold">Nos services</h2>
      <ul class="mt-10 grid gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <li class="rounded-xl border border-sand bg-cream-50 p-6">
            <a href={`/services/${s.id}/`} class="block">
              <h3 class="font-serif text-xl font-medium text-brand-700">{s.data.title}</h3>
              <p class="mt-2 text-muted">{s.data.tagline}</p>
              <span class="mt-4 inline-block text-sm font-medium text-brand-600">En savoir plus →</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>

  <!-- Méthode -->
  <section class="mx-auto max-w-5xl px-4 py-20">
    <h2 class="text-center font-serif text-3xl font-semibold">Notre méthode</h2>
    <ol class="mt-10 grid gap-8 sm:grid-cols-3">
      <li><span class="font-serif text-3xl text-brand-300">1</span><p class="mt-2 font-medium">On diagnostique</p><p class="text-muted">On identifie vos opportunités prioritaires.</p></li>
      <li><span class="font-serif text-3xl text-brand-300">2</span><p class="mt-2 font-medium">On met en place</p><p class="text-muted">On forme, on automatise, on outille.</p></li>
      <li><span class="font-serif text-3xl text-brand-300">3</span><p class="mt-2 font-medium">On rend autonome</p><p class="text-muted">Vos équipes gardent la main.</p></li>
    </ol>
  </section>

  <!-- Pourquoi Claude Partners (réassurance / E-E-A-T) -->
  <section class="bg-cream-100">
    <div class="mx-auto max-w-5xl px-4 py-20">
      <h2 class="text-center font-serif text-3xl font-semibold">Pourquoi Claude Partners</h2>
      <ul class="mt-10 grid gap-6 sm:grid-cols-3">
        <li class="rounded-xl border border-sand bg-cream-50 p-6"><p class="font-medium">Spécialistes des organismes de formation</p><p class="mt-2 text-muted">On connaît vos contraintes : Qualiopi, pédagogie, administratif.</p></li>
        <li class="rounded-xl border border-sand bg-cream-50 p-6"><p class="font-medium">Orientés résultats</p><p class="mt-2 text-muted">Des gains de temps concrets et mesurables, pas des promesses.</p></li>
        <li class="rounded-xl border border-sand bg-cream-50 p-6"><p class="font-medium">Vos équipes autonomes</p><p class="mt-2 text-muted">On forme et on outille pour que vous gardiez la main.</p></li>
      </ul>
    </div>
  </section>

  <!-- Témoignages (emplacement — à remplir dès les premiers clients) -->
  {/* TODO témoignages : insérer ici 2-3 verbatims clients (nom, OF, résultat) quand disponibles. Ajouter alors un schema Review/AggregateRating si pertinent. */}

  <!-- FAQ -->
  <section class="bg-cream-100">
    <div class="mx-auto max-w-3xl px-4 py-20">
      <h2 class="text-center font-serif text-3xl font-semibold">Questions fréquentes</h2>
      <dl class="mt-8 space-y-4">{faq.map((f) => (
        <div class="rounded-lg border border-sand bg-cream-50 p-5"><dt class="font-medium">{f.q}</dt><dd class="mt-1 text-muted">{f.a}</dd></div>
      ))}</dl>
    </div>
  </section>

  <!-- CTA final -->
  <section class="mx-auto max-w-3xl px-4 py-20 text-center">
    <h2 class="font-serif text-3xl font-semibold">Faisons entrer l'IA dans votre organisme</h2>
    <a href="/contact/" class="mt-6 inline-block rounded-lg bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600">Demander un audit offert</a>
  </section>
</BaseLayout>
```

- [ ] **Step 2 : Vérifier**

Run : `npm run dev`
Expected : home complète, responsive, palette Direction B cohérente, JSON-LD FAQPage présent dans `dist/index.html` au build.

- [ ] **Step 3 : Commit**

```bash
npm run build
git add -A && git commit -m "feat: page d'accueil (hero, services, méthode, FAQ, CTA)"
```

### Task 4.5 : Page À propos

**Files:**
- Create: `app/src/pages/a-propos.astro`

- [ ] **Step 1 : Écrire la page**

Create `app/src/pages/a-propos.astro` :
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: new URL('/', Astro.site).href },
    { '@type': 'ListItem', position: 2, name: 'À propos' },
  ],
};
---
<BaseLayout title="À propos" description="Claude Partners : le partenaire des organismes de formation pour intégrer l'IA et automatiser leurs process." pageSchema={[breadcrumb]}>
  <section class="mx-auto max-w-2xl px-4 py-16">
    <h1 class="font-serif text-4xl font-semibold">À propos de Claude Partners</h1>
    <div class="prose prose-stone mt-8 max-w-none">
      <p>Claude Partners est né d'un constat simple : les organismes de formation ont tout à gagner de l'IA, mais manquent de temps et d'un partenaire de confiance pour s'y mettre sans se tromper.</p>
      <h2>Notre mission</h2>
      <p>Faire entrer l'IA dans votre organisme de formation, de façon concrète et mesurable — du diagnostic jusqu'aux outils sur mesure.</p>
      <h2>Notre approche</h2>
      <p>Nous privilégions les résultats rapides et l'autonomie de vos équipes. Pas de jargon, pas de dépendance : nous formons et nous outillons pour que vous gardiez la main.</p>
      <h2>Pourquoi nous</h2>
      <p>Nous sommes spécialisés dans le monde de la formation : nous connaissons vos contraintes (Qualiopi, pédagogie, administratif) et nous parlons votre langage.</p>
    </div>
    <div class="mt-12 rounded-xl bg-brand-50 p-8 text-center">
      <p class="font-serif text-2xl">Discutons de votre projet</p>
      <a href="/contact/" class="mt-4 inline-block rounded-lg bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600">Prendre rendez-vous</a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2 : Build + commit**

```bash
npm run build
git add -A && git commit -m "feat: page À propos (E-E-A-T)"
```

---

# PHASE 5 — GEO (llms.txt), pages légales, headers & redirects

### Task 5.1 : Pages légales (RGPD)

**Files:**
- Create: `app/src/pages/mentions-legales.astro`, `app/src/pages/confidentialite.astro`

- [ ] **Step 1 : Mentions légales** (remplacer les champs entre crochets par les vraies infos)

Create `app/src/pages/mentions-legales.astro` :
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Mentions légales" description="Mentions légales du site claudepartners.fr." noindex={true}>
  <section class="mx-auto max-w-2xl px-4 py-16">
    <h1 class="font-serif text-4xl font-semibold">Mentions légales</h1>
    <div class="prose prose-stone mt-8 max-w-none">
      <h2>Éditeur</h2>
      <p>[Raison sociale], [statut juridique] — SIRET [numéro]. Adresse : [adresse]. Email : contact@claudepartners.fr. Directeur de la publication : [nom].</p>
      <h2>Hébergeur</h2>
      <p>Cloudflare, Inc. — 101 Townsend Street, San Francisco, CA 94107, États-Unis.</p>
      <h2>Propriété intellectuelle</h2>
      <p>L'ensemble du contenu de ce site est protégé. Toute reproduction sans autorisation est interdite.</p>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2 : Politique de confidentialité**

Create `app/src/pages/confidentialite.astro` :
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Politique de confidentialité" description="Politique de confidentialité et traitement des données personnelles de claudepartners.fr." noindex={true}>
  <section class="mx-auto max-w-2xl px-4 py-16">
    <h1 class="font-serif text-4xl font-semibold">Politique de confidentialité</h1>
    <div class="prose prose-stone mt-8 max-w-none">
      <h2>Données collectées</h2>
      <p>Via le formulaire de contact : nom, email, nom de l'organisme et message. Ces données servent uniquement à répondre à votre demande.</p>
      <h2>Mesure d'audience</h2>
      <p>Nous utilisons Plausible Analytics, un outil respectueux de la vie privée, sans cookies ni collecte de données personnelles. Aucun bandeau cookies n'est donc nécessaire.</p>
      <h2>Vos droits</h2>
      <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Contact : contact@claudepartners.fr.</p>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 3 : Build + commit**

```bash
npm run build
git add -A && git commit -m "feat: pages mentions légales et confidentialité (RGPD)"
```

### Task 5.2 : llms.txt (GEO)

**Files:**
- Create: `app/src/pages/llms.txt.ts`

- [ ] **Step 1 : Endpoint llms.txt**

Create `app/src/pages/llms.txt.ts` :
```ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://claudepartners.fr';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const services = (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
  const serviceLines = services.map((s) => `- [${s.data.title}](${SITE}/services/${s.id}/): ${s.data.description}`).join('\n');
  const postLines = posts.map((p) => `- [${p.data.title}](${SITE}/blog/${p.id}/): ${p.data.description}`).join('\n');
  const body = `# Claude Partners

> Cabinet de conseil qui aide les organismes de formation (OF) français à intégrer l'IA et automatiser leurs processus. Site en français.

Claude Partners propose audits, formation, automatisation et outils d'IA sur mesure pour les organismes de formation (Qualiopi, gestion administrative, contenus pédagogiques). RDV via Calendly, contact via formulaire.

## Services

${serviceLines}

## Pages principales

- [Accueil](${SITE}/): Présentation de Claude Partners et de son offre pour les OF.
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
```

- [ ] **Step 2 : Vérifier**

Run : `npm run build`
Expected : `dist/llms.txt` présent, contenu Markdown conforme (services + blog listés).

- [ ] **Step 3 : Commit**

```bash
git add -A && git commit -m "feat: endpoint llms.txt (GEO)"
```

### Task 5.3 : Maillage interne & pages de tags (topic clusters SEO)

> Implémente le maillage interne services ↔ articles et les clusters thématiques demandés par la SPEC §6.4/§7 (levier SEO direct).

**Files:**
- Modify: `app/src/content.config.ts` (champ `relatedTags` sur services)
- Modify: les 4 fiches `app/src/content/services/*.mdx` (frontmatter `relatedTags`)
- Modify: `app/src/pages/services/[...id].astro` (bloc « Articles liés »)
- Modify: `app/src/pages/blog/[...id].astro` (tags cliquables)
- Create: `app/src/pages/blog/tags/[tag].astro`

- [ ] **Step 1 : Ajouter `relatedTags` au schéma services**

Dans `app/src/content.config.ts`, dans le `schema` de la collection `services`, ajouter :
```ts
    relatedTags: z.array(z.string()).default([]),
```

- [ ] **Step 2 : Renseigner `relatedTags` dans les 4 fiches**

Ajouter au frontmatter de chaque fiche (valeurs = tags d'articles correspondants) :
- `audit-ia.mdx` : `relatedTags: ["IA", "automatisation"]`
- `formation-ia.mdx` : `relatedTags: ["IA"]`
- `automatisation.mdx` : `relatedTags: ["automatisation", "Qualiopi"]`
- `outils-ia-sur-mesure.mdx` : `relatedTags: ["IA"]`

- [ ] **Step 3 : Bloc « Articles liés » sur les fiches services**

Dans `app/src/pages/services/[...id].astro`, ajouter au frontmatter (après `const { Content } = await render(service);`) :
```astro
import { getCollection } from 'astro:content';
const related = d.relatedTags.length
  ? (await getCollection('blog', ({ data }) => import.meta.env.PROD ? !data.draft : true))
      .filter((p) => p.data.tags.some((t) => d.relatedTags.includes(t)))
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .slice(0, 3)
  : [];
```
> ⚠️ `getCollection` est peut-être déjà importé dans ce fichier (via `import { getCollection, render }`). Ne pas le ré-importer : fusionner l'import.

Puis, juste AVANT le bloc CTA final, insérer :
```astro
    {related.length > 0 && (
      <section class="mt-12">
        <h2 class="font-serif text-2xl">Articles liés</h2>
        <ul class="mt-4 space-y-3">{related.map((p) => (
          <li><a href={`/blog/${p.id}/`} class="text-brand-700 hover:underline">{p.data.title}</a></li>
        ))}</ul>
      </section>
    )}
```

- [ ] **Step 4 : Pages de tags**

Create `app/src/pages/blog/tags/[tag].astro` :
```astro
---
import { getCollection } from 'astro:content';
import type { GetStaticPaths } from 'astro';
import BaseLayout from '../../../layouts/BaseLayout.astro';

export const getStaticPaths = (async () => {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.PROD ? !data.draft : true);
  const tags = [...new Set(posts.flatMap((p) => p.data.tags))];
  return tags.map((tag) => ({
    params: { tag },
    props: {
      tag,
      posts: posts.filter((p) => p.data.tags.includes(tag))
        .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()),
    },
  }));
}) satisfies GetStaticPaths;

const { tag, posts } = Astro.props;
---
<BaseLayout title={`Articles : ${tag}`} description={`Nos articles sur le thème « ${tag} » pour les organismes de formation.`}>
  <section class="mx-auto max-w-3xl px-4 py-16">
    <p class="text-sm font-medium uppercase tracking-wide text-brand-600">Thème</p>
    <h1 class="mt-2 font-serif text-4xl font-semibold">#{tag}</h1>
    <ul class="mt-8 space-y-4">{posts.map((p) => (
      <li><a href={`/blog/${p.id}/`} class="block rounded-lg border border-sand bg-cream-50 p-4 hover:bg-cream-100">
        <span class="font-serif text-lg">{p.data.title}</span>
        <span class="mt-1 block text-sm text-muted">{p.data.description}</span>
      </a></li>
    ))}</ul>
    <a href="/blog/" class="mt-8 inline-block text-sm text-brand-600">← Tous les articles</a>
  </section>
</BaseLayout>
```

- [ ] **Step 5 : Rendre les tags d'article cliquables**

Dans `app/src/pages/blog/[...id].astro`, remplacer le bloc des tags par des liens vers les pages de tags :
```astro
    {tags.length > 0 && (
      <ul class="mt-4 flex flex-wrap gap-2">{tags.map((t) => (
        <li><a href={`/blog/tags/${t}/`} class="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-700 hover:bg-brand-100">#{t}</a></li>
      ))}</ul>
    )}
```

- [ ] **Step 6 : Vérifier + commit**

Run : `npm run build`
Expected : pages `/blog/tags/<tag>/` générées pour chaque tag ; bloc « Articles liés » visible sur les fiches services ayant des `relatedTags` correspondants ; tags d'article cliquables.
```bash
git add -A && git commit -m "feat: maillage interne services<->articles + pages de tags (SEO clusters)"
```

### Task 5.4 : _headers et _redirects Cloudflare

**Files:**
- Create: `app/public/_headers`, `app/public/_redirects`, `app/.node-version`

- [ ] **Step 1 : _headers**

Create `app/public/_headers` (le bloc `/fonts/*` est inutile : l'API Fonts d'Astro émet les polices sous `/_astro/fonts/`, déjà couvert par `/_astro/*`) :
```text
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
/*
  Cache-Control: public, max-age=0, must-revalidate
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
https://:project.pages.dev/*
  X-Robots-Tag: noindex
```

- [ ] **Step 2 : _redirects**

Create `app/public/_redirects` (⚠️ Cloudflare Pages NE supporte PAS les sources par hostname dans `_redirects` — la redirection www→apex se fait via une Redirect Rule, voir Phase 6 Task 6.3) :
```text
# Redirections de CHEMIN relatives uniquement (ex: /ancienne-url /nouvelle-url 301).
# www->apex et *.pages.dev->apex sont gérés par des Cloudflare Redirect Rules (Phase 6, Task 6.3),
# car _redirects ne gère pas les redirections au niveau domaine/hostname.
```

- [ ] **Step 3 : Pin Node version**

Create `app/.node-version` :
```text
22.16.0
```
> Version complète et paire (supportée par Astro). ⚠️ Si Cloudflare détecte `.node-version`, il **ignore** la variable `NODE_VERSION` du dashboard — ce fichier fait foi. Vérifier la version Node réellement utilisée dans les logs de build Cloudflare.

- [ ] **Step 4 : Vérifier**

Run : `npm run build`
Expected : `dist/_headers` et `dist/_redirects` présents à la racine de `dist/`. Les polices sont sous `dist/_astro/fonts/` (couvertes par la règle `/_astro/*`).

- [ ] **Step 5 : Commit**

```bash
git add -A && git commit -m "feat: _headers, _redirects Cloudflare + .node-version"
```

### Task 5.5 : Audit qualité final (local)

- [ ] **Step 1 : Build de production + preview**

Run : `npm run build && npm run preview`

- [ ] **Step 2 : Lighthouse**

Lancer Lighthouse (Chrome DevTools) sur `/`, une fiche service et un article.
Expected : Performance, SEO, Accessibilité, Best Practices ≥ 95. Corriger les écarts (alt manquants, contrastes, tailles d'image).

- [ ] **Step 3 : Vérifier la cohérence canonical ↔ sitemap (trailing slash)**

Sur le build (`dist/`, PAS en dev) : inspecter quelques `dist/**/index.html` et confirmer que `<link rel="canonical">` porte un **slash final** (ex. `https://claudepartners.fr/contact/`), et que la **même** URL (avec slash) figure dans `dist/sitemap-0.xml`. Canonical, `og:url`, JSON-LD et sitemap doivent tous utiliser la forme AVEC slash (cohérent avec `trailingSlash: 'always'`).

- [ ] **Step 4 : Commit (si corrections)**

```bash
git add -A && git commit -m "fix: corrections audit qualité (Lighthouse, a11y, SEO)"
```

---

# PHASE 6 — Déploiement Cloudflare Pages + DNS

> ⚠️ Cette phase comporte des **actions manuelles dans des dashboards externes** (Cloudflare) et une **modification DNS sensible**. La modification des nameservers Hostinger peut être faite via le MCP `hostinger-domains` (outil `updateDomainNameservers`) une fois les NS Cloudflare connus — à ne lancer qu'après validation explicite.
>
> 🛟 **Rollback DNS** : avant tout changement, créer un snapshot de la zone (`hostinger-dns` `getDNSSnapshotList`/`getDNSRecords`). En cas d'échec d'activation ou de coupure email, restaurer via `restoreDNSSnapshot` et remettre les NS `*.dns-parking.com` d'origine.

### Task 6.1 : Pousser le repo + connecter Cloudflare Pages

- [ ] **Step 1 : Créer le dépôt distant et pousser**

Créer un repo GitHub `claudepartners` (privé ou public), puis :
```bash
git remote add origin <url-du-repo>
git push -u origin main
```

- [ ] **Step 2 : Connecter Cloudflare Pages (dashboard)**

Cloudflare → Workers & Pages → Create → Pages → **Connect to Git** → sélectionner le repo.
Build settings (le projet Astro est dans `app/`, donc **Root directory = `app`** ; tous les autres chemins sont relatifs à ce root) :
```
Root directory (advanced): app
Framework preset:          Astro
Build command:             npm run build
Build output directory:    dist            (relatif au root => app/dist)
Production branch:          main
```
> La version de Node est pinnée par `app/.node-version` (= `22.16.0`, Task 5.4) qui **prime** sur toute variable `NODE_VERSION`. Inutile de définir `NODE_VERSION` dans le dashboard. Vérifier dans les logs de build que `dist` est détecté à partir du root `app` et que Node 22.16.0 est utilisé.

- [ ] **Step 3 : Vérifier le déploiement `.pages.dev`**

Expected : le build Cloudflare réussit ; le site est accessible sur `https://claudepartners.pages.dev`.
> ℹ️ Les déploiements **preview** (URLs à hash) sont `noindex` **par défaut** chez Cloudflare. En revanche le sous-domaine de **production** `claudepartners.pages.dev` reste indexable et créerait du contenu dupliqué avec l'apex → il sera redirigé en 301 vers l'apex via une Redirect Rule (Task 6.3).

### Task 6.2 : Délégation DNS Hostinger → Cloudflare

- [ ] **Step 1 : Ajouter le domaine dans Cloudflare**

Cloudflare → **Add a domain** `claudepartners.fr` (plan Free). Laisser Cloudflare scanner les DNS.

- [ ] **Step 2 : Relever et recopier TOUS les enregistrements DNS (surtout l'email)**

AVANT de basculer : relever la zone actuelle chez Hostinger (via hPanel → DNS, ou le MCP `hostinger-dns` `getDNSRecords` + `getDNSSnapshotList` pour un snapshot de secours). Confirmer la présence/absence de **MX, SPF (TXT), DKIM, DMARC** et de tout sous-domaine actif, puis les **recréer à l'identique dans Cloudflare** avant le switch (le scan auto de Cloudflare peut manquer des TXT/DKIM). Sinon l'email casse silencieusement.

- [ ] **Step 3 : Récupérer les 2 nameservers Cloudflare** (`*.ns.cloudflare.com`).

- [ ] **Step 4 : Désactiver DNSSEC chez Hostinger**

hPanel → Domaines → claudepartners.fr → DNSSEC : désactiver. (Obligatoire avant changement de NS.)

- [ ] **Step 5 : Changer les nameservers chez Hostinger**

Option A (manuel) : hPanel → Domaines → Nameservers → remplacer `*.dns-parking.com` par les 2 NS Cloudflare.
Option B (via MCP, après validation) : `hostinger-domains` → `updateDomainNameservers` avec les 2 NS Cloudflare.
Expected : propagation < 1 h à 24 h ; Cloudflare affiche le domaine « Active ».

- [ ] **Step 6 : Brancher le domaine custom sur Pages**

Projet Pages → **Custom domains → Set up a domain** → ajouter `claudepartners.fr` PUIS `www.claudepartners.fr`. Cloudflare crée automatiquement les CNAME (apex via CNAME flattening + www), proxied.
> Ne PAS créer le CNAME manuellement avant « Set up a domain » (erreur 522).

- [ ] **Step 7 : Vérifications HTTPS de base**

Expected : `https://claudepartners.fr` répond en HTTPS (certificat actif) ; `https://claudepartners.fr/sitemap-index.xml`, `/robots.txt`, `/llms.txt` accessibles. (La canonicalisation www→apex est mise en place en Task 6.3.)

### Task 6.3 : Redirect Rules (canonicalisation www→apex et *.pages.dev→apex)

> `_redirects` ne gère PAS les redirections au niveau domaine sur Cloudflare Pages → on utilise les **Redirect Rules** de la zone. Indispensable pour le SEO (éviter le contenu dupliqué).

- [ ] **Step 1 : Règle www → apex**

Cloudflare → zone `claudepartners.fr` → Rules → **Redirect Rules** → Create :
- When incoming requests match : `Hostname equals www.claudepartners.fr`
- Then : Static redirect → `https://claudepartners.fr` + **Preserve path/query** → Status **301**.
> Prérequis : un enregistrement DNS `www` (proxied) doit exister — créé par « Set up a domain » (Task 6.2 Step 6) ou ajouté manuellement (CNAME `www` → `claudepartners.pages.dev`, proxied).

- [ ] **Step 2 : Règle *.pages.dev (production) → apex**

Redirect Rule :
- When : `Hostname equals claudepartners.pages.dev`
- Then : Static redirect → `https://claudepartners.fr` + preserve path/query → **301**.

- [ ] **Step 3 : Porte de vérification HTTP réelle (`curl -I`)**

Run :
```bash
curl -sI https://claudepartners.fr/ | findstr /I "HTTP location"
curl -sI https://claudepartners.fr/contact | findstr /I "HTTP location"
curl -sI https://www.claudepartners.fr/ | findstr /I "HTTP location"
curl -sI https://claudepartners.pages.dev/ | findstr /I "HTTP location"
```
Expected :
- `/` → **200**.
- `/contact` (sans slash) → **308** vers `/contact/` (forme canonique), et `/contact/` → **200**.
- `www…` → **301** vers `https://claudepartners.fr/…`.
- `claudepartners.pages.dev` → **301** vers l'apex.
> Confirme que la forme canonique (avec slash) répond 200 et que toutes les variantes redirigent vers l'apex — cohérent avec `trailingSlash: 'always'` et les canonical.

### Task 6.4 : Référencement initial (Google Search Console)

> Le MCP `gscServer` est disponible pour ces étapes.

- [ ] **Step 1 : Ajouter la propriété**

Ajouter `https://claudepartners.fr` dans Google Search Console (vérification via DNS TXT — facile maintenant que la zone est chez Cloudflare).

- [ ] **Step 2 : Soumettre le sitemap**

Soumettre `https://claudepartners.fr/sitemap-index.xml`.

- [ ] **Step 3 : Demander l'indexation**

Inspecter et demander l'indexation de l'accueil et des pages services.

- [ ] **Step 4 : Commit final (config/notes éventuelles)**

```bash
git add -A && git commit -m "chore: mise en ligne claudepartners.fr (Cloudflare Pages + DNS + GSC)"
git push
```

---

## Suivi des prérequis (à compléter avant/pendant le déploiement)

- [ ] Web3Forms `access_key` réelle injectée dans `ContactForm.astro`
- [ ] Compte Plausible créé + site ajouté + goals (`Contact Form Submit`)
- [ ] URL Calendly réelle injectée dans `CalendlyInline.astro`
- [ ] Logo + image OG + favicon définitifs (remplacer placeholders)
- [ ] Infos légales réelles (mentions légales)
- [ ] URL LinkedIn réelle → décommenter/ajouter au `sameAs` du JSON-LD (sinon laisser sans `sameAs`)

---

## Évolutions futures (hors périmètre v1)

Espace client/ressources (Supabase), démo IA interactive, études de cas détaillées, proxy Plausible anti-adblock (Cloudflare Worker), flux RSS (`@astrojs/rss` déjà installé — endpoint `rss.xml.ts` à ajouter).
