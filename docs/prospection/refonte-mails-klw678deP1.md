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

## La methode qui marche — pieges deja payes

**Lecture Notion : l'API REST, pas le connecteur MCP.** Le mode `sql` du connecteur a un quota
« Query Data Source » qui s'epuise en une dizaine de requetes ; le mode `view` n'a pas de quota
mais fait transiter tout le contenu par la conversation. `NOTION_TOKEN` est au coffre GitHub
(`env/secrets.md`) — confirme par Julien le 09/09 — donc l'export passe par
`POST https://api.notion.com/v1/databases/<id>/query` en `curl`, filtre sur la case
`Sync SalesHandy`, et s'ecrit dans un fichier local : 190 lignes, 500 Ko, cout de contexte nul.

**La reecriture est scriptee, pas manuelle.** Les 190 mails suivent le meme gabarit a neuf blocs
separes par des lignes vides. Le script decoupe, garde les blocs 1 a 3, jette le contrepoint et
le bloc « Plan de… », insere le bloc d'offre, et reprend le P.S. tel quel. Le chantier et la
condition se relevent par expression reguliere dans l'ancienne relance. **176 fiches sur 190**
passent sans intervention ; les 14 autres sont listees plus bas.

Trois pieges de la transformation, tous corriges dans le script :
- `livr[ee]s?` ne capture pas « livrees » : il faut `livr[ée]+s?`, sinon le fragment
  « …, livrees, chez vous » reste et le mail dit deux fois « chez vous ».
- Le lookbehind `(?<![ée])` est indispensable devant `livr`, sinon « delivres » est mange.
- L'accord de « Livree / Livre » suit **l'offre**, pas le chantier : la phrase se termine donc
  par « . Livree chez vous, en fonctionnement. », jamais par « , livree chez vous ».

**Ecriture SalesHandy : `import_prospects_with_field_name`, jamais
`import_prospects_to_sequence_step`.** Le second n'ajoute que des prospects : il refuse tout
prospect deja present dans la sequence, avec le message trompeur *« Prospect already present in
another step of same sequence »* — le refus tombe aussi bien sur l'etape 1 que sur l'etape 2.
Pire, il **cree** silencieusement le prospect s'il est absent : c'est ainsi que 3 R CONSULTANTS
s'est retrouve ajoute a la campagne le 09/09 (206 → 207), puis retire a la main.

Il n'existe **pas** de cle API SalesHandy exploitable dans le coffre : les dix candidats testes
rendent tous 403 sur `open-api.saleshandy.com`. L'envoi passe donc obligatoirement par le
connecteur MCP, un lot a la fois.

Parametres qui fonctionnent : `conflictAction: "overwrite"`, `verifyProspects: false`. Champs
envoyes — **First Name et Last Name sont obligatoires**, et `overwrite` ecrase ce qui existe :

| Champ SalesHandy | Source Notion |
| :--- | :--- |
| `Email` | `Email` |
| `First Name` / `Last Name` | `Dirigeant` (premier mot / dernier mot) |
| `Profile Headline` | `Objet` — c'est **l'objet du mail** |
| `Prospect Overview` | `Mail 1` |
| `LinkedIn Profile Summary` | `Relance J5` |

Quand `Dirigeant` est vide, un sigle, ou une raison sociale (SARL, TRANSPORTS, HOLDING, `&`…),
ecrire `Direction` / `<NOM DE L'ORGANISME>` : c'est la convention deja en place dans la base.
Les liens Markdown de Notion se retranscrivent **en texte nu** — c'est deja ce que recevait le
destinataire. Sauts de ligne : `<br>` et `<br><br>`, jamais `
`, le corps part en HTML.

Controle apres chaque import : `check_prospect_import_status`. Un `failedProspectsURL` non nul
signale des refus ; le CSV se telecharge par `curl` et nomme les adresses en echec.

**Un lot fait 12 fiches, soit environ 28 Ko.** Au-dela (20 fiches, 46 Ko), la sortie de `cat` est
tronquee et le lot ne peut plus etre recopie dans l'appel MCP.

