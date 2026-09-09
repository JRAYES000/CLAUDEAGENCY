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
| 2026-09-09 | Prospection OF personnalisée (`klw678deP1`) | Claude Agency | 32 (cumul 64) | 1 (cumul) | 1,6 % | 2 dont 1 positive | Poursuivie — seuil de 5 % non atteint ; désinscriptions toujours à 3, soit 4,7 % des contactés |
| 2026-09-09 | Prospection OF personnalisée (`klw678deP1`) | Claude Agency | 0 (pause puis reprise) | — | — | — | Refonte de **287** mails 1 et relances (Notion + SalesHandy), séquence relancée — détail dans `refonte-mails-klw678deP1.md` |

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

---

## 2026-09-09 — 208 séquences ajoutées (lot moncompteformation). Aucun envoi.

Les 334 lignes collectées sur moncompteformation.gouv.fr ont été enrichies et 208 d'entre elles
portent désormais `Objet`, `Mail 1` et `Relance J5`. Plan, barème et pièges :
`docs/prospection/plan-lot-mcf-2026-09.md`. **Rien n'a été importé dans SalesHandy et rien n'est
parti** — les réserves listées dans le plan se tranchent avant tout import.

Écrit dans Notion (`mesuré`, API REST, relu après écriture) : 329 lignes de données — `Stagiaires
2025` 329/329, `Qualiopi` corrigé de `NON` à `OUI` sur 329, `CA (€)` + `Annee du CA` sur 57,
`Ville` 328, `Région` 319, `Dirigeant` 16, `Score cible` 329 — puis 208 séquences. Zéro échec
d'écriture.

Ce que les règles du protocole ont écarté : 28 organismes trop gros (plus de 49 salariés, ou
CA > 5 M€, ou > 10 000 stagiaires, ou > 200 formateurs — règle 1), 42 sans site, 32 dont le site
ne répond plus, 22 dont le site ne rend aucun texte exploitable. Aucune adresse n'a été devinée
(règle 2) : chaque ligne écrite portait déjà son adresse.

Deux adresses à sortir avant import, invisibles à un contrôle de syntaxe : NATURELIA
(`…@naturelia.frr`, double « r », rebond certain) et 2MS Antilles (`contat@…`, « contat » sans le
c). Vu le seuil de coupure à 5 %, ce sont deux rebonds gratuits.

**Le « non vérifié » du 06/09 est levé** : le comptage BULGARIA a été refait sans SQL, par lecture
API des 636 lignes — 0 occurrence dans `Mail 1`, `Relance J5` et `Objet` (`mesuré` 2026-09-09,
515 lignes portent un `Mail 1`).

Un chiffre inventé a été trouvé et corrigé après écriture : INSTITEC portait « 1 645 € HT la
formation de cinq jours », prix qui n'apparaît nulle part sur `institec.fr`. Remplacé par les
durées, elles, publiées. Le contrôle qui l'a trouvé confronte chaque nombre du constat au texte du
site, au LPOF et à l'API entreprises ; il est à relancer sur toute vague future.

## 2026-09-10 — 206 prospects importés dans la séquence. Rien n'est encore parti.

