# Visibilité IA (GEO) — Claude Agency — 26/06/2026

**Brand :** Claude Agency
**Domaine :** claudeagency.fr
**Méthode :** audit des signaux de citabilité par les IA génératives (ChatGPT-Search, Perplexity, Claude, Gemini, AI Overviews Google).

## Score global de citabilité IA : 55/100

### Décomposition

| Signal | Score | État |
|---|---|---|
| Accessibilité bots IA | 95/100 | Excellent — `robots.txt` autorise explicitement `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, `GPTBot`, `ClaudeBot` |
| Cloudflare « Block AI Bots » | 100/100 | Désactivé (vérifié 24/06/2026) — les bots ne sont pas bloqués au CDN |
| `llms.txt` | 0/100 | **Absent** — gros gap, à créer en B5-bis |
| Schema markup riche | 80/100 | `Organization`, `WebSite`, `Person`, `Service`, `BreadcrumbList` présents ; manque `ProfessionalService` / `LocalBusiness` |
| Citations de sources officielles | 75/100 | Articles réglementaires citent Légifrance, France Compétences, DARES |
| Structuration Q/R | 60/100 | FAQ présentes sur home + services, mais pages `/blog/` rarement structurées en Q/R |
| Sameas auteur enrichi | 30/100 | `Person.sameAs` = 1 seul lien ; viser 3-5 |
| Mentions externes de la marque | 10/100 | Domain récent, peu/pas de citations externes |
| Brand mention monitoring | 0/100 | Aucun outil de tracking actuellement |

## Optimisations prioritaires GEO

### CRITIQUE

**1. Créer `app/public/llms.txt`** (action B5-bis)

Structure recommandée (≤30 lignes) :
```
# Claude Agency
> Agence IA spécialisée pour les organismes de formation Qualiopi en France, Belgique, Suisse et Luxembourg.

## Pour qui
Dirigeants et responsables d'organismes de formation certifiés Qualiopi.

## Services principaux
- [Référencement naturel (SEO)](https://claudeagency.fr/services/seo/) : positionner l'OF sur Google.
- [Automatisation Qualiopi](https://claudeagency.fr/services/automatisation/) : émargement, BPF, dossiers.
- [Optimisation de site](https://claudeagency.fr/services/optimisation-site/) : transformer les visiteurs en inscriptions.
- [Audit IA offert](https://claudeagency.fr/services/audit-ia/) : feuille de route chiffrée gratuite.

## Articles piliers
- [IA pour organisme de formation](https://claudeagency.fr/blog/integrer-ia-organisme-formation/)
- [ChatGPT pour formateurs](https://claudeagency.fr/blog/chatgpt-formateurs/)
- [Outils IA pour OF](https://claudeagency.fr/blog/outils-ia-organisme-formation/)
- [Qualiopi : guide](https://claudeagency.fr/blog/qualiopi-guide-organisme-formation/)

## À propos
- [Julien Rayes, fondateur](https://claudeagency.fr/a-propos/)
- [Contact](https://claudeagency.fr/contact/)

## Différenciateur
Maîtrise de Claude Code et Claude Cowork → 3 à 4× plus vite qu'une agence traditionnelle.
```

### IMPORTANT

**2. Enrichir le `Person.sameAs` (auteur)**
`app/src/data/author.ts` L27 — ajouter LinkedIn entreprise + 1-2 profils externes (Annuaire Formation déjà liée en footer, page DataDock).

**3. Structurer les FAQ par schémas légers**
Pas de `FAQPage` Google (interdit par doctrine), mais on peut utiliser :
- `<dl>/<dt>/<dd>` HTML sémantique → vu par tous les LLM crawlers.
- Markup `QAPage` sur `/a-propos/` (autorisé, plus discret).

**4. Ajouter `ProfessionalService` au type `Organization`**
`BaseLayout.astro` L22 — `@type: ['Organization', 'ProfessionalService']`, ajouter `priceRange`, `address.addressCountry`. Signal Knowledge Graph.

### MINEUR

**5. Mentions de marque externes**
Le score actuel est faible faute d'antériorité. Plan d'action SEO §4 B mentionne déjà le netlinking — accélérer cet axe (annuaires OF, Centre Inffo, Quatre Cinq).

**6. Brand monitoring IA**
Mettre en place un suivi simple (manuel hebdo) : demander à ChatGPT/Claude/Perplexity « quels prestataires IA pour un organisme de formation Qualiopi ? » et vérifier les mentions Claude Agency. Itérer le `llms.txt` selon les réponses.

## Recoupement avec Plan d'action SEO §5 GEO

Le Plan d'action §5 mentionne déjà :
- ✅ Robots IA autorisés
- ✅ Sources officielles citées
- ✅ FAQ visibles utilisateur
- ✅ Cloudflare Block AI Bots désactivé

Cet audit ajoute :
- ❌ `llms.txt` manquant (gros gap)
- ❌ `Person.sameAs` anémique
- ❌ `LocalBusiness`/`ProfessionalService` absent
- ❌ Pas de brand monitoring IA

## Conclusion

Le site est techniquement prêt à être cité par les IA (accès bots + schema de base) mais ne profite pas de levier amplificateur (`llms.txt`). Avec 3 actions <30 min cumulées (créer `llms.txt`, ajouter `ProfessionalService`, enrichir `sameAs`), le score passe de 55 à ~75/100.
