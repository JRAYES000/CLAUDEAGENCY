# Journal SEO — claudeagency.fr

Antéchronologique : l'entrée la plus récente en haut. Mode d'emploi dans `README.md`.
Une action SEO sans entrée ici n'existe pas pour les sessions suivantes.

---

## 2026-08-12 — Réécriture des title/meta sur 9 pages + plan netlinking

**Type :** réécriture + netlinking (préparation)

**Pourquoi :** deux constats du relevé du matin. (1) Des pages ressortent en page 1 sans récolter
un seul clic — leur balise title ne correspond pas à ce que les gens tapent réellement.
(2) 0 backlink : aucun travail on-page ne débloquera le site sans autorité.

**Fait — 9 `title` + `description` réécrits**, alignés sur les requêtes **réellement constatées
dans GSC** pour chaque page, pas sur des requêtes supposées. Positions de départ (14/05→09/08/2026) :

| URL | Requête réelle principale | Pos. | Clics |
| :--- | :--- | ---: | ---: |
| `/services/seo/` | agence référencement naturel claude | **3,8** | **0** |
| `/blog/claude-ai-en-francais/` | claude francais | 4,7 | 1 |
| `/blog/convention-de-formation/` | convention de formation mentions obligatoires | 13,8 | 0 |
| `/blog/formation-autofinancee-france-travail/` | formation autofinancée **pole emploi** | 14,8 | 0 |
| `/blog/feuille-emargement/` | émargement conférence / signature | 16,0 | 1 |
| `/blog/seo-organisme-formation/` | référencement **gratuit** organisme de formation | 16,8 | 0 |
| `/blog/livret-accueil-stagiaire/` | livret d'accueil stagiaire **entreprise** | 21,0 | 4 |
| `/blog/questionnaire-satisfaction-formation/` | questionnaire **évaluation post formation** | 31,0 | 1 |
| `/blog/numero-declaration-activite/` | numéro de déclaration d'activité | 33,5 | 0 |

Les mots en gras sont ceux qui manquaient au title et que les gens tapent. Exemples :
l'article « France Travail » ne contenait pas « Pôle emploi », le guide SEO ne contenait pas
« gratuit », le livret d'accueil ne mentionnait pas « entreprise ».

**Le cas le plus coûteux — `/services/seo/`.** La page est en **position 3,8** sur
« agence référencement naturel claude » et n'a récolté **aucun clic**. Ses requêtes réelles sont
toutes de la forme *agence de référencement + Claude* : personne ne l'atteint via une requête
« organisme de formation ». Son ancien title, « Agence SEO Claude pour organismes de formation »,
disqualifiait le chercheur avant le clic. Nouveau title :
« Agence de référencement naturel & SEO avec Claude », le positionnement OF passe en description.
**Arbitrage assumé, à revérifier dans 30 jours** — si le CTR ne bouge pas, revenir en arrière.

**Fait — plan netlinking** : `docs/seo/NETLINKING-ACTIONS.md`. 13 cibles vérifiées une par une
(URL ouverte le 12/08), réparties en 4 vagues, avec 3 messages prêts à envoyer. Point bloquant
identifié : Claude Agency n'étant pas un OF déclaré, tous les annuaires Qualiopi lui sont fermés
— la bonne porte est la catégorie « cabinet de conseil » des fédérations.

**Deux corrections d'analyse de ce matin (j'avais conclu trop vite) :**
- **Le doublon www n'existe pas.** `www.claudeagency.fr` redirige bien en 301 vers l'apex
  (testé). Les URLs `www` dans GSC sont un reliquat d'indexation qui se purgera seul. Priorité
  retirée du backlog.
- **Les requêtes « …skills claude seo » ne sont pas des requêtes humaines.** Ce sont des
  concaténations mécaniques (`formation seo qualiopi` + `skills claude seo`) émises par un agent
  automatisé, qui touchent surtout `/services/seo/`. ~140 impressions de bruit, 0 clic. Rien à
  corriger sur le site — mais **il faut les exclure de toute analyse GSC** (filtre
  `query notContains "skills claude seo"`), sinon elles faussent le CTR et masquent les vraies
  requêtes.

