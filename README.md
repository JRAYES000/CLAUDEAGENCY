# Claude Agency

Site vitrine + blog SEO de **Claude Agency**, cabinet de conseil qui aide les **organismes de formation (OF) français** à intégrer l'IA et automatiser leurs process — pour gagner du temps et monter en qualité, sans perdre la main.

🌐 Production : **https://claudeagency.fr**

> ℹ️ `claudepartners.fr` était l'ancien nom de domaine — le site est désormais sur **claudeagency.fr**.

> Le design **est** le produit : ce dépôt sert l'acquisition (SEO) et la conversion (audit offert / prise de rendez-vous), pas une application métier.

## Ce que fait le site

- Présente l'offre — 4 services : audit & diagnostic IA, formation des équipes, automatisation des process, outils IA sur mesure.
- Publie un **blog SEO** (acquisition organique, objectif prioritaire).
- Convertit le visiteur en contact / RDV (audit offert).
- Héberge le **Baromètre IA des organismes de formation** (questionnaire + landing).

Cible : dirigeants et responsables pédagogiques/administratifs d'OF, souvent certifiés Qualiopi, majoritairement non techniques. Ton chaleureux, concret, orienté ROI, en français, sans jargon IA. Voir `PRODUCT.md`.

## Stack technique

- **[Astro](https://astro.build) 6** en sortie statique (`output: 'static'`)
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- Contenu en **MDX** (`@astrojs/mdx`), avec sitemap (`@astrojs/sitemap`), flux RSS (`@astrojs/rss`) et temps de lecture (`reading-time`)
- Polices : Bricolage Grotesque (titres) + Schibsted Grotesk (corps)
- **Node ≥ 22.12** (`.node-version` : 22.16.0)
- Déploiement : **Cloudflare Pages** (`functions/api/` pour les endpoints, ex. `subscribe.js`)

## Structure du dépôt

```text
claudeagency/
├── app/                     # Le site Astro (code + contenu)
│   ├── src/
│   │   ├── pages/           # Routes (accueil, blog, services, ressources, baromètre)
│   │   ├── content/         # Collections : blog/ et services/ (MDX)
│   │   ├── components/       layouts/  data/  assets/  styles/
│   ├── functions/api/       # Endpoints Cloudflare Pages (ex. subscribe.js)
│   ├── scripts/             # Outils (ex. génération du PDF lead magnet)
│   ├── public/              # Assets statiques
│   └── astro.config.mjs     # site, sitemap, polices, intégrations
├── docs/                    # Documentation (seo/, superpowers/)
├── CLAUDE.md                # Guide pour l'agent IA (routage modèles, garde-fous)
├── PRODUCT.md               # Produit, cible, marque & ton de voix
├── DESIGN.md                # Fondations visuelles (typo, couleurs, esthétique)
├── SEO-STRATEGY.md          # Pilotage SEO
├── NETLINKING.md            # Stratégie d'autorité / backlinks
└── BAROMETRE-IA-OF.md       # Spéc. du Baromètre IA des OF
```

## Démarrage

Toutes les commandes se lancent depuis le dossier `app/` :

```sh
cd app
npm install        # installe les dépendances
npm run dev        # serveur local sur http://localhost:4321
npm run build      # build de production dans ./dist/
npm run preview    # prévisualise le build localement
```

> ✅ Toujours vérifier le build (`cd app && npm run build`) avant de committer du contenu ou du code.

## Contenu

- **Articles de blog** : `app/src/content/blog/` (MDX, avec frontmatter).
- **Services** : `app/src/content/services/`.
- Le SEO se gagne par la **précision**, pas le volume : éviter le contenu « vide ». Voir `SEO-STRATEGY.md`.

## Documentation projet

| Fichier | Contenu |
| :------ | :------ |
| `CLAUDE.md` | Guide agent : routage des modèles, discipline de travail, garde-fous |
| `PRODUCT.md` | Raison d'être, utilisateurs, marque, ton, principes stratégiques |
| `DESIGN.md` | Univers visuel (crème / terracotta / encre, serif éditorial) |
| `SEO-STRATEGY.md` | Stratégie et pilotage SEO |
| `NETLINKING.md` | Autorité et acquisition de liens |
| `BAROMETRE-IA-OF.md` | Spécification du Baromètre IA |

## Licence

Projet privé — © Claude Agency. Tous droits réservés.
