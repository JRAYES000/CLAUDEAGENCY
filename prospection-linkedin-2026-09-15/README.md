# Campagne LinkedIn CLAUDE AGENCY - OF (15/09/2026)

Campagne Closely `143331`, active depuis le 16/09/2026, sur le compte LinkedIn
**Claude Agency** (`contact@claudeagency.fr`), index `/2/` dans Closely.

La campagne `143324`, creee la veille sur le compte `jrayes000@gmail.com`, a ete mise en
pause sans avoir envoye la moindre invitation : Closely ne permet pas de changer le compte
LinkedIn d'une campagne existante, la migration a donc consiste a la recreer a l'identique.

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

## Compte expediteur

Les deux comptes LinkedIn de Closely sont **deux profils distincts**, homonymes et
partageant la meme photo : `jrayes000@gmail.com` (index `/1/`) et
`contact@claudeagency.fr` (index `/2/`). Une fois un compte selectionne, l'interface
n'affiche plus que "Julien Rayes" : seule la page **Accounts** montre les adresses,
et seul le segment numerique de l'URL identifie le compte actif.

Controle qui tranche : les limites quotidiennes affichees a la creation different
d'un compte a l'autre (45 vues de profil et 27 endorse pour `/1/`, 41 et 20 pour `/2/`).

## Fichiers

- `CLAUDE-AGENCY-OF.csv` — les 104 prospects importes (103 retenus, 1 deja en relation
  avec le profil Claude Agency et donc ecarte par Closely)
- `cibles-apify-brut.json` — les 97 profils Apify avec texte "a propos", pour personnaliser
