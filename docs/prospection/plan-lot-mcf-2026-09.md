# Plan — enrichir les 334 lignes issues de moncompteformation

Ouvert le 2026-09-09. Base : « Cibles — Prospection OF » (Notion), **636 lignes** dont **334
sans `Objet` / `Mail 1` / `Relance J5` / `Stagiaires 2025` / `CA` / `Score cible`** (`mesuré`
2026-09-09, requête SQL sur la base). Ces 334 ont été collectées sur moncompteformation.gouv.fr
et sont majoritairement des organismes qui vendent de la formation à l'IA.

Ce fichier porte le plan, les hypothèses et les critères. Il se coche au fur et à mesure.

## Décisions de cadrage (Julien, 2026-09-09)

- **Périmètre** : les lignes qui ont **à la fois un site web et un e-mail**. Les autres restent
  vides et sont listées à part — un mail sans constat de site n'a pas d'accroche, une ligne sans
  adresse ne part pas (règle 2 du protocole d'envoi).
- **Angle** : vendre les **deux consultants Claude Agency**, pas du conseil en IA. Ces organismes
  vendent déjà de l'IA ; leur en vendre sonnerait creux. Source de l'argumentaire : le post
  LinkedIn de Julien du 2026-05 (`urn:li:activity:7501617164362211328`).
- **Score cible** : barème ci-dessous, proposé et validé le 2026-09-09.
- **Dédoublonnage** : par SIREN **et** par domaine d'e-mail, contre les 636 lignes. Signalement,
  aucune suppression.
- **Corrections au passage** : `Dirigeant` et `Qualiopi`, quand la source publique contredit la
  base.

## Contenu obligatoire du Mail 1 (Julien, 2026-09-09)

1. Les deux consultants **nommés**, avec leur expertise propre :
   **Solohery** — SEO, SEA, optimisation des campagnes Meta Ads.
   **Nomena** — audits blancs Qualiopi, prospection sur les réseaux sociaux, setting automatisé.
2. **Formés quatre mois à l'usage intensif de Claude Code**, immédiatement opérationnels.
3. **90 € HT la journée, licence comprise** — « une offre qu'on ne peut pas refuser ».
4. **Audit 100 % gratuit**, puis **payé au résultat, jamais aux moyens**, avec la formule déjà
   présente dans les 302 mails existants : « le mot poli, c'est obligation de moyens ; le mot
   juste, c'est escroquerie ».

**Réserve consignée** : le point 4 dénigre une profession dans un e-mail non sollicité. La
formule retenue vise une pratique et non des sociétés nommées, ce qui la rend plus défendable,
mais le risque de dénigrement subsiste. Julien a maintenu la demande après signalement.
Le point 4 engage aussi contractuellement sur un résultat dont les modalités ne sont pas écrites.

## Barème du score cible (sur 100)

| Critère | Points |
| :--- | :--- |
| Stagiaires (dernier exercice déclaré) | 0 → 0 · 1-9 → 3 · 10-49 → 8 · 50-199 → 15 · 200-499 → 22 · 500+ → 30 · inconnu → 8 |
| CA exploitable | inconnu → 8 · < 150 k€ → 10 · 150-500 k€ → 18 · > 500 k€ → 25 |
| Prestation vendue en plus de la formation | conseil explicite → 25 · formation entreprises → 12 · école / particuliers → 5 |
| Qualiopi actions de formation | 10 |
| Dirigeant identifié et confirmé par une source publique | 10 (5 si incertain) |

Le troisième critère est celui qui compte pour cette offre : un organisme qui ne vend que de la
formation n'achète pas des jours de consultant.

## Critères de réussite

- [x] Toutes les lignes à site + e-mail portent `Objet`, `Mail 1`, `Relance J5`, `Stagiaires 2025`
      et `Score cible` non vides. — **208/208, zéro champ vide** (`mesuré` sur la base relue).
- [x] Chaque `Mail 1` cite **au moins un fait lu sur le site** de l'organisme, la page étant
      nommée dans le journal de production. — **208/208** : 205 par n-gramme retrouvé mot pour
      mot dans le texte du site, 3 vérifiés à la main (Dolfi, Coco Auto-École, e-Formaction).
- [x] `Mail 1` ≤ 270 mots hors signature, `Relance J5` ≤ 120. Format `<br>` / `<b>`, zéro gras
      Markdown, ligne CNIL en pied, aucun bloc BULGARIA. — **0 problème sur 208**.
- [x] Les quatre éléments obligatoires ci-dessus sont présents dans **100 %** des `Mail 1`.
      — dix motifs contrôlés un par un, **0 manque sur 208**.
- [x] Zéro mention de CPF, OPCO ou France Travail comme finançant une prestation Claude Agency.
- [x] Aucune valeur chiffrée inventée. — `CA` : 0 écart contre la source, 29 lignes du lot en
      portent un. Stagiaires : 0 écart contre le LPOF. **Un prix inventé trouvé et corrigé**
      (INSTITEC, « 1 645 € HT », absent d'`institec.fr`).

## Sources — ce qui vient d'où

| Colonne | Source | Remarque |
| :--- | :--- | :--- |
| Stagiaires 2025 | Liste Publique des OF, data.gouv `ac59a0f5-fa83-4b82-bf12-3c5806d4f19f` | Dernier exercice déclaré (clos au 31/12/2025 pour les déclarations de mai 2026) |
| CA, année du CA | `recherche-entreprises.api.gouv.fr` | Bilans déposés uniquement |
| Qualiopi, ville, région, formateurs | LPOF | |
| Dirigeant, statut, effectif | API entreprises | |
| Constat d'accroche | Site de l'organisme, lu par `crawl.py` | Accueil + 5 pages |

**Un CA à 0 € n'est pas un CA** : c'est un champ non renseigné au dépôt. CORTISUM dépose 0 € de
CA avec 32 896 € de résultat net sur 2024. Ces cas restent vides.

**Le fichier LPOF se télécharge tronqué sans erreur visible.** Le premier téléchargement du
2026-09-09 a rendu 126 823 lignes sur 166 200, et `curl` a fini en code 56 — mais le CSV se
parse normalement et donne des « SIREN absents » qui n'ont rien d'absent. `enrich.py` refuse
donc de tourner sous 160 000 lignes.

## Étapes

- [x] **0. Lot pilote de 5**, écrit et validé le 2026-09-09 : TALK RH (68), CORTISUM (63),
      L'Forme (57), WAYSTAGE (43), BEAUVOIR (41). Sert de référence de ton et de format.
- [x] **1. Export de la base** → 636 lignes, 329 sans mail (`mesuré`).
- [x] **2. Rapprochement** LPOF + API entreprises. **329/329 SIREN appariés.**
- [x] **3. Dédoublonnage** SIREN, adresse et domaine : **zéro collision**.
- [x] **4. Lecture des sites** : 255 lus, 32 injoignables, 22 illisibles.
- [x] **5. Rédaction** : 208 séquences en 21 lots.
- [x] **6. Contrôle par script** à chaque lot : 21/21 verts.
- [x] **7. Écriture dans Notion** : 329 lignes de données + 208 séquences, **zéro échec**.
- [x] **8. Ligne de journal** dans `protocole-envoi.md`. **Aucun envoi n'a été déclenché.**

## Le blocage Notion, et comment il a été levé

Le jeton `NOTION_TOKEN` du coffre appartient à l'intégration **« Leads site claudeagency.fr »**,
qui n'était connectée qu'aux bases des leads du site. Sur *Cibles — Prospection OF*, l'API rendait
un `404 object_not_found` — le piège déjà consigné dans `CLAUDE.md` : l'intégration s'ajoute
**base par base** dans l'interface Notion.

**Levé le 2026-09-09** en ajoutant la connexion depuis la base (menu `•••` → Connexions), pilotée
par Chrome. Contrôle : `GET /v1/databases/<id>` et `POST .../query` répondent.

Le quota SQL du connecteur MCP est épuisé depuis le 2026-09-06 ; seul le mode `rows` répond.
C'est une raison de plus de passer par l'API REST pour tout traitement de masse sur cette base.

## Points relevés au pilote, à trancher pour le lot complet

- **Les dirigeants de la base sont faux dans une proportion élevée** : 2 sur 5 au pilote.
  CORTISUM porte « Nassar Stephanie » quand l'API donne AYROUT Mohsen ; L'Forme porte
  « LEQUEUX Claire » quand la page *à propos* nomme Hafida et Djamila comme fondatrices.
  Une civilité fausse en première ligne tue le mail.
- **Qualiopi est faux sur les 5 du pilote** : `__NO__` en base, `true` au LPOF.
- **Le CA sera vide presque partout** : sociétés récentes qui ne déposent pas leurs comptes.
  0 sur 5 au pilote.
- **Des sites sont morts** : instapreneurpro.fr (SCORE, SIREN 824778682) ne répond pas.
- **La clause « un organisme par bassin d'emploi »** des 302 relances existantes devient
  intenable à 636 lignes. Elle n'a pas été reprise dans les relances du pilote.


## Ce que le chantier a produit (2026-09-09)

| | Lignes |
| :--- | ---: |
| Base | 636 |
| Sans mail au départ | 329 |
| **Séquences rédigées et écrites** | **208** |
| Écartées — plus de 49 salariés, ou CA > 5 M€, ou > 10 000 stagiaires, ou > 200 formateurs | 28 |
| Écartées — pas de site web | 42 |
| Écartées — site injoignable | 32 |
| Écartées — site illisible (SPA, PDF, page vide) | 22 |

Données écrites sur les 329 : `Stagiaires 2025` (329/329), `Qualiopi` corrigé de `NON` à `OUI`
(329), `CA (€)` + `Annee du CA` (57), `Ville` (328), `Région` (319), `Dirigeant` (16), `Score
cible` (329). Zéro échec d'écriture.

## Réserves à trancher avant l'import SalesHandy

- **NATURELIA** : adresse `sdulac@naturelia.frr` — double « r ». Rebond certain.
- **2MS ANTILLES** : adresse `contat@2msantilles.com` — « contat » sans le c. Syntaxiquement
  valide, donc invisible au contrôle automatique.
- **NEXT FORMA et WEFORMAT** : même dirigeant (Patrick Oinounou), deux SIREN, deux domaines.
  Le dédoublonnage SIREN et domaine ne pouvait pas l'attraper. Les deux mails ont des angles
  distincts ; reste à décider si les deux partent.
- **Adresses chez un fournisseur grand public** sans ancrage du nom dans le domaine, que le
  filtre du 01/09 écarterait : My Music Ads, NOURF GROUP, AVENIR ET COMPETENCES,
  VITAE PROJECT (adresse en `@live.fr`), GALDEMAR (gmail), ML SOCIAL INDUSTRY (gmail).
- **GAME OF WORKS** : le site `ese-gow.fr` sert des pages de casino en ligne injectées. Le mail
  le signale plutôt que de l'ignorer.
- **Bassins d'emploi** : trois organismes à Anglet (SPIRIT FORMATION, CHAMBRON LAURA,
  ECOLE DE LA TOILE), deux en Vendée à 10 km (ATC à Challans, BRIO FORMATION à Soullans).
  La clause d'exclusivité par bassin n'a pas été reprise dans les relances, mais l'ordre
  d'envoi mérite d'être espacé.
- **90 divergences de dirigeant conservées** : moncompteformation déclare souvent le responsable
  pédagogique là où l'API entreprises donne le gérant. La base n'a pas été écrasée ; ces lignes
  portent une civilité prudente (« Bonjour, ») et −5 au score.

## Pièges rencontrés, à ne pas refaire

- **Le LPOF se télécharge tronqué sans erreur lisible.** 126 823 lignes sur 166 200 au premier
  passage, `curl` en code 56, et un CSV qui se parse normalement — donnant des « SIREN absents »
  qui n'ont rien d'absent. `enrich.py` refuse désormais de tourner sous 160 000 lignes.
- **Huit threads suffisent à saturer le résolveur DNS local.** 94 sites déclarés injoignables
  au premier passage, 32 réellement morts après relance à trois threads avec reprise sur
  `getaddrinfo failed`. Un site vivant testé seul répond parfaitement.
- **Un CA à 0 € n'est pas un CA.** Voir CORTISUM : 0 € de CA déclaré, 32 896 € de résultat net.
- **Comparer des noms de dirigeants par préfixe de chaîne ne marche pas.** « ORTIS Stéphanie »
  contre « Stephanie Monique Mathilde Ortis » est la même personne. Comparer des jetons
  normalisés, et ignorer les dirigeants personnes morales (ni nom ni prénom) qui feraient
  écrire une chaîne vide par-dessus un nom juste.

## 2026-09-10 — récupérer les organismes écartés faute de site lisible

Sur les 93 organismes qui ont une adresse, sont dans la cible, et n'ont pas reçu de mail :
42 n'ont aucun site déclaré, **51 en ont un qui n'avait pas pu être lu**. Ces 51 ont été repris.

**Trois quarts des échecs n'étaient pas des sites morts.**

| Cause réelle | Organismes |
| :--- | ---: |
| Le site répondait, le crawl initial l'avait déclaré mort à tort | 2 |
| L'URL de la base pointait une fiche moncompteformation périmée — la racine du domaine vit | 7 |
| Site en JavaScript ou vitrine vide : illisible sans navigateur | 23 |
| Domaine réellement mort (DNS, 404 partout, SSL cassé, 500) | 19 |

**Le piège des URL de la base.** Elles sont recopiées de moncompteformation et pointent une fiche
profonde qui expire, alors que le site tourne toujours. Sept organismes ont été récupérés en
testant simplement `https://<domaine>/`, dont **ARKESYS et ses 5 083 stagiaires** — 404 sur l'URL
de la base, 7 797 caractères sur la racine. À faire systématiquement avant de déclarer un site
mort. Une URL accentuée (`…/développer-son-a…`) faisait par ailleurs planter le script avant même
la requête : encoder en percent-encoding.

**Les 23 sites illisibles sont passés par un crawl navigateur** (Apify `website-content-crawler`,
Firefox, profondeur 1, suppression des bandeaux cookies, 64 pages remontées, 0 échec) :

- **17 sont devenus lisibles** — cube.fr rendait 55 caractères en HTTP simple et 6 164 au
  navigateur ; poupischool.fr était bloqué par son bandeau cookies.
- **5 n'ont pas de vitrine** et c'est un constat en soi, souvent plus fort qu'un site à commenter :
  RC DEVELOPPEMENT sert la page par défaut de PlanetHoster avec **2 130 stagiaires déclarés**, et
  NS CONSEIL — **1 706 stagiaires** — a une page d'accueil de **15 caractères**, ses seules pages
  remplies étant ses conditions générales et un règlement de jeu de Noël.
- 1 n'a rien rendu (OF PARTNERS).

**Total : 31 organismes redevenus rédigeables** (9 sans navigateur + 22 par le crawl),
**6 467 stagiaires cumulés** pour les seuls 22 du crawl. Restent les 19 domaines morts, rédigeables
aussi sur l'angle « votre site ne répond plus », mais à vérifier un par un.

**Piège de méthode, à ne pas refaire.** Juger un site à la somme du texte de ses pages classe
NS CONSEIL en « lisible » : ses 4 800 caractères sont tous dans ses CGV. Le critère qui tranche est
**le texte de la meilleure page non administrative**, seuil 800 caractères. Second détail : le
dataset Apify arrive avec des champs aplatis (`metadata.title`), pas imbriqués — un `get("metadata")`
renvoie `None` en silence et neutralise tout filtre qui s'appuie dessus.
