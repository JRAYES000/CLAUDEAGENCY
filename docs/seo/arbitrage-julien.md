# Arbitrage à trancher — statut organisme de formation (SIREN 924 997 539)

Constat vérifié (tâche A13, 17/08/2026, source `recherche-entreprises.api.gouv.fr`, données
Ministère du Travail) : le SIREN 924 997 539 (ECOLE DE NATUROPATHIE ET SOPHROLOGIE, entité légale
de Claude Agency) a un **NDA actif** (11 75 70022 75) et une **certification Qualiopi en cours**.
Ce n'est pas une erreur de SIREN — deux champs officiels distincts le confirment.

**Option 1 — se positionner comme organisme de formation.** Ouvre le CPF, les OPCO, et les
annuaires alimentés par la liste Qualiopi, aujourd'hui explicitement fermés dans la liste
« Interdits ».

**Option 2 — ignorer ce statut dans la communication.** Le traiter comme un vestige de
l'activité passée (l'école de naturopathie), garder la position actuelle « cabinet de conseil »
sans y toucher.

Rien n'a été modifié en attendant la réponse.

## Fichiers/sections à mettre à jour selon la réponse (aucun touché à ce jour)

- `docs/seo/kit-identite.md` §3 — champ « Catégorie principale » et le paragraphe « Point
  d'éligibilité », qui affirment aujourd'hui l'absence de statut d'organisme de formation.
- `docs/seo/kit-identite.md` §4 (« Statut réglementaire », ajoutée le 17/08/2026) — sa dernière
  phrase cite à tort « onglet ⛔ Interdits de `NETLINKING-ACTIONS.md` » : cette liste vit en
  réalité dans `PLAN-SOLOHERY.md` §7 (voir ci-dessous) — citation à corriger dans le même geste.
- `docs/seo/NETLINKING-ACTIONS.md` l.8-12 — bandeau d'éligibilité qui ferme les annuaires
  Qualiopi.
- `docs/seo/NETLINKING-ACTIONS.md` — champ « catégorie » à préparer pour les 6 fiches de la
  Vague 1 (l.35-36) et conditions d'adhésion des deux fédérations de la Vague 2.
- `PLAN-SOLOHERY.md` §7, ligne « Annuaires Qualiopi (Pronéo, AnnuaireQualiopi.fr…) » (l.247),
  écartée le 12/08/2026 avec la note « à réexaminer si la tâche A13 révèle un NDA » — A13 vient
  de le révéler, cette ligne attend l'arbitrage.
- Onglet **⛔ Interdits** du Google Sheet, même ligne — à modifier en miroir le même jour que
  `PLAN-SOLOHERY.md` §7 (règle posée par le fichier lui-même, l.265-268). Hors accès de Claude
  Code : à faire par Julien ou SOLOHERY.
