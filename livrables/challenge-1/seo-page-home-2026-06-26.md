# Audit page — Home (`/`)

## Constats (état au 26/06/2026)

- **Title** : « Claude Agency — agence IA pour organismes de formation » (55 car. — bon, mot-clé pilier présent en milieu)
- **Meta description** : 158 car. — OK
- **H1** : « L'agence IA qui gère le marketing et l'administratif de votre organisme de formation » — bon, mot-clé présent
- **Hiérarchie Hn** : 1×H1, 7×H2 (Vous portez tout, Quatre experts, On l'a d'abord fait, Nos prestations, Notre méthode, Quel organisme êtes-vous, Le fondateur, Questions fréquentes, CTA), 3×H3 — propre
- **Alt images** : tous descriptifs et orientés intention (5/5)
- **Schema** : `Organization` + `WebSite` + `FAQPage` (à retirer — doctrine `CLAUDE.md`)
- **Maillage sortant** : 6 services, `/a-propos/#julien-rayes`, `/contact/` — riche
- **E-E-A-T** : bloc fondateur + portrait + citation directe + `Person` schema — fort

## Checklist actions (`app/src/pages/index.astro`)

| # | Priorité | Action |
|---|---|---|
| 1 | P1 | Supprimer `faqSchema` (L73-76) et le retirer de `pageSchema={[faqSchema]}` L81 → `pageSchema={[]}`. |
| 2 | P1 | Sous le hero (L109-112), ajouter une mention discrète « France, Belgique, Suisse, Luxembourg » pour matcher la cible brief. |
| 3 | P2 | Dans le bloc « Le fondateur » (L294-322), ajouter un lien explicite vers `/blog/seo-organisme-formation/` pour renforcer le maillage thématique auteur. |
| 4 | P3 | Réduire la liste FAQ de 14 à 8-10 questions en gardant les plus à fort volume de recherche IA (Qualiopi, RGPD, dépendance, prix). |
| 5 | P3 | Ajouter `<link rel="preconnect" href="https://www.googletagmanager.com">` dans `BaseHead.astro` puisque gtag est chargé async depuis cette origine. |

## Top 3 à appliquer en B5-bis
- Actions #1 + #2 = retirer FAQPage + élargir mention géo. 15 min.
