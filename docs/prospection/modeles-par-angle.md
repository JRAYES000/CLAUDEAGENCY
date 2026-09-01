# Modèles d'e-mails par angle

Écrits le 2026-09-01, en remplacement d'un message rédigé ligne par ligne. Deux angles, deux
séquences de deux e-mails. Les modèles vivent **dans SalesHandy**, pas dans les colonnes
`Mail 1` / `Relance J5` de la base Notion — c'est tout l'intérêt du passage au modèle unique.

## Ce qui personnalise, à défaut d'un constat écrit à la main

Les messages d'origine tiraient leur force d'une observation réelle du site (« aucune session
SSIAP dans votre calendrier 2026 »). Un modèle unique ne peut pas produire ça. Il s'appuie donc
sur les données que la base porte déjà, toutes vérifiables :

| Variable | Source | Remplie sur |
| :--- | :--- | ---: |
| `{{organisme}}` | Dénomination du fichier public | 302 / 302 |
| `{{stagiaires}}` | Déclaration d'activité, chiffre public | 302 / 302 |
| `{{ville}}` | Fichier public ou API entreprises | 296 / 302 |
| `{{site}}` | Fiche Google Maps | 216 / 302 |

Le nombre de stagiaires est le meilleur substitut au constat manuel : il est exact, public, et
l'organisme le reconnaît immédiatement comme le sien.

**Pas de variable de prénom.** Le champ `Dirigeant` est en capitales (`CHRISTOPHE GEORGES HERVE
BERTRAND`), vide sur 48 lignes, et mêle parfois nom de naissance et nom d'usage entre parenthèses.
L'injecter tel quel produirait « Bonjour Monsieur CHRISTOPHE GEORGES HERVE BERTRAND ». Les modèles
ouvrent donc sur « Bonjour, ». Pour retrouver la civilité, il faut d'abord nettoyer la colonne.

## Règles qui s'appliquent aux quatre textes

- **Gras en HTML** (`<b>`), jamais en Markdown : SalesHandy envoie le corps en HTML brut et les
  astérisques arrivent visibles chez le destinataire.
- **Un lien maximum** par e-mail. Ici, `claudeagency.fr` dans la signature.
- **Ligne de transparence CNIL** dans la signature, en texte simple, sans URL.
- **Jamais de mention CPF, OPCO ou France Travail** comme financement de nos prestations : Claude
  Agency est prestataire de services, pas organisme de formation.
- **Texte de désinscription** à remplacer après chaque création de séquence : SalesHandy en pose
  un en anglais par défaut.

---

# Angle 1 — Automatisation IA

## E1 — J0

**Objet** : `{{stagiaires}} stagiaires, et la même paperasse à chaque session`

```
Bonjour,

{{organisme}} a formé {{stagiaires}} stagiaires sur son dernier exercice déclaré. Le chiffre est
public, vous l'avez déposé vous-même.

Derrière chacun, la même chaîne repart : convocation, émargement, attestation, dossier de prise
en charge, relance. Aucune de ces étapes ne demande une décision. Elles demandent quelqu'un.

À ce volume, ce sont plusieurs journées par mois passées à ressaisir ce qu'un système produirait
seul — et ce sont les journées de vos gens les plus compétents.

J'ai écrit le « Plan de récupération administrative » pour un organisme de votre taille : trois
automatisations, le temps récupéré sur chacune, ce qui reste à votre main. Une page.
<b>Elle est déjà prête.</b>

Je vous l'envoie ?

Julien Rayes — Claude Agency
Uniquement des organismes de formation — claudeagency.fr

BULGARIA EDUCATION EOOD — ul. Saedinenie 66, ent. 1, ap. 15, 9700 Choumen, Bulgarie
Ces coordonnées professionnelles sont utilisées pour de la prospection commerciale B2B ; détail
du traitement sur simple demande à contact@claudeagency.fr.
```

## E2 — J+5 ouvrés, même fil

Réponse dans le fil, pas de nouvel objet.

```
Bonjour,

Je vais être direct.

Le « Plan de récupération administrative » est toujours sur mon disque, prêt à partir.

<b>Le premier chantier est gratuit. Entièrement.</b> Pas un audit, pas une démonstration : le
travail, livré, chez vous.

Ensuite, <b>je ne suis payé qu'aux résultats.</b> Pas aux heures, pas aux moyens mis en œuvre,
pas aux rapports d'activité. Si vous ne récupérez pas de temps, je ne gagne rien.

<b>Et je ne prends qu'un organisme par bassin d'emploi.</b> Tant que vous ne répondez pas,
{{ville}} reste ouvert.

Je vous l'envoie ?

Julien Rayes — Claude Agency
```

---

# Angle 2 — SEO / refonte

## E1 — J0

**Objet** : `ce qui se perd entre la recherche et l'inscription`

