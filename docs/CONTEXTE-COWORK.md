# Contexte projet — export de la mémoire Cowork

> Fiche reprise de la mémoire persistante du projet **CLAUDE AGENCY** dans Claude Cowork
> (export du 29/07/2026). À lire avant toute intervention sur l'infra, le déploiement ou
> le SEO de claudeagency.fr. Voir aussi `CLAUDE.md` (règles de travail).

---

## 1. Infrastructure et déploiement

**Site** : https://claudeagency.fr — Astro 6 statique, code dans `app/`.
**Hébergement** : **Cloudflare Pages**, projet `claudepartners` (`claudepartners.pages.dev`).
**Déploiement** = `git push` sur `main` → build automatique Cloudflare Pages.
*(Le site n'est ni sur Netlify ni sur Vercel — toute doc qui le prétend est obsolète.)*

**DNS** : gérés chez **Cloudflare** (NS `rosalyn`/`zahir.ns.cloudflare.com`), pas chez Hostinger.
CNAME `@` et `www` → `claudepartners.pages.dev`, proxifiés.

**E-mail** : mailbox chez **Hostinger** (MX `mx1`/`mx2.hostinger.com`) + **Mailjet** pour l'envoi.
- SPF **fusionné, un seul enregistrement** : `v=spf1 include:_spf.mail.hostinger.com include:spf.mailjet.com ~all`
  → ne jamais créer un deuxième enregistrement SPF.
- DKIM : `hostingermail-a/b/c._domainkey` (CNAME, **DNS-only obligatoire**) + `mailjet._domainkey`.
- Tout enregistrement e-mail Hostinger doit être ajouté **à la main** dans Cloudflare : le bouton
  « Connect automatically » de Hostinger ne fonctionne pas.

**Accès API Cloudflare** : jeton permanent stocké dans
`C:\Users\julien\Claude\Projects\CLAUDE PARTNERS\.secrets\cloudflare.env`
(`CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, zone IDs des 6 domaines). Ne jamais le redemander à Julien.
Particularités : jeton *account-owned* (préfixe `cfat_`) → `GET /user/tokens/verify` renvoie
« Invalid API Token », c'est normal ; tester avec `GET /zones`. Portée : `Pages Write` sur le compte
+ droits DNS sur la zone claudepartners.fr **uniquement** — il ne peut pas modifier la zone claudeagency.fr.

**claudepartners.fr** (ancien nom de domaine) : depuis le 25/07/2026, site **autonome**, projet Pages
dédié `claudepartners-fr`, page d'attente en noindex. La redirection 301 vers claudeagency.fr a été
supprimée. Ne pas rebrancher ces hostnames sur le projet Pages `claudepartners` (duplicate content).

---

## 2. Règles de publication

- **Publier sans demander validation** : une fois le travail fait et le build vérifié, commit + push
  sur `main` directement. Julien l'a demandé explicitement (15/06/2026) et ne veut pas valider chaque
  déploiement. Signaler après coup ce qui a été publié, **avec les URLs complètes et cliquables**.
- **Toujours vérifier le build avant de committer** : `cd app && npm run build`.
- Identité des commits : `Julien Rayes <jrayes000@gmail.com>`.
- **Copies locales sales** : il existe d'autres clones du dépôt sur le PC
  (`C:\Users\julien\CLAUDEPARTNERS`, et une copie dans le dossier Cowork `CLAUDE PARTNERS\claudepartners`)
  souvent en retard sur `origin/main` et pollués par du bruit CRLF/LF sur une centaine de fichiers.
  **Le clone de référence pour Claude Code est `C:\Users\julien\Claude\Projects\CLAUDEAGENCY`.**
  Pour une correction ponctuelle sans toucher aux copies sales :
  `git fetch` → `git worktree add --detach <tmp> origin/main` → éditer → commit →
  `git push origin HEAD:main` → `git worktree remove`.

**Incident à ne pas reproduire (03/07/2026)** : 62 commits « seo: add internal links to <slug> » d'un
collaborateur avaient **remplacé le contenu complet** de chaque article de blog par la seule section
« Pour aller plus loin », et cassé le build Astro (schéma zod : titres > 70 caractères, descriptions
> 160, images manquantes, `category` invalide). Plus aucun déploiement ne passait.
→ **Se méfier des scripts de maillage interne qui réécrivent les fichiers**, et vérifier l'état réel de
`main` **et** du site en ligne (build + URLs en 200) avant de considérer un livrable comme fait.

---

## 3. Analytics, SEO et mesure

- **Pas de Plausible** (payant, entièrement retiré du site). Le site charge **GA4 `G-6SG03DR5J9`**
  + **Google Ads `AW-18240137840`** via un unique `gtag.js` dans `BaseLayout.astro`.
  Restes inoffensifs dans le code : un `preconnect` plausible.io et des appels `if (window.plausible)` morts.
- **Point ouvert** : GA4 + Ads posent des cookies → une **bannière de consentement RGPD/CNIL**
  reste à mettre en place.
- **Search Console** : propriété **préfixe d'URL** `https://claudeagency.fr/`, propriétaire
  jrayes000@gmail.com, validée automatiquement **via le tag GA4** → ne pas retirer le gtag du site,
  sous peine de perdre la validation. Sitemap : `/sitemap-index.xml`. Pas de propriété « domaine ».
  Second propriétaire déclaré : alainnirinaalbert@gmail.com.
- **Accès agent à la Search Console** : via **Composio** (`COMPOSIO_SEARCH_TOOLS` puis
  `COMPOSIO_MULTI_EXECUTE_TOOL`, outils `GOOGLE_SEARCH_CONSOLE_*`). Il n'y a **pas** de MCP Search
  Console dédié. La connexion Composio est authentifiée en **ecolenaturo@gmail.com**, pas en
  jrayes000@gmail.com — ce compte a été ajouté en « accès total » sur la propriété le 04/08/2026
  (`siteFullUser`). Le retirer des utilisateurs coupe toute lecture GSC par l'agent.
- **Audit GSC du 15/07/2026** (données 23/06–13/07) — baseline : 17 clics, 408 impressions, CTR 4,2 %,
  position moyenne 19,3 ; 65 pages indexées / 39 non indexées (dont 21 tags en noindex, volontaire).
  Priorités identifiées, dans l'ordre :
  1. `/services/seo/` — 142 impressions, 0 clic, pos. 18,3 → retravailler title/H1 + maillage.
  2. 6 pages business non indexées : `/a-propos/`, `/blog/`, `/services/audit-ia/`,
     `/services/automatisation/`, `/services/outils-ia-sur-mesure/`, `/services/sea/`.
  3. `/blog/feuille-emargement/` — pos. 9,8, 26 impressions, 0 clic → réécrire title/meta.
  4. 7 pages en *striking distance* (accueil en tête, pos. 11,3).
  5. Requêtes sans page dédiée : « formation autofinancée pole emploi », « crm organisme de formation ».
  → Le plan d'action vivant est dans le dossier Cowork `CLAUDE PARTNERS\plan-actions-seo-claudeagency.md`.
  **Le mettre à jour à chaque action SEO réalisée** plutôt que de relancer un audit complet
  (prochain audit conseillé vers le 15/08/2026).

---

## 4. Pages et projets en cours

- **`/semaine-offerte/`** (publiée le 28/07/2026) : page de vente satirique réservée aux amis
  entrepreneurs, **noindex/nofollow et exclue du sitemap** (filtre dans `app/astro.config.mjs`).
  Page **autonome** : son propre `<html>` et son CSS inline, **sans BaseLayout ni Header/Footer**
  → une modification du thème global ne s'y répercute pas ; le gtag y est recopié à la main.
  Les 4 CTA pointent vers `https://reporting.claudeagency.fr/client?nouveau=1` (constante `CTA_URL`).
  Offre : 4 places, close le **30/09/2026** → après cette date, dépublier ou mettre à jour.
  Une version fond noir a été publiée puis abandonnée le 28/07 (illisible) — ne pas y revenir.
- **Baromètre IA des OF** : voir `BAROMETRE-IA-OF.md`.
- **Fiche Google Business** Claude Agency créée le 15/07/2026 (zone de service FR/BE/CH/LU) —
  en attente d'une adresse postale de validation et d'un téléphone.
- **Dépôt des livrables collaborateurs** (séparé) : `github.com/JRAYES000/livrables-Claude-Agency` (privé).

---

## 5. Cible et positionnement

Organismes de formation francophones (France, Belgique, Suisse, Luxembourg) et surtout leurs
**décideurs** : dirigeants et responsables d'organismes de formation, souvent certifiés Qualiopi,
majoritairement non techniques. Ton chaleureux, concret, orienté ROI, en français, sans jargon IA.
Détail dans `PRODUCT.md`, univers visuel dans `DESIGN.md`
(crème `#FBF7F1`, terracotta `#CC785C`, encre `#2B2724`).

---

## 6. Pièges techniques connus (poste Windows)

- Un script PowerShell « n'est pas reconnu » = presque toujours le mauvais dossier courant.
  Toujours préfixer d'un `cd "<dossier>"` ou utiliser le chemin complet.
- `git apply` échoue régulièrement sur ce poste à cause des fins de ligne CRLF — préférer une
  édition directe de fichier à l'application d'un patch.
- Les chemins absolus sont obligatoires en PowerShell/.NET dans les scripts du projet.