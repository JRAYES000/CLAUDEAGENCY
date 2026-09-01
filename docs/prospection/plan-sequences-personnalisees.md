# Plan — une séquence de deux e-mails personnalisée par organisme (302 lignes)

Ouvert le 2026-09-01. Base : « Cibles — Prospection OF » (Notion). Objectif : chaque organisme
porte, dans ses colonnes `Objet`, `Mail 1`, `Relance J5`, une séquence de deux e-mails écrite sur
un constat lu sur son site — le format des 86 lignes déjà rédigées.

## État de départ (`mesuré` 2026-09-01, requête Notion)

| | Lignes |
| :--- | ---: |
| Base | 302 |
| Avec `Objet` + `Mail 1` + `Relance J5` | 86 |
| Sans mail | 216 |
| Sans site web (sur les 216) | 20 |
| Sans dirigeant (base entière) | 51 |
| Déjà synchronisées SalesHandy | 77 |

Les 86 mails existants : aucun ne porte l'adresse postale ni la ligne de transparence CNIL (0/86).
Ils affirment « 4 consultants IA », « +170 % de prospects en 90 jours », « escroquerie »,
« mes clients me supplient » — affirmations non vérifiables depuis le dépôt.

## Décisions de cadrage (Julien, 2026-09-01)

- **Lecture du site pour chacun des 216**, pas de modèle par angle.
- **Les 86 existants ne sont pas touchés** — ils partent sans adresse ni ligne CNIL, sur décision
  explicite. Les affirmations ci-dessus sont **conservées** et réutilisables dans les nouveaux.
- **Destination** : colonnes Notion, puis import SalesHandy sur une séquence unique à champs
  personnalisés (`Profile Headline` = objet, `Prospect Overview` = mail 1,
  `LinkedIn Profile Summary` = relance). **Aucun envoi sans feu vert.**

## Critères de réussite

- [ ] 302/302 lignes avec `Objet`, `Mail 1`, `Relance J5` non vides.
- [ ] Sur les 216 nouveaux : 0 sans signature légale (BULGARIA EDUCATION EOOD, Choumen) ni ligne
      CNIL ; 0 gras Markdown ; ≤ 1 lien ; 0 mention de CPF/OPCO comme financement de nos
      prestations.
- [ ] Chaque `Mail 1` nouveau cite au moins un fait lu sur le site de l'organisme (page et
      élément nommés dans le journal de production), ou la ligne est listée ci-dessous comme
      « sans site ».
- [ ] Longueur : `Mail 1` ≤ 180 mots hors signature, `Relance J5` ≤ 120.

## Mécanisme SalesHandy — réponse à la question « comment personnaliser par société »

La séquence « Micro-lot OF — dirigeants nominatifs » (`6vaKGjLoaW`) le fait déjà : le corps de
l'étape 1 est `{{Prospect Overview}}`, son objet `{{Profile Headline}}`, le corps de l'étape 2
`{{LinkedIn Profile Summary}}`. Le texte entier vit dans le champ du prospect ; SalesHandy ne
fournit que le fil, le calendrier et l'arrêt sur réponse. Dix envois le 31/08, zéro rebond
(`mesuré`). Rien à inventer : importer les 302 lignes avec ces trois champs mappés.

Contraintes connues : corps en HTML (`<b>`, `<br>`), pas de Markdown ; texte de désinscription à
franciser (code 2) à la création de toute séquence ; règles du protocole d'envoi inchangées.

**Deux formats, une conversion.** Dans Notion, les mails sont stockés en texte lisible (retours à
la ligne réels, `<b>` conservé), comme les 86 existants. À l'import SalesHandy, chaque retour à la
ligne devient `<br>` — script `build_payloads.py` du scratchpad de session. Écrire du `<br>` dans
Notion rendrait les colonnes illisibles ; envoyer des retours à la ligne à SalesHandy les
écraserait en un seul paragraphe.

**Trois populations à l'import, pour ne pas toucher aux séquences en cours :**

| Population | Traitement SalesHandy |
| :--- | :--- |
| 216 nouveaux + existants jamais synchronisés (avec e-mail) | Créés dans une **nouvelle** séquence à deux étapes, inactive |
| 77 existants déjà synchronisés (dont les 10 du micro-lot du 31/08 et les 32 de la vague du 25/08) | Champs mis à jour (`upsert`), **pas ajoutés** à la nouvelle séquence — ils restent dans la leur |
| Sans e-mail | Rien ; listés en fin de plan |

## Étapes

- [x] 1. Export des 216 lignes sans mail en JSON (sous-agent, Notion → scratchpad). 216/216.
- [x] 2. Lecture des sites par `curl` (page d'accueil + jusqu'à 6 pages formation / calendrier /
      contact / tarifs). **214 sites en HTTP 200, 2 derrière une page anti-robot** (lus ensuite
      par WebFetch), 6 pages par site en médiane (`mesuré`).
- [x] 3. Rédaction par 18 lots de 12, un sous-agent par lot, brief commun + 5 exemples des 86
      existants + le lot pilote relu à la main. Règle ajoutée après le pilote : ne jamais nommer
      un salarié de l'organisme.