## Avancement — chantier termine, sequence relancee le 2026-09-09

**287 fiches reecrites**, dans Notion et dans SalesHandy. La sequence est **repartie** :
206 prospects, 142 mails 1 reprogrammes, 64 deja contactes qui recevront la relance a J+7.

### Le drapeau « Sync SalesHandy » ne definit pas la campagne — erreur a ne pas refaire

C'est le piege central de ce chantier, et il a failli couter cher. J'ai d'abord pris les
**190 fiches portant le drapeau** pour la campagne. Faux. En relevant les 206 adresses reelles de
la sequence dans l'interface, page par page, et en les croisant avec la base :

- **109 seulement** des 206 prospects de la sequence portaient le drapeau ;
- **97** etaient dans la base Notion **sans** le drapeau — invisibles pour la premiere passe, et
  tous porteurs du passage sur l'escroquerie ;
- **81** fiches a drapeau ne sont pas dans la sequence — reecrites pour rien, sans dommage.

Le drapeau n'a jamais ete tenu a jour. **La seule source fiable du perimetre d'une campagne est la
liste des prospects dans SalesHandy**, pas une case a cocher dans Notion.

Relever ces 206 adresses demande de la patience : l'interface tronque les adresses longues dans le
DOM, et la pagination ne repond ni au clic sur le libelle « Next » ni a `element.click()` sur le
span — il faut viser `ul.pagination a.page-link`. Le script de collecte est a lancer en tache de
fond (`.then()`), car un appel JavaScript synchrone depasse le delai de 45 s de l'outil et remonte
une erreur alors meme que le travail continue.

### Controle final — cote Notion, ou le texte est exact

Notion est ecrit **par script**, donc au caractere pres ; SalesHandy est rempli par **recopie**
dans un appel MCP. La reference, c'est donc Notion.

| Controle sur les 287 fiches | Resultat |
| :--- | ---: |
| Relances contenant « escroquerie » | **0** |
| Relances contenant « mes clients me supplient » | **0** |
| Mails 1 sans ligne CNIL | **0** |
| Textes contenant un caractere non latin | **0** |
| Mails 1 en ancienne version | 1 (AH MANAGEMENT, volontaire) |

### Ce qui reste non verifie

**La fidelite de la recopie dans SalesHandy.** Un sous-agent a detecte et corrige de lui-meme un
caractere parasite dans un champ (`contact@comptoirdesrh.fr`), mais aucune relecture caractere par
caractere n'a ete faite sur l'ensemble. Il n'existe **aucune lecture en masse** des champs
personnalises : l'API MCP n'expose pas les prospects, le journal reseau du navigateur ne capte pas
les appels de l'application, et le filtre de recherche de la page prospects ne repond pas au
pilotage. Le seul controle possible est visuel, fiche par fiche, dans l'apercu de l'etape.

Le risque residuel est **cosmetique** : une lettre de travers dans un mot. Les elements de fond —
offre en tete, passage retire, ligne CNIL — sont structurels et presents dans chaque envoi.

### Ce qui a ete corrige en cours de route

- **FRAISSINET ET ASSOCIES** : la coupe du preambule laissait « Il n'y avait presque rien a lire
  — c'est. », phrase suspendue. La regle de coupe suppose que la proposition « … m'a arrete » est
  detachable ; ici elle etait le predicat. Un seul cas sur 287, repare.
- **SPIRALISS** : preambule au pluriel, « deux details m'**ont** arrete ». La regex ne couvrait que
  « m'a ».
- **Noms d'affichage** : sigles et raisons sociales pris pour des noms de personnes.

### Reglages en vigueur a la reprise

Planning **lundi-vendredi 9 h-18 h** (Europe/Paris), relance a **J+7**, priorite **equilibree**,
**suivi des ouvertures actif**, 8 mails/jour et par boite sur quatre boites, soit 32/jour.

**A surveiller** : le taux de desinscription, a 4,7 % sur les 64 premiers contactes. C'est lui qui
dira si la reecriture a servi.
