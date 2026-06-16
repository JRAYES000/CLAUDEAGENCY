# Performance — LCP mobile de la page d'accueil

Audit PageSpeed du 2026-06-16. Desktop excellent (LCP 1,1 s, CLS 0).
Mobile à corriger : **LCP 4,2 s** (cible < 2,5 s), FCP 1,9 s, Speed Index 3,0 s, CLS 0, TBT 19 ms.
Opportunités chiffrées mobile : « Redirects » −630 ms ; « Unused JavaScript » −300 ms / 54 ko.

## Élément LCP identifié

L'image **hero** de la page d'accueil : `app/src/assets/hero-pilotage-ia.jpg`
(rendue par le composant `<Image>` d'Astro en WebP responsive, variantes 480/800/1200/1600w).
C'est le plus grand élément above-the-fold ; le bloc texte se peint plus tôt mais l'image
domine la surface visible sur mobile.

## Corrections appliquées (in-code)

### 1. Suppression de l'animation d'entrée sur l'élément LCP — `app/src/pages/index.astro`
Le conteneur de l'image hero portait la classe `cp-rise-2`, qui anime l'élément
de `opacity: 0` vers `opacity: 1` (durée 0,7 s + délai 0,08 s, `fill: both`).
Un élément LCP qui apparaît en fondu **retarde l'horodatage LCP** : le navigateur ne
considère l'élément peint qu'une fois suffisamment opaque. Sur mobile (CPU bridé),
ce délai pénalise directement le LCP.
→ Classe `cp-rise-2` retirée du conteneur de l'image. L'animation `cp-rise` du bloc
texte est conservée (ce n'est pas l'élément LCP). Aucun impact visuel sur desktop.

### 2. Préchargement responsive de l'image LCP — `app/src/pages/index.astro` + `app/src/layouts/BaseLayout.astro`
Le composant `<Image>` d'Astro n'émet pas de `<link rel="preload">` : l'image n'est
découverte qu'après l'analyse du HTML et du CSS. Ajout d'un préchargement responsive :

- `getImage()` génère les **mêmes variantes** (widths 480/800/1200/1600, format WebP,
  `sizes` identique) que le `<Image>` du hero. Le `imagesrcset` du preload est donc
  strictement égal au `srcset` de la balise `<img>` → le navigateur réutilise la
  ressource préchargée, **pas de double téléchargement**.
- Le `<link rel="preload" as="image" ... fetchpriority="high">` est injecté dans le
  `<head>` via un nouveau slot nommé `head` ajouté à `BaseLayout.astro` (mécanisme
  générique, réutilisable par d'autres pages).

Vérifié au build : le `imagesrcset` du preload == le `srcset` de l'`<img>` hero
(mêmes fichiers hashés). `imagesizes="(min-width: 768px) 42vw, 100vw"`.

### 3. Hero déjà correct (vérifié, rien à changer)
- `loading="eager"` (pas de lazy), `fetchpriority="high"`.
- `width=1600` / `height=908` explicites dans le HTML rendu → CLS 0 préservé.
- `srcset` responsive WebP ; variante mobile 480w = **15 ko** seulement (déjà très légère).

### 4. Chaîne de redirections internes — vérifiée, propre
Tous les liens internes portent le slash final (cohérent avec `trailingSlash: 'always'`
+ `build.format: 'directory'`), donc **aucun 308 interne inutile** côté code :
- `Header.astro`, `Footer.astro` : tous les `href` se terminent par `/`.
- Liens dynamiques (`/services/${id}/`, `/blog/${id}/`, `/blog/tags/${tag}/`) : slash final présent.
- `BaseHead.astro` : `canonical` et `og:url` normalisés pour toujours finir par `/`.
- Sitemap (`@astrojs/sitemap`) : URLs en format directory (slash final).
- Seuls `href="/"` (racine, déjà canonique) et le fragment `/a-propos/#julien-rayes`
  apparaissent sans slash terminal « visible » — normaux, aucun redirect.

→ L'opportunité « Redirects −630 ms » ne vient donc **pas** des liens internes mais de
la redirection d'entrée http→https / www→apex / *.pages.dev→apex (niveau zone Cloudflare).
Voir « Actions Cloudflare restantes » ci-dessous.

### 5. JavaScript inutilisé (54 ko) — origine identifiée
Le site est 100 % statique : `dist/_astro/` ne contient **aucun bundle JS first-party**.
Les seuls scripts externes chargés sur la home sont :
- **Plausible** (`plausible.io/js/script.js`) — déjà `defer`, ~1 ko, négligeable.
- **Google Ads gtag.js** (`googletagmanager.com/gtag/js?id=AW-18240137840`) — déjà `async`,
  mais ~54 ko dont l'essentiel est inutilisé sur un site vitrine. **C'est la source des
  54 ko « Unused JavaScript ».**

Aucune optimisation in-code sûre n'a été appliquée ici : gtag.js est un pixel de
**conversion Google Ads** (business-critique). Le retirer ou le différer agressivement
(injection après interaction / `load`) risque de fausser l'attribution des conversions.
Cette décision relève du propriétaire. Options possibles (à arbitrer hors code) :
- Conserver `async` (état actuel) — déjà non bloquant pour le rendu/LCP.
- Charger gtag.js **après l'événement `load`** ou au premier scroll/interaction
  (gain ~300 ms sur le thread principal, risque de perte d'attribution early-bounce).
- Envisager le « consent mode » / un chargement conditionnel selon la page (ne pas
  charger gtag sur les pages sans intention de conversion).

## Actions Cloudflare dashboard restantes (NON faisables en code)

Ces points expliquent l'essentiel du « Redirects −630 ms » et ne se règlent qu'au
niveau de la zone Cloudflare (pas dans le dépôt) :

### A. HSTS preload (supprime le hop http→https)
Un accès initial en `http://` provoque une redirection 301/308 vers `https://`
(= 1 aller-retour réseau coûteux sur mobile). Pour l'éliminer :
1. Cloudflare → domaine `claudepartners.fr` → **SSL/TLS → Edge Certificates**.
2. Activer **Always Use HTTPS** (si pas déjà fait).
3. Activer **HSTS (HTTP Strict Transport Security)** :
   - Max-Age : 12 mois (`31536000`).
   - **Include subdomains** : activé.
   - **Preload** : activé.
4. Soumettre le domaine sur https://hstspreload.org/ (le header doit contenir
   `preload` + `includeSubDomains` + `max-age>=31536000`).
   → Une fois le domaine dans la liste preload des navigateurs, le hop http→https
   disparaît côté client (le navigateur force https sans requête réseau).

### B. Redirect Rules www→apex et *.pages.dev→apex (un seul hop, en 301)
Le fichier `_redirects` d'Astro ne gère **que** les chemins, pas les redirections de
hostname. Les redirections de domaine doivent être des **Redirect Rules** de zone :
1. Cloudflare → `claudepartners.fr` → **Rules → Redirect Rules**.
2. Règle 1 — **www → apex** :
   - Si `hostname` égale `www.claudepartners.fr`
   - Rediriger (statique) vers `https://claudepartners.fr` + chemin/query préservés,
     code **301**, *Preserve query string* activé.
3. Règle 2 — **pages.dev → apex** (évite l'indexation du domaine de preview) :
   - Si `hostname` se termine par `.pages.dev`
   - Rediriger vers `https://claudepartners.fr` + chemin, code **301**.
   - (Le `_headers` envoie déjà `X-Robots-Tag: noindex` sur `*.pages.dev`.)
   Objectif : garantir qu'on n'enchaîne jamais plus d'**un seul** 301, directement
   vers l'URL canonique finale (apex + https + slash final).

### C. Vérifier l'absence de chaîne (audit)
Après A et B, tester avec `curl -sIL http://www.claudepartners.fr/` : on doit voir
**au plus un** 301 menant directement à `https://claudepartners.fr/` (avec slash final),
puis un 200. Toute chaîne > 1 hop = à corriger dans les Redirect Rules.

## Résultat build
`npm run build` : **0 erreur**, 50 pages générées. Preload émis et cohérent avec le
`srcset` de l'image hero (mêmes fichiers hashés, donc pas de double téléchargement).
