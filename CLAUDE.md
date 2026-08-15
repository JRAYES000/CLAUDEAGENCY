# Claude Agency — guide pour l'agent

Site vitrine + blog SEO de **Claude Agency**, cabinet qui aide les **organismes de formation (OF)
francophones** (France, Belgique, Suisse, Luxembourg) à adopter l'IA et à automatiser leurs process.
Production : **https://claudeagency.fr**

Code Astro dans `app/`. Contenu dans `app/src/content/blog/` et `app/src/content/services/`.

> `claudepartners.fr` est un **autre projet** (ancien nom de domaine, site autonome depuis le
> 25/07/2026). Ne jamais employer « Claude Partners » pour désigner ce site.

## Documents de référence

N'ouvrir que celui dont le déclencheur est réuni — ne pas tous les charger.

| Fichier | Quand l'ouvrir |
| :--- | :--- |
| `docs/CONTEXTE-COWORK.md` | **Avant tout déploiement, DNS, analytics ou incident** — et au moindre doute sur l'infra |
| `PRODUCT.md` | Avant d'écrire ou réécrire un contenu public (article, page, post, e-mail) |
| `DESIGN.md` | Avant de toucher au visuel : composant, page, couleur, typo |
| `docs/seo/JOURNAL.md` | **Avant toute action SEO, sans exception** — lire les 3 dernières entrées |
| `docs/seo/BACKLOG.md` | Dès qu'il s'agit de choisir quoi faire ensuite, ou de proposer un sujet |
| `docs/seo/REQUETES.csv` | Avant une décision SEO : quelle page vise quelle requête, et ce qu'elle mesure |
| `NETLINKING.md` | Uniquement pour les backlinks et l'autorité de domaine |
| `BAROMETRE-IA-OF.md` | Uniquement pour le Baromètre IA des OF |

## Ton

- Avec Julien (non technique) : langage simple et pédagogique, sans jargon non défini ; tout terme
  technique employé est expliqué en une phrase.
- Dans les contenus produits (site, articles, posts, e-mails) : voix de marque **claire,
  professionnelle, chaleureuse et orientée résultats**, adaptée à des décideurs B2B, sans jargon IA.
- Ne jamais inventer : en cas de doute, vérifier par une recherche web. Pour un contenu destiné à la
  publication, citer les sources.

## Commandes

```sh
cd app
npm install        # dépendances
npm run dev        # serveur local http://localhost:4321
npm run build      # build de production dans ./dist/
npm run preview    # prévisualiser le build
```

Node ≥ 22.12 (`.node-version` : 22.16.0).

## Conventions de contenu

