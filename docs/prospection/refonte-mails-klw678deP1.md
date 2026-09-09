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

## Avancement — chantier termine le 2026-09-09

**189 fiches sur 190 sont reecrites**, dans Notion et dans SalesHandy. Controle final par
reexport complet de la base :

| Controle | Resultat |
| :--- | ---: |
| Fiches synchronisees | 190 |
| Relances contenant encore « escroquerie » | **0** |
| Relances contenant encore « mes clients me supplient » | **0** |
| Mails 1 en nouvelle version (offre en tete, « Je m'y mets ? ») | **189** |
| Mails 1 sans ligne CNIL | **0** |
| Mails 1 sans l'offre gratuite | 1 (AH MANAGEMENT, volontaire) |
| Mention « 4 consultants IA » | **0** |

La sequence compte toujours **206 prospects** : aucun ajout accidentel.

**AH MANAGEMENT (EcloHesion) est la seule fiche laissee dans son etat d'origine** — prospect
chaud, en relation suivie, mails deja courts et sur mesure, relance sans le passage retire.
Seule la ligne CNIL, qui manquait, y a ete ajoutee.

**3 R CONSULTANTS** a ete retire de la sequence le 09/09 sur decision de Julien : sa fiche Notion
reste reecrite, sans effet.

### Deux gabarits, pas un

La base melange deux formats de mails, et c'est ce qui a fait echouer la premiere passe :

- **le gabarit long** (176 fiches) : neuf blocs, preambule, observation, contrepoint, « Plan
  de… », question, signature, P.S., ligne CNIL ;
- **le gabarit court** (10 fiches, ecrites plus tard) : cinq blocs, ni P.S. ni ligne CNIL, et un
  chantier introduit par « Le premier chantier est gratuit : … » au lieu de « Pas un audit, pas
  une demonstration : … ».

`transforme.py` traite le premier, `transforme_court.py` le second. Les deux produisent le meme
resultat final.

### Le piege des accents dans les expressions regulieres

Quatre fiches — ACTIFORMA, BIGOT FORMATION, INSPIRATIONS MANAGEMENT, STARTER FORMATION — sont
passees a travers la premiere passe parce que la classe `arr[eé]t[eé]` ne couvre pas le **e
circonflexe** d'« arrete ». Leur preambule disait « une ligne / une phrase / un chiffre m'a
arrete », forme absente de la liste des variantes. Ecrire `arr[eéê]+t[eé]+`, et prevoir la forme
generique `(?:une?|un)\s+\w+\s+m'a`.

Meme famille de piege sur les noms d'affichage : le champ `Dirigeant` contient parfois une raison
sociale ou un sigle, et « JPB&DF » devenait « Jpb&df », « FEDERATION R… » devenait « Federation
R ». La parade est dans `noms.py` : liste de mots de forme sociale, rejet des sigles et des noms
d'une ou deux lettres, repli sur `Direction` + nom de l'organisme (44 fiches concernees).

### Un dernier piege, cher en temps

**Ne jamais faire transiter du JSON accentue par un tube `stdin` sous Windows.** Un
`cat fichier.json | python -c "json.load(sys.stdin)"` decode l'UTF-8 avec la page de code de la
console et produit un fichier doublement encode (« nouveautÃ© »). Ouvrir le fichier directement
avec `io.open(chemin, encoding='utf-8')`.

### Ce qui reste

1. **17 prospects de la sequence n'ont aucune fiche Notion identifiable** (206 en base contre 190
   drapeaux « Sync SalesHandy »). Ils gardent leurs anciens textes. Les retrouver demande de
   parcourir la liste des 206 dans l'interface, un par un.
2. **La sequence est toujours en pause.** Elle peut repartir : les 189 fiches reecrites sont en
   place. La relance part desormais a J+7, le planning est passe a lundi-vendredi 9 h-18 h, la
   priorite est equilibree et le suivi des ouvertures est actif.
3. **Surveiller le taux de desinscription**, qui etait a 4,7 % sur les 64 premiers contactes.
   C'est le seul jugement que le marche ait rendu sur l'ancien texte.
