# Campagne LinkedIn CLAUDE AGENCY - OF (15/09/2026)

Campagne Closely `143324`, active depuis le 15/09/2026, compte LinkedIn Julien Rayes.

## Audience — 104 prospects

- **7** du vivier claudeagency deja qualifie (statut `valide` dans prospection.json, jamais contactes)
- **97** dirigeants d'organismes de formation collectes via Apify le 15/09/2026

Dedupliques contre les 626 noms du registre de prospection : une seule collision
(Ludovic Nedelec, deja contacte et prestataire IA concurrent), ecartee.

## Collecte Apify

Acteur `harvestapi/linkedin-profile-search` : requete "organisme de formation",
France, niveaux de seniorite dirigeant / direction / proprietaire. 10 pages.
Puis `harvestapi/linkedin-profile-scraper` pour obtenir les URL publiques
(la recherche ne rend que des identifiants opaques, inexploitables dans Closely).

Entonnoir : 217 profils bruts, 167 apres filtre decideur + contexte formation,
100 apres scoring, 97 avec URL publique.

Cout estime : ~1,40 USD au tarif BRONZE affiche (non releve sur la facture).
Le run d'enrichissement s'est arrete sur `max charge reached`.

## Sequence

| Etape | Action | Delai |
|---|---|---|
| 1 | Connection request, sans note | immediat |
| 2 | Condition : si connecte | J+3 |
| 3 | Endorse skills (branche oui) | immediat |
| 4 | Message 1 | J+1 |
| 5 | Message 2, relance unique | J+4 |

Branche "non connecte" : fin de sequence, aucun message.

## Messages

Fond repris des textes sur mesure de `VISIBILITE OPS/sortants/prospection/`,
abandonnes le 04/09/2026 (decision : tout passe par Closely). Chiffre maison
repris : 20 a 30 minutes de traitement administratif par inscription, publie
le 30 juin.

## Point non verifie

Closely porte deux comptes LinkedIn nommes "Julien Rayes" :
`jrayes000@gmail.com` et `contact@ecole-naturo.fr`. Le premier de la liste a ete
retenu. L'interface ne montre pas l'adresse une fois le compte selectionne, donc
le choix n'a pas pu etre confirme a l'ecran.

## Fichiers

- `CLAUDE-AGENCY-OF.csv` — les 104 prospects importes
- `cibles-apify-brut.json` — les 97 profils Apify avec texte "a propos", pour personnaliser
