# E7 — Passer le relais : les rendez-vous de septembre

Une fiche par rendez-vous, dans l'ordre des dates. Source : tâche E7 du Sheet SOLOHERY,
`docs/seo/JOURNAL.md`, `docs/seo/BACKLOG.md`, `docs/points-etape-sprint.md`, `PLAN-SOLOHERY.md`.
Rien n'a été modifié dans le Sheet par ce document.

**Chantier D (prospection Saleshandy) : suspendu par consigne de Julien depuis le 25/08/2026**
(« concentre-toi uniquement sur l'onglet F »). Toute tâche préfixée `D` ci-dessous est signalée
comme telle, sans date ni première action assignée tant que le chantier reste à l'arrêt.

---

## 1. 01 → 10/09/2026 — Posts LinkedIn 5 à 8 (B5)

- **Date :** fenêtre du 1er au 10/09/2026, un post tous les 2 jours (rythme posé par B8).
- **Première action :** rédiger et publier le post 5 le 01/09, puis relever ses chiffres (vues,
  réactions, clics) à J+3 (04/09) — même méthode pour les posts 6, 7, 8.
- **Où est écrit le détail :** `docs/seo/posts-linkedin-a-programmer.md` (posts 1 à 4, déjà
  rédigés et publiés entre le 18 et le 27/08, format et gabarit à reproduire) ; cadence et
  objectif posés dans `JOURNAL.md`, entrée (2) du 15/08/2026 (création de la tâche B8) ;
  état au 28/08 dans `BACKLOG.md` item 1ter (4/10 posts publiés).
- **À avoir sous la main :** les 4 posts déjà publiés comme référence de ton, `docs/seo/linkedin-kit.md`
  (gabarit), le blog (chaque post cite un article en 1er commentaire). **Les posts 5 à 10 ne sont
  pas encore rédigés** dans `posts-linkedin-a-programmer.md` — contrairement aux 4 premiers, il n'y
  a rien de prêt à copier-coller.

## 2. 11/09/2026 — Contrôle SEO (C9)

- **Date :** 11/09/2026.
- **Première action :** relire les 3 dernières entrées de `docs/seo/JOURNAL.md`, puis traiter les
  deux relevés programmés à cette date dans `BACKLOG.md`.
- **Où est écrit le détail :** `docs/seo/BACKLOG.md` item 0 (report des 138 impressions « logiciel
  bilan pédagogique et financier », absence de 404 sur les 15 redirections, sort des 5 articles à
  0 impression) et item 3 (clics/CTR/position des 9 URLs *striking distance*, avec la règle déjà
  arbitrée pour `/services/seo/` : remettre l'ancien title si toujours 0 clic) ; `PLAN-SOLOHERY.md`
  l.291 (C9 = porte de sortie de l'interdiction de refusionner des articles avant ce relevé).
- **À avoir sous la main :** accès Search Console (Composio, `GOOGLE_SEARCH_CONSOLE_*`), le
  tableau des 9 URLs et leurs positions de départ (`BACKLOG.md` item 3), la liste des 5 articles
  à 0 impression conservés depuis la cannibalisation du 14/08 (item 0).

## 3. 15 → 17/09/2026 — Posts LinkedIn 9 et 10 + bilan (B8)

- **Date :** post 9 le 15/09, post 10 le 17/09, bilan des 10 posts dans la foulée.
- **Première action :** rédiger et publier le post 9 le 15/09, puis écrire le bilan chiffré des 10
  posts (vues, réactions, clics cumulés) comparé à l'objectif de 10 posé par B3/B8.
- **Où est écrit le détail :** `JOURNAL.md`, entrée (2) du 15/08/2026 (B8 : objectif 10 posts,
  cadence 1 tous les 2 jours jusqu'au 17/09, créée parce que B3/B4/B5 n'en couvraient que 8) ;
  `BACKLOG.md` item 1ter (état à date, 4/10 au 28/08).
- **À avoir sous la main :** les chiffres relevés à J+3 sur chaque post publié depuis B5, la page
  LinkedIn (`linkedin.com/company/claude-agency-fr/`), `docs/seo/linkedin-kit.md`.

## 4. 16/09/2026 — Webinaire Qualiopi

- **Date :** 16/09/2026, 12h30-13h15.
- **Première action :** vérifier le lien de visioconférence — **non documenté à ce jour** (aucun
  outil de visio n'est mentionné dans `JOURNAL.md` #68, seuls la page et le formulaire
  d'inscription existent, à mettre en place avant le 16/09) — puis lancer la session à 12h30.
- **Où est écrit le détail :** `JOURNAL.md`, entrée (68) du 25/08/2026 — page `/webinaire/`, plan
  des 45 minutes (30 min de contenu + 15 de questions), inscriptions hors Brevo (interdit sur ce
  projet) ; `app/src/pages/webinaire.astro`.
- **À avoir sous la main :** la liste des inscrits (Google Sheet dédié « Inscriptions webinaire
  16/09 », colonnes `date`/`nom`/`e-mail`/`organisme`/`accepte_contact`), le plan des 45 minutes,
  un moyen d'enregistrer la session pour le replay.

**Après la session — envoyer le replay aux inscrits**, puis :

> ⚠️ **Séparer les inscrits consentants du fichier froid (D21) — en suspens, comme le point 5.**
> Cette étape lit la colonne `accepte_contact` du Sheet d'inscriptions pour isoler les contacts
> qui ont explicitement accepté d'être recontactés (héritage direct des livrables RGPD D14, entrée
> `JOURNAL.md` #67), avant de les rapprocher du fichier de prospection froid. C'est un geste de
> tri de données de prospection, préfixé `D` : il tombe sous la même consigne que le point 5
> (chantier D suspendu, focus sur l'onglet F). **Le webinaire lui-même (animation, replay) n'est
> pas Saleshandy et reste actif** — seul ce tri est mis en pause, sans date ni première action
> tant que le chantier D reste à l'arrêt.

## 5. En suspens — DMARC p=none → p=quarantine (D0d)

**Pas un rendez-vous actif.** Cette tâche appartient au chantier D (Saleshandy), suspendu depuis
le 25/08/2026 par consigne de Julien (« concentre-toi uniquement sur l'onglet F »). Aucune date ni
première action assignée tant que le chantier D reste à l'arrêt. Sheet non modifié.

- **Où est écrit le détail :** `docs/points-etape-sprint.md` (D0d, ligne 119 : « Fait » en
  étiquette mais Preuve contraire) ; `JOURNAL.md` #63 (contrôle DNS SPF/DKIM/DMARC du 20/08) ;
  `PLAN-SOLOHERY.md` (bascule DMARC recalée au 25/09).

---

## Routines — après le sprint

### Démarches de liens (F5)

- **Date :** en continu — 3 démarches en septembre 2026, 3 en octobre, puis plafond de 4/mois
  ensuite. Pas de jour fixe dans le mois.
- **Première action :** sélectionner les 3 prochains candidats parmi les 17 qualifiés jamais
  contactés du registre F, envoyer les messages déjà préparés.
- **Où est écrit le détail :** `docs/seo/NETLINKING-ACTIONS.md` (messages prêts à l'envoi) ; Sheet
  `F · Netlinking'!A45:J66` (registre des 20 candidats, à consulter, pas à modifier depuis ce
  document) ; `docs/seo/BACKLOG.md` item 1 (cadence, 17 candidats restants).
- **À avoir sous la main :** le registre des 20 candidats (statut, date d'envoi), les 7 critères
  éliminatoires (tableau 3, onglet F), les messages types de `NETLINKING-ACTIONS.md`.

### Contrôle mensuel des liens (F6)

- **Date :** le 1er de chaque mois — prochaine occurrence le 01/09/2026.
- **Première action :** revérifier que le lien retour vers annuaireduconseil.com (posé le
  28/08/2026, `BACKLOG.md` item 1) est toujours actif, puis refaire une mesure Ahrefs manuelle
  (Domain Rating, Backlink Checker) pour suivre l'évolution du chiffre global (8 domaines
  référents au 27/08).
- **Où est écrit le détail :** `docs/seo/BACKLOG.md` item 1 (lien retour à recontrôler) ;
  `JOURNAL.md` #77 (méthode de relevé manuel Ahrefs, API du plan bloquée) ; Sheet, onglet
  `F · Netlinking`, tableau F6.
- **À avoir sous la main :** ahrefs.com (accès web gratuit, pas d'API — plan insuffisant,
  `JOURNAL.md` #76), la liste des liens confirmés en ligne à revérifier un par un.

---

## RAPPELS À CRÉER

- 01/09/2026 — Posts LinkedIn 5-8 (B5) — Rédiger et publier le post 5.
- 11/09/2026 — Contrôle SEO (C9) — Relire les 3 dernières entrées de `JOURNAL.md`.
- 15/09/2026 — Posts LinkedIn 9-10 + bilan (B8) — Rédiger et publier le post 9.
- 16/09/2026 — Webinaire Qualiopi — Vérifier le lien de visio et lancer la session à 12h30.
