# Stratégie SEO — Claude Partners

> Document de pilotage SEO. Basé sur un audit réel du code source (`app/`) et des
> données Google Search Console (`sc-domain:claudepartners.fr`) au 2026-06-14.
> Méthode : skill `anthropic-skills:seo` (priorisation Critical → High → Medium → Low).

---

## 1. Diagnostic

### Ce qui est déjà excellent (socle technique — ne rien casser)
Le site est techniquement irréprochable. Tout ce qu'un audit SEO classe en « Critical » est fait :

- Canonical + `trailingSlash:'always'` cohérents (`BaseHead.astro`)
- Open Graph + Twitter cards complets, `og:locale fr_FR`
- Schema.org chaîné par `@id` : `Organization`, `WebSite`, `Service`, `BlogPosting`,
  `BreadcrumbList`, `FAQPage` (`BaseLayout.astro`, `Schema.astro`, pages services/blog)
- Sitemap dynamique priorisé + exclusion des pages noindex (`astro.config.mjs`)
- `robots.txt`, `_headers` (sécurité + cache), `noindex` géré par page
- `llms.txt` dynamique (optimisation IA/GEO) — rare et bien vu
- Homepage **indexée** (crawl 2026-06-14, FAQ rich result *PASS*)

### Le vrai problème : contenu + autorité
- **1 seul article de blog, 145 mots** → « thin content » aux yeux de Google.
- 4 pages services correctes mais courtes (~210-250 mots de corps).
- **0 donnée GSC sur 90 jours** : le site est indexé mais ne ressort sur aucune
  requête. Il manque profondeur, autorité de domaine et ancienneté.

### Réalité du marché (cadrage des attentes)
Créneau *conseil IA pour organismes de formation* = **niche étroite, faibles volumes**.
La victoire n'est pas le volume mais **l'autorité thématique** : dominer un petit
nombre de requêtes ultra-qualifiées. Canal lent (6-12 mois) mais très haute conversion.

---

## 2. Plan priorisé

### 🔴 LEVIER 1 — Cluster de contenu (≈90 % de l'impact)

Modèle « pilier + satellites ». Chaque article cible une douleur opérationnelle réelle
d'un OF, fait 1 000-1 500 mots, est structuré en Q/R + listes (bon pour Google ET pour
les citations IA), et **maille vers la page service correspondante** + CTA audit offert.

**Plan éditorial (titres + requête cible + service lié) :**

| # | Article | Requête cible principale | Service lié |
|---|---------|--------------------------|-------------|
| 0 | *Pilier* : L'IA pour les organismes de formation — le guide complet | ia organisme de formation | tous |
| 1 | Automatiser la conformité Qualiopi avec l'IA | automatiser qualiopi / indicateurs qualiopi | automatisation |
| 2 | Créer des supports de formation avec l'IA : méthode + outils | créer support formation ia | formation-ia |
| 3 | Automatiser l'émargement et le suivi des stagiaires | automatiser émargement formation | automatisation |
| 4 | Automatiser le BPF (bilan pédagogique et financier) | automatiser bpf organisme formation | automatisation |
| 5 | Réduire la charge administrative d'un OF grâce à l'IA | charge administrative organisme formation | audit-ia |
| 6 | ChatGPT pour formateurs : 10 cas d'usage concrets | chatgpt pour formateurs | formation-ia |
| 7 | Gérer EDOF / Mon Compte Formation plus efficacement | edof gestion / mon compte formation gestion | automatisation |
| 8 | Quels outils IA pour un organisme de formation en 2026 ? | outils ia organisme formation | outils-ia-sur-mesure |
| 9 | IA et pédagogie : personnaliser les parcours apprenants | ia pédagogie personnalisation | outils-ia-sur-mesure |

