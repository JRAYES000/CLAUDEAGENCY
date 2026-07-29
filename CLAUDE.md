# Claude Agency — guide pour l'agent

Site vitrine + blog SEO de **Claude Agency**, cabinet qui aide les **organismes de formation (OF)
francophones** (France, Belgique, Suisse, Luxembourg) à adopter l'IA et à automatiser leurs process.
Production : **https://claudeagency.fr**

Code Astro dans `app/`. Contenu dans `app/src/content/blog/` et `app/src/content/services/`.

## Documents de référence

| Fichier | Contenu |
| :--- | :--- |
| `docs/CONTEXTE-COWORK.md` | **Infra, déploiement, analytics, SEO, incidents, pièges** — à lire en premier |
| `PRODUCT.md` | Produit, cible, marque et ton de voix |
| `DESIGN.md` | Univers visuel (crème `#FBF7F1`, terracotta `#CC785C`, encre `#2B2724`) |
| `SEO-STRATEGY.md` | Stratégie et pilotage SEO |
| `NETLINKING.md` | Autorité et acquisition de liens |
| `BAROMETRE-IA-OF.md` | Spécification du Baromètre IA des OF |

## Langue et ton

- Répondre **toujours en français**.
- Avec Julien (non technique) : langage simple et pédagogique, sans jargon non défini ; tout terme
  technique employé est expliqué en une phrase.
- Dans les contenus produits (site, articles, posts, e-mails) : voix de marque **claire,
  professionnelle, chaleureuse et orientée résultats**, adaptée à des décideurs B2B, sans jargon IA.
- Aller droit au but : la réponse d'abord, pas de formule d'introduction ni de clôture.
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

## Mise en production

**Déploiement = `git push` sur `main` → build automatique Cloudflare Pages.**
Le site n'est ni sur Netlify ni sur Vercel.

Julien autorise l'agent à **publier directement, sans demander de validation** (règle du 25/06/2026,
reconfirmée dans la mémoire Cowork). Conditions à respecter :

1. **Vérifier le build** (`cd app && npm run build`) avant tout commit de contenu ou de code.
2. Committer, pousser sur `main`.
3. **Signaler après coup** ce qui a été publié, avec les **URLs complètes et cliquables**
   (`https://claudeagency.fr/...`), en précisant ce qui est déjà en ligne et ce qui ne l'est pas encore.

Identité des commits : `Julien Rayes <jrayes000@gmail.com>`.

## Routage des modèles (économie sans perte de qualité)

Objectif : préserver le quota en envoyant le travail mécanique vers Haiku, **sans jamais dégrader la
qualité éditoriale ni stratégique**. Router par type de tâche, pas en bloc.

**→ Déléguer à un sous-agent Haiku** (`seo-researcher`) — tâches mécaniques, à réponse vérifiable :
- recherche dans le dépôt (fichiers, slugs, balises, liens, frontmatter) ;
- audits mécaniques (titres > 60 caractères, slugs en majuscules, `alt` manquant, liens cassés,
  maillage manquant ou non bidirectionnel, articles orphelins) ;
- collecte et synthèse de données sous forme de listes (volumes et difficulté de mots-clés, audits
  PageSpeed, contenu de pages web).

**→ Garder sur le modèle fort** (fil principal) — tout ce qui engage la qualité :
- rédaction et réécriture d'articles (ton « vous », expertise OF concrète, nuance, zéro jargon) ;
- décisions et arbitrages SEO / stratégiques ;
- choix du maillage interne (relier tel article à tel autre = jugement éditorial) ;
- validation finale de tout contenu publié.

Règle simple : *tâche ennuyeuse avec une bonne réponse claire* → Haiku ; *jugement, ton ou expertise*
→ modèle fort.

**Ne pas activer `CLAUDE_CODE_SUBAGENT_MODEL=haiku`** : ce flag forcerait **tous** les sous-agents
(y compris la rédaction) sur Haiku. Le routage doit rester sélectif.

## Discipline de travail : skill `fabuleux`

Skill projet dans `.claude/skills/fabuleux/`. L'invoquer (`/fabuleux`) pour le travail à forte valeur :
rédiger ou retravailler un article (route PROSE : soustraction, anti-slop, zéro cadratin, espaces
insécables), vérifier une page de design (route ARTEFACT : screenshot + vision), trancher une décision
SEO (route ANALYSE : critères + vérification + honnêteté). Pas pour les corvées : elle pousse l'effort
et consomme davantage de tokens.

## Garde-fous projet

- **Vérifier le build** (`cd app && npm run build`) avant de committer du contenu ou du code.
- **Toujours donner les URLs complètes et cliquables** des pages créées ou modifiées.
- Respecter le ton de `PRODUCT.md` (chaleureux, concret, ROI, français, sans jargon IA) et la charte
  de `DESIGN.md`.
- Pas de nouveau Schema `FAQPage` / `HowTo` pour le SEO Google (voir `SEO-STRATEGY.md` §5).
- Ne pas multiplier le contenu « vide » : la niche se gagne par la précision, pas par le volume.
- **Ne pas retirer le tag GA4** (`G-6SG03DR5J9`) du site : la propriété Search Console est validée
  par ce tag.
- **Se méfier des scripts qui réécrivent des fichiers en masse** (maillage interne notamment) :
  un incident du 03/07/2026 a vidé 62 articles de blog. Détail dans `docs/CONTEXTE-COWORK.md`.
- Avant de considérer un livrable comme fait, vérifier l'état réel de `main` **et** du site en ligne.