# ClaudePartners — guide pour l'agent

Site vitrine + blog SEO pour organismes de formation (OF) français. Voir `PRODUCT.md`
(produit/ton), `SEO-STRATEGY.md` (pilotage SEO), `NETLINKING.md` (autorité), `DESIGN.md`.
Code dans `app/` (Astro). Contenu dans `app/src/content/blog/` et `.../services/`.

## Routage des modèles (économie sans perte de qualité)

Objectif : préserver le quota Claude Max en envoyant le travail mécanique vers Haiku, **sans
jamais dégrader la qualité éditoriale ni stratégique**. Router par type de tâche, pas en bloc.

**→ Déléguer à un sous-agent Haiku** (`seo-researcher`) — tâches mécaniques, à réponse
vérifiable, sans jugement :
- Recherche dans le dépôt (fichiers, slugs, balises, liens, frontmatter).
- Audits mécaniques (titres > 60 car., slugs en majuscules, `alt` manquant, liens cassés,
  maillage manquant ou non bidirectionnel, articles orphelins).
- Collecte/synthèse de données (volumes & difficulté de mots-clés, audits PageSpeed, contenu
  de pages web) sous forme de listes.

**→ Garder sur le modèle fort** (fil principal, Opus/Sonnet) — tout ce qui engage la qualité :
- Rédaction et réécriture d'articles (ton « vous », expertise OF concrète, nuance, zéro jargon).
- Décisions et arbitrages SEO/stratégiques.
- Choix du maillage interne (quel article relier à quoi = jugement éditorial).
- Validation finale de tout contenu publié.

Règle simple : *tâche ennuyeuse + bonne/mauvaise réponse claire* → Haiku ; *demande du
jugement, du ton ou de l'expertise* → modèle fort.

NE PAS activer `CLAUDE_CODE_SUBAGENT_MODEL=haiku` : ce flag forcerait **tous** les sous-agents
(y compris la rédaction) sur Haiku et ferait perdre en qualité. Le routage doit rester sélectif.

## Garde-fous projet
- Respecter le ton de `PRODUCT.md` (chaleureux, concret, ROI, français, sans jargon IA).
- Pas de nouveau Schema `FAQPage`/`HowTo` pour le SEO Google (cf. `SEO-STRATEGY.md` §5).
- Ne pas multiplier le contenu « vide » : la niche se gagne par la précision, pas le volume.
- Vérifier le build (`cd app && npm run build`) avant de committer du contenu/code.