**Mesure :** aucune à ce stade — les effets d'un title se voient sous 2 à 4 semaines.
**Suite :** relever à nouveau clics / CTR / position sur ces 9 URLs **le 2026-09-11**, et le
nombre de domaines référents. Si le CTR de `/services/seo/` reste à 0, annuler son nouveau title.

---

## 2026-08-12 — Mise en place de la mémoire SEO + relevé de référence GSC

**Type :** mesure + organisation
**URLs :** `docs/seo/README.md`, `docs/seo/JOURNAL.md`, `docs/seo/REQUETES.csv`,
`docs/seo/BACKLOG.md`, `docs/seo/PERFORMANCES.csv`
**Pourquoi :** chaque session SEO repartait de zéro — mêmes audits, mêmes recherches de mots-clés,
mêmes sujets réétudiés. Ce dossier devient la mémoire du projet.
**Fait :**
- Création des 4 fichiers de mémoire + du protocole de lecture/écriture (`README.md`).
- Amorçage de `REQUETES.csv` avec les **87 URLs** du site (69 articles, 8 services, 10 pages
  transverses), leur requête cible et leurs performances réelles.
- Relevé GSC complet sur 88 jours et enregistrement dans `PERFORMANCES.csv`.
- Constitution du `BACKLOG.md` à partir des données mesurées, pas d'hypothèses.

**Mesure — Search Console, propriété `sc-domain:claudeagency.fr`, période 14/05→09/08/2026,
`data_state=final` :**

| Métrique | Valeur |
| :--- | ---: |
| Clics | **49** |
| Impressions | **2 797** |
| CTR | **1,75 %** |
| Position moyenne | **33,3** |

**Mesure — Ubersuggest, France, relevé du 2026-08-12 :** autorité de domaine **1/100**,
**0 backlink**, **0 domaine référent**, 3 mots-clés organiques détectés.

**Ce que disent ces chiffres (constat, pas interprétation optimiste) :**
- Le site génère des impressions (2 797) mais quasiment pas de clics (49). Le problème n'est
  pas l'indexation : c'est la **position moyenne 33,3**, trop basse pour être cliquée.
- **0 backlink et une autorité de 1** expliquent l'essentiel. 69 articles publiés n'ont pas
  compensé l'absence totale d'autorité de domaine. Le levier n'est plus le volume de contenu.
- Trois pages concentrent 40 % des impressions et rapportent 1 clic à elles trois :
  `/services/seo/` (536 imp., 0 clic, pos. 19,9), `/blog/logiciel-organisme-formation/`
  (404 imp., 1 clic, pos. 72,7), `/blog/automatiser-bpf-organisme-formation/` (138 imp., 0 clic,
  pos. 34,0).
- **Doublon www / non-www** constaté dans GSC : 15 URLs ressortent sur les deux variantes
  (`www.claudeagency.fr/blog/seo-organisme-formation/` : 68 impressions à elle seule). Ce
  n'est pas normal et c'est inscrit au backlog.

**Suite :** voir `BACKLOG.md`, priorité 1 (netlinking) et priorité 2 (doublon www).

---

## Entrées reconstituées (avant la mise en place du journal)

> Reconstitution à partir de `SEO-STRATEGY.md` §2/§6, de `docs/CONTEXTE-COWORK.md` et de
> l'historique git. Fiable sur le **quoi** et le **quand** ; les mesures d'époque sont reprises
> telles qu'elles ont été consignées à l'époque et n'ont pas été revérifiées.

## 2026-08-04 — Ouverture de l'accès agent à la Search Console

**Type :** technique
**Pourquoi :** aucun agent ne pouvait lire les données GSC — tout audit reposait sur des captures
manuelles.
**Fait :** propriété domaine `sc-domain:claudeagency.fr` créée (TXT de vérification sur `@` dans
Cloudflare) ; accès agent via Composio (`GOOGLE_SEARCH_CONSOLE_*`), pas de MCP dédié.
**Mesure :** non mesuré. **Suite :** rien.

