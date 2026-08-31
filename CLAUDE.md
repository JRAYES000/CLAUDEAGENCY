# Claude Agency — guide pour l'agent

Site vitrine + blog SEO de **Claude Agency**, cabinet qui aide les **organismes de formation (OF)
francophones** (France, Belgique, Suisse, Luxembourg) à adopter l'IA et à automatiser leurs process.
Production : **https://claudeagency.fr**. Dépôt GitHub **public**.

Code Astro dans `app/`. Contenu dans `app/src/content/blog/` (56 articles, tous en `.mdx`) et
`app/src/content/services/`.

> Entité éditrice et facturière : **BULGARIA EDUCATION EOOD** (Bulgarie, EIK 206507432,
> TVA BG206507432). Claude Agency est un **prestataire de services**, PAS un organisme de
> formation : ne jamais écrire qu'une prestation est finançable CPF, OPCO ou France Travail.

> `claudepartners.fr` est un **autre produit, en ligne** : un annuaire de prestataires IA, sur son
> propre projet Pages. Ne jamais employer « Claude Partners » pour désigner ce site-ci, ni pointer
> vers ce domaine.

## Commandes

```sh
cd app
npm install
npm run dev        # http://localhost:4321 — ou la config `astro-dev` de .claude/launch.json (locale)
npm run build      # build de production dans app/dist/
npm run preview
```

`engines.node` exige ≥ 22.12 et `app/.node-version` épingle 22.16.0 — **le fichier est dans `app/`,
pas à la racine**. Le poste tourne en v24.15.0 : un build local vert n'atteste pas du build qui publie.

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

Le formulaire d'inscription passe par `app/functions/api/subscribe.js` (Cloudflare Pages Function).
C'est **le seul code serveur du projet** : toute modification du formulaire le concerne.

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

1. Rédiger : ton et cible de `PRODUCT.md`, expertise OF concrète, sources citées.
2. Frontmatter complet et conforme au schéma ; image présente dans `app/src/content/blog/images/`.
3. Maillage interne : 2–3 liens choisis **à la main**. Jamais par script (voir garde-fous).
4. `cd app && npm run build` — doit passer sans erreur. **C'est la condition d'un commit**, ici
   pousser c'est publier.
5. Commit + `git push` sur `main` → build automatique **Cloudflare Pages**. Ni Netlify, ni Vercel.
6. Attendre le déploiement, **vérifier l'URL en ligne**, la donner cliquable avec l'URL complète.

Identité des commits : `Julien Rayes <jrayes000@gmail.com>`.

## Prospection e-mail (SalesHandy)

**Aucune vague ne part sans les quatre règles de `docs/prospection/protocole-envoi.md`** — le
fichier fait foi et porte les chiffres qui les justifient. En résumé : sortir les structures de
plus de ~50 salariés (leur passerelle anti-spam refuse presque tout expéditeur inconnu), ne
jamais deviner une adresse (elle doit avoir été lue à une source, jamais reconstruite sur un
motif), vérifier la liste avant import, couper la séquence le jour même au-delà de **5 % de
rebond**. Ces règles valent aussi pour les envois Claude Partners : même outil, mêmes boîtes,
même réputation d'expéditeur.

**Deux blocages en amont, à réparer avant toute reprise** (relevés le 2026-08-31, détail dans le
protocole) : `claudeagency.fr` envoie **sans DKIM** — seul `mailjet._domainkey` subsiste, le
sélecteur `hostingermail1._domainkey` manque alors qu'il existe sur les trois autres domaines,
et DMARC est en `p=quarantine` ; et le dernier test de placement disponible donne **100 % de
non-délivrés chez Gmail et Google Workspace**, 100 % de spam chez Outlook.

Le piège à connaître : **la vérification d'adresses ne règle qu'un quart du problème.** Sur les
19 rebonds de la vague du 25/08/2026, 5 seulement venaient d'adresses inexistantes ; les 14 autres
étaient des refus de serveur. Un vérificateur seul aurait fait passer le taux de 59 % à 44 %.

Le texte de désinscription est un réglage **par séquence**, pas un réglage de compte. SalesHandy
en pose un par défaut, **en anglais**, sur **chaque séquence nouvellement créée** — y compris
celles créées par le MCP : *Reply 'Stop' if you'd prefer not to receive messages at this time.*
Il n'existe aucun réglage global pour l'éviter : il faut le remplacer après chaque création, sinon
une phrase anglaise part en bas d'une prospection française.

Le remplacement se fait par le code de réglage `2` (`unsubscribe-text`) :

```
update_sequence_settings(sequenceId, settings=[{ code: 2, value: "Répondez « Stop » si vous préférez ne plus recevoir de messages." }])
```

Les 5 séquences existantes ont été francisées le 21/08/2026.

**Trois autres pièges, constatés le 21/08/2026.**

- **Le Markdown n'est pas interprété.** SalesHandy envoie le corps en HTML brut : `<b>` et
  `<strong>` rendent bien, `**texte**` arrive chez le destinataire avec ses astérisques visibles.
  Écrire les gras en HTML, jamais en Markdown — y compris dans les propriétés `Mail 1` et
  `Relance J5` de la base Notion « Cibles — Prospection OF », qui alimentent les séquences.
- **`create_schedule` du MCP est cassé.** Il renvoie `400 Schedule not found` tout en créant quand
  même un planning « New Schedule N » aux valeurs par défaut. Ne pas réessayer : passer par
  *Settings → Des horaires* dans l'interface, et supprimer les plannings fantômes laissés derrière.
- **Le formulaire d'un compte mail se ré-hydrate après l'affichage de la page.** Une saisie faite
  juste après la navigation est écrasée en silence : aucune erreur, et *Save* réagit normalement.
  Attendre que le formulaire affiche ses valeurs avant de saisir, puis contrôler par
  `list_email_accounts` — l'écran seul ne prouve rien.

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
