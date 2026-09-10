# Claude Agency — guide pour l'agent

Site vitrine + blog SEO de **Claude Agency**, **agence IA grand public** francophone (France,
Belgique, Suisse, Luxembourg) : elle aide ses clients à adopter l'IA et à automatiser leurs process.
Les **organismes de formation (OF)** sont sa spécialité d'origine et son socle de visibilité — un
segment fort qu'on maintient, pas la limite de sa cible (arbitrage de Julien du 2026-08-22).
Production : **https://claudeagency.fr**. Dépôt GitHub **public**.

> Entité éditrice et facturière : **BULGARIA EDUCATION EOOD** (Bulgarie, EIK 206507432,
> TVA BG206507432). Claude Agency est un **prestataire de services**, PAS un organisme de
> formation : ne jamais écrire qu'une prestation est finançable CPF, OPCO ou France Travail.

> `claudepartners.fr` est un **autre produit, en ligne** : un annuaire de prestataires IA, sur son
> propre projet Pages. Ne jamais employer « Claude Partners » pour désigner ce site-ci, ni pointer
> vers ce domaine — **à une exception près, décidée le 04/09/2026** : `/api/evaluation` envoie une
> invitation à déposer une fiche prestataire à qui obtient 75/100 ou plus au test Claude Code.
> Ce lien-là est voulu ; ne pas le retirer en croyant corriger un oubli. **Deux autres exceptions, décidées par Julien** : les deux liens du pied de page (annuaire /prestataires/ depuis le 26/08, page /label-claude-code/ depuis le 06/09) et le lien de source vers le baromètre des tarifs dans /agence-seo-ia/ (05/09). Un audit qui les signale se trompe : ils restent. **Élargie le 05/09/2026** :
> l'e-mail renvoie aussi vers `claudepartners.fr/label-claude-code/`, la page du badge « Test Claude
> Code réussi » que l'annuaire pose sur la fiche qui porte la même adresse (il lit la base Notion
> des résultats à chaque build ; `CP_DEPLOY_HOOK_URL`, sur ce projet Pages, déclenche ce build après
> chaque réussite). Corollaire : le test se repasse **une fois par an** et par adresse, pas une seule
> fois — le badge vaut un an. Les liens de la page du test, eux, restent sans lien vers ce domaine.
> **Dernière exception, décidée le 10/09/2026** : `/equipe/`, migrée depuis claudepartners.fr, lie
> la fiche annuaire de chacun des deux consultants (`claudepartners.fr/prestataires/<slug>/`). Le
> tarif et les parcours y sont écrits en dur, relevés sur ces fiches : les mettre à jour dans le
> même geste qu'une fiche (détail : `docs/migration-page-equipe.md`).

## Commandes

Scripts npm dans `app/package.json` ; toute commande se lance depuis `app/`, pas depuis la racine.

**La version de Node est épinglée dans `app/.node-version`, pas à la racine** — le fichier est
facile à manquer. Le poste tourne sur une version plus récente que l'épingle : un build local vert
n'atteste donc pas du build qui publie.

**`npm run build` déclenche un `postbuild`** (`app/scripts/submit-indexnow.mjs`) qui pousse tout le
sitemap à IndexNow. Il ne s'exécute qu'avec `CF_PAGES` ou `FORCE_INDEXNOW` — **ne jamais poser
`FORCE_INDEXNOW=1` sur un build local**, ça soumettrait ~160 URLs aux moteurs depuis le poste.

**Livrable PDF : mesurer le débordement dans le navigateur avant de lancer Chrome headless.** Le
PDF coupe en silence ce qui dépasse. Ouvrir le HTML dans le pane intégré et vérifier deux choses
sur chaque conteneur A4 : `scrollHeight > clientHeight` pour le contenu en flux, et le chevauchement
des blocs en `position:absolute` (un pied de page ne compte pas dans `scrollHeight`, donc une page
qui déborde peut se mesurer à zéro). Deux pages tronquées avant d'y passer, le 09/09/2026.

## Garde-fous — non négociables

- **`.gitignore` ligne 2 ignore `.claude/` en entier**, sous un commentaire faux (« worktrees
  temporaires »). Trois fichiers seulement y survivent (`agents/seo-researcher.md`,
  `hooks/session-start.sh`, `settings.json`), parce qu'ils étaient déjà suivis. **Tout nouvel agent,
  hook ou skill ajouté dans `.claude/` est invisible pour git** — absent du dépôt, absent des
  sessions cloud, sans qu'aucun message ne le signale. `launch.json` est déjà dans ce cas : il
  existe sur le poste, pas dans le dépôt. Le forcer avec `git add -f`, ou corriger la règle.
- **Ne pas retirer le tag GA4** (`G-6SG03DR5J9`, dans `app/src/layouts/BaseLayout.astro`) **ni le
  TXT `google-site-verification` de la zone Cloudflare** : ils valident deux propriétés Search
  Console distinctes — préfixe d'URL pour le premier, `sc-domain:claudeagency.fr` pour le second.
