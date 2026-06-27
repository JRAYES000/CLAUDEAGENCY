# Audit page — Service Automatisation (`/services/automatisation/`)

## Constats (état au 26/06/2026)

- **Title** : « Automatisation des process pour organismes de formation » (55 car., suffixe omis)
- **Meta description** : 116 car. — correcte mais courte
- **H1** : identique au title — manque mot-clé **« Qualiopi »** alors qu'il est central pour ce service
- **Hiérarchie** : H1 + 4×H2 fixes + FAQ — bonne
- **Schema** : `Service` + `BreadcrumbList` + `FAQPage`
- **Maillage entrant** : home (carte « Process & admin OF ») + services index
- **Maillage sortant** : 3 articles blog + `/services/audit-ia/` — bon
- **FAQ** : 2 questions — insuffisant pour citabilité IA sur sujet brûlant Qualiopi

## Checklist actions (`app/src/content/services/automatisation.mdx`)

| # | Priorité | Action |
|---|---|---|
| 1 | P1 | Reformuler title + H1 L2 → `"Automatisation Qualiopi et process pour organismes de formation"` (60 car. pile — capte « automatisation Qualiopi », mot-clé exact du brief). |
| 2 | P1 | Étoffer la meta description L3 vers 150-160 car. avec mention chiffrée : « Dossiers Qualiopi, émargement, relances, BPF : récupérez 5 à 10 h/semaine sur l'administratif. Audit offert pour identifier vos automatisations prioritaires. » |
| 3 | P1 | Ajouter 4 questions FAQ : "Combien de temps gagner avec l'automatisation Qualiopi ?", "Quels outils utilisez-vous (Make, n8n, Zapier) ?", "Peut-on automatiser le BPF ?", "L'automatisation est-elle compatible avec mon CRM ?". |
| 4 | P2 | Ajouter un lien sortant vers `/blog/reduire-charge-administrative-organisme-formation/` dans le corps MDX. |
| 5 | P3 | Ajouter `category: 'process'` au frontmatter pour permettre un filtrage cohérent côté `services/index.astro`. |

## Top 3 à appliquer en B5-bis
- Actions #1 + #2 + #3 cumulées sont les plus impactantes. 35 min cumulé.
