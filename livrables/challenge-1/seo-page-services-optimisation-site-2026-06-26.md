# Audit page — Service Optimisation (`/services/optimisation-site/`)

## Constats (état au 26/06/2026)

- **Title** : « Optimisation de site web pour organismes de formation » (53 car., suffixe omis)
- **Meta description** : 124 car. — OK
- **H1** : identique au title — mot-clé **« CRO »** ou « conversion » absent alors que c'est l'intention
- **Hiérarchie** : H1 + 4×H2 + FAQ — bonne
- **Schema** : `Service` + `BreadcrumbList` + `FAQPage`
- **Maillage entrant** : home (cartes expertises) + services index + service SEO + service SEA
- **Maillage sortant** : `/services/seo/` + `/services/sea/` — bon mais aucun lien blog
- **FAQ** : 2 questions — faible

## Checklist actions (`app/src/content/services/optimisation-site.mdx`)

| # | Priorité | Action |
|---|---|---|
| 1 | P1 | Ajouter lien sortant blog : `/blog/optimisation-site-organisme-formation/` (article existant) dans le corps MDX, sous le paragraphe final. |
| 2 | P1 | Étoffer FAQ à 5 questions : "Quel taux de conversion viser pour un OF ?", "Combien de temps pour voir des résultats ?", "Faut-il une refonte complète ?", "Travaillez-vous sur WordPress / Webflow ?", "Comment mesurez-vous les gains ?". |
| 3 | P2 | Reformuler title L2 → `"Optimisation et CRO pour organismes de formation"` (49 car., gagne "CRO" en mot-clé, laisse place au suffixe). |
| 4 | P2 | Ajouter dans `deliverables` un item explicite « Page de formation type (template optimisé) » — gros sujet de recherche. |
| 5 | P3 | Ajouter au frontmatter une `tagline` axée conversion avec un chiffre type « +20 à 40 % d'inscriptions ». |

## Top 3 à appliquer en B5-bis
- Actions #1 + #2 + #3. 25 min cumulé.
