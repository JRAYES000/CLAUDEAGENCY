# Claude Partners — DESIGN

> Direction « B » : chaleureux & éditorial (univers Claude/Anthropic). Source de vérité du thème : `app/src/styles/global.css` (`@theme` Tailwind v4). Les valeurs ci-dessous reflètent le code en place ; pour toute NOUVELLE couleur, travailler en **OKLCH** et garder les neutres **teintés chaud** (jamais `#000`/`#fff`).

## Color strategy
**Committed (audacieux)** : base crème + **terracotta porteur de surfaces** — au moins un **bandeau terracotta plein** (hero ou CTA section) où l'accent occupe le fond, pas seulement les boutons. Neutres tous teintés vers le hue chaud (jamais de gris neutre, jamais `#000`/`#fff`). Sur fond terracotta foncé (`brand-700/800`), texte `cream-50`.

### Neutres (teintés chaud)
| Rôle | Token | Hex |
|---|---|---|
| Fond clair (page) | `cream-50` | `#FBF7F1` |
| Surface / sections alt. | `cream-100` | `#F5EFE6` |
| Bordures / séparateurs | `sand` | `#E5D9C7` |
| Texte principal | `ink` | `#2B2724` |
| Texte secondaire | `muted` | `#7A6E60` |

### Accent — terracotta (clay), rampe `brand-*`
`50 #FAF0EB · 100 #F5E0D6 · 200 #EBC0AD · 300 #E0A084 · 400 #D88B68 · 500 #CC785C · 600 #B5634A · 700 #934E3A · 800 #6E3B2C · 900 #4A271D`
- **CTA / boutons** : `bg-brand-500` → hover `bg-brand-600`, texte blanc.
- **Accents de titre / liens** : `text-brand-700`. Liens hover : `text-brand-600` ou soulignement.
- **Tags / pills** : `bg-brand-50` + `text-brand-700`.

## Typography — Pairing B (distinctif, hors « reflex-reject »)
- **Titres / display** : **Bricolage Grotesque** (grotesque display, caractériel), via `font-display` (et alias `font-serif`). Poids 700–800 pour les gros titres.
- **Corps** : **Schibsted Grotesk** (sans humaniste moderne), via `font-sans`. Poids 400 ; emphase 500/700.
- Polices **auto-hébergées** (API Fonts Astro, `font-display: swap`, preload). Pas de CDN Google. (Anciennes Fraunces/Inter retirées : c'étaient les défauts IA.)
- **Audace typographique** : héros en très grand display (`clamp` ~ `text-6xl`→`text-7xl`), `tracking-tight` (`letter-spacing:-0.02em`), `text-wrap: balance` sur tous les titres. Contraste d'échelle ≥ 1.25.
- Largeur de lecture : 65–75ch (`max-w-2xl`/`prose` sur le blog).

## Layout & spacing
- Conteneurs : `max-w-5xl` (sections larges), `max-w-3xl` (texte/CTA), `max-w-2xl` (article/blog). Padding latéral `px-4`.
- Rythme vertical : sections en `py-16` à `py-24` (héros). **Varier** l'espacement pour le rythme (éviter le même padding partout).
- Alternance de fonds `cream-50` / `cream-100` pour séquencer les sections.
- Coins : cartes `rounded-xl`, boutons/inputs `rounded-lg`.

## Components
- **Boutons** : `rounded-lg px-5/6 py-2.5/3 font-medium`, primaire `bg-brand-500` (hover `600`), secondaire `border border-sand` (hover `bg-cream-50`).
- **Cartes** : `bg-cream-50` + `border border-sand` + `rounded-xl` + `p-6`. **Ne jamais imbriquer** de cartes ; ne pas tout encarter par réflexe.
- **Formulaire** : inputs `border border-sand bg-white rounded-lg px-3 py-2` ; focus → **ajouter `focus-visible:ring-2 ring-brand-500`** (le `focus:outline-none` seul est à proscrire).

## Motion
- Actuellement quasi nul. À introduire **avec sobriété** : `transform`/`opacity` uniquement, easing **ease-out** (quart/quint/expo), pas de bounce. Respecter `prefers-reduced-motion`.

## Accessibility / quality (cf. audit Web Interface Guidelines)
- Skip link vers `#main` ; `:focus-visible` visible sur tous les interactifs ; glyphes décoratifs (`→`, `✓`) en `aria-hidden`.
- `theme-color` = `#FBF7F1` ; `preconnect` vers `plausible.io` (+ `assets.calendly.com` sur /contact).
- Light theme uniquement (pas de dark mode prévu en v1) : scène = lecture diurne, ton chaleureux et rassurant.

## Absolute bans (rappel impeccable)
Pas de bordures latérales colorées, pas de texte en dégradé, pas de glassmorphism par défaut, pas de hero-metric SaaS, pas de grilles de cartes identiques à l'infini, pas d'em dash (`—` interdit dans la copy ; utiliser virgules/parenthèses/deux-points).
