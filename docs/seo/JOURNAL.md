# Journal SEO — claudeagency.fr

Antéchronologique : l'entrée la plus récente en haut. Mode d'emploi dans `README.md`.
Une action SEO sans entrée ici n'existe pas pour les sessions suivantes.

---

## 2026-08-19 (50) — Cumul www + non-www sur les 2 derniers doublons signalés à l'entrée 49

**Type :** correction de données (suite directe de l'entrée 49, même fichier).

**Pourquoi :** l'entrée 49 signalait sans les traiter 2 lignes déjà mises à jour à l'entrée 48
(`lms-organisme-formation`, `make-automatisation-organisme-formation`) dont la variante `www.`
existe aussi dans `export-gsc-2026-08-13-pages.csv` avec des impressions non nulles, non
fusionnées. Demande explicite de cumuler les deux variantes, même méthode que le repêchage de
l'entrée 49.

**Fait :** contrairement au repêchage (une seule variante disponible → substitution), ici les
**deux** variantes existent → somme des `clics`/`impressions`, position recalculée en moyenne
pondérée par les impressions de chaque variante (méthode standard d'agrégation GSC quand deux
lignes se combinent) :
- `lms-organisme-formation` : non-www (0 clic, 33 impr., position 60.3) + www (0 clic, 6 impr.,
  position 20.7) → **0 clic, 39 impr., position 54.2**.
- `make-automatisation-organisme-formation` : non-www (0 clic, 14 impr., position 19.9) + www
  (0 clic, 1 impr., position 21.0) → **0 clic, 15 impr., position 19.9** (position quasi
  inchangée, le poids de la variante www est marginal).

`source_requete` reste `sous-seuil-GSC` sur les deux lignes (le cumul reste une métrique de page,
pas une requête précise — même limite qu'aux entrées 48-49). `date_position` déjà à 2026-08-13,
inchangée.

**Vérifié :** script de comparaison ligne à ligne contre `git show HEAD:` (commit de l'entrée 49)
— 0 colonne touchée hors des 5 autorisées, 87 lignes de données inchangées en nombre.

**Mesure — total final sur les 63 lignes traitées depuis l'entrée 48 :**
- **32 / 63** ont désormais des métriques mises à jour depuis les exports GSC du 13/08 (28 par
  correspondance exacte à l'entrée 48, +4 par correspondance www/non-www à l'entrée 49, dont 2
  recalculées en cumul ici — ce sont les mêmes 32 lignes, pas un ajout).
- **31 / 63** restent sans aucune donnée GSC dans ces deux exports (URL absente, ni en exact ni
  en www) — `clics_90j`/`impressions_90j`/`position`/`date_position` inchangés depuis avant
  l'entrée 48.
- Sur l'ensemble des 63 : **0** requête réelle mesurée, **63** `sous-seuil-GSC` (inchangé depuis
  l'entrée 48 — aucune de ces trois passes n'a permis d'attribuer une requête précise à une URL,
  seulement des métriques de page).

**Suite :** aucune connue. Les 31 lignes sans donnée resteraient à traiter par une extraction GSC
filtrée par page si un besoin futur l'exige (option déjà écartée à l'entrée 48, coût ~31 appels).

---

## 2026-08-19 (49) — Correction d'attribution sur l'entrée 48 + repêchage www/non-www (4 lignes)

**Type :** correction de journal (attribution erronée) + correction de données (suite directe de
l'entrée 48, même fichier).

**Pourquoi :** deux questions posées après coup sur l'entrée 48. (1) L'entrée écrivait « Décision
(Julien) » pour le choix « tout en sous-seuil-GSC » — jamais vérifié. (2) Demande de retenter les
35 lignes non mises à jour en normalisant www/non-www avant comparaison, comme un précédent
similaire (C1).

**Fait — correction d'attribution :** vérification faite sur la mémoire `user-role-claude-agency` :
« Son manager est Julien » — l'utilisateur de cette session **n'est pas** Julien. La décision
« tout en sous-seuil-GSC » vient d'une réponse donnée dans ce chat, pas d'une validation directe et
constatée de Julien lui-même. La formule « Décision (Julien) » de l'entrée 48 était une
affirmation non vérifiée (calquée par réflexe sur les entrées où Julien tranche réellement, ex.
entrées 17-19) — corrigée dans l'entrée 48 elle-même plutôt que réécrite en douce.

**Fait — repêchage www/non-www :** deuxième passe sur les 35 lignes sans correspondance de
l'entrée 48, comparaison URL normalisée (`www.` retiré) contre `export-gsc-2026-08-13-pages.csv`.
**4 lignes** avaient une correspondance uniquement en variante `www.` : `remplir-bpf-organisme-formation`
(8 impressions, position 23.5), `qualiopi-guide-organisme-formation` (10, position 41.2),
`catalogue-formation-organisme` (1, position 45.0), `linkedin-organisme-formation` (3, position
7.0). Leurs `clics_90j`/`impressions_90j`/`position`/`date_position` mis à jour depuis cette
variante ; `source_requete` reste `sous-seuil-GSC` (la normalisation www donne la métrique de
page, pas une requête précise — même limite qu'à l'entrée 48). Les 31 lignes restantes n'ont
toujours aucune correspondance, ni exacte ni www. **Point non traité, signalé :** 2 des 28 lignes
déjà mises à jour à l'entrée 48 (`lms-organisme-formation`, `make-automatisation-organisme-formation`)
ont *aussi* une variante `www.` distincte dans l'export (respectivement 6 et 1 impressions
supplémentaires, non fusionnées) — hors du périmètre demandé ici (« les 35 lignes »), à traiter
séparément si besoin de cumuler les deux variantes.

**Vérifié :** script de comparaison ligne à ligne contre `git show HEAD:` (commit de l'entrée 48) —
0 colonne touchée hors des 5 autorisées, 87 lignes de données inchangées en nombre.
`grep -c "A-VALIDER" docs/seo/REQUETES.csv` → 0 confirmé ; `grep -c "sous-seuil-GSC"` → 63
inchangé (le repêchage ne change que les métriques, pas le statut de la requête).

**Mesure :** 4/35 lignes repêchées par normalisation www ; 31/35 toujours sans donnée GSC pour
cette URL. Comptage final requêtes réelles / sous-seuil-GSC inchangé : 0 / 63.

**Suite :** si les 2 doublons www non fusionnés (`lms-organisme-formation`,
`make-automatisation-organisme-formation`) doivent être corrigés, le faire dans une passe dédiée —
demande explicite requise, périmètre de celle-ci limité aux 35 lignes signalées.

---

## 2026-08-19 (48) — 63 requêtes devinées passées en sous-seuil-GSC, blocage de méthode remonté à Julien

**Type :** correction de données (nettoyage `source_requete` / `requete_cible`), suite des entrées
45-46 (mêmes exports GSC du 13/08).

**Pourquoi :** 63 lignes de `REQUETES.csv` portaient une `requete_cible` devinée (53
`deduite-du-slug-A-VALIDER`, 10 `deduite-A-VALIDER`), jamais confrontée à une vraie mesure GSC.
Consigne reçue : pour chacune, chercher dans `export-gsc-2026-08-13-requetes.csv` la requête qui
apporte le plus d'impressions à l'URL de la ligne, sans rien déduire du slug.

**Blocage trouvé avant toute édition :** `export-gsc-2026-08-13-requetes.csv` (222 requêtes) et
`export-gsc-2026-08-13-pages.csv` (50 URLs) sont deux exports **globaux et distincts**
(confirmé par l'entrée 45 : 1717 impressions au total côté requêtes, 1864 côté pages — les deux
totaux ne se recoupent pas). Aucune colonne commune entre les deux fichiers : impossible de savoir
objectivement quelle requête, parmi les 222, est associée à une URL précise. Croisement des 63
URLs avec `pages.csv` : 28 URLs ont un total d'impressions connu mais sans requête attribuable
(la seule façon de "trouver" une requête aurait été de faire correspondre son texte au sujet de
la page — exactement le "déduire du slug" interdit par la consigne) ; 4 autres n'existent dans
l'export qu'en variante `www.` (piège déjà documenté à l'entrée 46).

**Décision (tranchée dans ce chat, remontée avant d'exécuter — voir correction entrée 49 : pas une
validation directe de Julien) :** aucune des 63 lignes ne peut prétendre à une
`requete_cible` mesurée — les 63 passent en `source_requete = sous-seuil-GSC`, `requete_cible`
inchangée. Pour les 28 URLs retrouvées **à l'identique** (correspondance exacte, sans tolérance
www/non-www) dans `pages.csv` avec des impressions non nulles, `clics_90j`, `impressions_90j`,
`position` et `date_position` sont mis à jour depuis cet export (fenêtre 2026-05-21 → 2026-08-16,
date de mesure enregistrée : 2026-08-13). Les 35 autres lignes (URL absente de l'export ou variante
www non prise en compte) gardent leurs anciennes valeurs de `clics_90j`/`impressions_90j`/
`position`/`date_position` — aucune donnée fiable pour les changer.

**Fait :** script Node.js (`reconcile.js`, jetable, hors dépôt) appliqué sur `REQUETES.csv` :
correspondance exacte URL → `export-gsc-2026-08-13-pages.csv`, arrondi de la position à 1 décimale
pour rester au format existant (`31.0`, pas `41.986784140969164`). Vérifié après coup par un
second script de comparaison ligne à ligne avec `git show HEAD:` : 0 colonne touchée en dehors des
5 autorisées (`source_requete`, `clics_90j`, `impressions_90j`, `position`, `date_position`),
87 lignes de données avant/après identiques en nombre, aucun ajout ni suppression, aucun
réordonnancement.

**Mesure :** 63/63 lignes traitées. **0** requêtes réelles mesurées (`GSC 2026-08-13 (requete
reelle mesuree)`) — **63** `sous-seuil-GSC`. Sur ces 63 : 28 avec métriques mises à jour depuis
`pages.csv`, 35 inchangées faute de correspondance.

**Suite :** si une vraie mesure page×requête est un jour nécessaire pour ces URLs, il faudra une
extraction GSC filtrée par page (Composio), pas les deux exports globaux du 13/08 — signalé à
Julien comme option 2, non retenue ici (aurait changé la date de mesure et pris ~32 appels). Les
28 lignes dont les métriques ont bougé peuvent faire remonter ou descendre leur position dans un
tri par `impressions_90j` (notamment B3, déjà signalé sensible à ce fichier depuis l'entrée 46) —
non revérifié ici, hors périmètre de cette passe.

---

## 2026-08-19 (47) — Décision Julien : les 3 pages de bruit non corrigées restent en l'état

**Type :** décision (clôt le point « Suite » de l'entrée 46, sans nouvelle donnée).

**Fait :** vérification de l'impact du bruit « skills claude seo » sur B3 (sélection des 10
articles LinkedIn) — aucun changement de classement, les 3 pages signalées à l'entrée 46
(`/services/optimisation-site/`, `/blog/seo-guide-complet-organisme-formation-2026/`,
variante www de `/blog/seo-organisme-formation/`) sont hors du périmètre `type_page = article`
utilisé par B3, ou déjà exclues par sa règle anti-redirection.

**Décision (Julien) :** ces 3 lignes restent **en l'état, non corrigées**. Aucun impact démontré
sur une tâche active ; chacune porte sa propre complexité plutôt qu'une simple correction de
chiffre — `/services/optimisation-site/` est hors périmètre articles, la page redirigée est déjà
gérée par la règle d'exclusion de B3, et le doublon www/non-www de `seo-organisme-formation` est
un problème de configuration GSC (canonicalisation), pas un chiffre à corriger dans
`REQUETES.csv`.

**Statut :** connu, non prioritaire. Pas d'action tant qu'aucune tâche future ne dépend de ces
chiffres précis (ex. une nouvelle sélection d'articles basée sur `impressions_90j`) — à
réinvestiguer seulement dans ce cas.

---

## 2026-08-19 (46) — Correction REQUETES.csv (536→134 impressions) + audit exhaustif du bruit « skills claude seo »

**Type :** correction de données + audit (suite directe de l'entrée 45).

**Pourquoi :** l'entrée 45 avait filtré le bruit d'un agent automatisé sur deux exports GSC neufs,
sans toucher à `REQUETES.csv` lui-même. Julien a demandé la correction de la ligne
`/services/seo/` avec le chiffre filtré, et un audit du reste du fichier pour le même bruit.

**Fait — correction appliquée :** ligne `agence référencement naturel claude` /
`https://claudeagency.fr/services/seo/` : `impressions_90j` 536 → **134** (chiffre filtré de
l'entrée 45), `date_maj` → 2026-08-19. Seules ces deux colonnes touchées.

**Alerte sur la précision de cette correction :** le 536 d'origine ne se reconstruit pas
proprement à partir de l'API. Une requête GSC non filtrée sur une fenêtre de 90 jours calée
exactement sur la date de mesure d'origine (2026-05-15 → 2026-08-12, se terminant le
2026-08-12 comme `date_maj` d'origine) donne **705 impressions** pour cette page — pas 536.
La méthode ou la fenêtre exacte de la mesure d'origine (536) reste donc inconnue (UI GSC avec un
préréglage « 3 derniers mois » qui ne correspond pas forcément à 90 jours calendaires, ou
`search_type`/property différents). 134 est le chiffre filtré le plus récent et fiable
disponible (extraction C1, fenêtre 2026-05-21 → 2026-08-16), mais ce n'est **pas** un
« 536 moins le bruit » recalculé sur une fenêtre identique — à traiter comme la meilleure
estimation actuelle, pas comme une reconstruction exacte.

**Audit exhaustif — requête GSC `query contains "skills claude seo"`, group by page, fenêtre
2026-05-15 → 2026-08-12 (calée sur la date de mesure d'origine de `REQUETES.csv`) :** 4 pages
touchées au total, pas seulement `/services/seo/` :

| Page (GSC) | Impressions bruit | Ligne REQUETES.csv correspondante | Statut |
|---|---|---|---|
| `https://claudeagency.fr/services/seo/` | 146 | ligne 2, 536→**134** | corrigé |
| `https://claudeagency.fr/services/optimisation-site/` | 10 | ligne 28, `impressions_90j`=25 (~40 % de bruit potentiel) | **signalé, non corrigé** |
| `https://claudeagency.fr/blog/seo-guide-complet-organisme-formation-2026/` | 21 | ligne 32, `impressions_90j`=20 — page redirigée 301 depuis le 2026-08-14 vers `seo-organisme-formation` ; le bruit (21) dépasse même l'`impressions_90j` affiché (20), signe que la quasi-totalité du trafic récent de cette page est du bruit | **signalé, non corrigé** |
| `https://www.claudeagency.fr/blog/seo-organisme-formation/` (variante **www**) | 23 | ligne 9 suit l'URL **sans www** (`https://claudeagency.fr/blog/seo-organisme-formation/`, `impressions_90j`=68) — GSC compte les deux variantes comme des pages distinctes ; le bruit mesuré ne tombe pas exactement sur l'URL trackée | **signalé, non corrigé** |

Ces 3 lignes n'ont pas été corrigées : contrairement à `/services/seo/`, aucun chiffre cible
n'avait été validé pour elles, et chacune porte une ambiguïté propre (fenêtre non garantie
identique, page redirigée, variante d'URL). Une correction sans validation aurait remplacé une
imprécision connue par une autre non vérifiée.

**Impact potentiel ailleurs signalé, non traité :** toute tâche ou fichier qui s'appuie sur le tri
par `impressions_90j` décroissant de `REQUETES.csv` (notamment le choix d'articles par volume
d'impressions, ex. B3) a pu se baser sur les anciens chiffres non filtrés des 4 pages ci-dessus,
avant correction. Non vérifié ici, hors périmètre de cette passe.

**Suite :** si Julien valide des chiffres cibles pour les 3 lignes signalées, les corriger dans
une passe dédiée. Vérifier séparément si B3 ou d'autres décisions déjà prises doivent être
revues.

---

## 2026-08-19 (45) — Export GSC filtré (requêtes + pages), fenêtre 2026-05-21 → 2026-08-16

**Type :** extraction de données (GSC via Composio).

**Pourquoi :** `REQUETES.csv` attribue 536 impressions à `/services/seo/` sur la requête cible
« agence référencement naturel claude », un total qui inclut du bruit non lié à l'activité réelle :
un agent automatisé a généré des recherches contenant « skills claude seo » (~140 impressions,
0 clic), gonflant artificiellement les chiffres de cette page.

**Fait :** connexion Composio à Google Search Console établie (1ʳᵉ tentative en échec — token OAuth
sans le scope `webmasters`, `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT` sur `LIST_SITES` et
`SEARCH_ANALYTICS_QUERY` ; reconnexion avec le bon scope validée par Julien). Fenêtre demandée :
88 jours, référence 2026-05-14 → 2026-08-09. Dernière date disponible en `data_state=final` :
2026-08-16 (retard GSC de 3 jours par rapport à aujourd'hui). Fenêtre équivalente la plus récente
retenue : **2026-05-21 → 2026-08-16**. Deux exports générés sur `sc-domain:claudeagency.fr` avec
filtre `query notContains "skills claude seo"`, triés par impressions décroissantes :
- `docs/seo/export-gsc-2026-08-13-requetes.csv` — 222 lignes (`requete,clics,impressions,ctr,position`)
- `docs/seo/export-gsc-2026-08-13-pages.csv` — 51 lignes (`url,clics,impressions,ctr,position`)

**Mesure (GSC via Composio, 2026-05-21→2026-08-16) :** total requêtes après filtre = 8 clics /
1 717 impressions ; total pages après filtre = 9 clics / 1 864 impressions. Écart entre les deux
totaux attendu : GSC compte dans les agrégats par page des requêtes rares qu'il anonymise et
n'affiche jamais comme ligne distincte dans l'export par requête — les deux totaux ne se
recoupent donc pas exactement, mais chacun est correct pour son fichier. Référence non filtrée sur
la même fenêtre (`dimensions=[]`) : 51 clics / 3 369 impressions. `/services/seo/` passe de
536 impressions (chiffre non filtré de `REQUETES.csv`) à **134 impressions filtrées** sur cette
fenêtre. Contrôle `grep -ci "skills claude seo"` sur les deux CSV : 0 occurrence, confirmé.

**Suite :** `REQUETES.csv` n'a pas été mis à jour avec ces chiffres filtrés — hors périmètre de
cette extraction, à faire dans une passe dédiée si la ligne `/services/seo/` doit être corrigée.

---

## 2026-08-18 (44) — Nouvelle revérification sameAs LinkedIn : toujours correct, rien à toucher

**Type :** SEO technique (schema.org / E-E-A-T), même consigne que les entrées 42-43, reçue une
seconde fois (avec le même avertissement sur un slug `claudeagency-fr` faux).

**Pourquoi :** consigne reçue de comparer le `sameAs` LinkedIn de `BaseLayout.astro` (objet
organization) et `author.ts` (`AUTHOR_SAMEAS`) à l'adresse réelle `https://www.linkedin.com/company/claude-agency-fr/`,
sans se fier à l'avertissement joint.

**Fait :** état réel relu avant toute édition, pas l'avertissement. Les deux fichiers déclarent
déjà `https://www.linkedin.com/company/claude-agency-fr/`, identique à l'adresse réelle — aucun
changement depuis l'entrée 43. Sameas de l'objet founder (profil personnel de Julien) non touché.
Page reconfirmée en ligne (chargement direct : nom, description, site web, effectif, secteur,
localisation affichés, contenu conforme à `linkedin-kit.md`). `cd app && npm run build` repassé :
158 pages, aucune erreur ; JSON-LD Organization extrait de `dist/index.html` confirme le `sameAs`
correct.

**Mesure :** 0 écart trouvé, pour la deuxième fois. Avertissement de la consigne obsolète par
rapport à l'état du dépôt, comme à l'entrée 43.

**Suite :** aucune. Rien commité côté code — seule cette entrée de vérification.

---

## 2026-08-18 (43) — Revérification sameAs LinkedIn : déjà correct, rien à toucher

**Type :** SEO technique (schema.org / E-E-A-T), vérification suite à l'entrée 42.

**Pourquoi :** consigne reçue de comparer le `sameAs` LinkedIn de `BaseLayout.astro` (objet
organization) et `author.ts` (`AUTHOR_SAMEAS`) à l'adresse réelle de la page entreprise, avec un
avertissement signalant que le fichier déclarerait encore le slug faux `claudeagency-fr`
(sans tiret) — ce qui casserait le `sameAs` sur toutes les pages du site tant que non corrigé.

**Fait :** vérifié l'état réel avant toute édition (le fichier n'a pas été relu à l'aveugle sur la
foi de l'avertissement). Constat : le slug faux n'y est plus — il a déjà été corrigé le jour même,
entrée 42 / commit `a682218`. Les deux fichiers déclarent `https://www.linkedin.com/company/claude-agency-fr/`,
identique à l'adresse réelle donnée. Page confirmée en ligne (chargement direct de
`linkedin.com/company/claude-agency-fr/` : nom, description, site web, effectif et localisation
affichés, contenu conforme à `linkedin-kit.md`). Sameas de l'objet founder (profil personnel de
Julien) non touché. `cd app && npm run build` repassé : 158 pages, aucune erreur ; JSON-LD
Organization du build confirme `sameAs` correct.

**Mesure :** 0 écart trouvé entre le `sameAs` déclaré et l'adresse réelle ; avertissement de la
consigne obsolète par rapport à l'état du dépôt.

**Suite :** aucune. Rien commité côté code — seule cette entrée de vérification.

---

## 2026-08-18 (42) — Câblage sameAs LinkedIn (point 4 de linkedin-kit.md), corrige un slug faux

**Type :** SEO technique (schema.org / E-E-A-T), suite des entrées 40-41.

**Pourquoi :** la page entreprise LinkedIn est maintenant créée et vérifiée en ligne (entrée 41) ;
`linkedin-kit.md` prévoyait de câbler son URL dans le `sameAs` de l'Organization une fois cette
condition remplie.

**Fait :** en cherchant où ajouter l'URL, trouvé qu'elle y était déjà (`app/src/data/author.ts`
et `app/src/layouts/BaseLayout.astro`) mais avec un slug faux : `claudeagency-fr` (sans tiret) au
lieu du vrai slug vérifié `claude-agency-fr`. Un troisième endroit avait la même faute :
`app/src/pages/llms.txt.ts` (fiche LinkedIn du flux AEO/GEO). Les 3 corrigés. `npm run build`
repassé après chaque édition — 158 pages, aucune erreur. Confirmé dans `dist/a-propos/index.html`
que le JSON-LD Person expose désormais la bonne URL.

**Mesure :** 3 occurrences du slug faux corrigées, 0 restante (`grep -rn claudeagency-fr src dist`
vide après correction).

**Suite :** aucune, le câblage documenté dans `linkedin-kit.md` (point 4) est terminé.

---

## 2026-08-18 (41) — Audit page entreprise LinkedIn + correction bannière (logo masquant le wordmark)

**Type :** prospection LinkedIn, hors périmètre SEO (suite de l'entrée 40).

**Pourquoi :** demande explicite d'audit de https://www.linkedin.com/company/claude-agency-fr/
après mise en ligne de la bannière par Solohery.

**Fait :** vérification en vue « membre » (page admin) : tagline, descriptif, spécialisations,
secteur et site web correspondent mot pour mot à `docs/seo/linkedin-kit.md`. Défaut trouvé : le
logo de page (cercle) que LinkedIn superpose en bas à gauche de la couverture cachait la seconde
ligne du wordmark (« AGENCY » réduit à un fragment « CY » visible). Corrigé dans
`banniere-page-entreprise.svg` : wordmark repassé sur une seule ligne, remonté en haut du bandeau
terracotta, hors de la zone que le logo recouvre. PNG régénéré (toujours 1128×191,
3 couleurs `#FBF7F1`/`#CC785C`/`#2B2724`).

**Mesure :** 1 défaut visuel trouvé et corrigé, 0 autre écart de contenu constaté.

**Suite :** ré-uploader `banniere-page-entreprise.png` sur la page entreprise (attente d'accord
avant toute action sur le compte LinkedIn) ; câblage `sameAs` (point 4 de `linkedin-kit.md`)
toujours en attente, page maintenant vérifiée en ligne.

---

## 2026-08-18 (40) — Visuels LinkedIn (bannière + gabarit de post) générés localement

**Type :** prospection LinkedIn, hors périmètre SEO (préparation de la page entreprise, suite des
entrées 38-39).

**Pourquoi :** amorcer la page entreprise LinkedIn « Claude Agency » (étape B7) avec des visuels à
la charte, sans dépendance à un service externe.

**Fait :** 2 SVG source + 2 PNG générés via `app/scripts/svg-to-png-linkedin.mjs` (sharp, en local) :
bannière page entreprise (1128×191) et gabarit de post réutilisable (1080×1080, zone de titre à
remplir). Palette strictement limitée aux 3 couleurs demandées : `#FBF7F1` (crème), `#CC785C`
(terracotta), `#2B2724` (encre) — vérifié par grep sur les 2 SVG après une première version qui
utilisait aussi les neutres `#7A6E60`/`#E5D9C7` de `DESIGN.md`, corrigée sur retour de Julien.
Fichiers dans `docs/seo/visuels-linkedin/`.

**Mesure :** 2 SVG, 2 PNG aux dimensions exactes demandées, 3 couleurs uniques par fichier.

**Suite :** SOLOHERY charge `banniere-page-entreprise.png` comme image de couverture de la page
entreprise LinkedIn une fois celle-ci créée (crayon « Modifier la page » → Image de couverture).

---

## 2026-08-18 (39) — Liste de prospection LinkedIn — un lien LinkedIn confirmé par recoupement

**Type :** prospection LinkedIn, hors périmètre SEO (suite de l'entrée 38).

**Pourquoi :** Julien a trouvé lui-même un lien LinkedIn pour une fiche marquée « inconnu » et a
demandé une vérification par recoupement avant intégration — même exigence que pour la tentative
précédente (entrée non journalisée : lien proposé pour une autre fiche, rejeté après recoupement
car il pointait vers une personne différente occupant un poste différent au sein de la même
structure ; fiche laissée en « inconnu », rien modifié).

**Fait :** recoupement par recherche croisée (3 sources indépendantes convergentes : LinkedIn,
TheOrg.com, communiqué officiel déjà cité en source de la fiche) confirmant que le lien pointe
bien vers la bonne personne, au bon poste, dans la bonne structure. Une fiche mise à jour :
« inconnu » → lien LinkedIn confirmé. Aucun lien reconstruit à partir d'un nom.

**Mesure :** 30 fiches inchangées en nombre, 13 avec lien LinkedIn confirmé désormais (contre 12
à l'entrée 38), 17 en « inconnu ».

**Suite :** Julien recherche un lien pour une autre fiche encore marquée « inconnu » (Afpa) ; même
protocole de vérification prévu avant intégration.

---

## 2026-08-18 (38) — Liste de prospection LinkedIn (30 dirigeants OF) — recherche et correction

**Type :** prospection LinkedIn, hors périmètre SEO (loggé ici faute d'autre journal suivi dans
le dépôt ; aucune ligne de `REQUETES.csv` ni `BACKLOG.md` concernée).

**Pourquoi :** demande explicite — constituer une liste de 30 dirigeants d'organismes de
formation (France/Belgique/Suisse) pour amorcer le levier LinkedIn (invitations et commentaires
manuels, SOLOHERY), en complément du sprint notoriété de `PLAN-SOLOHERY.md`.

**Fait :** recherche manuelle par sources publiques, sans délégation à un sous-agent ni à un
modèle externe (donnée personnelle). Une fiche hors périmètre (contact rattaché à un centre de
ressources du secteur, pas à un organisme de formation dispensant des cours — donc pas un
client-cible au sens de `PRODUCT.md`) repérée en relecture et remplacée par un dirigeant d'un
organisme de formation professionnelle réel, même méthode de sourcing (aucun lien LinkedIn
reconstruit à partir d'un nom).

**Mesure :** 30 fiches (15 France, 8 Belgique, 7 Suisse), 12 avec lien LinkedIn confirmé en
source, 18 en « inconnu ». Détail des noms **volontairement absent de ce journal public** :
fichier `docs/prive/linkedin-30-dirigeants.md`, hors dépôt (`.gitignore`), consultable en local.

**Suite :** deuxième volet (commentaires quotidiens sur 3 publications) en attente que Julien/
SOLOHERY transmette les publications du jour. Journal dédié déjà en place :
`docs/prive/linkedin-journal-engagement.md` (hors dépôt, une ligne par commentaire réellement
posté).

---

## 2026-08-18 (37) — Relecture stylistique libre des 10 posts LinkedIn

**Type :** relecture (correctif sur le livrable de l'entrée 36, même fichier)

**Pourquoi :** demande explicite de contrôle qualité au-delà des règles écrites de la skill —
répétitions de structure entre posts, tournures artificielles, fluidité accroche/question,
cohérence du vouvoiement.

**Fait :** 4 posts (2, 4, 6, 9) partageaient le mot « vraiment » exactement à la même place
(juste avant les puces) → retiré. 4 posts (2, 4, 5, 8) fermaient sur le même moule de question
« …, ou … ? » → reformulé pour 4 et 8. Posts 6 et 7, adjacents, utilisaient la même inversion
« Votre X, vous l'avez Y ? » → question du post 7 réécrite. Post 9 se refermait sur « l'IA ne
remplace pas le formateur, elle libère du temps », un cliché générique que l'anti-référence
« agence IA générique interchangeable » de `PRODUCT.md` demande justement d'éviter → reformulé
en ancrant la phrase sur le prompt (sujet réel du post) plutôt que sur l'IA en général.
Vouvoiement : aucune dérive trouvée. Recontrôlé après coup : les 10 posts restent dans
[900, 1300] signes, zéro lien dans le corps, zéro boucle de négation-contraste.

**Mesure :** non applicable (rédaction).

**Suite :** aucune, sauf nouvelle relecture demandée. Publication manuelle toujours en attente
(cf. entrée 36).

---

## 2026-08-18 (36) — 10 posts LinkedIn rédigés depuis le blog (sprint de distribution)

**Type :** rédaction (publication à faire manuellement sur LinkedIn, hors périmètre agent)

**Fait :** sélection des 10 articles `type_page=article` de `REQUETES.csv` par
`impressions_90j` décroissante (fichier présent dans `app/src/content/blog/`, articles
fusionnés le 14/08 écartés) : logiciel-organisme-formation (404), claude-ai-en-francais (110),
formation-claude (82), seo-organisme-formation (68), livret-accueil-stagiaire (58),
feuille-emargement (50), lms-organisme-formation (46), numero-declaration-activite (45),
prompts-ia-formateurs (40), evaluer-apprenants-ia (38). 10 posts rédigés à la main (900-1300
signes, format `linkedin-kit.md` : accroche, points concrets, question, lien en 1er
commentaire), puis 2e passe de vérification : chaque chiffre cité est retrouvé mot pour mot
dans l'article source (table de correspondance en fin de fichier) ; aucun chiffre supprimé.
Livrable : `docs/seo/posts-linkedin-sprint.md`.

**Mesure :** non applicable (rédaction, pas de publication).

**Suite :** publication manuelle sur LinkedIn par Julien (ou SOLOHERY), un post à la fois,
lien en premier commentaire. `REQUETES.csv` et `BACKLOG.md` non modifiés — ce sprint ne change
pas le statut SEO des articles sources.

---

## 2026-08-18 (35) — Chemin de revendication Societe.com trouvé, gratuit jusqu'au compte

**Type :** netlinking (audit, aucun compte créé — SOLOHERY revendique)

**URLs :** https://www.societe.com/societe/ecole-de-naturopathie-et-sophrologie-924997539.html

**Pourquoi :** item Vague 4, deux anciennes URL de revendication en 404 depuis le 12/08 — pas
retentées, cherché un nouveau chemin depuis la fiche elle-même.

**Fait :** fiche atteinte sans erreur, données conformes à `kit-identite.md`. Bouton
« Revendiquer cette entreprise » cliqué réellement (panneau navigateur, pas une simulation) :
déclenche un module d'inscription gratuite (e-mail + téléphone, validation par lien) — « Créer
un compte gratuitement pour bénéficier des services gratuits de Societe.com », confirmé par les
requêtes réseau observées (`auth-lite.html`). **Aucune contrepartie financière rencontrée**
jusqu'à ce stade — bandeau « 100% Gratuit » sur la fiche. Étape post-création de compte
(association effective à la fiche) non testée, hors périmètre de Claude Code. Deux tentatives de
clic infructueuses en cours de route (`.click()` JS synthétique, puis clic réel via ref) avant de
trouver la bonne piste de diagnostic (requêtes réseau) — changé d'approche plutôt que de boucler
sur le clic. `NETLINKING-ACTIONS.md` mis à jour avec le chemin complet et une marche à suivre.

**Mesure :** non applicable.

**Suite :** SOLOHERY crée le compte gratuit, associe la fiche avec le NAP de `kit-identite.md`,
note le résultat dans Preuve. Si un règlement apparaît en cours de route (non observé jusqu'ici) :
s'arrêter, noter la raison, « Sans objet ».

---

## 2026-08-18 (34) — Adresse expéditeur A10 (Federgon) ajoutée : equipe1@claudeagency.fr

**Type :** documentation (correction d'un oubli, aucun envoi effectué)

**URLs :** aucune — mise à jour de `docs/seo/NETLINKING-ACTIONS.md`

**Pourquoi :** SOLOHERY a demandé quelle adresse utiliser comme expéditeur pour A10, l'e-mail
Federgon préparé n'en précisait pas — oubli constaté en comparant à A7/A8/A9.

**Fait :** vérifié les trois envois précédents : A7 et A8 (adhésions à des fédérations) utilisent
`equipe1@claudeagency.fr` (arbitrage de Julien du 15/08/2026, `kit-identite.md` §3) ; A9
(candidature éditoriale Digiformag, pas une fédération) utilise délibérément
`contact@claudeagency.fr`. Federgon est une fédération et l'e-mail est une question d'adhésion —
rentre dans la règle d'A7/A8. Ligne « De : equipe1@claudeagency.fr » ajoutée au bloc e-mail prêt
à envoyer dans `NETLINKING-ACTIONS.md`.

**Mesure :** non applicable.

**Suite :** SOLOHERY envoie A10 depuis equipe1@claudeagency.fr.

---

## 2026-08-18 (33) — A9 (Digiformag) ajouté à la liste de suivi

**Type :** documentation (traçabilité, aucune fiche/section substantielle modifiée ailleurs)

**URLs :** aucune — mise à jour de `docs/seo/arbitrage-julien.md`

**Pourquoi :** signalé en une ligne à l'entrée (32), confirmé par Julien : la bio anglaise
envoyée à Digiformag (A9) utilise « consulting firm », même position en attente d'arbitrage que
A7/A8/Federgon.

**Fait :** ligne A9 ajoutée au tableau, citant la phrase exacte engagée. Date d'envoi exacte non
précisée dans la conversation (SOLOHERY a confirmé l'envoi sans donner l'heure/jour précis au-delà
du 18/08/2026 déjà connu). Phrase de clôture du tableau généralisée (« ces messages », plus « les
deux ») vu que la liste compte maintenant quatre entrées.

**Mesure :** non applicable.

**Suite :** aucune connue — liste à jour avec les quatre envois identifiés à ce jour.

---

## 2026-08-18 (32) — Federgon ajouté à la liste de suivi, statut A8 corrigé

**Type :** documentation (traçabilité, aucune fiche/section substantielle modifiée ailleurs)

**URLs :** aucune — mise à jour de `docs/seo/arbitrage-julien.md`

**Pourquoi :** l'e-mail Federgon (entrée (31)) utilise aussi « cabinet de conseil français »,
même position en attente d'arbitrage que A7/A8. Julien a demandé son ajout à la liste de suivi
des contacts externes pour en avoir la liste complète.

**Fait :** ligne Federgon ajoutée au tableau (date prévue 17/08/2026, formulation engagée citée).
Au passage, la ligne A8 était restée « pas encore envoyé » alors que l'envoi a été confirmé par
SOLOHERY dans cette même session — corrigée à « Envoyé le 18/08/2026 », même fichier, même
tableau, écart trop proche pour le laisser traîner.

**Mesure :** non applicable.

**Suite :** A9 (Digiformag) utilise aussi « consulting firm » en anglais dans sa bio — pas ajouté
ici, Julien n'en a pas fait la demande ; à signaler s'il veut que la liste couvre aussi cet envoi.

---

## 2026-08-18 (31) — E-mail d'éligibilité Federgon préparé, adresse revérifiée

**Type :** netlinking (préparation, aucun envoi effectué — SOLOHERY envoie)

**URLs :** https://federgon.be/fr/devenir-membre/, revérifiée le 18/08/2026

**Pourquoi :** item Vague 4 « à explorer, sans garantie » — le rattachement d'un cabinet IA/
formation à cette fédération RH belge n'est pas garanti ; une question d'éligibilité par e-mail,
sans dossier, teste le terrain avant tout effort de constitution de dossier.

**Fait :** adresse `membership@federgon.be` confirmée toujours exacte (section Contact de la
page, aucune autre adresse d'adhésion mentionnée). E-mail rédigé : une seule question, 3 phrases
de corps, pas de dossier ni pièce jointe, comme demandé. `NETLINKING-ACTIONS.md` mis à jour.

**Mesure :** non applicable — préparation, rien envoyé.

**Suite :** SOLOHERY envoie le 17/08 (date déjà fixée dans la consigne), note la date dans
Preuve. Pas de relance intermédiaire — sans réponse au 27/08 : « Sans objet ».

---

## 2026-08-18 (30) — Champ « Links to articles » Digiformag : deux options tranchées par SOLOHERY

**Type :** documentation (candidature déjà envoyée, entrée rétroactive — édition faite avant
l'envoi mais pas commitée sur consigne explicite « ne commit rien pour l'instant »)

**URLs :** aucune nouvelle — `docs/seo/NETLINKING-ACTIONS.md`

**Fait :** deux options neutres écrites pour le champ obligatoire « Links to articles you write
for other sites » (vide/mention explicite de première contribution externe, ou une référence de
Julien non trouvée dans le dépôt), sans trancher à la place de SOLOHERY — candidature à essai
unique. Une erreur de collage a aussi été repérée en cours de route (les 3 sujets d'abord collés
dans ce champ au lieu de « What topics would you like to address? ») et corrigée avant l'envoi
final. La candidature a depuis été envoyée (confirmé par SOLOHERY) ; laquelle des deux options a
été retenue n'a pas été précisée dans la conversation.

**Suite :** aucune — clôturé, ce commit ne fait que documenter ce qui avait été préparé avant
l'envoi.

---

## 2026-08-18 (29) — Candidature Digiformag recalée : anglais requis, 3 sujets déjà publiés

**Type :** netlinking (préparation, aucun envoi effectué — SOLOHERY envoie)

**URLs :** https://www.digiformag.com/en/join-digiformag/, formulaire lu en entier le 18/08/2026
(cookies acceptés via JS, `get_page_text` propre ensuite)

**Pourquoi :** le brouillon existant dans `NETLINKING-ACTIONS.md` (Vague 3) n'avait jamais été
confronté au vrai formulaire ni à l'état actuel du blog.

**Fait :** deux points d'alerte trouvés. (1) Le formulaire est **entièrement en anglais**, avec
prérequis explicite « Mastering the English language » — recherche de version française sans
résultat (aucun lien de langue dans le DOM). Le brouillon français a été recalé en anglais. (2)
**Les 3 sujets prévus sont déjà publiés quasi mot pour mot** : Qualiopi ≈
`automatiser-qualiopi-ia.mdx`, BPF ≈ `remplir-bpf-organisme-formation.mdx`, AI Act ≈
`ai-act-organisme-formation.mdx` (titre quasi identique). Trois angles voisins proposés à la
place, vérifiés contre les articles les plus proches (`indicateurs-qualiopi.mdx`,
`evaluer-apprenants-ia.mdx`, `sous-traitance-pedagogique-formation.mdx`) pour éviter un nouveau
doublon. Champs réels relevés (Name, E-mail, réseaux, bio auteur, liens vers d'autres sites,
sujets, RGPD) — **point d'honnêteté signalé** : le champ « articles sur d'autres sites » n'a pas
de vraie réponse (aucune contribution externe connue), le blog propre proposé comme meilleure
preuve disponible, à confirmer avant l'envoi unique. `NETLINKING-ACTIONS.md` mis à jour.

**Mesure :** non applicable — préparation, rien envoyé.

**Suite :** SOLOHERY tranche le point d'honnêteté, envoie. Pas de relance avant 15 jours
(rédaction éditoriale, pas service client) ; candidature unique, pas de deuxième essai.

---

## 2026-08-18 (28) — A8 : dernier champ tranché par SOLOHERY (Conférence)

**Type :** netlinking (mise à jour mineure, formulaire toujours pas soumis à ma connaissance)

**URLs :** aucune — mise à jour de `docs/seo/NETLINKING-ACTIONS.md`

**Fait :** SOLOHERY a choisi « Conférence » pour « Comment avez-vous connu le Hub France IA ? »,
seul champ resté « à trancher ». Fiche mise à jour en conséquence — A8 n'a plus de champ en
suspens côté préparation.

**Suite :** SOLOHERY soumet, note la date dans Preuve.

---

## 2026-08-18 (27) — Liste de suivi des envois externes ajoutée à arbitrage-julien.md

**Type :** documentation (traçabilité, aucune fiche/section substantielle modifiée ailleurs)

**URLs :** aucune — mise à jour de `docs/seo/arbitrage-julien.md`

**Pourquoi :** A7 et A8 sont prêts (A7 déjà envoyé, A8 en attente d'envoi par SOLOHERY), tous
deux affirmant « cabinet de conseil » à des tiers. Julien a demandé un suivi visible de ces
envois pour recontacter les destinataires si l'arbitrage bascule vers « organisme de formation ».

**Fait :** section « Envois externes déjà engagés sur cabinet de conseil » ajoutée à
`arbitrage-julien.md` — tableau avec fédération, date d'envoi, formulation exacte engagée, pour
A7 (Les Acteurs de la Compétence, envoyé le 18/08/2026) et A8 (Hub France IA, préparé, pas encore
envoyé). Distincte de la liste « Fichiers/sections à mettre à jour » déjà présente : celle-ci
suit ce qui est dans le dépôt et se corrige d'un coup, la nouvelle suit ce qui est déjà parti
vers l'extérieur et ne se corrige qu'en recontactant le destinataire.

**Mesure :** non applicable.

**Suite :** ajouter une ligne à ce tableau à chaque futur envoi qui engage la même formulation
(items restants de la Vague 2, relances). Mettre à jour dès qu'un contact est recontacté après
un éventuel changement de position.

---

## 2026-08-18 (26) — A8 : deux points ajustés avant envoi, effectif minimum vérifié après coup

**Type :** documentation (arbitrage + vérification complémentaire, aucun envoi effectué)

**URLs :** aucune nouvelle — mise à jour de `docs/seo/NETLINKING-ACTIONS.md`

**Pourquoi :** avant l'envoi d'A8, Julien a demandé deux vérifications : condition d'effectif
minimum (comme A7) non explicitement checkée au premier passage, et confirmation que « A
renseigner » sur le CA est une vraie réponse et pas un placeholder oublié.

**Fait :** condition d'effectif vérifiée après coup — **aucune condition chiffrée trouvée**
(scan du texte complet de la page, une seule occurrence de « critères », non détaillée ; une
exigence « 2 salariés, 2 ans » existe mais pour un programme distinct, l'AMI catalogue des
offreurs, pas l'adhésion générale). « A renseigner » confirmé comme option à part entière du
menu réel, distincte de l'état vide par défaut — gardé tel quel, point d'action optionnel ajouté
à la marche à suivre plutôt qu'un blocage. Positionnement « cabinet de conseil en IA » du champ
16 : gardé tel quel, même motif qu'A7 (cohérent avec le reste du dépôt, n'engage rien).

**Mesure :** non applicable.

**Suite :** SOLOHERY envoie A8 avec ces deux points réglés.

---

## 2026-08-18 (25) — Message Hub France IA préparé, même travail qu'A7

**Type :** netlinking (préparation, aucun envoi effectué — SOLOHERY envoie)

**URLs :** https://www.hub-franceia.fr/devenir-membre-v2/, formulaire complet lu le 18/08/2026

**Pourquoi :** même exercice qu'A7 (entrée (24)), sur la deuxième fédération de la Vague 2.

**Fait :** formulaire réel lu en entier via extraction DOM directe dès le départ (pas l'arbre
d'accessibilité tronqué — leçon tirée d'A7). **Condition d'entrée : inconnu**, aucune formule
sans cotisation trouvée sur la page ni le formulaire ; une mention web d'« adhésion gratuite un
an » concerne un programme accélérateur ponctuel, pas une catégorie de membre standard — ne
tranche pas la question. Point utile trouvé : le champ « Type de structure » propose une option
qui couvre à la fois « organisme de formation » et « cabinet ... conseil » dans la même case
(texte intégral vérifié : « Organisme de formation - Cabinet d'avocats - Conseil en recrutement
innovation transformation financement ») — contrairement à A7, ce choix n'attend pas l'arbitrage
de `arbitrage-julien.md`, il est correct dans les deux cas. Message reformulé dans l'ordre réel
du formulaire (Société, Siret, civilité, nom, prénom, email equipe1@, fonction, adresse, champ
« Pourquoi rejoindre » avec la question sur les structures <5 salariés, CA laissé « à
renseigner » plutôt qu'une tranche inventée). `NETLINKING-ACTIONS.md` mis à jour.

**Mesure :** non applicable — préparation, rien envoyé par Claude Code.

**Suite :** SOLOHERY envoie, tranche le champ « Comment avez-vous connu... », note la date
d'envoi dans Preuve. Relance le 21/08 si silence, « Sans objet » le 27/08 sinon.

---

## 2026-08-18 (24) — A7 envoyé : deux arbitrages tranchés, message soumis par Claude Code

**Type :** netlinking (envoi effectué directement par Claude Code, sur consigne explicite)

**URLs :** https://lesacteursdelacompetence.fr/devenir-adherent/ — formulaire soumis le
18/08/2026

**Pourquoi :** Julien a demandé de trancher deux points en suspens avant l'envoi (effectif=0
incompatible avec la condition d'éligibilité ; formulation « cabinet de conseil » non arbitrée
en interne), puis d'envoyer directement — changement par rapport au plan initial où SOLOHERY
envoyait.

**Fait :** deux arbitrages tranchés et motivés (détail dans `NETLINKING-ACTIONS.md`) : envoyer
quand même malgré l'incompatibilité effectif/condition (coût nul, réponse écrite = preuve
documentée) ; garder la formulation « cabinet de conseil en IA » (cohérente avec la position
actuelle du reste du dépôt, n'engage rien). Formulaire rempli champ par champ (21 champs) via le
panneau navigateur, **vérifié dans le DOM réel** (`document.getElementById` sur le vrai
`id="forminator-module-11391"`, pas seulement l'arbre d'accessibilité — une première vérification
via `querySelector('form')` avait ciblé le mauvais formulaire, la recherche du site, corrigée
avant l'envoi) : toutes les valeurs confirmées correctes avant soumission. Champ « Comment
avez-vous connu... » tranché à « Moteur de recherche », faute de réponse sur le vrai canal.
Soumis : confirmation constatée sur la page (« Merci de nous avoir contactés... »), formulaire
réinitialisé — signal déterministe de succès, pas déclaré sans preuve.

**Mesure :** non applicable — envoi tout juste effectué, aucune réponse encore reçue.

**Suite :** relance le 21/08/2026 si silence (texte déjà prêt dans `NETLINKING-ACTIONS.md`) ;
« Sans objet » le 27/08 si toujours rien. Si la fédération confirme une formule sans cotisation
compatible avec 0 salarié : rejoindre. Sinon : décliner, ce plan ne souscrit rien.

---

## 2026-08-18 (23) — Message Les Acteurs de la Compétence recalé sur le vrai formulaire

**Type :** netlinking (préparation, aucun envoi effectué par Claude Code)

**URLs :** https://lesacteursdelacompetence.fr/devenir-adherent/, lue en entier (formulaire
compris) le 18/08/2026

**Pourquoi :** le message de `NETLINKING-ACTIONS.md` (Vague 2, section « Les Acteurs de la
Compétence ») était un paragraphe générique, pas relevé sur le vrai formulaire, et ne posait pas
la question d'une formule sans cotisation demandée pour cet envoi.

**Fait :** page lue en entier via le panneau navigateur (le `main` innerText ne renvoyait rien,
contenu dans des accordéons repliés — `read_page` en a extrait le formulaire complet). **Aucune
formule sans cotisation trouvée** (« membre associé », « observateur » absents de la page et
d'une recherche sur les statuts) — noté **inconnu**, pas « non », faute de preuve exhaustive.
**Point d'alerte trouvé en cherchant** : la condition d'éligibilité exige « au moins un salarié »
— le registre officiel du SIREN (tâche A13) indique 0 salarié déclaré (« unité non employeuse »).
Éligibilité elle-même incertaine, pas seulement le tarif. Message reformulé à 21 champs dans
l'ordre exact du formulaire réel (civilité, nom, prénom, qualité, e-mail equipe1@, téléphone au
format +33, message 300 caractères max avec la question sur les structures <5 salariés, nom
commercial, site, année, domaine d'intervention — « Conseil aux entreprises de formation et CFA »
existe tel quel —, SIRET, effectif à 0 sans l'arrondir pour paraître éligible, adresse, dirigeant
Antoine RAYES, etc.). Relance à 4 lignes ajoutée pour le 21/08, filet « Sans objet » au 27/08.
`NETLINKING-ACTIONS.md` mis à jour en conséquence.

**Mesure :** non applicable — préparation, rien envoyé par Claude Code (SOLOHERY envoie).

**Suite :** SOLOHERY envoie le message, tranche le champ « Comment avez-vous connu... », note la
date d'envoi dans Preuve. Relance le 21/08 si silence, « Sans objet » le 27/08 sinon.

---

## 2026-08-17 (22) — Description Crunchbase raccourcie à 114 caractères, limite 2-140 découverte

**Type :** netlinking (correction de fiche, SOLOHERY en train de soumettre en direct)

**URLs :** aucune nouvelle — mise à jour de `docs/seo/fiche-crunchbase.md`

**Pourquoi :** la version 481 caractères collée dans le champ Description a été rejetée par le
formulaire réel : « La longueur doit être comprise entre 2 et 140. » — limite non documentée
nulle part avant ce test.

**Fait :** description reformulée à 114 caractères (compté mécaniquement, `wc -m`), mêmes faits
que `kit-identite.md` §2, en français : « Cabinet de conseil : IA et automatisation du
back-office (Qualiopi, BPF, émargement) pour organismes de formation. » `fiche-crunchbase.md`
mis à jour (tableau + section Description) pour refléter la contrainte réelle.

**Mesure :** non mesuré — soumission en cours côté SOLOHERY, pas encore publiée.

**Suite :** SOLOHERY termine le formulaire (date de fondation, secteur, logo), soumet, colle
l'URL du profil publié dans la ligne Preuve de `fiche-crunchbase.md`.

---

## 2026-08-17 (21) — Fiche Crunchbase recalée sur le vrai formulaire (français, pas anglais)

**Type :** netlinking (correction de fiche, SOLOHERY en train de soumettre en direct)

**URLs :** aucune nouvelle — mise à jour de `docs/seo/fiche-crunchbase.md`

**Pourquoi :** SOLOHERY a montré le vrai formulaire `/add-new` : interface en français, pas en
anglais comme supposé dans la préparation initiale (hypothèse de bon sens à l'époque — base
mondiale à vocation anglophone — mais démentie par le formulaire réel).

**Fait :** description remise en français (`kit-identite.md` §2, version moyenne, 481
caractères), remplace la version anglaise préparée. Deux champs réels découverts, absents de la
préparation initiale : « Également connu sous le nom de » → `Claude Agency` (bon endroit pour la
marque commerciale, ne contredit pas le nom légal) et « Nom légal » → même valeur que le champ
Nom. Champ « Description » confirmé unique et obligatoire, pas de tagline séparée comme supposé.

**Mesure :** non mesuré — soumission en cours côté SOLOHERY, pas encore publiée.

**Suite :** SOLOHERY termine le formulaire (date de fondation, secteur, logo), soumet, colle
l'URL du profil publié dans la ligne Preuve de `fiche-crunchbase.md`.

---

## 2026-08-17 (20) — Blocage réel identifié sur A2 : la fiche Google Business est active

**Type :** audit (constat, aucune fiche modifiée — tâche A2 hors dépôt, sur le Sheet externe)

**URLs :** aucune — capture d'écran fournie par SOLOHERY, mise à jour de
`docs/seo/arbitrage-julien.md`

**Pourquoi :** SOLOHERY a demandé quoi écrire en Preuve pour la tâche A2 (marquée « Bloqué » sur
le Sheet), sans connaître la raison exacte du blocage — rien dans le dépôt ne l'expliquait.

**Fait :** capture montrant la fiche Google Business existante (« ECOLE DE NATUROPATHIE &
SOPH... ») : 4,9/5 sur 32 avis Google, 3,8/5 sur 2 avis Trustpilot, catégorie « Centre de
formation continue », avis récents et concrets d'élèves en naturopathie. **Ce n'est pas une
fiche vide à compléter : c'est une activité active**, pas un vestige — contredit directement
l'option 2 d'`arbitrage-julien.md » (« traiter comme un vestige de l'activité passée »), mise à
jour en conséquence avec cette preuve. Le blocage réel d'A2 : compléter cette fiche pour en
faire la vitrine Google de Claude Agency mélangerait deux publics sans rapport (élèves en
naturopathie / dirigeants d'organismes de formation) et diluerait une réputation déjà établie —
décision de fond à prendre avant de toucher à la fiche, pas un problème d'accès ou
d'identifiants.

**Mesure :** non applicable — constat, rien à mesurer.

**Suite :** Julien tranche `arbitrage-julien.md`, avec cette preuve en plus. A2 reste bloquée
jusque-là.

---

## 2026-08-17 (19) — Effectif Sortlist tranché à 2, Julien n'a pas donné le chiffre

**Type :** documentation (correction tranchée, application du protocole de l'entrée (17))

**URLs :** https://www.sortlist.fr/agency/ecole-de-naturopathie-et-sophrologie — champ effectif
à corriger côté SOLOHERY

**Pourquoi :** entrée (18) laissait « 3 personnes dans leur équipe » à confirmer par Julien ;
réponse : il ne donne pas le chiffre. Cas typique du protocole de l'entrée (17) — trancher sans
remonter plutôt que d'attendre.

**Fait :** tranché à **2**, pas 3. Seules deux personnes sont nommées dans tout le dépôt
(Antoine RAYES président, Julien RAYES contact commercial, `kit-identite.md` §1), cohérent avec
le registre officiel (« unité non employeuse », 0 salarié déclaré). Le `3` actuellement publié
n'est appuyé par aucune donnée du dépôt. `fiche-sortlist.md` mis à jour avec la décision et son
motif.

**Mesure :** non applicable.

**Suite :** SOLOHERY corrige le champ sur la fiche Sortlist publiée (2 au lieu de 3).

---

## 2026-08-17 (18) — Fiche Sortlist publiée et vérifiée

**Type :** netlinking (publication vérifiée)

**URLs :** https://www.sortlist.fr/agency/ecole-de-naturopathie-et-sophrologie — **en ligne**,
Vague 1 item #5 clos

**Pourquoi :** dernière étape de `fiche-sortlist.md` : SOLOHERY a rempli et publié la fiche,
capture d'écran envoyée pour vérification.

**Fait :** comparaison champ par champ avec la fiche préparée. Conformes : nom légal (« École de
Naturopathie et Sophrologie »), slogan officiel du site (`BaseLayout.astro:22`), description
481 caractères de `kit-identite.md`, logo, langue Français, aucun avis client inventé (« Aucun
avis pour le moment » affiché, exact). Deux écarts constatés et notés, non bloquants : « 3
personnes dans leur équipe » affiché au lieu du `1` par défaut proposé (à confirmer que c'est le
vrai chiffre) ; la bannière du haut affiche le logo étiré en pleine largeur plutôt qu'une vraie
image de couverture (absente du dépôt, comme signalé dès la préparation). Prix de départ et
onglet Services non vérifiés (hors du champ visible sur la capture envoyée). Champ **Preuve** de
`fiche-sortlist.md` rempli avec l'URL et le constat de vérification.

**Mesure :** non mesuré — fiche tout juste publiée, pas de trafic ni de lead à ce stade.

**Suite :** confirmer le vrai effectif si « 3 » n'est pas exact ; envisager une vraie bannière
plus tard ; item #5 de la Vague 1 clos dans `NETLINKING-ACTIONS.md` (à cocher).

---

## 2026-08-17 (17) — Nouveau protocole de Julien : trancher sans remonter, tracer la raison

**Type :** documentation (changement de méthode de travail + décisions tranchées sur Sortlist)

**URLs :** aucune — mise à jour de `docs/seo/fiche-sortlist.md`

**Pourquoi :** mail de Julien à SOLOHERY, relayé le 17/08/2026 : poser les questions à Claude
Code plutôt qu'à lui, trancher même sans certitude, tracer la décision et sa raison (colonne
Preuve du Sheet de suivi), ne remonter que les vrais blocages — sans attendre de réponse pour
continuer. Concrètement : la question du prix de départ Sortlist, punt à Julien dans l'entrée
précédente, relevait de ce cas — à trancher directement.

**Fait :** trois champs de `fiche-sortlist.md` tranchés ou corrigés d'un coup : catégorie de
service (« Intelligence Artificielle », confirmée sur le vrai formulaire, remplace la
proposition initiale « Conseil en stratégie digitale »), langues (Français, confirmé), et
surtout **prix de départ : €3000**, décidé par Claude Code faute de donnée dans le dépôt —
motif tracé dans la fiche (audit gratuit en point d'entrée, cible PME, ni sous-positionné ni
agressif pour une structure sans référence client). Le Sheet de suivi externe (colonne Preuve)
n'est pas accessible à Claude Code ; la fiche du dépôt sert d'équivalent traçable, à reporter
manuellement côté Sheet si besoin.

**Mesure :** non applicable.

**Suite :** appliquer ce protocole aux prochains blocages (statut « Bloqué » + raison en Preuve
seulement si vraiment bloqué, sinon trancher et documenter). `arbitrage-julien.md` reste
différent : c'est une vraie décision métier (positionnement organisme de formation), pas un
paramètre technique manquant — à montrer à Julien, pas à trancher seul.

---

## 2026-08-17 (16) — Fiche Crunchbase préparée, formulaire réel derrière connexion

**Type :** netlinking (préparation, aucune fiche soumise, aucun compte créé)

**URLs :** aucune publiée — document interne `docs/seo/fiche-crunchbase.md` ; cible visée :
https://www.crunchbase.com/add-new

**Pourquoi :** item #6 de la Vague 1 (`NETLINKING-ACTIONS.md`), lien nofollow — intérêt en
signal d'entité pour Google/moteurs IA, pas en autorité SEO.

**Fait :** `/add-new` a renvoyé une 403 en accès direct et via le panneau navigateur (deux
échecs, pas de troisième tentative). Champs reconstitués depuis les articles d'aide officiels de
Crunchbase (compte requis, Nom + Description obligatoires, modération humaine + automatique
avant publication, délai non précisé). Nom légal utilisé (`ECOLE DE NATUROPATHIE ET
SOPHROLOGIE`, décision de Julien de l'entrée (15)). Descriptions traduites en anglais ; NAP
volontairement non traduit (adresse, téléphone au format inchangé). Effectif et financement
marqués **« inconnu »**, conformément à la consigne — aucune valeur approchée. LinkedIn de
l'entreprise marqué « à trancher », page pas encore confirmée en ligne.

**Mesure :** non mesuré — document de préparation, rien de soumis.

**Suite :** SOLOHERY crée le compte, ajuste l'ordre des champs sur le formulaire réel, soumet,
attend la modération, colle l'URL du profil publié dans la ligne Preuve de
`fiche-crunchbase.md`.

---

## 2026-08-17 (15) — Décision de Julien : nom légal partout, pas « Claude Agency »

**Type :** documentation (arbitrage, une fiche déjà soumise concernée)

**URLs :** aucune — mise à jour de `kit-identite.md`, `fiche-sortlist.md`,
`fiche-annuaireduconseil.md`

**Pourquoi :** SOLOHERY a posé la question en direct à Julien pendant la soumission Sortlist :
« dois-je toujours utiliser le nom ECOLE DE NATUROPATHIE ET SOPHROLOGIE comme nom de
l'établissement ? » Réponse : **oui**, pour toutes les inscriptions prévues.

**Fait :** décision consignée dans `kit-identite.md` §3, remplaçant les mentions « à trancher »
laissées jusqu'ici entre raison sociale légale et marque commerciale. `fiche-sortlist.md` corrigé
avant soumission (le champ « Nom de l'entreprise » était encore ouvert). **Point d'alerte :**
`fiche-annuaireduconseil.md` a déjà été soumis avec `Claude Agency` (entrée (14)), avant cette
décision — la fiche est encore au statut « En attente », donc modifiable via « Modifier » sur le
tableau de bord, mais je ne l'ai pas éditée : correction laissée à la décision de Julien
(éditer la fiche déjà soumise, ou la laisser telle quelle).

**Mesure :** non applicable.

**Suite :** Julien confirme s'il faut éditer la fiche Annuaire du Conseil déjà soumise. Toute
fiche future (Sortlist en cours, PagesJaunes, Crunchbase, etc.) utilise le nom légal.

---

## 2026-08-17 (14) — Fiche Annuaire du Conseil soumise, en attente de modération

**Type :** netlinking (soumission faite par SOLOHERY)

**URLs :** https://claudeagency.fr — statut affiché sur le tableau de bord
annuaireduconseil.com : **En attente**, gratuit. Aucune URL de fiche publique encore attribuée.

**Pourquoi :** dernière étape de la préparation `fiche-annuaireduconseil.md` (entrées (6), (7),
(12), (13)) : le formulaire réel a été rempli et validé par SOLOHERY.

**Fait :** message « Le site a été soumis avec succès. » constaté. Le tableau de bord du compte
confirme l'entrée `https://claudeagency.fr`, statut « En attente ». Pas de casse rejetée malgré
l'écart de majuscule signalé plus tôt entre le code attendu et le footer réel. Champ **Preuve**
de `fiche-annuaireduconseil.md` **laissé vide** : pas de fiche publique en ligne à cette heure,
seulement une entrée en modération — écrire une URL maintenant serait une preuve inventée.

**Mesure :** non applicable — en attente de validation par l'annuaire.

**Suite :** vérifier le statut du compte annuaireduconseil.com plus tard ; dès qu'il passe de
« En attente » à publié, coller l'URL de la fiche publique dans la ligne Preuve de
`fiche-annuaireduconseil.md` et clore l'item #4 de la Vague 1 dans `NETLINKING-ACTIONS.md`.

---

## 2026-08-17 (13) — Description étoffée à 1 469 caractères pour Annuaire du Conseil

**Type :** netlinking (correction de fiche, SOLOHERY en train de soumettre en direct)

**URLs :** aucune nouvelle — mise à jour de `docs/seo/fiche-annuaireduconseil.md`

**Pourquoi :** le formulaire réel affiche 5000 caractères disponibles pour la description ; les
387 caractères d'abord fournis (entrée précédente) ont été jugés trop courts une fois le champ
vu en vrai.

**Fait :** description réécrite à 1 469 caractères (compté mécaniquement, `wc -m`), toujours
entièrement reformulée par rapport aux trois descriptions de `kit-identite.md`, au site
claudeagency.fr et à la version de 387 caractères elle-même — même règle du site respectée
(« originale et unique, pas de copier-coller »). Mêmes faits, développés : charge administrative
concrète (Qualiopi, BPF, émargement, dossiers de financement, conventions), méthode
automatisation sous contrôle humain, formation à l'autonomie, refus du jargon. `fiche-annuaireduconseil.md`
mis à jour : section Description, ligne du tableau, ligne « Nom du site » confirmée (`Claude
Agency`, champ unique vu sur le formulaire réel — plus d'ambiguïté avec la raison sociale
légale), ligne Twitter ajoutée (facultatif, à laisser vide).

**Mesure :** non mesuré — soumission en cours côté SOLOHERY, pas encore publiée.

**Suite :** SOLOHERY colle l'URL de la fiche publiée dans la ligne Preuve de
`fiche-annuaireduconseil.md` une fois validée.

---

## 2026-08-17 (12) — Catégories réelles relevées sur le formulaire Annuaire du Conseil

**Type :** netlinking (correction de fiche, SOLOHERY en train de soumettre en direct)

**URLs :** aucune nouvelle — mise à jour de `docs/seo/fiche-annuaireduconseil.md`

**Pourquoi :** SOLOHERY était sur le formulaire réel d'annuaireduconseil.com et a montré la liste
de catégories, absente de tout ce que `kit-identite.md` ou la fiche pouvaient deviner à l'avance
(ni « cabinet de conseil » ni « intelligence artificielle » n'y figurent).

**Fait :** recommandation initiale de trois catégories, corrigée en direct par SOLOHERY — **un
seul choix est possible** sur ce formulaire, pas plusieurs. Retenu : **Conseil en stratégie
digitale** (décrit le service vendu), au lieu de « Conseil en formation » qui décrirait à tort la
clientèle visée et se lirait comme « organisation de programmes de formation interne ». Repli :
« Conseil en innovation ». Écarté : « Conseil en recrutement », resté surligné sur la capture
envoyée, sans rapport avec l'activité. Ligne « Catégorie » et étape 5 de la marche à suivre
mises à jour dans `fiche-annuaireduconseil.md` avec cette valeur unique.

**Mesure :** non mesuré — soumission en cours côté SOLOHERY, pas encore publiée.

**Suite :** SOLOHERY colle l'URL de la fiche publiée dans la ligne Preuve de
`fiche-annuaireduconseil.md` une fois validée.

---

## 2026-08-17 (11) — Fiche Sortlist préparée, formulaire réel derrière connexion

**Type :** netlinking (préparation, aucune fiche soumise, aucun compte créé)

**URLs :** aucune publiée — document interne `docs/seo/fiche-sortlist.md` ; cible visée :
https://www.sortlist.fr/providers/pricing

**Pourquoi :** item #5 de la Vague 1 (`NETLINKING-ACTIONS.md`). SOLOHERY doit pouvoir créer le
compte et soumettre la fiche sans deviner les champs.

**Fait :** offre gratuite confirmée toujours active sur la page Tarifs (lue avec succès via le
panneau navigateur, après plusieurs échecs de rendu — la page répond, la limite était côté
session). Le formulaire de création de profil vit derrière un compte : non créé, hors périmètre
de Claude Code. `help.sortlist.com` (centre d'aide) a renvoyé une erreur 403 dans cette session,
donc pas de détail supplémentaire sur les champs de ce côté. Liste de champs reconstituée à
partir du contenu que Sortlist décrit lui-même pour le profil gratuit (comparatif Gratuit /
Sortlist+) et de la structure standard déjà validée pour les 5 autres fiches
(`kit-identite.md` §3). `fiche-sortlist.md` créé : tableau Champ/Valeur/Remarque, marche à
suivre en 11 étapes. Trouvé et signalé : Sortlist n'affiche aucune catégorie de service
« formation », la consigne « secteur : formation professionnelle » devra probablement se placer
dans un champ secteur-client plutôt que dans la catégorie de service — marqué « à trancher ».
Champs absents du kit (langues, taille minimale de mission, image de couverture, photos
d'équipe, réalisations, avis clients) tous marqués « à trancher » ou laissés vides ; aucune
référence client inventée, conformément à la consigne.

**Mesure :** non mesuré — document de préparation, rien de soumis.

**Suite :** SOLOHERY crée le compte, ajuste l'ordre des champs sur le formulaire réel, tranche
catégorie de service vs secteur, publie, colle l'URL dans la ligne Preuve de
`fiche-sortlist.md`.

---

## 2026-08-17 (10) — Deuxième source distincte pour le statut Qualiopi (SIREN 924997539)

**Type :** audit (correction de rigueur méthodologique, aucune fiche modifiée)

**URLs :** https://annuaire-entreprises.data.gouv.fr/entreprise/924997539 (nouvelle), en plus de
https://recherche-entreprises.api.gouv.fr/search?q=924997539 (entrée (8))

**Pourquoi :** le critère de validation d'A13 exige deux listes officielles consultées
séparément, chacune avec sa propre URL. L'entrée (8) ne citait qu'une seule source agrégée pour
NDA et Qualiopi — signalé comme non conforme.

**Fait :** page `annuaire-entreprises.data.gouv.fr` atteinte via le panneau navigateur (l'échec
précédent, entrée (8), était une limite de session, pas du site) : section « Labels et
certificats » confirme « Organisme de formation (certifié Qualiopi) », mise à jour le
17/08/2026. `kit-identite.md` §4 mis à jour avec les deux URL et leurs dates respectives.
Tentative faite d'atteindre une troisième source réellement indépendante d'un organisme
certificateur (API dédiée `entreprise.api.gouv.fr/catalogue/carif_oref/…`, opérée par un
CARIF-OREF) : bloquée par une exigence de clé API absente de cette session — noté comme tel
plutôt que recopié une deuxième fois. Honnêteté ajoutée dans le fichier : les deux URL retenues
sont distinctes mais s'appuient sur la même chaîne de données publiques (INSEE, DGFiP, Douanes,
MTPEI, INPI), pas sur deux registres tenus par des organismes différents.

**Mesure :** non applicable — vérification documentaire.

**Suite :** aucune — seul `kit-identite.md` §4 a été touché, conformément à la consigne de ne
rien modifier ailleurs avant la réponse de Julien sur `arbitrage-julien.md`.

---

## 2026-08-17 (9) — Note d'arbitrage envoyée à Julien (statut organisme de formation)

**Type :** documentation (préparation de décision, aucune fiche/section substantielle modifiée)

**URLs :** aucune — document interne `docs/seo/arbitrage-julien.md`

**Pourquoi :** l'entrée (8) ci-dessous a mis au jour une contradiction confirmée par vérification
indépendante côté Julien : le NDA/Qualiopi réel de ce SIREN contredit la position « cabinet de
conseil, pas organisme de formation » de `kit-identite.md` §3 et `NETLINKING-ACTIONS.md` l.8-12.
Julien a demandé une note d'arbitrage plutôt qu'une correction directe, et a précisé qu'aucune
autre fiche ne devait être touchée avant sa réponse.

**Fait :** `docs/seo/arbitrage-julien.md` créé — deux options (se déclarer organisme de formation
vs. traiter le NDA/Qualiopi comme un vestige de l'ancienne activité), et la liste précise des
fichiers/sections à modifier selon la réponse. En reconstituant cette liste, trouvé une troisième
source jusque-là non repérée : `PLAN-SOLOHERY.md` §7, ligne « Annuaires Qualiopi » (l.247),
écartée le 12/08/2026 avec la note « à réexaminer si la tâche A13 révèle un NDA » — exactement ce
qui vient de se produire — plus l'onglet ⛔ Interdits du Google Sheet qui la miroir. Trouvé aussi
que la phrase de clôture ajoutée dans `kit-identite.md` §4 (entrée (8)) cite à tort « onglet
⛔ Interdits de `NETLINKING-ACTIONS.md` » : cette liste vit en réalité dans `PLAN-SOLOHERY.md` §7,
pas dans `NETLINKING-ACTIONS.md` — corrigé nulle part encore, seulement noté dans la note
d'arbitrage, conformément à la consigne de ne rien toucher d'autre.

**Mesure :** non applicable — document de préparation, aucune fiche soumise.

**Suite :** attendre la réponse de Julien, puis mettre à jour dans un seul lot les cinq
emplacements listés dans `arbitrage-julien.md` (dont la correction de citation ci-dessus).

---

## 2026-08-17 (8) — Vérification officielle du statut NDA / Qualiopi (SIREN 924997539)

**Type :** audit (vérification réglementaire, aucune fiche modifiée)

**URLs :** https://recherche-entreprises.api.gouv.fr/search?q=924997539 — API officielle
agrégeant SIRENE et les données du Ministère du Travail

**Pourquoi :** `kit-identite.md` (§3) et `NETLINKING-ACTIONS.md` (l.8-12) affirmaient sans
vérification que Claude Agency est un cabinet de conseil non déclaré organisme de formation,
avec les annuaires Qualiopi fermés en conséquence. Vérification demandée avant de trancher la
catégorie des 6 fiches de la Vague 1 et l'éligibilité aux deux fédérations de la Vague 2.

**Fait :** requête API sur le SIREN 924 997 539. Réponse : `est_organisme_formation: true`,
`liste_id_organisme_formation: ["11757002275"]` (NDA 11 75 70022 75, champ documenté dans le
schéma OpenAPI de l'API comme provenant du Ministère du Travail) et `est_qualiopi: true`, donnée
mise à jour le 16/08/2026. **Ce constat contredit l'hypothèse posée dans les deux fichiers
ci-dessus** : ce SIREN est bien un organisme de formation déclaré, certifié Qualiopi. Section
« 4. Statut réglementaire » ajoutée dans `kit-identite.md` avec le détail et les sources. Le NAF
85.59B n'a pas été utilisé comme preuve (générique, ne prouve rien seul). Conséquence actée pour
ce constat (consigne reçue) : rien à soumettre côté annuaires Qualiopi, les listes publiques
recopiant déjà le fichier du Ministère du Travail — ils restent donc écartés (onglet
⛔ Interdits). La catégorie des 6 fiches et l'éligibilité aux deux fédérations ne sont **pas**
modifiées ici : décision qui revient à Julien.

**Mesure :** non applicable — vérification documentaire, aucune fiche soumise.

**Suite :** Julien tranche si la catégorie des 6 fiches (`kit-identite.md` §3) et le bandeau
d'éligibilité de `NETLINKING-ACTIONS.md` (l.8-12) doivent être mis à jour (« organisme de
formation » en plus de ou à la place de « cabinet de conseil »).

---

## 2026-08-17 (7) — Description inédite rédigée pour la fiche Annuaire du Conseil

**Type :** netlinking (préparation, aucune fiche soumise)

**URLs :** aucune — document interne `docs/seo/fiche-annuaireduconseil.md`

**Pourquoi :** l'entrée précédente signalait que ce site exige une description « unique, jamais
publiée ailleurs en ligne » — les trois descriptions de `kit-identite.md` ne convenaient pas.

**Fait :** description de 387 caractères rédigée pour cette seule fiche, mêmes faits que
`kit-identite.md` (cabinet parisien, organismes de formation francophones, automatisation des
obligations administratives, autonomie des équipes) mais entièrement reformulés — vérifié à la
relecture qu'aucune phrase des trois descriptions existantes ni du site n'est reprise. Aucune
limite de caractères trouvée sur `/info/useCondition` : ciblée par défaut sur 300-400. Longueur
recomptée mécaniquement (Node) après écriture dans le fichier, pas estimée. Section dédiée
ajoutée dans `fiche-annuaireduconseil.md`, tableau et marche à suivre mis à jour en conséquence.

**Mesure :** non mesuré — texte prêt, rien de soumis.

**Suite :** SOLOHERY colle cette description à l'étape 6 de la marche à suivre.

---

## 2026-08-17 (6) — Fiche Annuaire du Conseil préparée, formulaire réel derrière connexion

**Type :** netlinking (préparation, aucune fiche soumise, aucun compte créé)

**URLs :** aucune publiée — document interne `docs/seo/fiche-annuaireduconseil.md` ; cible
visée : https://annuaireduconseil.com/webmaster-submit-website.html

**Pourquoi :** item #4 de la Vague 1, condition remplie côté site (lien retour posé au footer,
entrée précédente). SOLOHERY doit pouvoir soumettre la fiche sans deviner les champs.

**Fait :** page d'accueil et page de règles (`/info/useCondition`) lues avec succès, mais le
formulaire de soumission du site vit derrière un compte (e-mail/mot de passe) — non créé, hors
périmètre de Claude Code. Liste de champs reconstituée à partir des règles publiées et de la
structure standard d'un annuaire. Trouvé et consigné : la description doit être **unique, jamais
publiée ailleurs en ligne** — les textes de `kit-identite.md` (dont le long, déjà sur LinkedIn) ne
conviennent donc pas ici, une description neuve reste à rédiger. `fiche-annuaireduconseil.md`
créé : tableau Champ/Valeur/Remarque, marche à suivre en 10 étapes qui s'arrête avant l'offre
Premium payante, ligne Preuve laissée vide.

**Mesure :** non mesuré — document de préparation, rien de soumis.

**Suite :** SOLOHERY vérifie que le lien retour est en ligne (déploiement Cloudflare), rédige la
description unique demandée, puis exécute les 10 étapes.

---

## 2026-08-17 (5) — Lien retour vers annuaireduconseil.com dans le footer

**Type :** netlinking (lien posé sur le site)

**URLs :** https://claudeagency.fr/ (footer, toutes les pages) → https://annuaireduconseil.com/

**Pourquoi :** condition d'inscription à Annuaire du Conseil (Vague 1 #4,
`NETLINKING-ACTIONS.md`) : lien retour depuis claudeagency.fr en échange de la fiche.

**Fait :** `app/src/components/Footer.astro` — un lien vers `https://annuaireduconseil.com/`
ajouté dans la barre de copyright, sur le même motif que le lien existant vers
`annuaireformation.fr` (aucun composant nouveau, aucun script de réécriture). `npm run build`
passe (158 pages), lien vérifié présent dans `dist/index.html`.

**Mesure :** non mesuré — lien posé, fiche pas encore soumise côté Annuaire du Conseil.

**Suite :** SOLOHERY soumet la fiche Annuaire du Conseil une fois le déploiement Cloudflare en
ligne et le lien visible sur le site en production (voir `docs/seo/fiche-annuaireduconseil.md`).

---

## 2026-08-17 (4) — Fiche PagesJaunes/Solocal préparée, page bloquée par anti-robot

**Type :** netlinking (préparation, aucune fiche soumise, aucun compte créé)

**URLs :** aucune publiée — document interne `docs/seo/fiche-pagesjaunes-solocal.md` ; cible
visée : https://www.solocal.com/landing/inscription-gratuite-pagesjaunes

**Pourquoi :** item #3 de la Vague 1 (`NETLINKING-ACTIONS.md`). SOLOHERY doit pouvoir coller les
valeurs sans deviner ni recopier de mémoire.

**Fait :** trois tentatives de lecture de la page (`WebFetch`, navigateur x2) ont échoué —
`WebFetch` renvoie 403, le navigateur affiche l'interstitiel Cloudflare « Just a moment… ».
Basculé sur la liste de champs standard d'une fiche Solocal, croisée avec `NETLINKING-ACTIONS.md`
l.35-37. `docs/seo/fiche-pagesjaunes-solocal.md` créé : tableau Champ/Valeur/Remarque rempli
depuis `kit-identite.md` (NAP verbatim), horaires et effectif marqués « à trancher », marche à
suivre en 12 étapes qui s'arrête avant toute demande de moyen de paiement, ligne « Preuve »
laissée vide pour SOLOHERY. Aucun compte créé, aucun mot de passe saisi, aucune fiche soumise.

**Mesure :** non mesuré — document de préparation, rien de publié.

**Suite :** SOLOHERY exécute les 12 étapes, colle l'URL de la fiche dans la ligne Preuve du
document une fois validée.

---

## 2026-08-17 (3) — Kit d'identité : logo tranché — symbole seul, pas de wordmark

**Type :** netlinking (préparation, aucun lien créé, aucune fiche soumise)

**URLs :** aucune — document interne `docs/seo/kit-identite.md`

**Pourquoi :** point laissé ouvert par l'entrée précédente (absence de logotype avec le texte
« Claude Agency »). Julien tranche : le symbole seul suffit, cohérent avec le site
claudeagency.fr qui utilise lui-même du texte stylé en HTML plutôt qu'un logo graphique avec le
nom intégré.

**Fait :** `kit-identite.md` mis à jour — la note sur le logo acte la décision au lieu de la
lister comme ouverte, et une section « Reste » ajoutée en fin de document reprend les deux points
encore ouverts (logo à revoir si un annuaire l'exige explicitement, effectif non prouvé).

**Mesure :** non mesuré — document de préparation, aucune fiche encore soumise.

**Suite :** utiliser ce kit pour créer les 6 fiches de la Vague 1.

---

## 2026-08-17 (2) — Kit d'identité : description ~500 caractères ajoutée, logo SVG vérifié

**Type :** netlinking (préparation, aucun lien créé, aucune fiche soumise)

**URLs :** aucune — document interne `docs/seo/kit-identite.md`

**Pourquoi :** relecture de Julien sur l'entrée précédente : la cible ~500 caractères du prompt
initial n'était pas couverte (seulement 169 et 1650), et l'hypothèse sur `favicon.svg` comme
« logo SVG » n'avait pas été vérifiée visuellement.

**Fait :** description moyenne de 481 caractères ajoutée dans `kit-identite.md`, condensée à
partir des mêmes phrases déjà sourcées (aucun fait nouveau) — les trois longueurs (169 / 481 /
1650) coexistent désormais, chacune avec sa longueur exacte et sa source. `logo.png` et
`favicon.svg` comparés (lecture du SVG + rendu visuel du PNG) : même étoile à 12 branches, même
couleur `#CC785C`, sans texte — ce n'est pas une favicon distincte d'un logo, les deux fichiers
sont bien le même symbole en deux formats. Noté cependant : aucun logotype avec le texte « Claude
Agency » n'existe dans le dépôt, seulement le symbole seul.

**Mesure :** non mesuré — document de préparation, aucune fiche encore soumise.

**Suite :** utiliser ce kit pour créer les 6 fiches de la Vague 1 ; trancher avec Julien si un
annuaire exige un logo avec le nom de l'entreprise inscrit dessus (absent du dépôt).

---

## 2026-08-17 — Kit d'identité : NAP source unique + descriptions + champs annuaires

**Type :** netlinking (préparation, aucun lien créé, aucune fiche soumise)

**URLs :** aucune — document interne `docs/seo/kit-identite.md`

**Pourquoi :** la Vague 1 de `NETLINKING-ACTIONS.md` (6 fiches à créer) demande un NAP identique
sur toutes les fiches sous peine de dédoublement d'entité côté Google. Le kit centralise le NAP,
les deux descriptions déjà rédigées et les champs récurrents des annuaires pour que SOLOHERY
copie sans reformuler.

**Fait :** `docs/seo/kit-identite.md` créé avec le NAP fourni le 13/08/2026 (nom, adresse,
téléphone) en bloc de code intouché, la description courte de `NETLINKING-ACTIONS.md` (169
caractères, calibrée 200) et la description longue de `linkedin-kit.md` (1650 caractères,
calibrée 1500-2000), et un tableau des champs annuaires (catégories, zone, langue, année de
création, e-mail public, logo PNG/SVG du dépôt). Effectif marqué « à trancher », non prouvé.
Aucun texte à ~500 caractères ne s'est trouvé dans les deux sources : signalé plutôt qu'inventé.

**Mesure :** non mesuré — document de préparation, aucune fiche encore soumise.

**Suite :** utiliser ce kit pour créer les 6 fiches de la Vague 1 ; rédiger le texte ~500
caractères si un annuaire l'exige.

---

## 2026-08-15 (3) — Plan SOLOHERY : B9 supprimée, retour à la ligne partout, onglet Mesures refondu

**Type :** documentation de pilotage (aucune page, aucun contenu publié, aucun lien modifié)

**Pourquoi :** trois demandes de Julien — supprimer l'action B9, activer le retour automatique à la
ligne sur l'ensemble des onglets, et simplifier l'onglet `Mesures` pour qu'il réponde à ses deux
questions de manager : le travail a-t-il été mené jusqu'au bout, et qu'est-ce que ça a donné.

**Fait — B9 supprimée, le plan passe de 76 à 75 tâches** sur les chantiers A à E (81 avec les
6 étapes du chantier F, qui vivent hors des cinq chantiers). Les deux lignes qui en dépendaient
sont recalées : B6 ne dépend plus de rien et son repli — commenter depuis son propre profil, avec
Claude Agency dans le titre — devient le chemin principal ; A9 dépend de A1.

**Fait — retour automatique à la ligne** sur les dix onglets, vérifié au préalable sur une cellule
témoin : `GOOGLESHEETS_FORMAT_CELL` n'applique que les propriétés qu'on lui passe, un appel avec le
seul `wrap_strategy` conserve fond, gras, couleur et alignement. Seuls les titres de section de
l'onglet d'accueil restent en `OVERFLOW_CELL`, pour déborder sur leurs voisines vides plutôt que
de s'empiler dans une colonne de 209 px.

**Fait — onglet `Mesures` refondu en 5 blocs.** L'onglet était un relevé de 18 indicateurs à plat ;
il devient un tableau de bord qui se lit dans l'ordre des questions.
1. *Le travail a-t-il été fait ?* — six lignes calculées depuis les onglets de tâches (tâches,
   faites, bloquées, reste à faire) et une colonne d'alerte, `⚠ Faites sans preuve`
   (`COUNTIFS(statut="Fait" ; preuve="")`). C'est le vrai contrôle du manager : la règle du plan
   est que sans preuve une tâche reste « En cours ».
2. *Les objectifs sont-ils atteints ?* — les 6 objectifs chiffrés du sprint avec cible, avant,
   après et un verdict par ligne, plus un verdict global.
3. *Les autres chiffres* — les 9 indicateurs sans cible, avec le sens de lecture (`↑ mieux` /
   `↓ mieux`, qui manquait pour la position moyenne et le LCP) et l'écart calculé.
4. *L'argent dépensé* — les trois enveloppes, avec le reste calculé.
5. *Le 27/08* — le prompt de relevé, réécrit sur les nouvelles adresses de cellules.

La colonne « Skill équipe conseillée » disparaît de cet onglet : elle répétait la même
recommandation 18 fois. Une seule colonne se saisit désormais à la main, « Après (27/08) ».
Les renvois qui citaient l'ancienne mise en page sont corrigés : A12, E3 (prompt, livrable et
critère) et la note « ce qu'est une skill » de l'onglet d'accueil.

**Incident technique, à retenir pour toute réécriture de bloc.** Une cellule fusionnée héritée de
l'ancienne mise en page (`B22:F22`) avalait silencieusement les écritures : l'API répondait
`updatedCells: 4` et la relecture rendait des cellules vides. Aucun outil d'*unmerge* n'est exposé
côté Composio — la parade est de supprimer la ligne puis d'en réinsérer une au même index, ce qui
détruit la fusion et laisse la structure inchangée (formules et plages vérifiées après coup :
`COUNTIF(F18:F23; …)` est bien revenu à ses bornes). **À contrôler avant de réécrire un bloc :**
`GOOGLESHEETS_GET_SPREADSHEET_INFO` avec `fields=sheets(properties(sheetId,title),merges)`.

**Point à surveiller.** Les valeurs « Avant (12/08) » de l'ancien tableau ont été écrasées par le
premier jet du bloc 1, puis réécrites depuis le dépôt (`PLAN-SOLOHERY.md` §2 et `BACKLOG.md`) :
0 domaine référent, 0 backlink, autorité 1/100, 49 clics, 2 797 impressions, position 33,3, LCP
4,2 s. Une seule ne figurait nulle part — les abonnés LinkedIn : elle est à 0 parce que la page
entreprise n'existe pas encore (c'est la tâche B10 qui la crée), et cette raison est écrite dans
la cellule plutôt que laissée à deviner.

---

## 2026-08-15 (2) — Plan SOLOHERY : revue critique des 10 onglets, 76 tâches

**Type :** documentation de pilotage (aucune page, aucun contenu publié, aucun lien modifié)

**Pourquoi :** seconde passe demandée par Julien — critiquer et améliorer chaque onglet, un
relecteur par onglet, avec trois objectifs : compréhensible par SOLOHERY, sans incohérence,
efficace pour Claude Code.

**Fait — 7 tâches ajoutées, le plan passe de 69 à 76.** A14 (saisir le code Google reçu par
courrier — personne ne vérifiait qu'il arrivait, alors que la validation de la fiche en dépend) ·
A15 (relire le NAP sur les 6 fiches en ligne, seul contrôle qui protège la valeur des six autres
tâches) · B9 (profil LinkedIn de Julien : c'était la tâche manquante derrière le trou B2, et son
contenu dormait déjà rédigé dans `docs/seo/linkedin-kit.md`) · B10 (réserver l'URL LinkedIn que
`app/src/layouts/BaseLayout.astro` déclare déjà dans le `sameAs` de toutes les pages, alors que la
page n'existe pas) · D24 (suivre les réponses positives jusqu'au rendez-vous — le plan s'arrêtait
à l'envoi) · E6 (compte des dépenses engagées : trois enveloppes couraient sans totalisation) ·
E7 (passage de relais pour les cinq échéances de septembre).

**Fait — corrections de fond.** Chaîne de dépendances de la prospection refaite : D12 dépendait de
la mauvaise tâche et n'apparaissait dans aucun verrou de D5, on pouvait donc lancer la vague du
25/08 avec une séquence vide. C6 visait un article supprimé le 14/08 et un autre qui avait déjà sa
couverture : ligne réécrite sur la dette réelle (28 des 54 articles partagent la même image
générique). C1 ne produisait aucun fichier, donc C2 n'avait rien à ouvrir quatre jours plus tard :
deux CSV à chemin explicite. C5 demandait de mettre en noindex un sous-domaine que ce dépôt ne
sert pas. Une trentaine de prompts « ouvre la page et remplis le formulaire » inversés : Claude
Code n'a pas de navigateur, il rend le texte champ par champ et dit où cliquer.

**Fait — onglet Mesures.** Le débat 28 jours / 88 jours tranché sur 88, la fenêtre que relève
déjà C1 : les cases « inconnu » retrouvent leurs 49 clics et 2 797 impressions. Ajout d'une ligne
de **verdict automatique** (objectif ≥ 5 domaines référents, atteint ou non), de trois lignes de
suivi budgétaire et d'une colonne Écart calculée. 15 → 18 indicateurs.

**Fait — onglet ⛔ Interdits, 17 → 23 lignes.** Les six ajouts vivaient ailleurs sans avoir jamais
été écrits là : seconde fiche Google, second compte Saleshandy, envoi avant le 25/08, toucher à
`contact@claudeagency.fr`, écrire un chiffre non vérifié, refaire une fusion d'articles avant le
relevé du 11/09. Les huit qui manquaient côté dépôt sont ajoutés à `PLAN-SOLOHERY.md` §7, avec la
règle qui a manqué : une décision écartée s'écrit aux deux endroits le même jour.

**Fait — dans le dépôt.** DMARC recalé au 25/09 (un mois après le premier envoi du 25/08, pas
12/09). `BACKLOG.md` ne renvoie plus à la skill `netlinking-ecole-naturo`, qui appartient à un
autre projet et se calibre sur un site santé YMYL, mais aux 7 critères de l'onglet F.

**Tranché par Julien le 15/08/2026 — trois arbitrages.**
1. **Les 20 liens s'achètent en `dofollow`, risque assumé.** `NETLINKING.md` §6.3 dit l'inverse et
   n'a pas été retiré : l'analyse reste exacte, et la décision se prend contre elle en connaissance
   de cause. Un encadré daté la consigne, avec ce qui reste non négociable — mention « article
   sponsorisé » visible (obligation légale française, distincte du risque Google), 0 % d'ancre
   exacte au démarrage, filtrage qualité sur chaque donneur. À rouvrir si une pénalité manuelle
   apparaît dans la Search Console.
2. **Les demandes d'adhésion partent de `equipe1@claudeagency.fr`**, plus de l'adresse Gmail
   personnelle. Corrigé à la source dans `NETLINKING-ACTIONS.md`, que lisent A7, A8, A9 et A10.
3. **B9** : Julien ouvre l'accès à son profil LinkedIn, SOLOHERY colle. La tâche n'attend donc
   personne, et garde son repli à 48 h.

**Point mesuré au passage.** Les 2 797 impressions de référence ne sont pas filtrées du bruit
robot (~140 affichages, 0 clic). Le point de départ du sprint est donc légèrement faux aux trois
endroits où il est écrit. C1 relève la même fenêtre avec le filtre : c'est sa sortie qui corrigera
les trois d'un coup. Les 49 clics ne bougent pas.

---

## 2026-08-15 — Plan SOLOHERY : skills d'équipe assignées, passe de cohérence, `PLAN-SOLOHERY.md` remis d'aplomb

**Type :** documentation de pilotage (aucune page, aucun contenu publié, aucun lien modifié)

**Pourquoi :** Julien voulait que SOLOHERY sache, tâche par tâche, quelle skill d'équipe
(`github.com/JRAYES000/marketplace-equipe`) déclencher — et que le plan cesse de se contredire.

**Fait — Google Sheet du sprint.** Trois colonnes ajoutées à chaque onglet de tâches, placées
**entre « À faire » et « Livrable attendu »** : skill conseillée, comment la déclencher, ce que ça
change. 75 lignes annotées : 34 `phrase-magique`, 22 `fonce`, 8 `parallelisation-et-routage`,
3 `ponytail`, 8 sans skill. `delegation-deepseek-openrouter` n'est conseillée nulle part —
les seules tâches assez volumineuses portent des coordonnées nominatives de prospects, que la skill
interdit d'envoyer à un modèle tiers. Deux sections ajoutées à l'onglet d'accueil : le catalogue
des skills, et les réflexes du guide « Bien utiliser Claude » (`/clear` par sujet, `/context` avant
un gros travail, `/compact` en dernier recours, passe de preuves en conversation neuve).

**Fait — incohérences corrigées dans la Sheet.** Sept factuelles : 69 → 54 articles (onglet C et
accueil) ; « 62 mots-clés devinés » → 53 lignes `deduite-du-slug-A-VALIDER` + 10 `deduite-A-VALIDER`
comptées dans `REQUETES.csv` ; D4 annonçait 3 e-mails pour une séquence qui en compte 5 ; A9 et B6
dépendaient d'une tâche `B2` qui n'existe pas ; D00a datée J1 · 14/08 alors que J1 = 13/08 partout
ailleurs ; D11 planifiée avant la tâche dont elle dépend ; D23 due avant D12 dont elle dépend ; F1
présentée comme « la seule étape à la main » alors que F5 (l'achat) l'est aussi ; seuil D+ qui
parlait de « deux autres boîtes » sur une rotation qui en compte quatre.

**Fait — quatre arbitrages tranchés par Julien le 15/08.**
1. **Premier envoi au mardi 25/08**, pas le 18/08. Le 18/08 était impossible : D3 ne rend les
   e-mails des décideurs que le 20/08. Chauffe portée à 12 jours (13 → 24/08), montée en charge de
   l'onglet D+ décalée d'une semaine, D6 au 26/08.
2. **Tâche B8 créée** : B3 fait écrire 10 posts LinkedIn, B4 et B5 n'en publiaient que 8.
   À un post tous les 2 jours, la série court jusqu'au 17/09 — écrit noir sur blanc plutôt que
   laissé implicite.
3. **Inscriptions du webinaire (D19) → Google Sheet dédié.** Le critère exigeait qu'une inscription
   de test « arrive dans la liste » sans jamais dire laquelle, et Brevo est interdit sur ce projet.
4. **Dates du week-end** : seules les tâches impliquant un tiers sont décalées (A9 quittait le
   samedi 15/08, férié). La fenêtre de B4 était arithmétiquement impossible — 4 posts « mardi ou
   jeudi » dans une fenêtre qui ne contenait qu'un mardi — et a été refaite sur des dates explicites.

**Fait — `docs/PLAN-SOLOHERY.md` corrigé sur cinq points** où il contredisait la Sheet :
articles 69 → 54 ; « un seul enregistrement DNS » → quatre CNAME `go`, un par domaine d'envoi ;
warm-up 14 jours → 12 jours avec départ au 25/08 ; « le premier envoi ne peut pas partir dans le
sprint » → il part le 25/08 ; section 8 « Points à trancher par Julien » marquée périmée par la
règle D00b du 14/08, et ligne netlinking alignée sur l'enveloppe déjà autorisée.

**Non fait volontairement.** Aucune tâche du plan n'a été exécutée — seul le plan a été corrigé.
Les chiffres « Avant » de l'onglet Mesures restent à `inconnu` sur les lignes GSC : ils sont
annoncés sur 28 jours alors que le relevé de référence porte sur 88 jours (14/05 → 09/08). Les
mesurer relève de la tâche C1, pas de cette passe — et écrire 49 clics dans une case « 28 jours »
aurait été un chiffre inventé.

---

## 2026-08-14 — Ménage : 15 articles fusionnés (cannibalisation) + 5 docs supprimés

**Type :** consolidation de contenu + nettoyage de la documentation

**Pourquoi :** audit de cannibalisation demandé par Julien. Similarité TF-IDF (bigrammes, cosinus)
calculée entre les 69 articles, croisée avec `REQUETES.csv` : **32 paires > 0,28 de similarité,
6 paires > 0,45**. Des articles traitant le même sujet se disputaient les mêmes requêtes. Rien
n'était « vieux » — tout le blog date de juin-juillet 2026 — le problème était la redondance.

**Fait — 15 fusions, blog de 69 à 54 articles.** Contenu utile reversé à la main dans l'article
gardé (jamais par script, cf. incident du 03/07), ancienne URL en 301.

| Supprimé | Sim. | Clics/Impr. | → Fusionné dans |
| :--- | ---: | ---: | :--- |
| `automatiser-gestion-qualiopi-ia` | 0,50 | 0 / 0 | `automatiser-qualiopi-ia` |
| `qualiopi-ia-gagner-5h-semaine` | — | 0 / 0 | `automatiser-qualiopi-ia` |
| `reduire-charge-administrative-organisme-formation` | — | 0 / 0 | `automatiser-qualiopi-ia` |
| `automatiser-bpf-organisme-formation` | 0,52 | 0 / 138 | `remplir-bpf-organisme-formation` |
| `seo-guide-complet-organisme-formation-2026` | 0,47 | 0 / 20 | `seo-organisme-formation` |
| `remplir-sessions-formation` | 0,40 | 0 / 1 | `seo-organisme-formation` |
| `rgpd-ia-organisme-formation` | 0,45 | 0 / 1 | `donnees-stagiaires-rgpd-ia` |
| `automatiser-emargement-suivi-stagiaires` | 0,40 | 0 / 9 | `feuille-emargement` |
| `audit-surveillance-qualiopi` | 0,39 | 0 / 9 | `qualiopi-guide-organisme-formation` |
| `financer-formation-opco-cpf-france-travail` | 0,34 | 0 / 5 | `plan-financement-formation` |
| `formation-claude-anthropic-organisme-formation` | — | 0 / 0 | `formation-claude` |
| `claude-agency-vs-concurrents` | 0,36 | 0 / 40 | `meilleure-agence-ia-organisme-formation` |
| `claude-code-organisme-formation` | 0,51 | 1 / 14 | `formation-claude-code` |
| `optimisation-site-organisme-formation` | — | 0 / 1 | `/services/optimisation-site/` |
| `creer-organisme-formation` | 0,47 | 0 / 2 | `numero-declaration-activite` |

**Le cas à surveiller — le BPF.** `automatiser-bpf` captait 138 impressions sur « logiciel bilan
pédagogique et financier », mais en position 34. `remplir-bpf` est deux fois plus long et en
position 14,6. La fusion a explicitement **repris le champ lexical « logiciel BPF »** dans
l'article gardé (nouvelle section « Quel logiciel pour préparer son BPF ? ») et son title est
devenu « BPF : comment le remplir, avec ou sans logiciel ». **À vérifier au relevé du 11/09** :
si les 138 impressions ne se reportent pas, le title est à revoir.

**Fait — 88 liens internes réécrits** à la main, dont 34 ancres reformulées (une ancre qui citait
le titre d'un article supprimé pointait vers un article au titre différent). Contrôle : 0 lien
interne cassé dans le HTML généré (vérifié sur `dist/`).

**Fait — 15 redirections 301** dans `app/public/_redirects`, posées dans le même commit.

**Fait — 5 documents supprimés (78 Ko).** `docs/reference-technique-astro.md` (guide de
construction d'un site déjà construit, 23 mentions de l'ancien domaine), `SEO-STRATEGY.md`
(14/06, bâti sur les données GSC de `sc-domain:claudepartners.fr` — remplacé par ce dossier),
`docs/seo/netlinking-cibles.md` (16/06, remplacé par `NETLINKING-ACTIONS.md` du 12/08),
`docs/seo/audit-technique-ubersuggest.md` (crawl de l'ancien domaine), `ONBOARDING.md` (gabarit
auto-généré vide). Les 8 références pointant vers ces fichiers ont été corrigées.

**Corrigé au passage :** `docs/lead-magnet-emails.md` envoyait les liens PDF et audit vers
`claudepartners.fr`. Bug en production sur le lead magnet, réparé.

**Non fait, volontairement.** Cinq articles à 0 impression **sans doublon** ont été conservés
(`ia-pedagogie-personnalisation`, `roi-ia-organisme-formation`, `formation-ia-equipe`,
`tarifer-formations-organisme-formation`, `sea-google-ads-organisme-formation`). Six semaines
d'existence sur un domaine d'autorité 1 : l'absence d'impression n'est pas une donnée. Décision
au relevé du **11/09**. Ne pas les resupprimer sans ce relevé.

**Mise en garde à retenir.** Ce ménage traite la cannibalisation, il ne débloquera pas le trafic.
Le point de blocage reste celui du backlog : **0 backlink, autorité 1/100**. Vague 1 du netlinking
(`NETLINKING-ACTIONS.md`) avant toute nouvelle action sur le contenu.

**Mesure :** aucune à ce stade — une consolidation se lit sous 3 à 6 semaines.
**Suite :** au relevé du **2026-09-11**, vérifier (1) le report des 138 impressions BPF,
(2) que les 15 URL redirigées ne génèrent pas de 404 dans GSC, (3) le sort des 5 articles gardés.

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
