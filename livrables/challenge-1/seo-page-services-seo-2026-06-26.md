# Audit page — Service SEO (`/services/seo/`)

## Constats (état au 26/06/2026)

- **Title** : « Référencement naturel (SEO) pour organismes de formation » (56 car., suffixe automatiquement omis car ajout dépasserait 60)
- **Meta description** : 145 car., correcte
- **H1** : identique au title — mot-clé `"agence SEO organisme de formation"` (cible brief) **absent**
- **Hiérarchie** : H1 + 4×H2 fixes (Problème, Ce que nous faisons, Bénéfices, Comment ça se passe) + FAQ + Articles liés — bonne structure
- **Schema** : `Service` + `BreadcrumbList` + `FAQPage` (à arbitrer)
- **Maillage entrant** : home + services index + cartes expertises home + 2 articles blog
- **Maillage sortant** : 2 articles blog + `/services/optimisation-site/` — bon
- **E-E-A-T** : pas de mention auteur (problème structurel sur toutes les pages services)
- **FAQ pour citabilité IA** : 2 questions seulement — insuffisant

## Checklist actions (`app/src/content/services/seo.mdx` + `app/src/pages/services/[...id].astro`)

| # | Priorité | Action |
|---|---|---|
| 1 | P1 | Élargir la FAQ MDX à 5-6 questions ciblant requêtes IA : "Quel budget SEO pour un organisme de formation ?", "Comment se positionner sur 'formation [thématique]' ?", "Le SEO local fonctionne-t-il pour un OF ?", "Combien d'articles par mois ?", "Comment mesure-t-on le ROI ?". |
| 2 | P1 | Modifier `app/src/pages/services/[...id].astro` pour injecter `authorPerson(Astro.site!)` dans le `pageSchema` array L43 (signal E-E-A-T page service). |
| 3 | P2 | Reformuler H1 dans `seo.mdx` L2 → `"Agence SEO pour organismes de formation"` (43 car., capte le mot-clé cible explicite « agence SEO organisme de formation »). |
| 4 | P2 | Ajouter 2-3 liens internes sortants dans le corps MDX : `/blog/automatiser-bpf-organisme-formation/`, `/blog/automatiser-qualiopi-ia/` (si articles présents). |
| 5 | P3 | Ajouter un encart « preuve » chiffrée avant le bloc `deliverables`. |

## Top 3 à appliquer en B5-bis
- Action #3 (H1 reformulé) + action #1 (FAQ élargie). 25 min cumulé.