Les 208 séquences du lot moncompteformation sont entrées dans `klw678deP1` (« Prospection OF —
séquence personnalisée par organisme », `/sequence/936926/` dans l'interface), moins les deux
adresses fautives. Import en neuf lots de 25, `conflictAction: overwrite`, `verifyProspects: true`,
tag `mcf-2026-09`, étape 1 (`8JwoQoAZaO`).

**Total de la séquence : 206 → 412** (`mesuré`, API et interface). Zéro `failedProspectsURL` sur
les neuf imports. NATURELIA et 2MS Antilles cherchées dans la séquence : « No Result » pour les
deux, elles n'y sont pas.

**Ce qui a été corrigé avant l'import, et qu'il faut vérifier à chaque fois.**

*Le format Notion n'est pas le format d'envoi.* Les 208 mails portaient 2 à 3 liens en Markdown
`[libellé](url)` — la convention de la base. Le corps SalesHandy est du HTML : ils seraient partis
crochets et parenthèses visibles, sur 206 adresses. Le mail réellement envoyé le 08/09 (relu dans
le fil d'une réponse) ne contient aucun lien Markdown : le domaine du prospect y est en texte brut.
Converti à l'identique — domaine et `claudeagency.fr` en texte, seul le `mailto:` reste un lien.
**Un lien par mail**, ce que demande la règle du ≤ 1 lien.

*La ligne de désinscription visible manquait* sur 206/206, alors que les 302 mails existants la
portent. L'en-tête `List-Unsubscribe` (code 13) ne la remplace pas : elle a été ajoutée.

Notion a été remis au même format dans le même mouvement, pour que la base et l'outil ne divergent
pas. Neuf lignes ont d'abord échoué sur la limite Notion de 2 000 caractères par bloc de texte —
réécrites en blocs, puis relues : 0 restante en Markdown.

**Rythme d'écoulement** (`mesuré`, API) : quatre boîtes attachées (equipe1@claudeagency.fr,
julien@claudeagency.eu, contact@claudepro.fr, julien@teamclaude.fr), `daily-sending-limit` à 8
chacune, soit **32 par jour** au plafond. File de 348 non contactés → une dizaine de jours ouvrés.
C'est le temps qu'on a pour couper si le rebond monte. Rebond actuel de la séquence : 1 sur 64,
soit 1,6 %, sous le seuil.

**Non mesuré** : le décompte des statuts de vérification d'adresse sur les 206. La vérification a
tourné (SKILLS4ALL ressort « Risky »), mais le filtre par statut n'a pas été trouvé dans
l'interface en deux tentatives. À relever à la main avant que la file s'écoule — une adresse
« Risky » qui rebondit compte dans les 5 %.

**Rappel de ce qui n'a pas été tranché** : les mails nomment Solohery comme consultant disponible,
alors que Julien s'en est séparé le 2026-09-09. Signalé avant l'import, maintenu par Julien. Les
206 nouveaux et les 206 déjà en séquence portent tous son nom.

## 2026-09-10 — test de rendu avant envoi : trois défauts trouvés, tous corrigés

Julien a demandé un test de rendu avant que la vague ne parte. Il a payé : trois défauts,
dont deux introduits la veille en croyant corriger.

**1. L'API SalesHandy supprime les sauts de ligne réels.** C'est le piège central, et il est
invisible : l'import répond `isCompleted: true` sans erreur, mais le texte arrive collé.

| organisme | envoyé | stocké | sauts | écart |
| :--- | ---: | ---: | ---: | ---: |
| SKILLS4ALL | 1743 | 1722 | 21 | 21 |
| DATABIRD | 1734 | 1713 | 21 | 21 |
| MANDYBEN | 1747 | 1726 | 21 | 21 |

L'écart vaut exactement le nombre de sauts. Les mails étaient stockés en un bloc — « Bonjour,J'ai
passé un moment sur… ». **La forme à utiliser est `<br>`**, celle des mails de la vague du 01/09
dont le rendu est vérifié sur un mail reçu. Corrigé sur les 208 lignes Notion et les 206 prospects.

**2. La ligne « Répondez Stop » est ajoutée par SalesHandy, pas par le champ.** Vérifié : **0 des
307 mails antérieurs** ne la porte dans son `Mail 1`. L'avoir ajoutée la veille la mettait en
double dans le mail reçu. Retirée. Le signe qui l'a trahie : elle arrive habillée d'un
`<span style="font-size:12px">` que personne n'a écrit.

**3. Le découpage prénom / nom était inversé sur 115 lignes sur 206.** La base mêle deux
conventions — `BLOISE Alexa` (LPOF, nom d'abord) et `Marc-Noel Fauvel` (API entreprises, prénom
d'abord) — et prendre le premier mot comme prénom inverse la première. Les destinataires auraient
lu « BLOISE Alexa » ou « De Olivier » dans leur en-tête *À :*. La règle qui marche est dans
`noms.py` du chantier : particule en tête → le nom est tout sauf le dernier mot ; tout en
majuscules → convention LPOF ; un seul mot en majuscules → c'est le nom.

**Un prospect sur 412 était vide** (AKYOS COMMUNICATION) et c'était précisément celui que
l'aperçu SalesHandy affichait, d'où un premier diagnostic faux — « l'aperçu ne résout pas les
variables ». Il les résout parfaitement. Réparé.

**Comment vérifier, désormais.** L'API du connecteur ne lit pas le contenu d'un prospect ; le
contrôle qui tranche est **l'export CSV de la séquence** (icône export de l'onglet Prospects, le
fichier arrive par e-mail). Il donne les 412 lignes avec `Prospect Overview`, `Profile Headline`
et `LinkedIn Profile Summary` tels qu'ils partiront.

État final (`mesuré`, export du 2026-09-10 01:10) :

```
prospects : 412 | sans corps 0 | sans objet 0 | sans relance 0
lien Markdown 0 | accent grave 0 | gras Markdown 0 | ligne Stop en double 0
avec <br> 412 | avec <b> 412 | en-têtes « À : » non conformes 0
à contacter : 348, dont sans corps : 0
```

**Vérification d'adresses** (`mesuré`, 9 rapports SalesHandy sur les 206) : **86 valides,
118 « Risky » (57 %), 2 mauvaises**. Les deux mauvaises sont ajoutées à la liste de non-contact :
`claire@ese-gow.fr` (boîte introuvable — l'organisme dont le site sert des pages de casino) et
`contact@forma-finance.fr` (n'accepte pas le courrier). Sur les 412 de la séquence : 278 risky,
132 valides, 2 mauvaises. Le statut « Risky » désigne surtout des domaines *catch-all*, courants
chez les petits hébergeurs, et n'annonce pas un rebond — mais à 57 % de la liste et avec une
coupure à 5 %, les premiers envois se surveillent de près.

**Le test de rendu, à refaire à chaque vague.** Un e-mail composé depuis le champ réellement
stocké a été envoyé à `contact@claudeagency.fr` et relu : paragraphes séparés, gras rendu, aucune
balise visible, une seule ligne de désinscription. À noter : l'envoi de test de SalesHandy
(« Send Test Email ») utilise le prospect affiché dans l'aperçu — si ce prospect a un champ vide,
le test arrive vide et se lit à tort comme une panne du modèle.

## 2026-09-10 — la vague part. Ce que « Risky » veut vraiment dire.

Arbitrage de Julien : **on envoie**, sans nettoyage supplémentaire. Les deux consultants restent
nommés dans les mails, Solohery compris.

**Le statut « Risky » d'un vérificateur ne dit pas qu'une adresse est douteuse.** Sur les 118 du
lot, **101 (86 %) portent le sous-statut « Do not mail_Role based emails »** : ce sont des adresses
de service — `contact@`, `cpf@`, `formation@`, `dossier@`. Le vérificateur les classe ainsi par
convention, faute de pouvoir tester une boîte nominative. Aucune des 206 n'est sans enregistrement
MX : tous les domaines reçoivent du courrier.

**La mesure qui tranche**, et qu'il faut refaire à chaque vague plutôt que de payer un second
vérificateur — le taux de rebond observé par statut, sur les 64 envois réels du 08/09 :

| statut | rebonds | envoyés | taux |
| :--- | ---: | ---: | ---: |
| valid | 0 | 9 | 0,0 % |
| risky | 0 | **55** | **0,0 %** |

55 des 64 envois sont partis vers des adresses « risky », aucune n'a rebondi. C'est la raison de
fond de laisser partir les 118 — pas la provenance du fichier public, qui atteste seulement qu'une
adresse a été *publiée*, jamais qu'elle est active.

**Ce qui reste à surveiller n'est pas le rebond mais la réponse.** Une adresse de service est lue
par un secrétariat qui ne décide pas. Le compteur de rebond restera bas et ne dira rien ; c'est le
taux de réponse qui portera l'information sur cette vague.

**Les 17 réellement non conclues** (sous-statut `Unknown_Not validated temporarily`, `While
validating error`, ou vide) ont été repassées au vérificateur le 2026-09-10 : STARTWAVE, SENZA,
INTERACTIF, GLOBAL DIGITAL UNIVERSITY, BIZILIVE, FELOUKI, L'ATELIER DIGITAL, GLOBE TRAINING,
ÉCOLE DE LA TOILE, Formations 90, LENTREPRENEUSE, FORMEO 13, ANAIA, UNIVERS PROTEC,
SPIRIT FORMATION, FlowIA, LINGUAID. **Résultat : 6 valides, 11 risky, 0 mauvaise** — dont
6 encore « Role based ». Aucune adresse invalide ne se cachait derrière l'indécision du
vérificateur : la liste ne compte que **2 mauvaises sur 206**, déjà en liste de non-contact.

**Réglages de la séquence** (`mesuré`) : `email-risky-prospects` = 1 — sans ce réglage, les 118
ne partiraient jamais. En-tête de désinscription actif (code 13), suivi des ouvertures actif,
suivi des clics inactif. Le texte « Répondez Stop » est le **réglage n° 2 de la séquence**, ce qui
confirme qu'il ne doit pas figurer dans le champ du mail.

**Cadence** : planning « New Schedule 3 », lundi-vendredi 9h-18h Europe/Paris, 4 boîtes à 8 envois
par jour = **32 par jour**. 346 e-mails programmés, soit une dizaine de jours ouvrés. Premier
créneau : jeudi 2026-09-10 à 9h. **Le seuil de coupure à 5 % se relit à 24 h puis à 72 h.**