```
Bonjour,

{{organisme}} a formé {{stagiaires}} stagiaires sur son dernier exercice déclaré — le chiffre est
public. Vous savez donc remplir vos sessions.

L'autre bout est moins bien tenu. Quelqu'un cherche votre spécialité à {{ville}}, arrive sur
{{site}}, et cherche trois choses : les prochaines dates, le prix, une place confirmée. Quand
elles n'y sont pas, il ouvre le résultat suivant. Sa demande, elle, attend un traitement à la
main pendant ce temps.

Ce n'est pas un problème de visibilité. C'est ce qui se passe une fois le visiteur arrivé.

J'ai écrit le « Plan de conversion des inscriptions » : les sessions datées avec les places
restantes, un formulaire qui renvoie tarif et confirmation dans la minute, les pièces classées
sans ressaisie. <b>C'est déjà écrit.</b>

Je vous l'envoie ?

Julien Rayes — Claude Agency
Uniquement des organismes de formation — claudeagency.fr

BULGARIA EDUCATION EOOD — ul. Saedinenie 66, ent. 1, ap. 15, 9700 Choumen, Bulgarie
Ces coordonnées professionnelles sont utilisées pour de la prospection commerciale B2B ; détail
du traitement sur simple demande à contact@claudeagency.fr.
```

## E2 — J+5 ouvrés, même fil

```
Bonjour,

Je vais être direct.

Le « Plan de conversion des inscriptions » est prêt : ce que {{site}} doit afficher, et dans quel
ordre, pour qu'une recherche devienne une place confirmée.

<b>Le premier chantier est gratuit. Entièrement.</b> Pas un audit, pas une maquette : les pages,
en ligne, chez vous.

Ensuite, <b>je ne suis payé qu'aux résultats.</b> Si {{site}} ne vous ramène personne, je ne
gagne rien.

<b>Et je ne prends qu'un organisme par bassin d'emploi.</b> Sur {{ville}}, la place est encore
libre.

Je vous l'envoie ?

Julien Rayes — Claude Agency
```

---

## Trois points à trancher avant le premier envoi

**1. ~~L'adresse postale n'a jamais été vérifiée.~~ Vérifiée le 2026-09-01, et elle était fausse.**
Les anciens messages affichaient « 229 rue Saint-Honoré, 75001 Paris ». Cette adresse ne
correspond à **aucune entité juridique du groupe** : le registre français ne connaît ni
« BULGARIA EDUCATION » (0 résultat) ni de société « Claude Agency » rattachée.

L'adresse qui fait foi, lue au **registre du commerce bulgare** (EIK 206507432, dossier actif) et
identique aux mentions légales du site :

> **BULGARIA EDUCATION EOOD** (« БЪЛГАРИЯ ЕДЮКЕЙШЪН » ЕООД)
> ul. Saedinenie 66, ent. 1, ap. 15 — 9700 Choumen (Шумен), Bulgarie
> EIK 206 507 432 · TVA BG 206 507 432

Elle est désormais dans la signature des deux premiers e-mails. Une adresse parisienne dans un
message envoyé par une société bulgare est une information trompeuse sur l'identité de
l'expéditeur, pas une coquette de mise en page.

**Point relevé au passage, à trancher par toi.** Le registre bulgare enregistre comme gérante
(управител) **Krasimira Pencheva Cholakova**, et comme associée **Paulina Krasimirova Chakarova**.
Les signatures des boîtes SalesHandy portent « Julien Rayes — Fondateur & Dirigeant ». Les
mentions légales du site, elles, écrivent « Directeur de la publication : Julien Rayes », ce qui
est cohérent puisque ce rôle est distinct de la gérance. Le mot « Dirigeant » dans une signature
commerciale, lui, ne correspond pas à ce que dit le registre — je ne connais pas les liens entre
ces personnes et toi, donc je ne touche pas aux signatures SalesHandy.

**2. La ligne de transparence CNIL manque dans les messages actuellement en base.** Les trois
`Mail 1` relus (SMF, ISFAM, DIPSO'S) ne la portent pas, alors que la séquence documentée l'impose
depuis le 24/08/2026. Les modèles ci-dessus la rétablissent.

**3. L'attribution de l'angle est faite, mais la règle ne segmente pas.** Appliquée le
2026-09-01 aux 216 lignes nouvelles : site en `http://` sans redirection vers HTTPS → SEO /
refonte, sinon Automatisation IA. Résultat mesuré sur les 215 sites testés en suivant les
redirections : **116 servent déjà HTTPS, 94 y redirigent, 5 restent en HTTP seul**. La règle
verse donc 211 lignes sur 216 du même côté.

| Angle | Base entière (302) | Dont lignes nouvelles |
| :--- | ---: | ---: |
| Automatisation IA | 243 | 211 |
| SEO / refonte | 48 | 5 |
| SEO local (à confirmer) | 11 | 0 |

Les cinq exceptions : SAS INSIGHT, ADOC METIS, SYNRJY, CELINE MATHON CONSULTING, FRAISSINET ET
ASSOCIES. En 2026, le protocole du site ne dit plus rien de l'état commercial d'un organisme :
HTTPS est devenu le défaut chez tous les hébergeurs. Si la segmentation doit servir à quelque
chose, il faut un autre critère — présence de dates de session sur le site, ou existence d'un
formulaire qui rend un tarif. Les deux demandent une lecture de page, pas un test de protocole.

**Piège rencontré, à ne pas refaire** : le premier test, écrit en `node`, a classé 19 sites en
« injoignables » avec `ENOTFOUND`. Vérification faite avec `curl`, ces 19 sites répondaient tous
et redirigeaient vers HTTPS. `node` ne résout pas certains domaines depuis ce shell — le même
symptôme que sur `api.apify.com`. **Tout test réseau de ce dépôt doit passer par `curl`.**
