# Migration de la page équipe : claudepartners.fr/equipe/ → claudeagency.fr/equipe/

Décidé par Julien le 2026-09-10. La page qui présentait les deux consultants maison vivait sur
l'annuaire ; elle passe sur le site de l'agence, qui est l'entité qui les positionne et facture.

## Hypothèses retenues (réponses au cadrage)

- L'ancienne URL `claudepartners.fr/equipe/` répond **301** vers `https://claudeagency.fr/equipe/`.
- Tarif affiché : **90 € HT/jour**, le montant communiqué par les deux consultants sur leurs fiches.
  Écrit en dur sur claudeagency (aucune donnée de fiche ici) : à mettre à jour à la main si une
  fiche bouge, avec la date de relevé dans le commentaire de `app/src/pages/equipe.astro`.
- Récit de création de l'agence à la **première personne**, en tête de page, avant les consultants.
- La page **lie la fiche claudepartners** de chaque consultant : exception au garde-fou « aucun lien
  vers claudepartners.fr », notée dans `CLAUDE.md`.
- Garantie de remplacement : **sous une semaine maximum**, sans justification. Remplace le
  « 48 h ouvrées, une fois par mission » de l'art. 03 des CGU de claudepartners.
- L'**art. 03 des CGU de claudepartners** (missions réalisées par l'équipe) est retiré, avec les deux
  renvois qui le citaient (art. 02 et art. 08) ; les articles suivants sont renumérotés.
- Les **photos** des deux consultants sont reprises (`app/src/assets/equipe/`).

## Critères de réussite (écrits avant de produire)

1. `https://claudeagency.fr/equipe/` répond 200 ; « Équipe » figure dans le header desktop et mobile.
2. `https://claudepartners.fr/equipe/` répond 301 vers la nouvelle URL ; `grep "/equipe/" src/` sur
   claudepartners ne renvoie plus aucun lien interne.
3. `npm run build` sort en code 0 sur les deux dépôts, contrôle anti-fuite compris côté claudepartners.
4. Chaque chiffre du récit (« 3 fois », « une dizaine », « 3 mois ») est porté par le fondateur à la
   première personne, aucun n'est présenté comme une mesure du site.

Cible : 900 à 1 200 mots.

## Étapes

- [x] claudeagency : `app/src/pages/equipe.astro`, photos, lien « Équipe » dans `Header.astro`,
      note d'exception dans `CLAUDE.md`.
- [x] claudeagency : build (code 0), commit `fac17e6`, push.
- [x] claudepartners (worktree jetable, une autre session a des fichiers indexés) : suppression de
      `src/pages/equipe.astro`, 301 dans `public/_redirects`, liens repointés (Footer, /a-propos/,
      /prestataires/, encart de l'accueil), art. 03 des CGU retiré, ligne de `lastmod.json` retirée.
- [x] claudepartners : build (code 0, anti-fuite : aucune), commit `ecebdbf`, push.
- [x] Contrôle en production le 2026-09-10 : `claudeagency.fr/equipe/` → 200, 979 mots, deux
      portraits chargés, lien « Équipe » présent deux fois (desktop + mobile) ;
      `claudepartners.fr/equipe/` → 301 vers la nouvelle URL ; `/cgu/` sans renvoi `missions-equipe`.

## Reste à décider (hors périmètre de la migration)

L'annuaire étiquette encore les deux fiches « Équipe Claude Partners » (liseré, badge sur la fiche,
encart de l'accueil, aside de /prestataires/) alors que les CGU ne portent plus la clause et que la
page dit « Claude Agency ». Renommer l'étiquette est une décision de Julien, pas un correctif.

## Piège rencontré

Une jonction Windows `node_modules` → dépôt principal ne suffit pas à builder dans un worktree :
Vite échoue en `ENOENT` sur `node_modules/.vite/deps_temp_*` même quand `.vite` existe. Faire un
`npm ci` dans le worktree. Et `git worktree remove --force` échoue ensuite en « Filename too long »
sur ce `node_modules` : le supprimer d'abord en PowerShell avec le préfixe `\\?\`.