## 2026-07-15 — Audit GSC + vague 2 de quick wins

**Type :** audit + réécriture
**Fait :** correction des title/meta de `/services/seo/` et `/blog/feuille-emargement/`, maillage
footer et inter-articles, comparatif CRM, nouvel article « formation autofinancée France Travail ».
**Mesure (GSC, 23/06→13/07/2026) :** 17 clics, 408 impressions, CTR 4,2 %, position moyenne 19,3 ;
65 pages indexées / 39 non indexées (dont 21 tags en `noindex`, volontaire).
**Suite :** 6 pages business non indexées identifiées — statut à revérifier.

## 2026-07-13 — Landing « agence marketing claude »

**Type :** publication
**URLs :** https://claudeagency.fr/agence-marketing-claude/
**Pourquoi :** cible GEO/SEO sur la marque Claude, hors cluster organismes de formation.
**Mesure au 2026-08-12 :** 176 impressions, 3 clics, position 49,0 (GSC).

## 2026-07-03 — Incident : 62 articles vidés par un script de maillage

**Type :** technique (incident)
**Fait :** les commits « add internal links » du 30/06 avaient vidé le corps de 62 articles ;
restauration par le commit `fix(blog): restaure les 62 articles vidés`.
**Règle qui en découle :** ne jamais faire réécrire des fichiers de contenu en masse par un script.
Le maillage interne se pose à la main. Détail dans `docs/CONTEXTE-COWORK.md`.

## 2026-06-30 — Vague massive de publication (~40 articles)

**Type :** publication
**Fait :** ~40 articles publiés le même jour (RGPD, LMS, CRM, tunnel de vente, prospection,
AI Act, accessibilité, sous-traitance…), tous ~1 000 mots, plus le maillage interne automatisé
qui a causé l'incident du 03/07.
**Mesure au 2026-08-12 :** cette vague a produit des impressions mais **quasiment aucun clic** —
c'est elle qui tire la position moyenne à 33,3. À ne pas reproduire en l'état.

## 2026-06-19 — Passe citeabilité / GEO / E-E-A-T

**Type :** réécriture + technique
**Fait :** constat qu'aucun des 26 articles d'alors ne citait de source primaire → ajout de
citations officielles (Légifrance, travail-emploi, service-public, DARES, CNIL) sur les 2 piliers
et 4 articles réglementaires ; statistique sourcée DARES-Céreq ; tableaux comparatifs ;
citation attribuée du fondateur. `robots.txt` rendu explicite (bots IA de recherche et
d'entraînement autorisés). HSTS ajouté.
**Mesure d'époque (GSC, crawl du 18/06) :** sitemap *Valid*, 41 URLs indexées, ~13 impressions.

## 2026-06-15 — Audit technique Ubersuggest + sélection par volumes réels

**Type :** audit + publication
**Fait :** score d'audit 76/100. Correctifs : slugs de tags en minuscules, tags en `noindex` et
hors sitemap, titres ≤ 60 caractères, lien e-mail `/contact` réparé. Hero responsive :
FCP mobile 2,6 → 1,9 s, Speed Index 3,6 → 3,0 s (LCP encore 4,2 s). Sitemap resoumis.
6 articles choisis sur volumes mesurés : convention de formation (720), programme de formation
(590), logiciel OF (320), indicateurs Qualiopi (320), audit de surveillance (210), créer un OF (170).
**Constat consigné :** « qualiopi » = 22 000 de volume, SERP à faible autorité → niche gagnable.

## 2026-06-14 — Socle : stratégie, E-E-A-T, cluster initial

**Type :** publication + technique
**Fait :** rédaction de `SEO-STRATEGY.md` ; article pilier « Intégrer l'IA dans votre OF » étoffé ;
articles 1 à 4 du cluster publiés ; auteur réel Julien Rayes (`app/src/data/author.ts`) + schema
`Person` lié par `@id` + page auteur ; flux RSS ; `BlogPosting` enrichi (`keywords`, `wordCount`).
**Mesure d'époque :** 0 donnée GSC sur 90 jours — le site n'apparaissait sur aucune requête.
