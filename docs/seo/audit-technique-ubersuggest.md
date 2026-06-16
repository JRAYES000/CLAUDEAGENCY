# Audit technique du site — Ubersuggest

- **Domaine audité** : `claudepartners.fr`
- **Outil** : Ubersuggest Site Audit (compte tier1, `ecolenaturo@gmail.com`)
- **Date du crawl** : 2026-06-15 03:21 UTC (`last_crawled`), rapport servi depuis le cache au moment de l'audit (`done: true`)
- **Statut du crawl** : terminé (`extended_status: no_errors`)
- **Task ID** : `06150619-1221-0216-0000-d30c52cc508d`

## Score global

| Indicateur | Valeur |
|---|---|
| **Score de santé global** | **76 / 100** |
| Pages crawlées | 37 |
| Pages réussies (200) | 34 |
| Pages cassées (4xx) | 1 |
| Pages bloquées (noindex) | 2 |
| Redirections | 0 |
| Total des problèmes signalés | 36 |

## Synthèse par catégorie

| Catégorie | Nb de problèmes (types actifs) | Détail |
|---|---|---|
| **Erreurs** (impact SEO élevé) | 12 / page concernées | Surtout `content_count_words` (10 pages) — la plupart des autres erreurs ont un compte de 0 |
| **Avertissements** (impact moyen) | 24 | Titres trop longs (13), titres trop courts (4), URL non « SEO-friendly » (5), 1 lien cassé, 1 réponse 4xx |
| **Recommandations** (impact faible) | 0 | Aucune active |

> Remarque : beaucoup d'`id` listés par Ubersuggest ont un `count: 0` (ex. `have_title_duplicates`, `duplicate_meta_descriptions`, `absent_h1_tags`, `title_empty`, `have_sitemap`, `ssl_certificate_valid`, `time_load_high`). Ce sont des contrôles **passés** : aucun titre dupliqué, aucune description dupliquée, aucun H1 manquant, sitemap présent, SSL valide, etc. Cela confirme la solidité technique de base du site.

## Tableau priorisé des problèmes RÉELS et nouveaux

Les problèmes sont triés par priorité de correction (impact SEO réel × facilité × pertinence pour ce site).

| # | Problème | Gravité | Pages concernées | Correctif recommandé |
|---|---|---|---|---|
| 1 | **Lien cassé 404 vers `/cdn-cgi/l/email-protection`** (`have_broken_links_anchor` + `response_code_4xx`) | Moyenne (UX + 404 crawlé) | `/contact/` (lien) → cible `https://claudepartners.fr/cdn-cgi/l/email-protection` (404) | L'obfuscation d'e-mail de Cloudflare réécrit le `mailto:` malgré le marqueur `<!--email_off-->...<!--/email_off-->` présent dans `app/src/pages/contact.astro`. **Désactiver « Email Address Obfuscation »** dans Cloudflare (Scrape Shield) pour le domaine, OU vérifier que le marqueur off entoure bien la totalité du lien. Tant que l'obfuscation est active, elle génère un lien `/cdn-cgi/l/email-protection` qui renvoie 404 au crawl. |
| 2 | **URL non SEO-friendly : majuscules dans les slugs de tags** (`seo_non_friendly_url`) | Moyenne | `/blog/tags/CPF/`, `/blog/tags/IA/`, `/blog/tags/Qualiopi/`, `/blog/tags/SEA/`, `/blog/tags/SEO/` | Les slugs de tags contiennent des majuscules. Idéalement, normaliser les slugs en minuscules (`/blog/tags/cpf/`, `/blog/tags/seo/`…) dans `app/src/pages/blog/tags/[tag].astro` tout en gardant le libellé d'affichage en majuscules. Si modifié, prévoir des redirections 301 des anciennes URL et mettre à jour les liens internes. À arbitrer : impact faible, et 3 tags sur 8 (`automatisation`, `site`) sont déjà en minuscules — incohérence à uniformiser. |
| 3 | **Titres trop longs (> 60 car.)** (`title_long`) | Moyenne | 13 pages : 12 articles de blog + `/ressources/10-automatisations-ia/` (longueurs 69–84 car.) | Le suffixe « · Claude Partners » (~18 car.) pousse la plupart des titres au-delà de 60 caractères et risque la troncature en SERP. Raccourcir les titres d'articles, ou utiliser un suffixe plus court (ex. « · CP ») / supprimer le suffixe sur les longs titres. Cible : ≤ 60 caractères. Pas bloquant mais améliore le CTR. |
| 4 | **Titres trop courts** (`title_short`) | Faible/Moyenne | 4 pages : `/` (« Claude Partners », 15 car.), `/a-propos/` (26), `/blog/` (22), `/contact/` (25) | Enrichir les balises title avec des mots-clés. En particulier la **page d'accueil** (« Claude Partners » seul, 15 car.) gagnerait à inclure la proposition de valeur + mot-clé, ex. « Claude Partners — Conseil IA pour organismes de formation ». |
| 5 | **Contenu faible (`content_count_words`)** | Faible (faux positif partiel) | 10 pages : pages de tags (17 mots), `/blog/` (27), `/contact/` (72), `/services/` (104) | Majoritairement des **pages d'index/listing** (tags, liste blog) et utilitaires (contact) qui sont thin par nature — peu d'action utile. Pour `/services/` (hub) et `/contact/`, ajouter un court paragraphe d'introduction riche en mots-clés peut aider. Les pages de tags sont des pages d'agrégation : envisager `noindex` si le faible contenu est jugé pénalisant, ou les laisser telles quelles (faible enjeu). |

