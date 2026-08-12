# Backlog SEO — claudeagency.fr

Prochaines actions, par ordre de priorité. **Lire aussi la section « Écarté »** avant de proposer
quoi que ce soit : une idée qui s'y trouve a déjà été tranchée.

Priorisation faite le 2026-08-12 à partir des données GSC mesurées (14/05→09/08/2026), pas
d'hypothèses. Dernière mesure : 49 clics, 2 797 impressions, position moyenne 33,3.

---

## À faire

### 🔴 1. Netlinking — le seul levier qui débloque le reste

**Constat mesuré :** 0 backlink, 0 domaine référent, autorité de domaine 1/100
(Ubersuggest, 2026-08-12). Le site a 2 797 impressions et une position moyenne de 33,3 : Google
connaît les pages, il ne les juste pas assez fiables pour les remonter.

Publier un 70ᵉ article ne changera pas ça. C'est le point de blocage n°1.

- [ ] Obtenir les 5 premiers liens de l'écosystème formation (annuaires d'OF, Centre Inffo,
      fédérations professionnelles) — liens gratuits, à demander.
- [ ] Page entreprise LinkedIn active, posts renvoyant vers les articles.
- [ ] Qualifier 3 à 5 spots payants avec la méthode de la skill `netlinking-ecole-naturo`
      (DR, thématique, ancres) avant tout achat. Voir `NETLINKING.md`.

### 🔴 2. Doublon www / non-www dans l'index Google

**Constat mesuré :** 15 URLs ressortent dans GSC sur les deux variantes. Exemples :
`www.claudeagency.fr/blog/seo-organisme-formation/` (68 impressions), `.../numero-declaration-activite/`
(45), `.../automatiser-bpf-organisme-formation/` (138). L'autorité de chaque page est coupée en deux.

- [ ] Vérifier la redirection 301 `www` → apex côté Cloudflare et la cohérence des `canonical`.
- [ ] Après correction, resurveiller sur 30 jours que les URLs `www` disparaissent de GSC.

### 🟠 3. Récolter les pages en *striking distance* (position 7–20, 0 clic)

Pages qui ressortent déjà mais ne convertissent aucune impression en clic. Title et meta à
retravailler — coût faible, effet rapide. Chiffres GSC 14/05→09/08/2026 :

| URL | Impressions | Clics | Position |
| :--- | ---: | ---: | ---: |
| `/services/seo/` | 536 | **0** | 19,9 |
| `/blog/claude-ai-en-francais/` | 110 | 1 | 13,3 |
| `/blog/seo-organisme-formation/` | 68 | **0** | 15,1 |
| `/blog/livret-accueil-stagiaire/` | 58 | 4 | 20,9 |
| `/blog/feuille-emargement/` | 50 | 1 | 12,7 |
| `/blog/numero-declaration-activite/` | 45 | **0** | 16,1 |
| `/blog/questionnaire-satisfaction-formation/` | 36 | 1 | 11,6 |
| `/services/optimisation-site/` | 25 | **0** | 18,9 |
| `/blog/convention-de-formation/` | 24 | **0** | 10,8 |
| `/blog/seo-guide-complet-organisme-formation-2026/` | 20 | **0** | 14,3 |

- [ ] Commencer par `/services/seo/` : 536 impressions et 0 clic, c'est la plus grosse fuite du site.

### 🟠 4. Requêtes parasites « …skills claude seo » — à investiguer

**Constat :** une trentaine de requêtes GSC de la forme
`formation référencement site web montpellierskills claude seo`,
`formation seo qualiopiskills claude seo` — une requête métier collée au mot « skills claude seo ».
Elles apparaissent presque toutes en position 2 à 20.

Ce n'est **pas** une explication établie, c'est une anomalie à comprendre : ces chaînes concaténées
ressemblent à du texte agrégé servi quelque part sur le site ou sur un sous-domaine.

- [ ] Identifier la page qui ressort sur ces requêtes (GSC, filtre par requête + dimension page).
- [ ] Décider : contenu légitime à structurer, ou pollution à retirer.

### 🟡 5. Sous-domaine `reporting.claudeagency.fr` indexé

**Constat mesuré :** 17 impressions, position 9,2. La propriété domaine l'inclut.

- [ ] Confirmer avec Julien s'il doit être public. Si non : `noindex` + exclusion du sitemap.

### 🟡 6. Requêtes à fort volume où le site est trop loin

Impressions réelles mais positions hors jeu — à traiter **après** le netlinking, pas avant.

| Requête | Impressions | Position | Page |
| :--- | ---: | ---: | :--- |
| `logiciel organisme de formation` | 121 | 75,1 | `/blog/logiciel-organisme-formation/` |
| `logiciel bilan pédagogique et financier` (2 graphies) | 119 | ~35 | `/blog/automatiser-bpf-organisme-formation/` |
| `claude seo agency` (anglais) | 107 | 57,6 | `/services/seo/` |
| `agence claude code` | 37 | 66,1 | — |

### ⚪ 7. Dette de la mémoire elle-même

- [ ] `REQUETES.csv` : 71 lignes sur 87 ont une requête cible marquée
      `deduite-du-slug-A-VALIDER`. À corriger au fil de l'eau, pas en une passe.
- [ ] Régénérer les 2 couvertures temporaires (`indicateurs-qualiopi`, `audit-surveillance-qualiopi`)
      — en attente depuis le 2026-06-15.

---

## Écarté — ne pas reproposer

| Idée | Écartée le | Raison |
| :--- | :--- | :--- |
| Publier en masse (~40 articles d'un coup) | 2026-08-12 | Fait le 30/06/2026. Mesure à 6 semaines : impressions en hausse, **quasiment aucun clic**, position moyenne dégradée à 33,3. Le volume ne compense pas l'absence d'autorité. |
| Maillage interne par script | 2026-07-03 | A vidé 62 articles (incident documenté dans `docs/CONTEXTE-COWORK.md`). Le maillage se pose à la main. |
| Nouveau schema `FAQPage` pour le SEO Google | 2026-06-14 | Rich result restreint aux sites gov/santé depuis août 2023. Les `FAQPage` existants restent en place pour les citations IA. |
| Schema `HowTo` | 2026-06-14 | Déprécié par Google en septembre 2023. |
| Pages doublons / variantes géographiques | 2026-06-14 | Offre nationale — pas de justification, risque de contenu dupliqué. |
| Optimisation CTR comme priorité | 2026-06-19 | Écartée à l'époque faute de pages en position 4-10. **Ré-ouverte le 2026-08-12** : il y en a maintenant (voir priorité 3). |
| Retirer le tag GA4 | — | La propriété Search Console préfixe est validée par ce tag. Le retirer casse la validation. |
