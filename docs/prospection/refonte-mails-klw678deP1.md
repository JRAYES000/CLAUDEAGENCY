# Refonte des mails — séquence `klw678deP1` (Prospection OF personnalisée)

Chantier ouvert le **2026-09-09** sur décision de Julien. Séquence **en pause** pendant toute
l'opération. Ce fichier est le point de reprise : le lire avant de continuer.

## Ce qui change, et pourquoi

Deux réponses reçues sur 64 premiers contacts, dont une « Je n'ai rien compris à votre mail »,
et **3 désinscriptions sur 64 (4,7 %)**. Le diagnostic : l'offre irrésistible — le premier
chantier gratuit — n'était proposée qu'en relance J+5, donc seulement à ceux qui avaient ignoré
le premier mail. Elle remonte dans le mail 1, et le mail perd ses deux paragraphes de remplissage.

## Le gabarit — mail 1

```
Bonjour {SALUTATION},

{PRÉAMBULE + OBSERVATION fusionnés en un seul paragraphe, texte d'origine conservé}

Je suis consultant indépendant, j'accompagne des organismes de formation. Ce que je propose :
<b>je vous construis gratuitement {OFFRE}</b> — {CHANTIER}. Livrée chez vous, en fonctionnement.
Pas un audit, pas une démonstration. Si ça vous sert, on continue et <b>je ne suis payé qu'aux
résultats</b>. Sinon vous gardez le travail et on en reste là.

Je m'y mets ?

Julien Rayes — Claude Agency — claudeagency.fr

P.S. {P.S. D'ORIGINE, conservé mot pour mot}

Ces coordonnées professionnelles sont utilisées pour de la prospection commerciale B2B ; détail
du traitement sur simple demande à contact@claudeagency.fr.
```

## Le gabarit — relance J+7

```
{SALUTATION},

Je reviens vers vous une seule fois.

Ce que je proposais tient toujours : <b>je construis gratuitement {OFFRE}</b> — {CHANTIER},
livré, chez vous.

Ensuite, <b>je ne suis payé qu'aux résultats.</b> {CONDITION D'ORIGINE}

<b>Et je ne prends qu'un organisme par bassin d'emploi</b> — le vôtre est encore libre.

Je m'y mets ?

Julien Rayes — Claude Agency
```

## Règles de substitution

- `{OFFRE}` vaut **« votre première automatisation »** si `Angle` = *Automatisation IA*, et
  **« le premier chantier »** si `Angle` = *SEO / refonte* ou *SEO local*. Promettre une
  « automatisation » à un prospect dont le sujet est le référencement ne veut rien dire.
- `{CHANTIER}` et `{CONDITION}` se **reprennent mot pour mot dans l'ancienne relance J5**
  (fragments « Pas un audit, pas une démonstration : … » et « Si …, je ne gagne rien. »).
- `{OBSERVATION}` se conserve telle quelle : c'est la recherche déjà faite, elle ne se réécrit pas.
- **Le P.S. « +170 % de prospects en 90 jours » se garde** — arbitrage de Julien du 09/09.
- **Le nom de ville disparaît de la clause de rareté.** Les données géographiques se contredisent
  d'une fiche à l'autre (sur CDM : Notion dit Maurepas, le mail dit Vay, la relance disait Nantes).
  « Le vôtre est encore libre » dit la même chose sans pouvoir se tromper.
- Ce qui est **retiré** de la relance : « Mes concurrents facturent sans rien produire… le mot
  juste, c'est escroquerie » (accusation d'un délit pénal auprès de 200 dirigeants) et « mes
  clients me supplient de continuer avec eux ».
