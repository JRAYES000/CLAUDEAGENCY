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

**1. L'authentification est en règle sur les quatre domaines — ce n'est pas la cause.** Vérifié
le 2026-08-31 (`mesuré`) : SPF, `DMARC p=quarantine` et DKIM présents partout, la chaîne DKIM
résolue jusqu'à la clé RSA de Hostinger.

> **Le piège qui fait conclure à tort à un DKIM manquant** : Hostinger publie sa signature sous
> les sélecteurs **`hostingermail-a` / `-b` / `-c`**, en CNAME vers `dkim.mail.hostinger.com` —
> **pas** `hostingermail1`. Un balayage de sélecteurs qui ne teste que la forme numérotée ne
> trouve rien sur `claudeagency.fr` et fait diagnostiquer une panne d'authentification
> inexistante. C'est arrivé le 31/08, corrigé le jour même en lisant la zone DNS réelle.

**2. Rien n'est refusé : tout arrive, et tout est classé en spam.** Relevé Inbox Radar du
**26/08/2026 17:00**, test complet **51 messages sur 51**, expéditeur `contact@claudepartners.fr`
(lu dans l'interface le 2026-09-01, `mesuré`) :

| Destinataire | Boîte de réception | Spam | Autre | Non délivré |
| :--- | ---: | ---: | ---: | ---: |
| Gmail | 0 % | **80 %** | 20 % | 0 % |
| Google Workspace (US) | 0 % | 10 % | **90 %** | 0 % |
| Outlook | 0 % | **100 %** | 0 % | 0 % |
| Microsoft Business (US) | 0 % | **100 %** | 0 % | 0 % |
| Zoho | 0 % | 0 % | **100 %** | 0 % |

Total : **0 % en boîte de réception, 61 % en spam, 39 % en « autre », 0 % non délivré.**
SpamAssassin **0,4**, niveau de risque **« Safe »**. Authentification validée dans le rapport :
SPF, DKIM, DMARC et PTR tous au vert, **0 domaine et 0 IP en liste noire**.

> ⚠ **Correction de la version précédente de ce fichier.** Elle citait le test du 20/08 — arrêté
> en cours de route à 25 messages sur 51 — et en tirait « 100 % de non-délivrés chez Gmail et
> Google Workspace ». Le test complet du 26/08 dit l'inverse : **plus aucun non-délivré**. La
> différence n'est pas cosmétique. Un message non délivré est perdu ; un message en spam est
> arrivé, il est consultable, et le classement se corrige avec de la réputation. Le SpamAssassin
> est passé de 2,7 « Warning » à 0,4 « Safe » entre les deux tests.

> ⚠ **Ce test ne mesure pas Claude Agency.** Le seul compte expéditeur du rapport est
> `contact@claudepartners.fr`. `equipe1@claudeagency.fr` et `julien@claudeagency.eu` n'ont jamais
> été passés à l'Inbox Radar : leur *Inbox Score* de 0 signifie **jamais mesuré**, pas « au plus
> bas ». Attribuer à Claude Agency un résultat relevé sur Claude Partners est une erreur de
> lecture à ne pas refaire.

**Ce que ce test élimine comme cause** : l'authentification, les listes noires, et le contenu des
messages. Un score SpamAssassin de 0,4 signifie que réécrire les e-mails ne changera rien.

**Ce qui reste** : la réputation d'expéditeur. Domaines créés en août, sans historique, presque
aucune interaction positive — 1 réponse pour 54 envois cumulés sur les deux boîtes Claude Agency
au 01/09. Les 39 % de « autre » chez Gmail sont l'onglet Promotions, classement typique d'un
domaine que Google ne connaît pas encore.

**Les tests gratuits Inbox Radar sont épuisés** (« You've used all your free tests », bouton
*Create Test* grisé au 01/09). Mesurer les boîtes Claude Agency demande soit l'abonnement
SalesHandy, soit un outil tiers.

**3. ~~Le SPF des deux domaines Cloudflare incluait encore Mailjet~~ — retiré le 2026-08-31.**
Les deux publient désormais `v=spf1 include:_spf.mail.hostinger.com ~all` (vérifié en DNS après
enregistrement). C'était de l'hygiène de configuration, pas un gain de délivrabilité : le compte
de résolutions DNS était à quatre ou cinq sur les dix autorisées, loin de la limite.

**4. Le domaine de suivi des liens manque sur cinq des sept domaines d'envoi** (`mesuré`). Sans
lui, les liens réécrits par SalesHandy pointent vers son domaine partagé, utilisé par des
milliers de comptes — motif de refus classique.

| Domaine | `go.` présent | Zone DNS |
| :--- | :--- | :--- |
| claudeagency.fr, claudepartners.fr | oui | Cloudflare |
| les 7 domaines d'envoi | **oui — complété les 31/08 et 01/09**, vérifiés en DNS public | Cloudflare et Hostinger |

**Passer par l'API Hostinger, pas par le panneau.** Le sélecteur « Choisir le type » du formulaire
d'ajout se déploie deux ou trois fois, puis cesse de répondre — au clic, par référence
d'accessibilité et au clavier, un rechargement de page n'y changeant rien. L'API fait le même
travail en une commande et se vérifie :

    PUT https://developers.hostinger.com/api/dns/v1/zones/<domaine>
    Authorization: Bearer <HOSTINGER_API_TOKEN>
    {"overwrite": false, "zone": [{"name":"go","type":"CNAME","ttl":14400,
      "records":[{"content":"watch.saleshandy.com"}]}]}

`overwrite: false` est **obligatoire** : à `true`, la charge utile remplace la zone entière — MX,
DKIM et SPF compris. Contrôler MX et `hostingermail-a._domainkey` après chaque écriture.

🔴 **Ces CNAME ne servent à rien aujourd'hui, et c'est une piste à ne pas rouvrir sans vérifier
d'abord.** Le suivi des ouvertures (code 5) **et** des clics (code 4) est à `0` sur les **trois**
séquences du compte — vérifié par l'API le 31/08. Suivi désactivé = aucun lien réécrit, aucun
pixel inséré : **le domaine de suivi n'entre jamais dans le circuit**, ni le partagé ni le nôtre.
Les refus de serveur du 25/08 n'ont donc pas cette cause. Le raisonnement fautif à ne pas refaire :
« la séquence affiche 2 ouvertures, donc le suivi est actif, donc les liens sont réécrits » — les
réglages disent le contraire, et ce sont eux qui font foi. Les CNAME créés restent en place, sans
effet, utiles seulement si le suivi est un jour réactivé.

**Ce qui reste debout pour expliquer les 14 refus**, tout `mesuré` : domaines créés en août sans
historique ; 31 envois en 14 minutes le 25/08 ; cibles à passerelle anti-spam d'entreprise ;
Inbox Score 0 sur `contact@claudepartners.fr`. L'authentification est hors de cause — SPF, DKIM,
DMARC et PTR sont validés sur les 9 boîtes, aucun domaine en liste noire (une IP signalée sur
`teamclaude.fr`, qui n'envoie pas).

⚠ **Le DNS seul ne suffit probablement pas** : SalesHandy demande en général de déclarer le
domaine de suivi dans les réglages de chaque boîte d'envoi. À contrôler dans l'interface avant de
considérer le point comme réglé (`non vérifié` au 31/08).

## Journal des vagues

Une ligne par vague, remplie le jour même. Une vague sans ligne de journal n'a pas eu lieu.

| Date | Séquence | Marque | Envoyés | Rebonds | Taux | Réponses | Décision |
| :--- | :--- | :--- | ---: | ---: | ---: | ---: | :--- |
| 2026-08-25 | Prospection OF (`glwGO3M0w6`) | Claude Agency | 32 | 19 | 59 % | 0 | Suspendue le 25/08 |
| 2026-08-31 | Micro-lot dirigeants (`6vaKGjLoaW`) | Claude Agency | 10 | 0 | 0 % | 0 | En cours, relance le 05/09 |
| 2026-09-01 | Annuaire ClaudePartners (`9pa87bZ4Py`) | Claude Partners | 0 (import seul, quota du jour epuise) | — | — | — | 8 importes, 12 ecartes faute de source |
| 2026-09-06 | Prospection OF personnalisée (`klw678deP1`) | Claude Agency | 0 (activée, premier créneau mardi 08/09 8 h) | — | — | — | Reprise décidée par Julien le 06/09 ; 206 prospects, 46 Valid ouverts à l'envoi, 160 Risky en attente du bascule « risky » |
| 2026-09-08 | Prospection OF personnalisée (`klw678deP1`) | Claude Agency | 32 | 0 | 0 % | 0 | Poursuivie — seuil de 5 % non atteint, aucune pause ; 3 désinscriptions sur 32 contactés |

**Reprise du 2026-09-06 — ce qui a été fait, tout `mesuré` (API et interface SalesHandy)** :

- Vérification d'adresses : SalesHandy l'avait faite à l'import du 01/09. Sur 215 prospects :
  **46 Valid, 160 Risky, 9 Bad, 0 Unverified**. Les 9 Bad retirés de la séquence (FM FORMATION,
  MAM Academy, Orakin, Manager Solution, NIS Formation, Klyf, Say Com, Scenergie, ODI Formation).
  La séquence compte **206** prospects.
- **Le réglage « Send emails to risky prospects » (code 6) a d'abord été laissé à OFF** : seuls
  les 46 Valid partaient. « Risky » veut dire domaine accept-all, invérifiable. **Julien a demandé
  l'ouverture des 160 Risky le jour même, risque assumé par écrit** : code 6 passé à 1 par l'API le
  2026-09-06 (relu dans la réponse). Les 206 partent donc dans la même vague, 32 par jour sur
  quatre boîtes, soit environ sept jours ouvrés. La règle 4 tient : au-delà de 5 % de rebond sur
  un relevé, la séquence se met en pause le jour même.
- Quatre boîtes attachées, toutes à 8/jour : equipe1@claudeagency.fr, julien@claudeagency.eu,
  contact@claudepro.fr, julien@teamclaude.fr (ces deux dernières renommées « Claude Agency » ;
  teamclaude ramenée de 15 à 8/jour). Soit 32/jour : les 46 Valid partent en deux jours.
- **Signatures de compte vidées sur les quatre boîtes.** Le rendu réel (aperçu de l'étape 1)
  montrait un second bloc « Julien Rayes / Fondateur / Claude Agency / Web / LinkedIn » ajouté
  sous la ligne CNIL, alors que les 206 mails portent déjà leur signature dans le corps — deux
  liens de plus, en violation du « ≤ 1 lien ». Le micro-lot du 31/08, lui, comptait sur la
  signature de compte (ses mails n'ont pas de bloc nom) : sa relance (`Y8aLWDrDPN`) porte
  désormais la signature dans le corps de l'étape, vérifié dans l'interface.
- En-tête de désinscription (code 13) passé à 1, comme sur le micro-lot. Mode « texte seul »
  laissé sur « premier e-mail seulement » (code 9 = 1, réglage recommandé par l'outil).
- Clause « un organisme par bassin » laissée telle quelle (décision Julien du 06/09).

**Retrait du bloc légal, 2026-09-06 après-midi (demande de Julien : « Bulgaria Education va leur
faire peur »).** La ligne `BULGARIA EDUCATION EOOD — ul. Saedinenie 66… Choumen, Bulgarie` a été
retirée des 216 « Mail 1 » de Notion et des 206 champs « Prospect Overview » de la séquence
`klw678deP1` (import en mode remplacement, par lots de 6 à 8, trois sous-agents en parallèle).
La ligne CNIL reste seule en pied de mail, après le P.S. ; l'identification de l'expéditeur tient
par « Julien Rayes — Claude Agency — claudeagency.fr ». Le mail n'a plus d'adresse postale : aucune
adresse française n'existe dans le dépôt, celle de la rue Saint-Honoré ayant été retirée le 01/09.
Séquence mise en pause pendant l'opération, réactivée après contrôle.

Contrôles (`mesuré`) : 4 pages Notion relues par `fetch` dans quatre tranches différentes, 0
occurrence, ligne CNIL en fin ; 7 rendus réels relus dans l'aperçu SalesHandy, 0 occurrence, un
seul bloc signature ; les trois sous-agents ont vérifié longueur finale = longueur initiale − 84 sur
chacune de leurs lignes (215/215) et aucun `failedProspectsURL` sur 26 imports. **Non vérifié** :
le comptage SQL Notion sur les 302 lignes — le quota « Query Data Source » du workspace est épuisé
depuis l'après-midi ; à relancer (`SELECT COUNT(*) … WHERE "Mail 1" LIKE '%BULGARIA%'`, attendu 0)
quand il sera remis à zéro. La séquence annuaire Claude Partners (`9pa87bZ4Py`) a été contrôlée :
ses trois étapes sont des textes fixes sans bloc légal, rien à retirer. La page
`/donnees-prospection` du site et le registre RGPD nomment toujours l'entité bulgare, sans lien
depuis les mails — non modifiés, hors demande.

Effet de bord à connaître : l'import de remplacement exige prénom et nom, dérivés mécaniquement
de `Dirigeant` (premier mot, dernier mot). Cinq noms d'affichage douteux ont été corrigés à la main
(Neyret, Le Goffic, Leroy, Mac Leod, Charrois) ; d'autres cas du même type peuvent subsister dans
les tranches traitées avant l'arrêt des premiers sous-agents. Ces noms n'apparaissent que dans
l'en-tête « À : », jamais dans le corps.

**Cumul par boîte au 2026-09-01** (`mesuré`, API SalesHandy) :

| Boîte | Envoyés | Taux de rebond | Réponses | Inbox Score |
| :--- | ---: | ---: | ---: | ---: |
| equipe1@claudeagency.fr | 38 | **11 %** | 1 | 0 (jamais mesuré) |
| julien@claudeagency.eu | 16 | **31 %** | 0 | 0 (jamais mesuré) |

Les deux dépassent le seuil de coupure de 5 %. C'est la qualité de liste, traitée depuis : les
216 lignes ajoutées le 01/09 portent chacune l'URL de la page où l'adresse a été lue.
