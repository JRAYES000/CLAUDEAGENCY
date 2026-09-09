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

- [ ] Toutes les lignes à site + e-mail portent `Objet`, `Mail 1`, `Relance J5`, `Stagiaires 2025`
      et `Score cible` non vides.
- [ ] Chaque `Mail 1` cite **au moins un fait lu sur le site** de l'organisme, la page étant
      nommée dans le journal de production.
- [ ] `Mail 1` ≤ 270 mots hors signature, `Relance J5` ≤ 120. Format `<br>` / `<b>`, zéro gras
      Markdown, ligne CNIL en pied, aucun bloc BULGARIA.
- [ ] Les quatre éléments obligatoires ci-dessus sont présents dans **100 %** des `Mail 1`.
- [ ] Zéro mention de CPF, OPCO ou France Travail comme finançant une prestation Claude Agency.
- [ ] Aucune valeur chiffrée inventée : `CA` vide quand aucun bilan exploitable n'est déposé.

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
- [ ] **1. Export de la base** → `base_export.json`. Bloqué : voir ci-dessous.
- [ ] **2. Rapprochement** LPOF + API entreprises → `enrichi.json`, écarts dans `ecarts.json`.
- [ ] **3. Dédoublonnage** SIREN, adresse et domaine → `collisions.json`.
- [ ] **4. Lecture des sites** → `sites/<siren>.txt`, injoignables dans `crawl_bilan.json`.
- [ ] **5. Rédaction** par lots, brief commun + les 5 du pilote en exemples.
- [ ] **6. Contrôle par script** des six critères ci-dessus, sur 100 % des lignes écrites.
- [ ] **7. Écriture dans Notion**, puis relecture par requête et non par checklist.
- [ ] **8. Ligne de journal** dans `protocole-envoi.md`. **Aucun envoi n'est déclenché par ce plan.**

## Blocage à lever avant l'étape 1

Le jeton `NOTION_TOKEN` du coffre appartient à l'intégration **« Leads site claudeagency.fr »**,
qui n'est connectée qu'aux bases des leads du site. Sur *Cibles — Prospection OF*, l'API rend un
`404 object_not_found` — le piège déjà consigné dans `CLAUDE.md` : l'intégration s'ajoute **base
par base** dans l'interface Notion.

À faire, une fois : ouvrir la base, menu `•••` → **Connexions** → ajouter *Leads site
claudeagency.fr*.

Sans cet accès, tout reste faisable par le connecteur MCP — qui agit avec les droits du compte —
mais au prix d'un appel par ligne à l'écriture, et d'un export qui transite par la conversation.
Le quota SQL du connecteur est par ailleurs épuisé depuis le 2026-09-06 ; seul le mode `rows`
répond encore.

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