## Problèmes signalés mais à NE PAS traiter (intentionnels / faux positifs)

| Signalement Ubersuggest | Interprétation |
|---|---|
| `page_allowed: false` sur `/confidentialite/` et `/mentions-legales/` (2 pages « bloquées ») | **Intentionnel.** Ces deux pages portent `noindex={true}` dans le code source (`app/src/pages/confidentialite.astro`, `mentions-legales.astro`). C'est le comportement souhaité pour des pages légales. Aucune action. |
| Pages de tags « thin content » | Pages d'agrégation par nature ; voir ligne 5 ci-dessus, enjeu faible. |

## Déjà couvert ailleurs (ne pas re-signaler comme nouveau)

D'après le contexte fourni, ces points sont **déjà connus / en cours de traitement par d'autres agents** et ne sont donc pas comptés comme nouveaux problèmes ici :

- **LCP mobile à 4,2 s + redirections** — pris en charge par un autre agent. (À noter : l'audit Ubersuggest indique `time_load_high: count 0` et `redirected: 0`, donc le crawl Ubersuggest ne remonte pas ce point côté serveur — cohérent avec un sujet de performance mobile traité séparément.)
- **2 couvertures d'images temporaires à régénérer** — déjà identifié, à traiter ailleurs.
- **Socle technique solide** (canonical, OpenGraph, JSON-LD, sitemap, `trailingSlash: 'always'`, `_headers`) — confirmé par l'audit : `have_sitemap` OK, pas de titres/descriptions dupliqués, SSL valide, aucun H1 manquant.

## Top 3 des correctifs techniques prioritaires

1. **Corriger le lien e-mail cassé 404** sur `/contact/` (désactiver l'obfuscation e-mail Cloudflare ou corriger le marqueur `email_off`) — seule vraie erreur 404 du site.
2. **Normaliser les slugs de tags en minuscules** (5 URL `/blog/tags/{CPF,IA,Qualiopi,SEA,SEO}/`) avec redirections 301, pour des URL cohérentes et SEO-friendly.
3. **Optimiser les balises title** : raccourcir les 13 titres trop longs (suffixe « · Claude Partners ») et enrichir la title de la page d'accueil (trop courte, sans mot-clé).

## Comment re-déclencher / finaliser l'audit plus tard

L'audit est **terminé** (aucune action de finalisation nécessaire). Pour rafraîchir les données :

1. `mcp__Ubersuggest__site_audit` avec `domain: "claudepartners.fr"` et `recrawl: true` (force un nouveau crawl en ignorant le cache).
2. Poller `mcp__Ubersuggest__site_audit_status` (`domain: "claudepartners.fr"`) toutes les ~5 s jusqu'à `result.done === true`.
3. Détail par problème : `mcp__Ubersuggest__site_audit_results` avec l'`id` du problème (ex. `have_broken_links_anchor`, `seo_non_friendly_url`, `title_long`).
4. Liste complète des pages crawlées : `mcp__Ubersuggest__site_audit_pages` (`domain: "claudepartners.fr"`).