- **Se méfier des scripts qui réécrivent des fichiers en masse** (maillage interne notamment) : le
  03/07/2026, 62 commits « seo: add internal links » ont remplacé le contenu complet des articles
  qu'ils touchaient. Détail dans `docs/CONTEXTE-COWORK.md` §2.
- Pas de nouveau Schema `FAQPage` / `HowTo` pour le SEO Google : il ne les affiche plus pour les
  sites non institutionnels.
- Ne pas multiplier le contenu « vide » : la niche se gagne par la précision, pas par le volume.
- Pour un contenu destiné à la publication, **citer les sources**.

## Conventions de contenu

Schéma source de vérité : `app/src/content.config.ts` — le build échoue si le frontmatter s'en écarte.

**Blog** — un `.mdx` par article dans `app/src/content/blog/`. Le nom de fichier fait le slug de
l'URL : minuscules, tirets, sans accent. Les champs obligatoires du blog et des services sont dans
`content.config.ts`.

**Le sitemap n'exclut plus aucune page**, par la règle de Julien du 23/08/2026 : aucune page du
site n'est en `noindex`, donc le `serialize()` de `app/astro.config.mjs` ne fait plus que régler
`changefreq`, `priority` et `lastmod`. Seules la 404 et la redirection `/sitemap.xml` restent
hors sitemap, et ce n'est pas le filtre qui les écarte. Une page qui devrait redevenir non
indexable demande donc **deux** gestes : son `noindex` **et** un filtre à réintroduire ici.