**Checklist :**
- [x] Ré-étoffer l'article existant `integrer-ia-organisme-formation.mdx` → **page pilier** (~1 440 mots, maillée vers les 4 services + CTA). *(2026-06-14 ; approfondi 2026-06-16 : exemple chiffré de gain de temps, section RGPD/données stagiaires, FAQ étoffée — coût + outils gratuits/payants)*
- [x] **Article 1 — « Automatiser la conformité Qualiopi avec l'IA »** : rédigé (~700 mots), image de couverture unique générée (HF Z-Image), maillage bidirectionnel avec le pilier + liens vers `automatisation`/`audit-ia`. *(2026-06-14)*
- [x] **Article 2 — « Automatiser l'émargement et le suivi des stagiaires »** (~590 mots) + image générée + lien croisé bidirectionnel avec l'article Qualiopi. *(2026-06-14)*
- [x] **Articles 3-4 — BPF + charge administrative** publiés + maillage interne. **Couvertures uniques régénérées (HF PRO, 2026-06-15).** *(2026-06-14)*
- [x] **Articles supplémentaires (2026-06-15) — sélection pilotée par les volumes réels (MCP Ubersuggest)**, plus par hypothèse :
  - « Logiciel pour organisme de formation » (320 vol, diff. 10) — cover unique
  - « Créer un organisme de formation » (170 vol, diff. 23) — cover unique
  - « Convention de formation » (720 vol, diff. 14) — cover unique, étoffé à 642 mots
  - « Programme de formation » (590 vol, diff. 16) — cover unique
  - « Indicateurs Qualiopi » (320 vol, diff. 24) — ⚠️ cover temporaire à régénérer
  - « Audit de surveillance Qualiopi » (210 vol, diff. 15) — ⚠️ cover temporaire à régénérer
- [x] Maillage interne dense (chaque article → service + 2-4 articles voisins, liens bidirectionnels).
- [ ] **Régénérer les 2 couvertures temporaires** (indicateurs + audit-surveillance) dès retour du quota HF.
- [ ] *(Julien a publié en parallèle 3 articles « acquisition » : SEO, SEA, optimisation-site — volet marketing.)*

> **Journal audit + technique (2026-06-15)** — Audit Ubersuggest réalisé (score 76/100). Correctifs poussés : slugs de tags en minuscules, tags en `noindex` + hors sitemap, titres ≤60 car (suffixe conditionnel), lien email `/contact` réparé (`<!--email_off-->`). Perf : hero responsive (`widths` srcset) → FCP mobile 2,6→1,9 s, Speed Index 3,6→3,0 s (LCP encore 4,2 s, dominé par redirect labo + throttling). Indexation : sitemap resoumis (Google ne l'avait téléchargé qu'avec 13 URLs). Données niche : « qualiopi » 22k vol, SERPs à faible autorité = **niche gagnable** (réévaluer le cadrage « faibles volumes » ci-dessus).
- [ ] Maillage interne : chaque article → 1 lien vers son service + 1-2 vers articles voisins.
- [ ] Vérifier `relatedTags` des services pour que le bloc « Articles liés » se remplisse.

### 🟠 LEVIER 2 — Signaux E-E-A-T (crédibilité humaine)

Le conseil B2B récompense l'expertise humaine prouvée. Aujourd'hui l'auteur est
« Claude Partners » (org, pas personne).

