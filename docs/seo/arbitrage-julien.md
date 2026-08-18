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

**⚠️ Nouvelle preuve du 17/08/2026 qui affaiblit l'option 2 : ce n'est pas un vestige.** En
travaillant sur la tâche A2 (fiche Google Business existante), SOLOHERY a montré une capture de
cette fiche : « ECOLE DE NATUROPATHIE & SOPH... », **4,9/5 sur 32 avis Google, 3,8/5 sur 2 avis
Trustpilot**, catégorie « Centre de formation continue », avec des avis récents et concrets
d'élèves (« j'ai récemment eu l'opportunité de suivre la formation en naturopathie... », « visité
en avril »). L'activité de naturopathie est **active aujourd'hui**, pas passée. Ça bloque de fait
A2 : compléter cette fiche pour en faire la vitrine Google de Claude Agency (Vague 1, netlinking
IA) mélangerait sous un seul profil deux publics sans rapport, et diluerait une réputation déjà
établie — décision à prendre avant de toucher à cette fiche, pas après.

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

## Envois externes déjà engagés sur « cabinet de conseil » — à recontacter si l'arbitrage bascule

Ces messages ont été envoyés (ou préparés pour l'être) à des tiers en affirmant la position
« cabinet de conseil en IA », pas « organisme de formation ». Si Julien tranche pour l'option 1,
ces contacts ont reçu l'ancienne position et devront être recontactés ou corrigés — c'est le seul
but de cette liste, elle ne remplace pas les fichiers/sections ci-dessus.

| # tâche | Fédération / tiers | Date d'envoi | Formulation engagée |
| :--- | :--- | :--- | :--- |
| A7 | Les Acteurs de la Compétence (ex-FFP) | **Envoyé le 18/08/2026** | Champ Message : « Cabinet de conseil en IA pour organismes de formation. » Confirmation reçue sur la page après soumission. |
| A8 | Hub France IA | Préparé, pas encore envoyé (SOLOHERY envoie) | Champ « Pourquoi rejoindre le Hub France IA ? » : « Cabinet de conseil en IA pour organismes de formation français et francophones... » |

Les deux messages ont été gardés tels quels en connaissance de cause (voir `NETLINKING-ACTIONS.md`,
sections respectives) : une demande d'info à une fédération n'engage rien juridiquement, mais
**une fois envoyée, la formulation est dans la boîte mail du destinataire** — c'est ça que cette
liste garde en mémoire, pas le fichier du dépôt qui peut se corriger d'un coup.
