# Plan — porter la base « Cibles — Prospection OF » à 300 organismes

Ouvert le 2026-09-01. Objectif : passer de **86** lignes à **300**, chacune avec une adresse
e-mail lue à une source, et les mêmes colonnes que l'existant (stagiaires, CA, dirigeant,
Qualiopi, ville, région).

Ce fichier porte le plan, les hypothèses retenues et les critères. Il se coche au fur et à mesure.

## Décisions de cadrage (2026-09-01)

- **Profil visé** : le même que l'existant, élargi. Qualiopi actions de formation, déclaration
  2025 ou 2026, 200 à 6 000 stagiaires, 1 à 25 formateurs, CA entre 120 k€ et 2,5 M€, moins de
  50 salariés, France entière.
- **Collecte des e-mails** : Apify (Google Maps pour l'URL du site, puis lecture des pages de
  contact) + catalogue Mon Compte Formation + vérificateur d'adresses en sortie.
- **Arbitrage** : la qualité prime. Si 300 adresses lues et vérifiées ne sortent pas du premier
  passage, on livre ce qui passe. Le chiffre de 300 est un objectif, pas une contrainte.
- **Ordre** : la liste se construit en parallèle du chantier délivrabilité. Aucun envoi n'est
  déclenché par ce plan.

## Critères de réussite

- [ ] La base contient **≥ 300 lignes à SIREN distinct**, dont **≥ 300 avec un e-mail non vide**.
- [ ] Chaque ligne ajoutée porte stagiaires, CA (ou vide assumé), dirigeant, Qualiopi, ville,
      région, et **l'URL de la page où l'adresse a été lue**.
- [ ] **Zéro** adresse reconstruite sur un motif (`prenom.nom@`) dans le lot ajouté.
- [ ] **Zéro** organisme de tranche d'effectif supérieure à 49 salariés dans le lot ajouté.

## Sources — ce qui vient d'où

| Colonne de la base | Source | Coût |
| :--- | :--- | :--- |
| Dénomination, ville, code région, Qualiopi, stagiaires | Liste Publique des Organismes de Formation, data.gouv, `ac59a0f5-fa83-4b82-bf12-3c5806d4f19f` | 0 € |
| CA, année du CA, dirigeant, statut juridique, tranche d'effectif | `recherche-entreprises.api.gouv.fr`, sans clé | 0 € |
| Site web | Apify, recherche Google Maps sur dénomination + ville | payant |
| E-mail | Lecture des pages contact / mentions légales du site | payant |

Le CA **n'est pas** dans le fichier data.gouv : il vient des bilans déposés, exposés par l'API
entreprises. C'est pour ça que « Annee du CA » est vide sur une partie des lignes existantes —
toutes les sociétés ne déposent pas.

## Étapes

- [x] **1. Socle.** Filtrer les 167 807 lignes du LPOF sur le profil. → **8 642 SIREN distincts**
      retenus (`mesuré` 2026-09-01).
- [x] **2. Données entreprise.** API entreprises sur 6 000 candidats, en deux passes.
      Passe 1 (1 800 candidats) : **317 retenus** (`mesuré`). Motifs de rejet : 706 sans bilan
      déposé, 444 hors bornes de CA, 198 au-dessus de 49 salariés, 129 échecs d'appel (la passe 1
      n'avait pas de reprise sur limitation de débit), 6 sociétés cessées.
      Passe 2 (candidats 1 800 à 6 000, avec reprise sur limitation) : en cours.
- [ ] **3. Site web.** Apify Google Maps sur les survivants.
- [ ] **4. E-mail.** Crawl des pages de contact, une URL de source notée par adresse.
- [ ] **5. Vérification.** Passage au vérificateur, retrait des invalides.
- [ ] **6. Import.** CSV de contrôle, puis écriture dans Notion avec `Statut = À contacter`.

## Points relevés en cours de route

**~~La base Notion n'a pas de colonne SIREN.~~ Corrigé le 2026-09-01.** Les propriétés `SIREN`
et `Source e-mail` ont été ajoutées. Les 86 lignes existantes ont été rapprochées du LPOF sur la
dénomination normalisée : **85 appariements, aucune ambiguïté**, ce qui confirme au passage que la
base d'origine venait bien de ce fichier. Seule « A J F sas » reste sans SIREN — le LPOF donne
« A J F » (412001828) à Boulogne-Billancourt là où la base indique Issy-les-Moulineaux, écart non
tranché.

**L'écriture en masse dans Notion passe par `create_pages`, qui accepte 100 lignes par appel.**
Aucun jeton d'intégration Notion n'existe dans le coffre (`APIFY_TOKEN` y est, pas d'équivalent
Notion) : l'import des nouvelles lignes se fera donc en 3 appels du connecteur, pas par script.

**Onze adresses de la base actuelle n'ont pas de site web associé** (77 e-mails pour 66 sites).
Leur source n'est pas tracée. À contrôler avant la prochaine vague : la règle 2 du protocole
d'envoi impose qu'une adresse ait été lue quelque part.

**La propriété titre de la base s'appelle `eclo`** au lieu de « Organisme ». Sans effet technique,
mais l'en-tête de colonne est illisible.
