# Journal SEO — claudeagency.fr

Antéchronologique : l'entrée la plus récente en haut. Mode d'emploi dans `README.md`.
Une action SEO sans entrée ici n'existe pas pour les sessions suivantes.

---

## 2026-08-17 (3) — Kit d'identité : logo tranché — symbole seul, pas de wordmark

**Type :** netlinking (préparation, aucun lien créé, aucune fiche soumise)

**URLs :** aucune — document interne `docs/seo/kit-identite.md`

**Pourquoi :** point laissé ouvert par l'entrée précédente (absence de logotype avec le texte
« Claude Agency »). Julien tranche : le symbole seul suffit, cohérent avec le site
claudeagency.fr qui utilise lui-même du texte stylé en HTML plutôt qu'un logo graphique avec le
nom intégré.

**Fait :** `kit-identite.md` mis à jour — la note sur le logo acte la décision au lieu de la
lister comme ouverte, et une section « Reste » ajoutée en fin de document reprend les deux points
encore ouverts (logo à revoir si un annuaire l'exige explicitement, effectif non prouvé).

**Mesure :** non mesuré — document de préparation, aucune fiche encore soumise.

**Suite :** utiliser ce kit pour créer les 6 fiches de la Vague 1.

---

## 2026-08-17 (2) — Kit d'identité : description ~500 caractères ajoutée, logo SVG vérifié

**Type :** netlinking (préparation, aucun lien créé, aucune fiche soumise)

**URLs :** aucune — document interne `docs/seo/kit-identite.md`

**Pourquoi :** relecture de Julien sur l'entrée précédente : la cible ~500 caractères du prompt
initial n'était pas couverte (seulement 169 et 1650), et l'hypothèse sur `favicon.svg` comme
« logo SVG » n'avait pas été vérifiée visuellement.

**Fait :** description moyenne de 481 caractères ajoutée dans `kit-identite.md`, condensée à
partir des mêmes phrases déjà sourcées (aucun fait nouveau) — les trois longueurs (169 / 481 /
1650) coexistent désormais, chacune avec sa longueur exacte et sa source. `logo.png` et
`favicon.svg` comparés (lecture du SVG + rendu visuel du PNG) : même étoile à 12 branches, même
couleur `#CC785C`, sans texte — ce n'est pas une favicon distincte d'un logo, les deux fichiers
sont bien le même symbole en deux formats. Noté cependant : aucun logotype avec le texte « Claude
Agency » n'existe dans le dépôt, seulement le symbole seul.

**Mesure :** non mesuré — document de préparation, aucune fiche encore soumise.

**Suite :** utiliser ce kit pour créer les 6 fiches de la Vague 1 ; trancher avec Julien si un
annuaire exige un logo avec le nom de l'entreprise inscrit dessus (absent du dépôt).

---

## 2026-08-17 — Kit d'identité : NAP source unique + descriptions + champs annuaires

**Type :** netlinking (préparation, aucun lien créé, aucune fiche soumise)

**URLs :** aucune — document interne `docs/seo/kit-identite.md`

**Pourquoi :** la Vague 1 de `NETLINKING-ACTIONS.md` (6 fiches à créer) demande un NAP identique
sur toutes les fiches sous peine de dédoublement d'entité côté Google. Le kit centralise le NAP,
les deux descriptions déjà rédigées et les champs récurrents des annuaires pour que SOLOHERY
copie sans reformuler.

**Fait :** `docs/seo/kit-identite.md` créé avec le NAP fourni le 13/08/2026 (nom, adresse,
téléphone) en bloc de code intouché, la description courte de `NETLINKING-ACTIONS.md` (169
caractères, calibrée 200) et la description longue de `linkedin-kit.md` (1650 caractères,
calibrée 1500-2000), et un tableau des champs annuaires (catégories, zone, langue, année de
création, e-mail public, logo PNG/SVG du dépôt). Effectif marqué « à trancher », non prouvé.
Aucun texte à ~500 caractères ne s'est trouvé dans les deux sources : signalé plutôt qu'inventé.

**Mesure :** non mesuré — document de préparation, aucune fiche encore soumise.

**Suite :** utiliser ce kit pour créer les 6 fiches de la Vague 1 ; rédiger le texte ~500
caractères si un annuaire l'exige.

---

## 2026-08-15 (3) — Plan SOLOHERY : B9 supprimée, retour à la ligne partout, onglet Mesures refondu

**Type :** documentation de pilotage (aucune page, aucun contenu publié, aucun lien modifié)

**Pourquoi :** trois demandes de Julien — supprimer l'action B9, activer le retour automatique à la
ligne sur l'ensemble des onglets, et simplifier l'onglet `Mesures` pour qu'il réponde à ses deux
questions de manager : le travail a-t-il été mené jusqu'au bout, et qu'est-ce que ça a donné.

**Fait — B9 supprimée, le plan passe de 76 à 75 tâches** sur les chantiers A à E (81 avec les
6 étapes du chantier F, qui vivent hors des cinq chantiers). Les deux lignes qui en dépendaient
sont recalées : B6 ne dépend plus de rien et son repli — commenter depuis son propre profil, avec
Claude Agency dans le titre — devient le chemin principal ; A9 dépend de A1.

**Fait — retour automatique à la ligne** sur les dix onglets, vérifié au préalable sur une cellule
témoin : `GOOGLESHEETS_FORMAT_CELL` n'applique que les propriétés qu'on lui passe, un appel avec le
seul `wrap_strategy` conserve fond, gras, couleur et alignement. Seuls les titres de section de
l'onglet d'accueil restent en `OVERFLOW_CELL`, pour déborder sur leurs voisines vides plutôt que
de s'empiler dans une colonne de 209 px.

**Fait — onglet `Mesures` refondu en 5 blocs.** L'onglet était un relevé de 18 indicateurs à plat ;
il devient un tableau de bord qui se lit dans l'ordre des questions.
1. *Le travail a-t-il été fait ?* — six lignes calculées depuis les onglets de tâches (tâches,
   faites, bloquées, reste à faire) et une colonne d'alerte, `⚠ Faites sans preuve`
   (`COUNTIFS(statut="Fait" ; preuve="")`). C'est le vrai contrôle du manager : la règle du plan
   est que sans preuve une tâche reste « En cours ».
2. *Les objectifs sont-ils atteints ?* — les 6 objectifs chiffrés du sprint avec cible, avant,
   après et un verdict par ligne, plus un verdict global.
3. *Les autres chiffres* — les 9 indicateurs sans cible, avec le sens de lecture (`↑ mieux` /
   `↓ mieux`, qui manquait pour la position moyenne et le LCP) et l'écart calculé.
4. *L'argent dépensé* — les trois enveloppes, avec le reste calculé.
5. *Le 27/08* — le prompt de relevé, réécrit sur les nouvelles adresses de cellules.

La colonne « Skill équipe conseillée » disparaît de cet onglet : elle répétait la même
recommandation 18 fois. Une seule colonne se saisit désormais à la main, « Après (27/08) ».
Les renvois qui citaient l'ancienne mise en page sont corrigés : A12, E3 (prompt, livrable et
critère) et la note « ce qu'est une skill » de l'onglet d'accueil.