**Tout le code serveur du projet tient dans `app/functions/api/`** (Cloudflare Pages Functions) :
`subscribe.js` sert le lead magnet, `contact.js` les formulaires contact / diagnostic / Baromètre,
`evaluation.js` le résultat du test `/evaluation-claude-code/`, `_notion.js` écrit dans les bases
Notion (un fichier préfixé par `_` n'est pas routé par Pages). `subscribe` et `contact` envoient
depuis la boîte contact@claudeagency.fr via l'API Hostinger ; leur écriture Notion et l'alerte
interne sont **best-effort** — elles ne doivent jamais faire perdre un lead. `evaluation` fait
l'inverse : Notion est sa seule sortie, donc un échec y remonte en 502.

**Deux bases Notion, deux variables, deux connexions distinctes** : `NOTION_LEADS_DB` (« Leads
entrants — claudeagency.fr ») et `NOTION_EVAL_DB` (« Resultats du test Claude Code »). Le jeton
`NOTION_TOKEN` est le même, mais **l'intégration doit être ajoutée à chaque base une par une**
dans l'interface Notion : sans ça l'API rend un `404 object_not_found` qui se lit à tort comme un
mauvais identifiant. `GET /api/subscribe` et `GET /api/evaluation` disent quelle version est
déployée et si les variables Notion sont posées — pas si la connexion existe.

**Toute nouvelle propriété écrite par `_notion.js` doit exister dans la base avant le
déploiement.** Notion rejette l'écriture **entière** sur une propriété inconnue : c'est le
résultat complet du candidat ou le lead qui est perdu, pas seulement le champ en trop. Créer la
propriété d'abord, pousser le code ensuite.

**Brouillons LinkedIn : `docs/prive/sortants/`**, jamais à la racine ni dans `app/`. Le dossier est
couvert par `/docs/prive/` dans le `.gitignore` — un post cite des personnes nommées et leurs
commentaires, et ce dépôt est public.

**Publier sur LinkedIn depuis Chrome piloté — joindre l'image.** Le bouton « Importer depuis
votre ordinateur » de l'éditeur de média déclenche une boîte de dialogue Windows native : elle
est invisible pour l'agent et **gèle le rendu de l'onglet** (`Page.captureScreenshot` part en
timeout), ce qui se lit à tort comme un plantage de LinkedIn. Ne jamais cliquer ce bouton ni un
`input[type=file]`. La marche à suivre : poser les deux crochets **avant** d'ouvrir l'éditeur de
média, récupérer l'`input[type=file]` en JavaScript, le déplacer dans `document.body` avec un
`aria-label` reconnaissable, puis y pousser le fichier par l'outil d'upload du connecteur.

Les deux crochets, à poser ensemble (mesuré le 10/09/2026 sur les deux comptes, pose des bannières
de profil) : surcharger `HTMLElement.prototype.click` en interceptant `this.tagName === 'INPUT' &&
this.type === 'file'`, **et** surcharger `Document.prototype.createElement` pour attraper l'input
au moment de sa création. Surcharger `HTMLInputElement.prototype.click` seul, comme le disait la
version précédente de ce paragraphe, **ne capture rien** : LinkedIn ne crée l'input qu'au clic,
donc il n'existe pas dans le DOM quand on cherche à l'attraper. Le symptôme est un compteur de
captures à zéro **et** `document.querySelectorAll('input[type=file]').length === 0`, ce qui se lit
à tort comme « l'input est ailleurs ». Si les deux crochets ne donnent rien, alors seulement
chercher dans les shadow roots via
`[...document.querySelectorAll('*')].find(e => e.shadowRoot?.querySelector('input[type=file]'))` —
aucun des deux comptes n'était dans ce cas le 10/09/2026.

Second piège du même flux : les références d'éléments du fil d'actualité (`ref_N`)
**périment dès qu'un post est ajouté**, et un commentaire destiné au nouveau post atterrit sur
l'ancien. Commenter depuis le permalien du post, jamais depuis le fil.

## Mémoire SEO — obligatoire

`docs/seo/` est la mémoire du projet SEO. Elle existe pour qu'une session ne reparte jamais de
zéro. Mode d'emploi complet : `docs/seo/README.md`.

**Avant toute action SEO** — publication, réécriture, correctif technique, audit, netlinking :

1. Lire `docs/seo/JOURNAL.md` (3 dernières entrées) — ce qui a déjà été fait.
2. Lire `docs/seo/BACKLOG.md` — section « À faire » **et** section « Écarté ».
3. Consulter `docs/seo/REQUETES.csv` avant de cibler un mot-clé ou de proposer un sujet d'article :
   la requête est peut-être déjà couverte par une page existante.
4. Ne relancer un audit complet que si la dernière entrée du journal a **plus de 30 jours**.

**Après toute action SEO** — écrire son entrée dans `docs/seo/JOURNAL.md` et mettre à jour les
lignes concernées de `REQUETES.csv` / `BACKLOG.md`, **dans le même commit que l'action**. Un commit
SEO sans ligne de journal est un commit incomplet.

Chiffres : GSC via Composio (`GOOGLE_SEARCH_CONSOLE_*`, propriété `sc-domain:claudeagency.fr`),
volumes de mots-clés via le MCP Ubersuggest. Chaque chiffre consigné porte sa source et sa date.

## Publier un article — checklist

1. Rédiger : ton et cible de `PRODUCT.md`, expertise concrète — organismes de formation ou autre
   public —, sources citées.
2. Frontmatter complet et conforme au schéma ; image présente dans `app/src/content/blog/images/`.
3. Maillage interne : 2–3 liens choisis **à la main**. Jamais par script (voir garde-fous).
4. `cd app && npm run build` — doit passer sans erreur. **C'est la condition d'un commit**, ici
   pousser c'est publier.
5. Commit + `git push` sur `main` → build automatique **Cloudflare Pages**. Ni Netlify, ni Vercel.
6. Attendre le déploiement, **vérifier l'URL en ligne**, la donner cliquable avec l'URL complète.

Identité des commits : `Julien Rayes <jrayes000@gmail.com>`.

## Prospection e-mail (SalesHandy)

**Aucune vague ne part sans les quatre règles de `docs/prospection/protocole-envoi.md`** — le
fichier fait foi et porte les chiffres qui les justifient. Ces règles valent aussi pour les
envois Claude Partners : même outil, mêmes boîtes, même réputation d’expéditeur.

Pièges de l’outil, diagnostic de délivrabilité et texte de désinscription : skill
`prospection-saleshandy` (`.claude/skills/`), chargée à la demande.

## Routage des modèles

*Tâche mécanique à réponse vérifiable* → sous-agent `seo-researcher` (`.claude/agents/`, `model:
haiku`, outils limités à `Glob, Grep, Read, WebSearch, WebFetch` — il ne peut donc pas lancer un
audit hors web) : recherche dans le dépôt, titres trop longs, `alt` manquant, liens cassés,
articles orphelins, collecte de volumes de mots-clés.

*Jugement, ton ou expertise* → modèle fort sur le fil principal : rédaction, arbitrages SEO, choix
du maillage, validation finale de tout contenu publié.

Le routage tient **uniquement** au frontmatter de l'agent : `.claude/settings.json` ne fixe aucun
modèle. **Ne pas définir `CLAUDE_CODE_SUBAGENT_MODEL=haiku`**, qui forcerait tous les sous-agents,
rédaction comprise.

## Où chercher le reste

N'ouvrir que celui dont le déclencheur est réuni — ne pas tous les charger.

| Fichier | Quand l'ouvrir |
| :--- | :--- |
| `docs/CONTEXTE-COWORK.md` | **Avant tout déploiement, DNS, analytics ou incident** — et au moindre doute sur l'infra |
| `PRODUCT.md` | Avant d'écrire ou réécrire un contenu public (article, page, post, e-mail) |
| `DESIGN.md` | Avant de toucher au visuel : composant, page, couleur, typo |
| `docs/seo/JOURNAL.md` | **Avant toute action SEO, sans exception** — lire les 3 dernières entrées |
| `docs/seo/BACKLOG.md` | Dès qu'il s'agit de choisir quoi faire ensuite, ou de proposer un sujet |
| `docs/seo/REQUETES.csv` | Quelle page vise quelle requête, et ce qu'elle mesure |
| `NETLINKING.md` | Uniquement pour les backlinks et l'autorité de domaine |
| `BAROMETRE-IA-OF.md` | Uniquement pour le Baromètre IA des OF |

`README.md` recopie ce fichier sans être tenu à jour : en cas de désaccord, **c'est `CLAUDE.md` et
`docs/CONTEXTE-COWORK.md` qui font foi**.
