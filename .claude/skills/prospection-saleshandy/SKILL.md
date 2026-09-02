---
name: prospection-saleshandy
description: Pieges de l'outil SalesHandy et diagnostic de delivrabilite pour les envois
  Claude Agency et Claude Partners. Declencher des qu'il s'agit de creer ou modifier une
  sequence, importer une liste, ecrire ou relire un e-mail de prospection sortant, regler
  un planning ou un texte de desinscription, lancer une vague, ou diagnostiquer un taux de
  rebond, un placement en spam, une signature DKIM ou une reputation d'expediteur. Ne PAS
  utiliser pour la redaction de contenu du site ni pour le SEO.
---

# Prospection e-mail (SalesHandy)

Le fichier qui fait foi est `docs/prospection/protocole-envoi.md` : le lire avant toute vague.
Ce qui suit en est le rappel operationnel, avec les pieges deja payes.
**Aucune vague ne part sans les quatre règles de `docs/prospection/protocole-envoi.md`** — le
fichier fait foi et porte les chiffres qui les justifient. En résumé : sortir les structures de
plus de ~50 salariés (leur passerelle anti-spam refuse presque tout expéditeur inconnu), ne
jamais deviner une adresse (elle doit avoir été lue à une source, jamais reconstruite sur un
motif), vérifier la liste avant import, couper la séquence le jour même au-delà de **5 % de
rebond**. Ces règles valent aussi pour les envois Claude Partners : même outil, mêmes boîtes,
même réputation d'expéditeur.

**Le blocage en amont, à traiter avant toute reprise** (`mesuré` le 2026-09-01, détail dans le
protocole) : le test de placement complet du 26/08 donne **0 % en boîte de réception, 61 % en
spam, 39 % en onglet « autre » — et 0 % de non-délivré**. Tout arrive, rien n'atterrit. **Ne pas
répéter l'ancienne formule « 100 % de non-délivrés »** : elle venait d'un test arrêté à mi-course
et elle est fausse ; un message non délivré est perdu, un message en spam est arrivé.

Sont hors de cause : le contenu (SpamAssassin 0,4, « Safe »), les listes noires (aucune), et
l'authentification — le piège à ne pas refaire est là : **Hostinger signe sous les sélecteurs
`hostingermail-a/-b/-c`, pas `hostingermail1`**. Un balayage DKIM qui ignore cette forme conclut
à une panne inexistante ; lire la zone DNS réelle, ne pas deviner un sélecteur. Reste la
réputation d'expéditeur, qui ne se répare pas par un réglage.

**Ce test ne mesure pas Claude Agency** : le seul expéditeur du rapport est
`contact@claudepartners.fr`. Les deux boîtes Claude Agency n'ont jamais été passées à l'Inbox
Radar — leur *Inbox Score* de 0 veut dire « jamais mesuré », pas « au plus bas ». Les tests
gratuits sont épuisés : une nouvelle mesure demande l'abonnement ou un outil tiers.

Le piège à connaître : **la vérification d'adresses ne règle qu'un quart du problème.** Sur les
19 rebonds de la vague du 25/08/2026, 5 seulement venaient d'adresses inexistantes ; les 14 autres
étaient des refus de serveur. Un vérificateur seul aurait fait passer le taux de 59 % à 44 %.

Le texte de désinscription est un réglage **par séquence**, pas un réglage de compte. SalesHandy
en pose un par défaut, **en anglais**, sur **chaque séquence nouvellement créée** — y compris
celles créées par le MCP : *Reply 'Stop' if you'd prefer not to receive messages at this time.*
Il n'existe aucun réglage global pour l'éviter : il faut le remplacer après chaque création, sinon
une phrase anglaise part en bas d'une prospection française.

Le remplacement se fait par le code de réglage `2` (`unsubscribe-text`) :

```
update_sequence_settings(sequenceId, settings=[{ code: 2, value: "Répondez « Stop » si vous préférez ne plus recevoir de messages." }])
```

Les 5 séquences existantes ont été francisées le 21/08/2026.

**Trois autres pièges, constatés le 21/08/2026.**

- **Le Markdown n'est pas interprété.** SalesHandy envoie le corps en HTML brut : `<b>` et
  `<strong>` rendent bien, `**texte**` arrive chez le destinataire avec ses astérisques visibles.
  Écrire les gras en HTML, jamais en Markdown — y compris dans les propriétés `Mail 1` et
  `Relance J5` de la base Notion « Cibles — Prospection OF », qui alimentent les séquences.
- **`create_schedule` du MCP est cassé.** Il renvoie `400 Schedule not found` tout en créant quand
  même un planning « New Schedule N » aux valeurs par défaut. Ne pas réessayer : passer par
  *Settings → Des horaires* dans l'interface, et supprimer les plannings fantômes laissés derrière.
- **Le formulaire d'un compte mail se ré-hydrate après l'affichage de la page.** Une saisie faite
  juste après la navigation est écrasée en silence : aucune erreur, et *Save* réagit normalement.
  Attendre que le formulaire affiche ses valeurs avant de saisir, puis contrôler par
  `list_email_accounts` — l'écran seul ne prouve rien.