**Incident technique, à retenir pour toute réécriture de bloc.** Une cellule fusionnée héritée de
l'ancienne mise en page (`B22:F22`) avalait silencieusement les écritures : l'API répondait
`updatedCells: 4` et la relecture rendait des cellules vides. Aucun outil d'*unmerge* n'est exposé
côté Composio — la parade est de supprimer la ligne puis d'en réinsérer une au même index, ce qui
détruit la fusion et laisse la structure inchangée (formules et plages vérifiées après coup :
`COUNTIF(F18:F23; …)` est bien revenu à ses bornes). **À contrôler avant de réécrire un bloc :**
`GOOGLESHEETS_GET_SPREADSHEET_INFO` avec `fields=sheets(properties(sheetId,title),merges)`.

**Point à surveiller.** Les valeurs « Avant (12/08) » de l'ancien tableau ont été écrasées par le
premier jet du bloc 1, puis réécrites depuis le dépôt (`PLAN-SOLOHERY.md` §2 et `BACKLOG.md`) :
0 domaine référent, 0 backlink, autorité 1/100, 49 clics, 2 797 impressions, position 33,3, LCP
4,2 s. Une seule ne figurait nulle part — les abonnés LinkedIn : elle est à 0 parce que la page
entreprise n'existe pas encore (c'est la tâche B10 qui la crée), et cette raison est écrite dans
la cellule plutôt que laissée à deviner.

---

## 2026-08-15 (2) — Plan SOLOHERY : revue critique des 10 onglets, 76 tâches

**Type :** documentation de pilotage (aucune page, aucun contenu publié, aucun lien modifié)

