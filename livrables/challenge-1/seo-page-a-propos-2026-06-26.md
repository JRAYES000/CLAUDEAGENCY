# Audit page — À propos (`/a-propos/`)

## Constats (état au 26/06/2026)

- **Title** : « Claude Agency, partenaire IA des OF » (35 car. → suffixe ajouté → « Claude Agency, partenaire IA des OF · Claude Agency » = **REDONDANT marque**)
- **Meta description** : 116 car. — OK contenu, courte
- **H1** : « À propos de Claude Agency » — OK structurel, ne contient pas le mot-clé pilier
- **Hiérarchie** : H1 + 4×H2 (Le fondateur, Notre mission, Notre approche, Pourquoi nous) — propre
- **Schema** : `BreadcrumbList` + `Person` (`authorPerson`) — bon mais `Person` isolé sans `Article` parent ; `Person.sameAs` n'a qu'un seul lien
- **Maillage entrant** : home (bloc fondateur) + menu + footer — faible
- **Maillage sortant** : **aucun lien interne dans le corps** (pas vers services, blog, contact)
- **E-E-A-T** : portrait + bio détaillée + référence chiffrée (+3 M€ CA) — fort
- **FAQ** : absente — opportunité ratée pour citabilité IA « qui est Claude Agency »

## Checklist actions (`app/src/pages/a-propos.astro` + `app/src/data/author.ts`)

| # | Priorité | Action |
|---|---|---|
| 1 | P1 | Corriger le title L15 → `title="Julien Rayes & Claude Agency — agence IA pour OF"` (49 car., évite redondance et capte le nom propre fondateur recherché). |
| 2 | P1 | Ajouter 3-5 liens internes dans le corps : `/services/`, `/services/audit-ia/`, `/blog/seo-organisme-formation/`, `/contact/`. |
| 3 | P1 | Étoffer `AUTHOR_SAMEAS` dans `app/src/data/author.ts` L27 avec : page LinkedIn entreprise, profil X/Twitter si dispo, page DataDock/France Compétences de l'OF de référence. |
| 4 | P2 | Ajouter une section FAQ "À propos" (5 questions : "Qui est Julien Rayes ?", "Depuis quand existe Claude Agency ?", "Où êtes-vous basés ?", "Combien de consultants ?", "Quelle est votre différence ?") — entité Person dans une `QAPage` schema (autorisée car pas `FAQPage` Google). |
| 5 | P3 | Préciser `foundingDate: '2026'` dans `Organization` (BaseLayout L25). |

## Top 3 à appliquer en B5-bis
- Actions #1 (title) + #2 (liens internes) + #3 (sameAs). 30 min cumulé.
