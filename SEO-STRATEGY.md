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
- [x] `sameAs` Person rempli (LinkedIn fondateur réel, `author.ts`) ; Organization `sameAs` = même LinkedIn. *(constaté 2026-06-19)* Étendre via page entreprise LinkedIn / Wikidata reste un plus (cf. action #22 recherche 2026).
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

**✅ Contradiction résolue (audit 2026-06-19) :** le `robots.txt` servi **en production** est
la version permissive (aucun bot IA bloqué) — vérifié par requête réelle sur la prod. Le
*Managed robots.txt* Cloudflare (AI Crawl Control) n'est donc pas actif. Le `robots.txt` du
dépôt a été rendu **explicite** : autorisation nommée des bots de **recherche IA**
(OAI-SearchBot, PerplexityBot, Claude-SearchBot, ChatGPT-User…) ET des bots d'**entraînement**
(GPTBot, ClaudeBot, CCBot, Google-Extended → présence dans la mémoire des modèles = notoriété
de marque). Le Levier GEO n'est **pas** neutralisé. *Seul reste à confirmer côté Julien* : que
le toggle « Block AI bots » est bien OFF dans le dashboard Cloudflare (non vérifiable par API).

**Checklist :**
- [x] **Blocage AI bots Cloudflare tranché** (2026-06-19) : prod permissive + `robots.txt` explicite (bots de recherche IA et d'entraînement autorisés). Reste à confirmer le toggle côté dashboard Cloudflare.
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

---

## 6. Journal — Audit « recherche SEO 2026 » (2026-06-19)

Site confronté aux 50 actions de la recherche SEO post-avril 2026. Le socle technique et le
cluster de contenu étaient **déjà solides** (audit : schema chaîné, hero LCP optimisé, BLUF
systématique, maillage interne dense, FAQ partout). Les vrais manques : la **citeabilité GEO**
et l'**autorité prouvée par des sources**. Actions menées en autonomie :

- **Citeabilité / E-E-A-T (le plus gros gain).** Constat : **0/26 article** citait une source
  primaire externe. Ajout de **citations vers les sources officielles** (Légifrance L.6353-1,
  travail-emploi/Qualiopi + RNQ, service-public/Mon Activité Formation, DARES, CNIL) sur les
  2 piliers + 4 articles réglementaires (convention, NDA, BPF, indicateurs). Ajout d'une
  **statistique sourcée** (DARES-Céreq : 49 % des OF certifiés Qualiopi + 4 % en cours, été
  2023) et de **tableaux comparatifs** (4 chantiers IA ; coûts d'audit Qualiopi) — formats les
  plus cités par les moteurs IA (#26). Une **citation attribuée du fondateur** (donnée
  propriétaire : relances 2 h/j → 2 h/mois) sur le pilier IA (#14/#15). `updatedDate` posé sur
  les **6 articles réellement modifiés** uniquement (pas de faux refresh, cf. action #16).
- **Technique.** `robots.txt` rendu **explicite** (bots de recherche IA + entraînement
  autorisés, #1/#31). **HSTS** ajouté aux `_headers` (#44). Build vérifié (58 pages, 0 erreur),
  rendu confirmé sur le `dist` (tables, blockquote, liens, `dateModified` 2026-06-19 dans le JSON-LD).
- **État GSC (grounding).** Sitemap *Valid*, **41 URLs indexées**, 0 erreur (crawl 2026-06-18).
  Trafic encore quasi nul (~13 impressions ; requête « julien rayes » ; `logiciel-organisme-formation`
  pos. 3,8) : **pré-trafic** normal pour un domaine neuf. Aucun quick-win position 4-10 à récolter
  pour l'instant → priorité maintenue sur autorité + citeabilité, pas sur l'optimisation CTR.

**Reste à arbitrer côté Julien (hors autonomie) :** confirmer le toggle « Block AI bots » OFF
dans Cloudflare ; brancher **IndexNow** (intégration Cloudflare 1-clic ou ping au déploiement,
#4) ; leviers externes — **netlinking**, mentions de marque non-linkées (#34), **YouTube**
(corrélation 0,737 avec les citations IA, #50), Wikidata + page entreprise LinkedIn (#22).

**Suite (2026-06-19, après merge de la PR #7).** PR #7 **mergée et déployée**. Entité **Organization**
enrichie (`foundingDate`, `founder` lié au Person, `knowsAbout`) pour consolider le Knowledge Graph
(#22, PR séparée). Confirmation **fonctionnelle** que les bots IA ne sont pas bloqués (robots.txt prod
sans bloc « Managed content » ni `Content-Signal: ai-train=no`) ; la confirmation **visuelle** du toggle
Cloudflare attend que le navigateur de Julien soit connecté (Claude in Chrome — aucun navigateur appairé).
Leviers externes : stratégie cadrée dans `NETLINKING.md` (addendum rebrand §9) ; le reste (LinkedIn
entreprise, Featured/Qwoted, annuaires, baromètre) nécessite les comptes/identité de Julien.

---

## 7. Journal — Audit maillage + technique (2026-07-04)

Passe d'optimisation autonome (branche `claude/website-seo-audit-lniqxw`), 11 actions sans
levier externe ni achat de lien :

- **Maillage interne.** Bloc « À lire aussi » automatique en pied de chaque article (3 articles
  par tags partagés) → liens entrants garantis pour tout le blog. 4 orphelins désenclavés par
  des liens éditoriaux dans le corps d'articles voisins (certificat-de-réalisation,
  formation-ia-equipe, livret-accueil, remplir-bpf). 29 articles sans lien service → 1 lien
  service contextuel chacun dans « Pour aller plus loin ». 1 lien cassé corrigé
  (`formation-ia-equipe` → slug inexistant). **312 liens internes sans trailing slash**
  corrigés (`trailingSlash:'always'` ⇒ chaque lien sans slash coûtait une 308 au crawl).
- **Métadonnées.** 14 titres ramenés ≤ 60 caractères (mot-clé conservé en tête), 7 descriptions
  ramenées ≤ 155. `author: Julien Rayes` ajouté sur 2 articles qui retombaient sur l'entité
  générique (E-E-A-T). Pas d'`updatedDate` posé : retouches de méta/maillage, pas de refresh
  de contenu.
- **Technique.** `lastmod` du sitemap = vraie date (`updatedDate` sinon `pubDate`) au lieu de
  la date de build (faux signal de fraîcheur que Google finit par ignorer). **IndexNow
  branché** : clé hébergée (`/957b….txt`) + `postbuild` qui soumet toutes les URLs du sitemap
  à `api.indexnow.org` à chaque déploiement Cloudflare Pages (inactif en build local).
- **Services.** `relatedTags` d'`integration-ia` : « Accompagnement » (0 article correspondant)
  remplacé par « organisme de formation » (21 articles).

Build vérifié : 166 pages, 0 erreur.

---

## 8. 🔴 PRIORITÉ — Migration de domaine `claudepartners.fr` → `claudeagency.fr` (2026-06-25)

**Constat.** Tout le code est passé sur `claudeagency.fr` (`astro.config.mjs site:`, schemas,
emails, `llms.txt`). Mais ce document et la Search Console raisonnaient encore sur l'ancienne
propriété `claudepartners.fr` (41 URLs indexées). C'est une **migration de domaine** : sans
redirections 301 + signal explicite à Google, le nouveau domaine repart de zéro (0 historique,
0 indexation) et l'ancien indexé devient du contenu mort.

**État non vérifié.** Aucune redirection inter-domaine dans le dépôt (`_redirects` ne gère que
`www`/`pages.dev` → apex). Impossible de confirmer depuis l'environnement agent (politique réseau
bloque l'accès sortant à ces domaines). **À confirmer/exécuter par Julien.**

**Runbook (par ordre) :**
1. **Cloudflare — Redirect Rule 301** `claudepartners.fr/*` ET `www.claudepartners.fr/*`
   → `https://claudeagency.fr/$1` (préserver chemin + query string). C'est une règle au niveau
   *hostname* (impossible dans `_redirects`, qui est relatif au chemin).
2. **Search Console** : valider la propriété domaine `claudeagency.fr`, puis sur `claudepartners.fr`
   lancer l'outil **« Changement d'adresse »** vers `claudeagency.fr`. Resoumettre le sitemap
   `https://claudeagency.fr/sitemap-index.xml`.
3. **Garder l'ancien domaine + les 301 actifs ≥ 6 mois** (transfert des signaux par Google = lent).
4. **Mettre à jour les références externes** vers le nouveau domaine (LinkedIn, annuaires, `sameAs`).
5. **Vérification** (depuis une machine sans blocage réseau) :
   `curl -I https://claudepartners.fr/blog/` doit renvoyer `301` → `https://claudeagency.fr/blog/`.

> Désormais, la propriété GSC à suivre (§4 KPI) est **`claudeagency.fr`**, pas `claudepartners.fr`.

---

## 8. Journal — Offensive « agence marketing claude » (2026-07-13)

Audit complet GSC + DataForSEO (SERP France réelle) + crawl. Constats de grounding :
**claudeagency.fr absent du top 20** sur « agence marketing claude » (SERP faible : posts
Instagram/Reddit, guides « skills Claude », petites agences — très gagnable) ; 18e sur
« agence claude » ; striking distance sur « agence référencement (naturel) claude »
(pos. 10,8-16,4 via `/services/seo/`, 141 impressions). Volumes : « agence marketing
claude » <10/mois, « agence ia » 1 900 (diff. 1), « agence seo ia » 260, « claude ai
france » 390. LCP mobile labo 6,4 s (hero léger 15-55 Ko : le coupable est le JS tiers).

Actions menées en autonomie (~20, hors netlinking) :
- **Landing `/agence-marketing-claude/`** : title/H1 exact-match, ~1 100 mots, définition
  citable (GEO), tableau comparatif, chiffres propriétaires, FAQ visible (sans schema
  FAQPage, cf. §5), Schema `Service` + `BreadcrumbList`, priorité sitemap 0,9.
- **Homepage** : title « Agence marketing IA pour organismes de formation | Claude Agency »,
  description réécrite (agence marketing + Claude/Anthropic), lien contextuel vers la landing.
- **Maillage** : footer sitewide + 5 articles (externaliser-marketing [ancre exacte],
  vs-concurrents, seo-OF, sea-OF, remplir-sessions) + à-propos + 3 services → landing.
- **Services étoffés** : section « agence qui travaille avec Claude » sur seo/sea/
  optimisation-site + FAQ « contenu IA pénalisé ? » sur seo.
- **Article satellite** `claude-pour-le-marketing` (~950 mots, intent info de la SERP cible,
  tableau Claude/Claude Code/Cowork). ⚠️ cover réutilisée (externaliser-marketing) à régénérer.
- **Entité** : Organization `alternateName` (« Agence Claude », « Agence marketing Claude »),
  description « agence marketing et IA », knowsAbout + marketing digital ; llms.txt : landing
  ajoutée + Q/R « Qu'est-ce qu'une agence marketing Claude ? » ; descriptions CTR réécrites
  (feuille-emargement CTR 0 % pos 9,8 ; questionnaire-satisfaction pos 10,2).
- **Perf** : Leadsy différé (interaction ou 4 s) → hors chemin critique LCP/TBT.
- Build 168 pages OK, rendu vérifié (desktop + mobile 390 px, zéro débordement).

**Constats hors périmètre repo (côté Julien)** : `www.claudeagency.fr` répond **200 sans
redirect** vers l'apex (la règle Cloudflare documentée dans `_redirects` n'est pas active —
à corriger dans le dashboard) ; propriété GSC `sc-domain:claudeagency.fr` non vérifiée
(la propriété URL-prefix suffit au quotidien).