- Ce qui est **retiré** du mail 1 : le paragraphe de contrepoint, le « Plan de … » (un document
  n'est pas un bénéfice), et la ligne « 4 consultants IA ».
- La **ligne CNIL s'ajoute** aux fiches rédigées avant le 01/09, qui n'en ont pas.

## La méthode qui marche — pièges déjà payés

**Lecture Notion : mode `view`, pas mode `sql`.** Le quota « Query Data Source » du workspace
s'épuise en une dizaine de requêtes SQL ; le mode `view` n'est limité sur aucun plan. Vue dédiée
créée le 09/09 : `view://3d6e7fe5-dbf8-81c4-9f3c-000c726b69c8` (« Sync SalesHandy — lecture MCP »,
filtrée sur le drapeau, triée par nom). Pagination par `start_cursor` / `next_cursor`.

**Écriture SalesHandy : `import_prospects_with_field_name`, jamais
`import_prospects_to_sequence_step`.** Le second n'ajoute que des prospects : il refuse tout
prospect déjà présent dans la séquence, avec le message trompeur *« Prospect already present in
another step of same sequence »* — et le refus tombe aussi bien sur l'étape 1 que sur l'étape 2.
Pire, il **crée** silencieusement le prospect s'il est absent : c'est ainsi que 3 R CONSULTANTS
s'est retrouvé ajouté à la campagne le 09/09 (206 → 207), puis retiré à la main.

Paramètres qui fonctionnent : `conflictAction: "overwrite"`, `verifyProspects: false`. Champs
envoyés à chaque fois — **First Name et Last Name sont obligatoires**, et `overwrite` écrase ce
qui existe :

| Champ SalesHandy | Source Notion |
| :--- | :--- |
| `Email` | `Email` |
| `First Name` / `Last Name` | `Dirigeant` (premier mot / dernier mot) |
| `Profile Headline` | `Objet` — c'est **l'objet du mail** |
| `Prospect Overview` | `Mail 1` |
| `LinkedIn Profile Summary` | `Relance J5` |

Quand `Dirigeant` est vide, écrire `Direction` / `<NOM DE L'ORGANISME>` : c'est la convention
déjà en place dans la base. Les liens Markdown de Notion (`[site.fr](http://site.fr)`) se
retranscrivent **en texte nu** — c'est déjà ce que recevait le destinataire.

Sauts de ligne : `<br>` et `<br><br>`, jamais `\n` — le corps part en HTML.

Contrôle après chaque import : `check_prospect_import_status`. Un `failedProspectsURL` non nul
signale des refus ; le CSV se télécharge par `curl` et nomme les adresses en échec.

## Avancement

Ordre alphabétique de la vue. **Fiches traitées dans SalesHandy : 17.**

1ER GEST UMFI · 2C FORMA · 3 R CONSULTANTS · A F C PREVENTION · ACCES'TUDES · ACCORDIA · ACEISP ·
ACTEMOS · ACTIFORMA · ACYAN · ADFIRMO · ADN GROUP · ADOC METIS · AEFE · ALLEGRE ET DUC · ALPIC ·
ALTER EGO P.R.P.

**Reprendre à AMAE CONSEIL**, curseur
`s:mcp_non_archived_6abc0807-ea9a-491a-b006-bf78eb66246c:3cee7fe5-dbf8-81cf-a9cc-ed1813a55615`.

**Volontairement sautée : AH MANAGEMENT (EcloHesion).** Prospect chaud, en relation suivie, ses
deux mails sont déjà courts et sur mesure et sa relance ne contient pas le passage retiré.
La réécrire risquerait de casser une conversation en cours.

**3 R CONSULTANTS** a été retiré de la séquence le 09/09 sur décision de Julien ; sa fiche Notion
reste réécrite, sans effet.

## Ce qui reste après SalesHandy

1. **173 fiches** à traiter (190 portant le drapeau, moins 17).
2. **Notion n'est pas encore mis à jour** : les 190 propriétés `Mail 1` et `Relance J5` portent
   toujours l'ancien texte. À reprendre une fois SalesHandy fini, sinon une resynchronisation
   ultérieure réinstallerait le passage sur l'escroquerie.
3. **17 prospects de la séquence n'ont aucune fiche Notion identifiable** (206 en base contre 190
   drapeaux). Ils garderont l'ancienne relance tant qu'on ne les aura pas retrouvés un par un dans
   l'interface.
4. **Ne pas relancer la séquence** avant que les 173 soient faites : sinon un mélange d'ancien et
   de nouveau texte part le même jour.