Schéma source de vérité : `app/src/content.config.ts` (le build échoue si le frontmatter s'en écarte).

**Blog** — un fichier `.md` ou `.mdx` par article dans `app/src/content/blog/`.
Le nom de fichier fait le slug de l'URL : minuscules, tirets, sans accent.

```yaml
---
title: "…"                          # ≤ 70 caractères (obligatoire)
description: "…"                    # ≤ 160 caractères (obligatoire)
pubDate: 2026-08-03                 # AAAA-MM-JJ (obligatoire)
updatedDate: 2026-08-03             # facultatif, en cas de mise à jour de fond
author: "Julien Rayes"              # défaut : "Claude Agency"
image: "./images/xxx.jpg"           # obligatoire, chemin relatif au fichier
imageAlt: "…"                       # obligatoire, descriptif et porteur de mots-clés
tags: ["Qualiopi", "automatisation"]
draft: false
---
```

**Services** — `.mdx` dans `app/src/content/services/`. Champs obligatoires : `title`,
`description` (≤ 160), `tagline`, `problem`, `deliverables[]`, `benefits[]`,
`process[{step, detail}]`. Facultatifs : `order`, `category` (`marketing` | `ia`), `faq[{q, a}]`,
`relatedTags[]`.

## Mémoire SEO — obligatoire

`docs/seo/` est la mémoire du projet SEO. Elle existe pour qu'une session ne reparte jamais de
zéro. Mode d'emploi complet : `docs/seo/README.md`.

**Avant toute action SEO** — publication, réécriture, correctif technique, audit, netlinking :

1. Lire `docs/seo/JOURNAL.md` (3 dernières entrées) — ce qui a déjà été fait.
2. Lire `docs/seo/BACKLOG.md` — section « À faire » **et** section « Écarté ».
3. Consulter `docs/seo/REQUETES.csv` avant de cibler un mot-clé ou de proposer un sujet
   d'article : la requête est peut-être déjà couverte par une page existante.
4. Ne relancer un audit complet que si la dernière entrée du journal a **plus de 30 jours**.

**Après toute action SEO** — écrire son entrée dans `docs/seo/JOURNAL.md` et mettre à jour les
lignes concernées de `REQUETES.csv` / `BACKLOG.md`, **dans le même commit que l'action**. Un
commit SEO sans ligne de journal est un commit incomplet.

Chiffres : GSC via Composio (`GOOGLE_SEARCH_CONSOLE_*`, propriété `sc-domain:claudeagency.fr`),
volumes de mots-clés via le MCP Ubersuggest. Chaque chiffre consigné porte sa source et sa date.

## Publier un article — checklist

1. Rédiger : ton et cible de `PRODUCT.md`, expertise OF concrète, sources citées.
2. Frontmatter complet et conforme au schéma ci-dessus ; image présente dans `images/`.
3. Maillage interne : 2–3 liens choisis **à la main** vers des articles pertinents. Jamais par script.
4. `cd app && npm run build` — doit passer sans erreur.
5. Commit + `git push` sur `main`.
6. Attendre le déploiement Cloudflare, **vérifier l'URL en ligne**, la donner cliquable à Julien.

## Mise en production

**Déploiement = `git push` sur `main` → build automatique Cloudflare Pages.**
Le site n'est ni sur Netlify ni sur Vercel.

Pousser sans demander de validation est la règle générale (CLAUDE.md global). Ici, **pousser
c'est publier**, d'où deux conditions propres au projet :

1. **Vérifier le build** (`cd app && npm run build`) avant tout commit de contenu ou de code.
2. **Signaler après coup** ce qui a été publié, avec les **URLs complètes et cliquables**
   (`https://claudeagency.fr/...`), en précisant ce qui est déjà en ligne et ce qui ne l'est pas encore.

Identité des commits : `Julien Rayes <jrayes000@gmail.com>`.

### Tout se termine en production — règle posée par Julien le 15/08/2026

**Un travail livré est un travail sur `main`, en ligne.** Pas sur une branche laissée de côté, pas
dans une pull request en brouillon, pas en attente d'une validation que personne n'a demandée.

- Une branche de travail se **fusionne dans `main` et se pousse** dans la même session. Elle n'est
  pas le livrable, elle est un moyen d'y arriver.
- Une pull request ne s'ouvre **jamais en draft** sur ce projet. Si l'environnement d'exécution en
  impose une (c'est le cas de Claude Code sur le web), elle est sortie du mode brouillon et
  fusionnée dans la foulée.
- Le seul motif légitime de s'arrêter avant `main` : le build échoue, ou l'action est destructrice
  et sort du périmètre demandé. Dans ce cas on le dit, on ne laisse pas la chose en plan sans
  prévenir.

Cette règle ne lève pas les deux conditions ci-dessus : le build se vérifie avant, et les URLs en
ligne se donnent après.

## Routage des modèles

*Tâche ennuyeuse avec une bonne réponse vérifiable* → sous-agent Haiku `seo-researcher` : recherche
dans le dépôt, audits mécaniques (titres trop longs, `alt` manquant, liens cassés, articles
orphelins), collecte de données (volumes de mots-clés, PageSpeed, contenu de pages).

*Jugement, ton ou expertise* → modèle fort, sur le fil principal : rédaction et réécriture, arbitrages
SEO, choix du maillage interne, validation finale de tout contenu publié.

**Ne pas activer `CLAUDE_CODE_SUBAGENT_MODEL=haiku`** : ce flag forcerait **tous** les sous-agents,
rédaction comprise, sur Haiku. Le routage doit rester sélectif.

## Garde-fous projet

- **Vérifier le build** (`cd app && npm run build`) avant de committer du contenu ou du code.
- **Toujours donner les URLs complètes et cliquables** des pages créées ou modifiées.
- Respecter le ton de `PRODUCT.md` (chaleureux, concret, ROI, français, sans jargon IA) et la charte
  de `DESIGN.md`.
- Pas de nouveau Schema `FAQPage` / `HowTo` pour le SEO Google : Google ne les affiche plus pour les sites non institutionnels.
- Ne pas multiplier le contenu « vide » : la niche se gagne par la précision, pas par le volume.
- **Ne pas retirer le tag GA4** (`G-6SG03DR5J9`) du site : la propriété Search Console est validée
  par ce tag.
- **Se méfier des scripts qui réécrivent des fichiers en masse** (maillage interne notamment) :
  un incident du 03/07/2026 a vidé 62 articles de blog. Détail dans `docs/CONTEXTE-COWORK.md`.
- Avant de considérer un livrable comme fait, vérifier l'état réel de `main` **et** du site en ligne.