**Checklist :**
- [x] **Auteur nommé réel** : Julien Rayes — entité partagée `app/src/data/author.ts`. *(2026-06-14)*
- [x] **Page auteur** : section « Le fondateur » sur `/a-propos/` avec ancre `#julien-rayes`. *(2026-06-14)*
- [x] Schema `Person` lié au `BlogPosting.author` via `@id` (présent sur l'article ET la page auteur → entité consolidée). *(2026-06-14)*
- [ ] Remplir `sameAs` (Organization + Person) — **en attente d'un LinkedIn réel** ; laissé vide proprement (`BaseLayout.astro` l.~25 + `author.ts`).
- [x] Page « À propos » : preuves de crédibilité réelles ajoutées (OF > 3 M€ de CA, back-office automatisé avec Make + Claude Code). *(2026-06-14)*

### 🟡 LEVIER 3 — Netlinking (autorité de domaine)

Domaine neuf = 0 autorité. Quelques liens pertinents suffisent dans ce créneau.

**Checklist :**
- [ ] Référencer le site dans l'écosystème formation (Centre Inffo, annuaires d'OF, fédérations).
- [ ] Page entreprise LinkedIn active + posts réguliers renvoyant vers les articles.
- [ ] Partenariats / interviews / articles invités dans le secteur formation & RH.
- [ ] Appliquer la logique de qualification de la skill `netlinking-ecole-naturo`
      (DR, thématique, ancres safe, ratio d'ancres) avant tout achat de lien.

### 🔵 LEVIER 4 — GEO (ChatGPT / Perplexity / AI Overviews)

Les acheteurs (dirigeants d'OF) interrogent de plus en plus une IA. Niche B2B spécialisée
= peu de sources fiables à citer → fort potentiel de citation. `llms.txt` déjà présent.

**⚠️ Contradiction à trancher EN PREMIER :** Cloudflare injecte à l'edge un *Managed
robots.txt* (AI Crawl Control) qui **Disallow ClaudeBot, GPTBot, Google-Extended, CCBot,
Bytespider, Amazonbot…**. Résultat : ton `llms.txt` invite les IA à te citer, mais
Cloudflare leur **bloque l'accès au site**. Tant que ce blocage est actif, le Levier GEO
est **neutralisé**. Décision : désactiver « Block AI bots » dans Cloudflare (cohérent avec
la stratégie GEO) OU assumer de ne pas viser les citations IA (et alors retirer `llms.txt`
pour éviter l'incohérence).

**Checklist :**
- [ ] **Trancher le blocage AI bots Cloudflare** (cf. avertissement ci-dessus) — prérequis de tout le levier GEO.
- [ ] Structurer chaque article : définition claire en intro + Q/R + données chiffrées (citabilité).
- [ ] Garder `llms.txt` à jour (il se régénère depuis les collections — vérifier après chaque ajout).
- [ ] Inclure des réponses directes aux questions « comment / pourquoi / combien » du secteur.

### ⚪ Quick-wins techniques mineurs
- [x] **Flux RSS** : `src/pages/rss.xml.ts` créé + `rel=alternate` dans le `<head>` (`BaseHead.astro`). *(2026-06-14)*
- [x] Schema `BlogPosting` enrichi : `keywords` (depuis les tags). *(2026-06-14)* — `about` non ajouté (optionnel, faible gain).
- [x] `wordCount` sur `BlogPosting` (plugin `remark-reading-time` étendu pour exposer `rt.words`). *(2026-06-14)*

---

## 3. Roadmap

| Horizon | Action | Résultat attendu |
|---------|--------|------------------|
| **Semaine 1** | Ré-étoffer l'article existant + E-E-A-T (auteur, `sameAs`) + RSS | Base propre, 0 thin content |
| **Mois 1-2** | Articles 1→4 + maillage services | Premières impressions GSC |
| **Mois 2-3** | Articles 5→7 + 3-5 backlinks ciblés | Premiers clics longue traîne |
| **Mois 3-6** | Rythme 2 articles/mois + netlinking continu | Top 10 sur requêtes de niche |

---

## 4. Mesure (KPI à suivre dans la GSC)
- **Impressions** (le tout premier signal de vie — surveiller dès le mois 1).
- **Requêtes positionnées** (nombre de mots-clés qui ressortent).
- **Position moyenne** sur les requêtes cibles du cluster.
- **Clics** (vient en dernier, c'est le plus lent à bouger).
- Pages indexées vs soumises (couverture).

> Ne pas juger avant 3 mois. Le SEO d'un domaine neuf sur une niche est un investissement,
> pas un interrupteur.

---

## 5. À NE PAS faire (pièges)
- ❌ Pas de `HowTo` schema (déprécié sept. 2023).
- ❌ Pas de nouveau `FAQPage` schema dans l'espoir d'un rich result Google : restreint
  aux sites gov/santé depuis août 2023. (Les `FAQPage` existants restent utiles pour les
  citations IA — on les garde, on n'en ajoute pas pour le SEO Google.)
- ❌ Pas de bourrage de mots-clés ni de contenu généré « vide » : la niche se gagne par la
  précision et l'expertise réelle, pas le volume.
- ❌ Pas de pages doublons / variations géographiques artificielles (offre nationale).
