# Protocole d'envoi — prospection e-mail

Écrit le 2026-08-31, après le bilan de la vague du 25/08 : **19 rebonds sur 32 envois (59 %)**.
S'applique aux **deux marques** — Claude Agency vers les organismes de formation, Claude Partners
vers l'annuaire — parce qu'elles partagent le même outil (SalesHandy), les mêmes boîtes et la
même réputation d'expéditeur.

Ce fichier fait foi. Une vague qui ne respecte pas les quatre règles ci-dessous ne part pas.

## Les quatre règles

**1. Sortir les grosses structures avant tout le reste.** Au-delà d'une cinquantaine de salariés,
la passerelle anti-spam d'entreprise refuse presque systématiquement un expéditeur inconnu. Ce
tri ne coûte rien et évite la majorité des refus — et ces structures ne sont pas la cible
commerciale de toute façon.

**2. Ne jamais deviner une adresse.** Une adresse entre dans la liste seulement si elle a été
**lue** quelque part : site de l'organisme, mentions légales, Pappers, LinkedIn. Une adresse
reconstruite sur un motif (`prenom.nom@domaine`) ne part pas, même si le motif semble évident.

**3. Vérifier ce qui reste, avant import.** Passer la liste par un vérificateur d'adresses avant
de la charger dans SalesHandy. Ordre de grandeur des services du marché : 5 à 10 € les 1 000
adresses (`estimé`, tarifs publics non revérifiés). SalesHandy propose sa propre vérification à
l'import — **le solde de crédits reste à contrôler dans l'interface**, l'API ne l'expose pas.

**4. Seuil de coupure à 5 %.** Au-delà de 5 % de rebond sur un lot, la séquence s'arrête le jour
même et ne repart pas avant nettoyage de la liste. C'est exactement ce qui a manqué le 25/08 : 32
e-mails sont partis avant que quiconque regarde le compteur.

## Ce qui a motivé ces règles

Chiffres relevés dans SalesHandy le 2026-08-31 (`mesuré`).

**Les adresses invalides ne sont qu'un quart du problème.** Sur les 19 rebonds du 25/08 :

| Nature du rebond | Nombre | Ce que ça veut dire |
| :--- | ---: | :--- |
| Message refusé par le serveur destinataire | 14 | Filtre anti-spam, réputation, contenu |
| Adresse inexistante | 5 | Erreur de liste |

Un vérificateur seul aurait ramené le taux de **59 % à 44 %** — dix fois au-dessus d'un seuil
sain de 3 %. La vérification d'adresses est nécessaire, elle n'est pas suffisante.

**Aucune boîte n'était en cause en particulier** — les quatre expéditeurs de la vague ont
rebondi entre 43 % et 75 %. Le problème venait de la liste et du rythme, pas d'un domaine abîmé.

**Trois variables ont changé entre la vague du 25/08 (19/32 rebonds) et le micro-lot du 31/08
(0/10)** — le rythme d'envoi, la taille des organismes visés, et l'origine des adresses. Elles
ont bougé ensemble : le succès du 31/08 ne peut être attribué à une seule (`hypothèse`).

## Liste de contrôle avant chaque vague

1. [ ] Chaque adresse a été lue à une source, et la source est notée.
2. [ ] Les structures de plus de ~50 salariés sont sorties de la liste.
3. [ ] La liste est passée au vérificateur, les adresses douteuses sont retirées.
4. [ ] La marque expéditrice correspond au contenu du message — une boîte Claude Partners
       n'envoie pas un message Claude Agency, et réciproquement.
5. [ ] La délivrabilité des boîtes a été contrôlée à moins de 7 jours.
6. [ ] Le seuil de coupure à 5 % est rappelé à qui surveille la vague.

## Réglages d'envoi en vigueur

Relevés le 2026-08-31 sur les boîtes actives (`mesuré`) :

- **8 e-mails par jour et par boîte** au maximum.
- **5 à 20 minutes** entre deux envois d'une même boîte. Ces intervalles ont été posés le 26/08,
  soit le lendemain de la vague ratée : celle-ci était partie à raison de 31 e-mails en 14
  minutes sur 4 boîtes.
- Deux boîtes actives = **16 e-mails par jour**, environ 80 par semaine.

**Ne pas monter le volume avant 100 e-mails cumulés sous 3 % de rebond.**

Point de vigilance : l'*Inbox Score* des deux boîtes Claude Agency est à **0** dans SalesHandy au
31/08, alors que leur *Setup Score* est à 97. L'API ne permet pas de distinguer « au plus bas » de
« jamais mesuré » : à trancher dans l'interface avant toute reprise en volume.

## Ce qui bloque en amont de la liste — à réparer avant toute reprise

Deux constats du 2026-08-31 qui passent **avant** les quatre règles : une liste parfaite
n'atteindra personne tant qu'ils tiennent.

**1. `claudeagency.fr` envoie sans signature DKIM** (`mesuré`, relevé DNS du 31/08). Le seul
enregistrement présent est `mailjet._domainkey`, hérité d'un outil sorti du circuit ; le sélecteur
`hostingermail1._domainkey` — celui que Hostinger utilise réellement, et qui existe bien sur
`claudepartners.fr`, `claudeagency.eu` et `claudepro.fr` — est **absent**. Or le domaine publie
`DMARC p=quarantine` : un message non signé arrive donc chez un destinataire strict avec la
consigne explicite de le mettre en quarantaine. C'est cohérent avec les refus observés.
**À faire : activer DKIM pour ce domaine dans le panneau Hostinger, puis publier
l'enregistrement dans la zone DNS.**

**2. Google refuse tout, Outlook classe tout en spam** — relevé Inbox Radar du 20/08/2026 sur
`contact@claudepartners.fr`, 25 messages de test :

| Destinataire | Boîte de réception | Spam | Non délivré |
| :--- | ---: | ---: | ---: |
| Gmail | 0 % | 0 % | **100 %** |
| Google Workspace | 0 % | 0 % | **100 %** |
| Outlook | 0 % | **100 %** | 0 % |
| Microsoft Business | 83 % | 17 % | 0 % |

Total : 20 % en boîte de réception, 24 % en spam, 56 % non délivrés. Score SpamAssassin 2,7,
niveau de risque « Warning ». Ce test date d'avant la vague du 25/08 : la réputation était déjà
mauvaise **avant** l'envoi, la vague ratée n'en est pas la cause mais l'aggravation.

Deux réserves : ce relevé a 11 jours et ne couvre qu'une boîte ; et les tests gratuits Inbox
Radar sont épuisés — la prochaine mesure passe par un abonnement ou un outil tiers.

**3. Le SPF de `claudepartners.fr` et `claudeagency.fr` inclut encore Mailjet**, qui n'envoie
plus rien. Chaque `include` consomme une des dix résolutions DNS autorisées : à retirer.

## Journal des vagues

Une ligne par vague, remplie le jour même. Une vague sans ligne de journal n'a pas eu lieu.

| Date | Séquence | Marque | Envoyés | Rebonds | Taux | Réponses | Décision |
| :--- | :--- | :--- | ---: | ---: | ---: | ---: | :--- |
| 2026-08-25 | Prospection OF (`glwGO3M0w6`) | Claude Agency | 32 | 19 | 59 % | 0 | Suspendue le 25/08 |
| 2026-08-31 | Micro-lot dirigeants (`6vaKGjLoaW`) | Claude Agency | 10 | 0 | 0 % | 0 | En cours, relance le 05/09 |
