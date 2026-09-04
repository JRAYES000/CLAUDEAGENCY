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
> vers ce domaine.

## Commandes

Scripts npm dans `app/package.json` ; toute commande se lance depuis `app/`, pas depuis la racine.

**La version de Node est épinglée dans `app/.node-version`, pas à la racine** — le fichier est
facile à manquer. Le poste tourne sur une version plus récente que l'épingle : un build local vert
n'atteste donc pas du build qui publie.

**`npm run build` déclenche un `postbuild`** (`app/scripts/submit-indexnow.mjs`) qui pousse tout le
sitemap à IndexNow. Il ne s'exécute qu'avec `CF_PAGES` ou `FORCE_INDEXNOW` — **ne jamais poser
`FORCE_INDEXNOW=1` sur un build local**, ça soumettrait ~160 URLs aux moteurs depuis le poste.

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

**Une page qui ne doit pas être indexée s'ajoute au filtre du sitemap**, `app/astro.config.mjs`
ligne 62 — sinon elle y entre malgré son `noindex`. Sept chemins y sont déjà exclus.

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