**Pourquoi :** seconde passe demandée par Julien — critiquer et améliorer chaque onglet, un
relecteur par onglet, avec trois objectifs : compréhensible par SOLOHERY, sans incohérence,
efficace pour Claude Code.

**Fait — 7 tâches ajoutées, le plan passe de 69 à 76.** A14 (saisir le code Google reçu par
courrier — personne ne vérifiait qu'il arrivait, alors que la validation de la fiche en dépend) ·
A15 (relire le NAP sur les 6 fiches en ligne, seul contrôle qui protège la valeur des six autres
tâches) · B9 (profil LinkedIn de Julien : c'était la tâche manquante derrière le trou B2, et son
contenu dormait déjà rédigé dans `docs/seo/linkedin-kit.md`) · B10 (réserver l'URL LinkedIn que
`app/src/layouts/BaseLayout.astro` déclare déjà dans le `sameAs` de toutes les pages, alors que la
page n'existe pas) · D24 (suivre les réponses positives jusqu'au rendez-vous — le plan s'arrêtait
à l'envoi) · E6 (compte des dépenses engagées : trois enveloppes couraient sans totalisation) ·
E7 (passage de relais pour les cinq échéances de septembre).

**Fait — corrections de fond.** Chaîne de dépendances de la prospection refaite : D12 dépendait de
la mauvaise tâche et n'apparaissait dans aucun verrou de D5, on pouvait donc lancer la vague du
25/08 avec une séquence vide. C6 visait un article supprimé le 14/08 et un autre qui avait déjà sa
couverture : ligne réécrite sur la dette réelle (28 des 54 articles partagent la même image
générique). C1 ne produisait aucun fichier, donc C2 n'avait rien à ouvrir quatre jours plus tard :
deux CSV à chemin explicite. C5 demandait de mettre en noindex un sous-domaine que ce dépôt ne
sert pas. Une trentaine de prompts « ouvre la page et remplis le formulaire » inversés : Claude
Code n'a pas de navigateur, il rend le texte champ par champ et dit où cliquer.

**Fait — onglet Mesures.** Le débat 28 jours / 88 jours tranché sur 88, la fenêtre que relève
déjà C1 : les cases « inconnu » retrouvent leurs 49 clics et 2 797 impressions. Ajout d'une ligne
de **verdict automatique** (objectif ≥ 5 domaines référents, atteint ou non), de trois lignes de
suivi budgétaire et d'une colonne Écart calculée. 15 → 18 indicateurs.

**Fait — onglet ⛔ Interdits, 17 → 23 lignes.** Les six ajouts vivaient ailleurs sans avoir jamais
été écrits là : seconde fiche Google, second compte Saleshandy, envoi avant le 25/08, toucher à
`contact@claudeagency.fr`, écrire un chiffre non vérifié, refaire une fusion d'articles avant le
relevé du 11/09. Les huit qui manquaient côté dépôt sont ajoutés à `PLAN-SOLOHERY.md` §7, avec la
règle qui a manqué : une décision écartée s'écrit aux deux endroits le même jour.

**Fait — dans le dépôt.** DMARC recalé au 25/09 (un mois après le premier envoi du 25/08, pas
12/09). `BACKLOG.md` ne renvoie plus à la skill `netlinking-ecole-naturo`, qui appartient à un
autre projet et se calibre sur un site santé YMYL, mais aux 7 critères de l'onglet F.

**Tranché par Julien le 15/08/2026 — trois arbitrages.**
1. **Les 20 liens s'achètent en `dofollow`, risque assumé.** `NETLINKING.md` §6.3 dit l'inverse et
   n'a pas été retiré : l'analyse reste exacte, et la décision se prend contre elle en connaissance
   de cause. Un encadré daté la consigne, avec ce qui reste non négociable — mention « article
   sponsorisé » visible (obligation légale française, distincte du risque Google), 0 % d'ancre
   exacte au démarrage, filtrage qualité sur chaque donneur. À rouvrir si une pénalité manuelle
   apparaît dans la Search Console.
2. **Les demandes d'adhésion partent de `equipe1@claudeagency.fr`**, plus de l'adresse Gmail
   personnelle. Corrigé à la source dans `NETLINKING-ACTIONS.md`, que lisent A7, A8, A9 et A10.
3. **B9** : Julien ouvre l'accès à son profil LinkedIn, SOLOHERY colle. La tâche n'attend donc
   personne, et garde son repli à 48 h.

**Point mesuré au passage.** Les 2 797 impressions de référence ne sont pas filtrées du bruit
robot (~140 affichages, 0 clic). Le point de départ du sprint est donc légèrement faux aux trois
endroits où il est écrit. C1 relève la même fenêtre avec le filtre : c'est sa sortie qui corrigera
les trois d'un coup. Les 49 clics ne bougent pas.

---

## 2026-08-15 — Plan SOLOHERY : skills d'équipe assignées, passe de cohérence, `PLAN-SOLOHERY.md` remis d'aplomb

**Type :** documentation de pilotage (aucune page, aucun contenu publié, aucun lien modifié)

**Pourquoi :** Julien voulait que SOLOHERY sache, tâche par tâche, quelle skill d'équipe
(`github.com/JRAYES000/marketplace-equipe`) déclencher — et que le plan cesse de se contredire.

**Fait — Google Sheet du sprint.** Trois colonnes ajoutées à chaque onglet de tâches, placées
**entre « À faire » et « Livrable attendu »** : skill conseillée, comment la déclencher, ce que ça
change. 75 lignes annotées : 34 `phrase-magique`, 22 `fonce`, 8 `parallelisation-et-routage`,
3 `ponytail`, 8 sans skill. `delegation-deepseek-openrouter` n'est conseillée nulle part —
les seules tâches assez volumineuses portent des coordonnées nominatives de prospects, que la skill
interdit d'envoyer à un modèle tiers. Deux sections ajoutées à l'onglet d'accueil : le catalogue
des skills, et les réflexes du guide « Bien utiliser Claude » (`/clear` par sujet, `/context` avant
un gros travail, `/compact` en dernier recours, passe de preuves en conversation neuve).

**Fait — incohérences corrigées dans la Sheet.** Sept factuelles : 69 → 54 articles (onglet C et
accueil) ; « 62 mots-clés devinés » → 53 lignes `deduite-du-slug-A-VALIDER` + 10 `deduite-A-VALIDER`
comptées dans `REQUETES.csv` ; D4 annonçait 3 e-mails pour une séquence qui en compte 5 ; A9 et B6
dépendaient d'une tâche `B2` qui n'existe pas ; D00a datée J1 · 14/08 alors que J1 = 13/08 partout
ailleurs ; D11 planifiée avant la tâche dont elle dépend ; D23 due avant D12 dont elle dépend ; F1
présentée comme « la seule étape à la main » alors que F5 (l'achat) l'est aussi ; seuil D+ qui
parlait de « deux autres boîtes » sur une rotation qui en compte quatre.

**Fait — quatre arbitrages tranchés par Julien le 15/08.**
1. **Premier envoi au mardi 25/08**, pas le 18/08. Le 18/08 était impossible : D3 ne rend les
   e-mails des décideurs que le 20/08. Chauffe portée à 12 jours (13 → 24/08), montée en charge de
   l'onglet D+ décalée d'une semaine, D6 au 26/08.
2. **Tâche B8 créée** : B3 fait écrire 10 posts LinkedIn, B4 et B5 n'en publiaient que 8.
   À un post tous les 2 jours, la série court jusqu'au 17/09 — écrit noir sur blanc plutôt que
   laissé implicite.
3. **Inscriptions du webinaire (D19) → Google Sheet dédié.** Le critère exigeait qu'une inscription
   de test « arrive dans la liste » sans jamais dire laquelle, et Brevo est interdit sur ce projet.
4. **Dates du week-end** : seules les tâches impliquant un tiers sont décalées (A9 quittait le
   samedi 15/08, férié). La fenêtre de B4 était arithmétiquement impossible — 4 posts « mardi ou
   jeudi » dans une fenêtre qui ne contenait qu'un mardi — et a été refaite sur des dates explicites.

**Fait — `docs/PLAN-SOLOHERY.md` corrigé sur cinq points** où il contredisait la Sheet :
articles 69 → 54 ; « un seul enregistrement DNS » → quatre CNAME `go`, un par domaine d'envoi ;
warm-up 14 jours → 12 jours avec départ au 25/08 ; « le premier envoi ne peut pas partir dans le
sprint » → il part le 25/08 ; section 8 « Points à trancher par Julien » marquée périmée par la
règle D00b du 14/08, et ligne netlinking alignée sur l'enveloppe déjà autorisée.

**Non fait volontairement.** Aucune tâche du plan n'a été exécutée — seul le plan a été corrigé.
Les chiffres « Avant » de l'onglet Mesures restent à `inconnu` sur les lignes GSC : ils sont
annoncés sur 28 jours alors que le relevé de référence porte sur 88 jours (14/05 → 09/08). Les
mesurer relève de la tâche C1, pas de cette passe — et écrire 49 clics dans une case « 28 jours »
aurait été un chiffre inventé.

---

## 2026-08-14 — Ménage : 15 articles fusionnés (cannibalisation) + 5 docs supprimés

**Type :** consolidation de contenu + nettoyage de la documentation

**Pourquoi :** audit de cannibalisation demandé par Julien. Similarité TF-IDF (bigrammes, cosinus)
calculée entre les 69 articles, croisée avec `REQUETES.csv` : **32 paires > 0,28 de similarité,
6 paires > 0,45**. Des articles traitant le même sujet se disputaient les mêmes requêtes. Rien
n'était « vieux » — tout le blog date de juin-juillet 2026 — le problème était la redondance.

**Fait — 15 fusions, blog de 69 à 54 articles.** Contenu utile reversé à la main dans l'article
gardé (jamais par script, cf. incident du 03/07), ancienne URL en 301.

| Supprimé | Sim. | Clics/Impr. | → Fusionné dans |
| :--- | ---: | ---: | :--- |
| `automatiser-gestion-qualiopi-ia` | 0,50 | 0 / 0 | `automatiser-qualiopi-ia` |
| `qualiopi-ia-gagner-5h-semaine` | — | 0 / 0 | `automatiser-qualiopi-ia` |
| `reduire-charge-administrative-organisme-formation` | — | 0 / 0 | `automatiser-qualiopi-ia` |
| `automatiser-bpf-organisme-formation` | 0,52 | 0 / 138 | `remplir-bpf-organisme-formation` |
| `seo-guide-complet-organisme-formation-2026` | 0,47 | 0 / 20 | `seo-organisme-formation` |
| `remplir-sessions-formation` | 0,40 | 0 / 1 | `seo-organisme-formation` |
| `rgpd-ia-organisme-formation` | 0,45 | 0 / 1 | `donnees-stagiaires-rgpd-ia` |
| `automatiser-emargement-suivi-stagiaires` | 0,40 | 0 / 9 | `feuille-emargement` |
| `audit-surveillance-qualiopi` | 0,39 | 0 / 9 | `qualiopi-guide-organisme-formation` |
| `financer-formation-opco-cpf-france-travail` | 0,34 | 0 / 5 | `plan-financement-formation` |
| `formation-claude-anthropic-organisme-formation` | — | 0 / 0 | `formation-claude` |
| `claude-agency-vs-concurrents` | 0,36 | 0 / 40 | `meilleure-agence-ia-organisme-formation` |
| `claude-code-organisme-formation` | 0,51 | 1 / 14 | `formation-claude-code` |
| `optimisation-site-organisme-formation` | — | 0 / 1 | `/services/optimisation-site/` |
| `creer-organisme-formation` | 0,47 | 0 / 2 | `numero-declaration-activite` |

**Le cas à surveiller — le BPF.** `automatiser-bpf` captait 138 impressions sur « logiciel bilan
pédagogique et financier », mais en position 34. `remplir-bpf` est deux fois plus long et en
position 14,6. La fusion a explicitement **repris le champ lexical « logiciel BPF »** dans
l'article gardé (nouvelle section « Quel logiciel pour préparer son BPF ? ») et son title est
devenu « BPF : comment le remplir, avec ou sans logiciel ». **À vérifier au relevé du 11/09** :
si les 138 impressions ne se reportent pas, le title est à revoir.

**Fait — 88 liens internes réécrits** à la main, dont 34 ancres reformulées (une ancre qui citait
le titre d'un article supprimé pointait vers un article au titre différent). Contrôle : 0 lien
interne cassé dans le HTML généré (vérifié sur `dist/`).

**Fait — 15 redirections 301** dans `app/public/_redirects`, posées dans le même commit.

**Fait — 5 documents supprimés (78 Ko).** `docs/reference-technique-astro.md` (guide de
construction d'un site déjà construit, 23 mentions de l'ancien domaine), `SEO-STRATEGY.md`
(14/06, bâti sur les données GSC de `sc-domain:claudepartners.fr` — remplacé par ce dossier),
`docs/seo/netlinking-cibles.md` (16/06, remplacé par `NETLINKING-ACTIONS.md` du 12/08),
`docs/seo/audit-technique-ubersuggest.md` (crawl de l'ancien domaine), `ONBOARDING.md` (gabarit
auto-généré vide). Les 8 références pointant vers ces fichiers ont été corrigées.

**Corrigé au passage :** `docs/lead-magnet-emails.md` envoyait les liens PDF et audit vers
`claudepartners.fr`. Bug en production sur le lead magnet, réparé.

**Non fait, volontairement.** Cinq articles à 0 impression **sans doublon** ont été conservés
(`ia-pedagogie-personnalisation`, `roi-ia-organisme-formation`, `formation-ia-equipe`,
`tarifer-formations-organisme-formation`, `sea-google-ads-organisme-formation`). Six semaines
d'existence sur un domaine d'autorité 1 : l'absence d'impression n'est pas une donnée. Décision
au relevé du **11/09**. Ne pas les resupprimer sans ce relevé.

**Mise en garde à retenir.** Ce ménage traite la cannibalisation, il ne débloquera pas le trafic.
Le point de blocage reste celui du backlog : **0 backlink, autorité 1/100**. Vague 1 du netlinking
(`NETLINKING-ACTIONS.md`) avant toute nouvelle action sur le contenu.

**Mesure :** aucune à ce stade — une consolidation se lit sous 3 à 6 semaines.
**Suite :** au relevé du **2026-09-11**, vérifier (1) le report des 138 impressions BPF,
(2) que les 15 URL redirigées ne génèrent pas de 404 dans GSC, (3) le sort des 5 articles gardés.

---

## 2026-08-12 — Réécriture des title/meta sur 9 pages + plan netlinking

**Type :** réécriture + netlinking (préparation)

**Pourquoi :** deux constats du relevé du matin. (1) Des pages ressortent en page 1 sans récolter
un seul clic — leur balise title ne correspond pas à ce que les gens tapent réellement.
(2) 0 backlink : aucun travail on-page ne débloquera le site sans autorité.

**Fait — 9 `title` + `description` réécrits**, alignés sur les requêtes **réellement constatées
dans GSC** pour chaque page, pas sur des requêtes supposées. Positions de départ (14/05→09/08/2026) :

| URL | Requête réelle principale | Pos. | Clics |
| :--- | :--- | ---: | ---: |
| `/services/seo/` | agence référencement naturel claude | **3,8** | **0** |
| `/blog/claude-ai-en-francais/` | claude francais | 4,7 | 1 |
| `/blog/convention-de-formation/` | convention de formation mentions obligatoires | 13,8 | 0 |
| `/blog/formation-autofinancee-france-travail/` | formation autofinancée **pole emploi** | 14,8 | 0 |
| `/blog/feuille-emargement/` | émargement conférence / signature | 16,0 | 1 |
| `/blog/seo-organisme-formation/` | référencement **gratuit** organisme de formation | 16,8 | 0 |
| `/blog/livret-accueil-stagiaire/` | livret d'accueil stagiaire **entreprise** | 21,0 | 4 |
| `/blog/questionnaire-satisfaction-formation/` | questionnaire **évaluation post formation** | 31,0 | 1 |
| `/blog/numero-declaration-activite/` | numéro de déclaration d'activité | 33,5 | 0 |

Les mots en gras sont ceux qui manquaient au title et que les gens tapent. Exemples :
l'article « France Travail » ne contenait pas « Pôle emploi », le guide SEO ne contenait pas
« gratuit », le livret d'accueil ne mentionnait pas « entreprise ».

**Le cas le plus coûteux — `/services/seo/`.** La page est en **position 3,8** sur
« agence référencement naturel claude » et n'a récolté **aucun clic**. Ses requêtes réelles sont
toutes de la forme *agence de référencement + Claude* : personne ne l'atteint via une requête
« organisme de formation ». Son ancien title, « Agence SEO Claude pour organismes de formation »,
disqualifiait le chercheur avant le clic. Nouveau title :
« Agence de référencement naturel & SEO avec Claude », le positionnement OF passe en description.
**Arbitrage assumé, à revérifier dans 30 jours** — si le CTR ne bouge pas, revenir en arrière.

**Fait — plan netlinking** : `docs/seo/NETLINKING-ACTIONS.md`. 13 cibles vérifiées une par une
(URL ouverte le 12/08), réparties en 4 vagues, avec 3 messages prêts à envoyer. Point bloquant
identifié : Claude Agency n'étant pas un OF déclaré, tous les annuaires Qualiopi lui sont fermés
— la bonne porte est la catégorie « cabinet de conseil » des fédérations.

**Deux corrections d'analyse de ce matin (j'avais conclu trop vite) :**
- **Le doublon www n'existe pas.** `www.claudeagency.fr` redirige bien en 301 vers l'apex
  (testé). Les URLs `www` dans GSC sont un reliquat d'indexation qui se purgera seul. Priorité
  retirée du backlog.
- **Les requêtes « …skills claude seo » ne sont pas des requêtes humaines.** Ce sont des
  concaténations mécaniques (`formation seo qualiopi` + `skills claude seo`) émises par un agent
  automatisé, qui touchent surtout `/services/seo/`. ~140 impressions de bruit, 0 clic. Rien à
  corriger sur le site — mais **il faut les exclure de toute analyse GSC** (filtre
  `query notContains "skills claude seo"`), sinon elles faussent le CTR et masquent les vraies
  requêtes.

**Mesure :** aucune à ce stade — les effets d'un title se voient sous 2 à 4 semaines.
**Suite :** relever à nouveau clics / CTR / position sur ces 9 URLs **le 2026-09-11**, et le
nombre de domaines référents. Si le CTR de `/services/seo/` reste à 0, annuler son nouveau title.

---

## 2026-08-12 — Mise en place de la mémoire SEO + relevé de référence GSC

**Type :** mesure + organisation
**URLs :** `docs/seo/README.md`, `docs/seo/JOURNAL.md`, `docs/seo/REQUETES.csv`,
`docs/seo/BACKLOG.md`, `docs/seo/PERFORMANCES.csv`
**Pourquoi :** chaque session SEO repartait de zéro — mêmes audits, mêmes recherches de mots-clés,
mêmes sujets réétudiés. Ce dossier devient la mémoire du projet.
**Fait :**
- Création des 4 fichiers de mémoire + du protocole de lecture/écriture (`README.md`).
- Amorçage de `REQUETES.csv` avec les **87 URLs** du site (69 articles, 8 services, 10 pages
  transverses), leur requête cible et leurs performances réelles.
- Relevé GSC complet sur 88 jours et enregistrement dans `PERFORMANCES.csv`.
- Constitution du `BACKLOG.md` à partir des données mesurées, pas d'hypothèses.

**Mesure — Search Console, propriété `sc-domain:claudeagency.fr`, période 14/05→09/08/2026,
`data_state=final` :**

| Métrique | Valeur |
| :--- | ---: |
| Clics | **49** |
| Impressions | **2 797** |
| CTR | **1,75 %** |
| Position moyenne | **33,3** |

**Mesure — Ubersuggest, France, relevé du 2026-08-12 :** autorité de domaine **1/100**,
**0 backlink**, **0 domaine référent**, 3 mots-clés organiques détectés.

**Ce que disent ces chiffres (constat, pas interprétation optimiste) :**
- Le site génère des impressions (2 797) mais quasiment pas de clics (49). Le problème n'est
  pas l'indexation : c'est la **position moyenne 33,3**, trop basse pour être cliquée.
- **0 backlink et une autorité de 1** expliquent l'essentiel. 69 articles publiés n'ont pas
  compensé l'absence totale d'autorité de domaine. Le levier n'est plus le volume de contenu.
- Trois pages concentrent 40 % des impressions et rapportent 1 clic à elles trois :
  `/services/seo/` (536 imp., 0 clic, pos. 19,9), `/blog/logiciel-organisme-formation/`
  (404 imp., 1 clic, pos. 72,7), `/blog/automatiser-bpf-organisme-formation/` (138 imp., 0 clic,
  pos. 34,0).
- **Doublon www / non-www** constaté dans GSC : 15 URLs ressortent sur les deux variantes
  (`www.claudeagency.fr/blog/seo-organisme-formation/` : 68 impressions à elle seule). Ce
  n'est pas normal et c'est inscrit au backlog.

**Suite :** voir `BACKLOG.md`, priorité 1 (netlinking) et priorité 2 (doublon www).

---

## Entrées reconstituées (avant la mise en place du journal)

> Reconstitution à partir de `SEO-STRATEGY.md` §2/§6, de `docs/CONTEXTE-COWORK.md` et de
> l'historique git. Fiable sur le **quoi** et le **quand** ; les mesures d'époque sont reprises
> telles qu'elles ont été consignées à l'époque et n'ont pas été revérifiées.

## 2026-08-04 — Ouverture de l'accès agent à la Search Console

**Type :** technique
**Pourquoi :** aucun agent ne pouvait lire les données GSC — tout audit reposait sur des captures
manuelles.
**Fait :** propriété domaine `sc-domain:claudeagency.fr` créée (TXT de vérification sur `@` dans
Cloudflare) ; accès agent via Composio (`GOOGLE_SEARCH_CONSOLE_*`), pas de MCP dédié.
**Mesure :** non mesuré. **Suite :** rien.

## 2026-07-15 — Audit GSC + vague 2 de quick wins

**Type :** audit + réécriture
**Fait :** correction des title/meta de `/services/seo/` et `/blog/feuille-emargement/`, maillage
footer et inter-articles, comparatif CRM, nouvel article « formation autofinancée France Travail ».
**Mesure (GSC, 23/06→13/07/2026) :** 17 clics, 408 impressions, CTR 4,2 %, position moyenne 19,3 ;
65 pages indexées / 39 non indexées (dont 21 tags en `noindex`, volontaire).
**Suite :** 6 pages business non indexées identifiées — statut à revérifier.

## 2026-07-13 — Landing « agence marketing claude »

**Type :** publication
**URLs :** https://claudeagency.fr/agence-marketing-claude/
**Pourquoi :** cible GEO/SEO sur la marque Claude, hors cluster organismes de formation.
**Mesure au 2026-08-12 :** 176 impressions, 3 clics, position 49,0 (GSC).

## 2026-07-03 — Incident : 62 articles vidés par un script de maillage

**Type :** technique (incident)
**Fait :** les commits « add internal links » du 30/06 avaient vidé le corps de 62 articles ;
restauration par le commit `fix(blog): restaure les 62 articles vidés`.
**Règle qui en découle :** ne jamais faire réécrire des fichiers de contenu en masse par un script.
Le maillage interne se pose à la main. Détail dans `docs/CONTEXTE-COWORK.md`.

## 2026-06-30 — Vague massive de publication (~40 articles)

**Type :** publication
**Fait :** ~40 articles publiés le même jour (RGPD, LMS, CRM, tunnel de vente, prospection,
AI Act, accessibilité, sous-traitance…), tous ~1 000 mots, plus le maillage interne automatisé
qui a causé l'incident du 03/07.
**Mesure au 2026-08-12 :** cette vague a produit des impressions mais **quasiment aucun clic** —
c'est elle qui tire la position moyenne à 33,3. À ne pas reproduire en l'état.

## 2026-06-19 — Passe citeabilité / GEO / E-E-A-T

**Type :** réécriture + technique
**Fait :** constat qu'aucun des 26 articles d'alors ne citait de source primaire → ajout de
citations officielles (Légifrance, travail-emploi, service-public, DARES, CNIL) sur les 2 piliers
et 4 articles réglementaires ; statistique sourcée DARES-Céreq ; tableaux comparatifs ;
citation attribuée du fondateur. `robots.txt` rendu explicite (bots IA de recherche et
d'entraînement autorisés). HSTS ajouté.
**Mesure d'époque (GSC, crawl du 18/06) :** sitemap *Valid*, 41 URLs indexées, ~13 impressions.

## 2026-06-15 — Audit technique Ubersuggest + sélection par volumes réels

**Type :** audit + publication
**Fait :** score d'audit 76/100. Correctifs : slugs de tags en minuscules, tags en `noindex` et
hors sitemap, titres ≤ 60 caractères, lien e-mail `/contact` réparé. Hero responsive :
FCP mobile 2,6 → 1,9 s, Speed Index 3,6 → 3,0 s (LCP encore 4,2 s). Sitemap resoumis.
6 articles choisis sur volumes mesurés : convention de formation (720), programme de formation
(590), logiciel OF (320), indicateurs Qualiopi (320), audit de surveillance (210), créer un OF (170).
**Constat consigné :** « qualiopi » = 22 000 de volume, SERP à faible autorité → niche gagnable.

## 2026-06-14 — Socle : stratégie, E-E-A-T, cluster initial

**Type :** publication + technique
**Fait :** rédaction de `SEO-STRATEGY.md` ; article pilier « Intégrer l'IA dans votre OF » étoffé ;
articles 1 à 4 du cluster publiés ; auteur réel Julien Rayes (`app/src/data/author.ts`) + schema
`Person` lié par `@id` + page auteur ; flux RSS ; `BlogPosting` enrichi (`keywords`, `wordCount`).
**Mesure d'époque :** 0 donnée GSC sur 90 jours — le site n'apparaissait sur aucune requête.