- [x] 4. Contrôle par script : **216/216 conformes** (signature légale, ligne CNIL, 0 Markdown,
      0 lien, ≤ 180 / ≤ 120 mots, P.S., gabarit de relance), 0 objet dupliqué, 216 constats
      sourcés (page citée). Relecture manuelle : lot pilote entier + 3 mails de lots tardifs.
- [x] 5. Écriture dans Notion (`update_properties`, une page à la fois). **Contrôlé en direct le
      2026-09-02** (requête SQL sur la base, pas la checklist ci-dessus) : 137/216 étaient déjà
      écrites — une session précédente l'avait fait sans cocher cette case. Les 79 restantes
      (dont SAFE'EVENTS, montrée en exemple) ont été écrites ce jour. **302/302 lignes portent
      désormais `Objet` + `Mail 1` + `Relance J5`** (vérifié par requête, plus une seule vide).
      Défaut trouvé et corrigé : sur l'écriture des 79, `Objet` a perdu la casse d'un acronyme sur
      au moins 3 entrées (SAFE'EVENTS « CPF »→« cpf », FSPRO « CSE »→« cse », SARL EURESTO
      « Qualiopi »→« qualiopi ») — `Mail 1` et `Relance J5` non affectés. Les 79 `Objet` ont été
      réécrits verbatim depuis la source pour purger le défaut, y compris ceux déjà corrects.
- [x] 6a. Séquence SalesHandy créée le 2026-09-01 : **« Prospection OF — séquence personnalisée
      par organisme »** (`klw678deP1`), planning « Mar-Jeu 8h-11h 14h-16h », étape 1 jour 1
      (`8JwoQoAZaO`, objet `{{Profile Headline}}`, corps `{{Prospect Overview}}`), étape 2 jour 6
      (`9pa8W7epPy`, même fil, corps `{{LinkedIn Profile Summary}}`), désinscription francisée
      (code 2), **inactive** (`active: false` relu par l'API).
- [ ] 6b. Import des prospects dans l'étape 1, puis mise à jour des 77 déjà synchronisés.
- [ ] 7. Ligne de journal dans `protocole-envoi.md` (import seul, pas d'envoi).

## Hors import SalesHandy

**Sans e-mail en base (9, tous parmi les 86 existants)** : A J F sas, ANGLAIS@LILLE, ENVOL
ACADEMIE, FORMATIOB, ID LOGISTICS TRAINING, LJ FORMATION, SANTE TRAVAIL SERVICE, SECOURSFORM,
ST FRANCE. Leurs mails restent en Notion ; rien ne part sans adresse lue à une source.

**Exclu volontairement (1)** : **MTM** (SIREN 809564404, Saint-Étienne). Le site déclaré
`mtmnord.com` et l'adresse `contact@mtmnord.com` sont ceux d'une métallerie industrielle de
Saint-Saulve, homonyme. Règle 2 du protocole : l'adresse n'a pas été lue chez l'organisme visé.
Ses deux mails sont écrits en Notion sur les données publiques ; la ligne n'est pas synchronisée.

## Points relevés pendant la rédaction, à trancher avant l'envoi

- **« Je ne prends qu'un organisme par bassin d'emploi »** figure dans les 302 relances. La base
  compte plusieurs cibles sur un même bassin (Paris : plus de vingt ; Grenoble, Aix, Bordeaux,
  Nantes : deux ou plus). Les rédacteurs ont varié le nom du bassin (arrondissement,
  département, vignoble nantais…) mais la clause devient contestable si deux voisins reçoivent
  le mail la même semaine. Arbitrage à faire : espacer par bassin, ou reformuler la clause.
- **Sites qui ne montrent pas l'activité formation** (éditeurs de logiciel, agence de
  communication, coopérative d'intérim, portage salarial : NAUTILUX, SALAMANDRE, ANISEN,
  AVANTEAM, SAY COM, ETTIC EMPLOI, REZOSOCIAL, SOIL & CO, FACILITY CONCEPT, BULLITT PARTNERS,
  TSR FORMATION, SAS DECLIC, LOGICSANTE, SARL EURESTO, M. ASSISTANCE, ICC DEVELOPPEMENT,
  FLORA SOFTWARE, INGENIUM). Tous déclarent des stagiaires ; le mail dit ce qu'il a vu et
  s'appuie sur la déclaration publique. Cibles moins probables qu'un centre CACES ou SSIAP.
- **Civilités hors règle mécanique**, choisies d'après le nom d'usage lu sur le site :
  DES RESSOURCES ET DES HOMMES (« Madame Charrois »), SAS COEVOLUTION (« Madame Scheffer »),
  GORDON CROSSINGS (« Madame Reinhardt »), lot 14 (« Monsieur Zarb Pau »). FORMATION DOM :
  « Monsieur André » selon la règle, à corriger si le nom de famille est « Hervé ».
- **Signature de la boîte `equipe1@claudeagency.fr` dans SalesHandy** : réglée le 01/09 à 15:10
  sur « Claude Partners — L'annuaire francophone… » (`mesuré`, API). Une boîte Claude Agency
  avec une signature Claude Partners contredit la règle 4 du protocole. La nouvelle séquence
  n'a que `julien@claudeagency.eu` d'attaché pour cette raison. Les mails importés portent
  déjà leur signature : vérifier dans SalesHandy que la signature de compte n'est pas ajoutée
  une seconde fois sous le corps.
