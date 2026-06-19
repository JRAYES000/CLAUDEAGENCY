# Stratégie Netlinking — claudepartners.fr

> 📌 Doc de référence — synthèse d'une **recherche multi-agents** (22 agents, ~250 recherches/lectures web réelles, vérification adversariale de chaque affirmation clé) menée le 2026-06-15. Remplace le playbook initial. Particularité : plusieurs « stats » très répandues dans l'industrie (« ×2,7 », « 58% SEJ », « sandbox 3-6 mois prouvé par la fuite »…) ont été **invalidées** par les vérifications et signalées comme telles.

## 0. Action immédiate — forcer l'indexation (GSC, manuel, ~15 min)
Prérequis avant tout netlinking : tes articles ne sont pas encore indexés (vérifié en GSC). Inspection d'URL → « Demander une indexation » pour la home, le pilier et 4-5 articles clés (convention, programme, qualiopi, logiciel, indicateurs). ~10-15 demandes/jour, étaler sur 2-3 jours. Non automatisable par API.

---

### Cabinet de conseil B2B (IA + marketing : SEO/SEA/automatisation) pour organismes de formation français
**Contexte :** domaine neuf (juin 2026), zéro backlink, zéro autorité, niche étroite. Objectif : bâtir autorité + indexation, sans risque de pénalité Google.

> **Note de méthode.** Cette stratégie ne retient que ce qui est confirmé `consensus_actuel` par les vérifications adversariales. Les éléments classés `contesté` ou `risqué` sont conservés uniquement comme repères, avec un avertissement explicite. Plusieurs chiffres très cités dans l'industrie (« 2,7x », « 58% SEJ », « 77,2% à 2000 mots », « sandbox 3-6 mois prouvé par la fuite ») ont été **invalidés ou affaiblis** par les vérifications et sont signalés comme tels.

---

## 1. Ce que disent les experts — consensus clés

Ces points sont **confirmés `consensus_actuel`** (source primaire vérifiée ou convergence multi-sources solide).

**1.1 — Les tactiques « gagnées »/éditoriales sont à risque minimal.** Digital PR, linkable assets (études/données originales, outils), HARO/demandes de journalistes, broken link building, pages ressources : toutes classées white-hat à risque minimal *parce que ce sont des liens éditoriaux gagnés, pas achetés* — c'est le critère décisif de Google. Vérifié `consensus_actuel`. À noter : remplacer « zéro risque » par « risque minimal tant qu'on ne bascule pas vers du payé déguisé ni de l'ancre sur-optimisée ».
- Experts : **Mike King** (iPullRank), **James Brockbank** (Digitaloft), **John Mueller** (Google, « le digital PR peut être plus impactant que la technique »).
- Sources : [BuzzStream — Digital PR Link Building](https://www.buzzstream.com/blog/digital-pr-link-building/) · [Outpace SEO — 2026 Authority Guide](https://outpaceseo.com/article/link-building/) · [SERPreach — HARO 2026](https://serpreach.com/haro-link-building/)

**1.2 — Le digital PR + linkable assets data-first sont la tactique #1 mesurée (2025-2026).** Le State of Backlinks (uSERP, 800+ SEO) place le digital PR en tête ; corroboré par l'enquête Editorial.link (518 SEO) et BuzzStream. Les données first-party sont une source de crédibilité pour les journalistes. Vérifié `consensus_actuel`.
- **RÉSERVE D'EXÉCUTION (issue de la vérif)** : sur un domaine neuf, le digital PR est lent, coûteux et exige un actif data + un minimum de notoriété. Il faut **d'abord créer l'actif (étude/outil), ensuite pitcher**. Ne pas en faire la première tactique d'un site de quelques mois.
- Experts : **Mark Rofe** (digital PR data-driven), **Aira** (recherche originale = aimant à liens, leur rapport annuel a généré des liens de 600+ sites).
- Sources : [uSERP — State of Backlinks 2025](https://userp.io/link-building/state-of-backlinks-for-seo/) · [Editorial.link — Link Building Statistics](https://editorial.link/link-building-statistics/)

**1.3 — La politique anti-spam de Google (texte officiel, MAJ 2026-05-15).** Le link spam = « créer des liens vers/depuis un site dans le but premier de manipuler le classement ». Schémas interdits : achat/vente de liens transmettant du PageRank (y compris **produit offert en échange d'un article avec lien**), échanges excessifs, programmes automatisés, lien exigé par CGU/contrat, advertorials payés qui passent du jus, annuaires/bookmarks de basse qualité, liens cachés dans widgets, spam de commentaires/forums, contenu de faible valeur pour manipuler le maillage. Vérifié `consensus_actuel` **verbatim sur la source primaire**.
- Source : [Google Search Central — Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies)

**1.4 — Un lien payant n'est conforme QUE s'il est balisé `rel="sponsored"` (ou `nofollow`).** « It's not a violation of our policies to have such links as long as they are qualified with a rel=nofollow or rel=sponsored attribute value. » Pour le contenu utilisateur (commentaires) : `rel="ugc"`. Vérifié `consensus_actuel`.
- Source : [Google — A reminder on qualifying links](https://developers.google.com/search/blog/2021/07/link-tagging-and-link-spam-update)

**1.5 — Le désaveu (disavow) est inutile préventivement.** **John Mueller** : pour la quasi-totalité des sites, c'est une « billable waste of time » ; la notion de « toxic links » est largement fabriquée par les outils SEO. Google ignore automatiquement les liens spammeux et la plupart des attaques de negative SEO. Ne désavouer **qu'en cas de manual action confirmée** (ou volume concentré douteux que l'on a soi-même généré). Vérifié `consensus_actuel`.
- Source : [Search Engine Roundtable — Mueller on disavow](https://www.seroundtable.com/google-disavowing-toxic-links-38587.html)

**1.6 — Le maillage interne échappe à la pénalité de sur-optimisation.** Google a confirmé qu'il n'y a pas de pénalité de sur-optimisation du maillage interne → **levier sûr et gratuit** : ancres exactes riches en mots-clés en interne vers les pages cibles. C'est le levier #1 sans risque pour un domaine neuf. Vérifié `high`.
- Règle d'application : **link graph = topic graph** (Dmitry Paranyushkin, KeywordGraph), ancres qui **nomment l'entité** cible (jamais « cliquez ici »), 3-5 liens internes contextuels/article (**Chris Haines**, Ahrefs). **John Mueller** : « anchor text gives additional context ».
- Sources : [Ahrefs — Internal Links for SEO](https://ahrefs.com/blog/internal-links-for-seo/) · [KeywordGraph — Internal Linking for Topic Clusters](https://keywordgraph.com/semantic-seo/internal-linking-for-topic-clusters/)

**1.7 — Liens fondateurs (foundational links) AVANT tout netlinking avancé.** Propriétés de marque (Google Business Profile, réseaux sociaux), citations/annuaires (NAP cohérent), profils, mentions — pour établir l'entité et créer un profil naturel. Consensus « foundation-first » pour les sites neufs. Vérifié `high`.
- Experts : **Matt Diggity** (séquence Social Fortress → Citations → signaux sociaux → guest posts).
- Sources : [Helpful SEOs — Foundational Backlinks](https://helpfulseos.com/blog/foundational-backlinks/) · [Diggity Marketing](https://diggitymarketing.com/reduce-sandbox-length-by-timing-your-backlinks/)

**1.8 — Le founder-led / thought leadership est un levier d'autorité ET de liens.** Positionner Julien (dir. commercial/marketing d'un OF +3 M€ ayant tout automatisé) comme expert citable génère des backlinks naturels (podcasts, tribunes, citations presse, bios d'auteur) et nourrit l'E-E-A-T. Modèle « founder-plus » : interview 20-30 min, un éditeur rédige. Vérifié `high`. **Adam Holmgren** : « Founder-led is not a content strategy. It's a trust strategy. »
- Sources : [EarlySEO — Founder-Led Content Marketing SEO](https://www.earlyseo.com/blogs/founder-led-content-marketing-seo) · [Backlinko — HARO Alternatives 2026](https://backlinko.com/haro-alternatives)

**1.9 — En France, l'achat de liens via articles sponsorisés est une pratique normalisée (constat de marché).** Plateformes structurées (RocketLinks, Develink, Getfluence, Semjuice, Soumettre…) ; Abondance maintient un classement officiel. Constat descriptif vérifié `consensus_actuel`. **MAIS** le caractère « scalable/prévisible/sûr » est contesté (voir §2) et **risqué pour un domaine neuf** (voir §6).
- Sources : [Abondance — Plateformes netlinking 2026](https://www.abondance.com/outils-seo/plateformes-achat-liens) · [Blog du Modérateur — 1 SEO sur 2 achète des liens en 2025](https://www.blogdumoderateur.com/netlinking-pres-un-specialiste-seo-deux-achete-liens-2025/)

---

## 2. Débats / désaccords entre experts

**2.1 — « Les ancres ne comptent pas » (Ahrefs) vs « les ratios sont un levier » (praticiens). → Vérifié `risqué`.**
L'étude Ahrefs (384 614 pages ; corrélation Spearman exact-match/ranking 0,1436 moyenne / 0,1869 médiane, « relatively weak » ; médiane exact-match = 0) est **factuellement exacte mot pour mot**. MAIS : (a) étude de 2019, corrélationnelle, pas causale ; (b) son « ne manipulez pas vos ratios » vise les liens **éditoriaux gagnés** (où l'on ne choisit pas l'ancre) — la **transformer en autorisation de pousser de l'exact-match sur des liens achetés est un contresens dangereux** ; (c) sur un domaine neuf, sources 2025-2026 (The Links Guy, EMGI, 12AM Agency) convergent : « can't get away with an aggressive anchor text strategy ». **Conclusion : utiliser Ahrefs pour rassurer (« pas besoin d'optimiser au ratio près »), jamais pour justifier un excès d'exact-match.**
- [Ahrefs — Anchor Text Study](https://ahrefs.com/blog/anchor-text/) · [The Links Guy](https://thelinksguy.com/anchor-text-ratio/) · [12AM Agency](https://12amagency.com/blog/anchor-text-optimization-for-seo/)

**2.2 — Existe-t-il un « consensus chiffré » des ratios d'ancres ? → Vérifié `contesté`.**
Les fourchettes (30-50% marque, 1-5% exact-match…) reflètent bien le discours dominant des link builders (FATJOE, Diggity, LinkBuilder.io). MAIS un contre-courant crédible (**Eric Ward** : « There is no perfect percentage » ; The Links Guy, UK Linkology, PBNLinksForSale) qualifie les ratios fixes de « pseudo-science » et s'appuie sur les fuites Google 2024 (signaux `fullLeftContext`/`fullRightContext`) : Google analyserait surtout le **texte autour du lien**, l'ancre devenant un signal diagnostique plus qu'un levier. De plus, le seuil « 10% exact-match site-wide = Penguin » est **mal calibré** (mauvaise unité : le risque se concentre au niveau page/mot-clé cible, pas en moyenne site-wide).
- [UK Linkology](https://www.uklinkology.co.uk/google-just-killed-your-anchor-text-strategy-and-you-don-t-even-know-it-yet/) · [PBNLinksForSale — Anchor Ratios 2026](https://pbnlinksforsale.com/blog/anchor-text-ratios-in-2026-what-the-data-shows-about-safe-link-profiles/)

**2.3 — Pertinence thématique vs autorité (DR) : qui prime ? → Vérifié `contesté`.**
La **direction** « la pertinence est devenue un filtre de qualité majeur » est défendable (FATJOE 2025 : ~89% jugent la pertinence importante/critique — **source primaire vérifiée**). MAIS : (a) le bloc « 58% pertinence / 23% DA… » attribué à « SEJ 2024 » est **introuvable à la source** (citation circulaire) — **à ne pas citer** ; (b) une autre grande enquête (uSERP, 800+ SEO) donne l'**inverse** sur les métriques réellement utilisées : DA/DR 33,5% (#1), trafic 30%, pertinence niche 13,5% ; (c) la seule étude sur **données réelles** (SearchAtlas, 350 159 placements) conclut que **l'autorité domine** la pertinence comme prédicteur. **Conclusion : viser pertinence ET autorité, ne pas les opposer.**
- [FATJOE — Future of Link Building 2025](https://fatjoe.com/blog/link-building-stats/) · [SearchAtlas — Backlink Placement Quality](https://searchatlas.com/blog/seo-impact-of-backlink-placements/) · [userp.io — State of Backlinks 2025](https://userp.io/link-building/state-of-backlinks-for-seo/)

**2.4 — Le multiplicateur « 2,7x » (lien de niche vs hors-sujet) → Vérifié `contesté` (chiffre fabriqué).**
Attribué à un « Moz 2024 » **inexistant** (recherche directe = zéro résultat). Citation circulaire entre blogs. À utiliser **au mieux comme heuristique qualitative, jamais comme fait chiffré**. De même, l'absolu « DR 40 pertinent bat toujours DR 70 non pertinent » est contredit par SearchAtlas.

**2.5 — « Dévalue, jamais ne rétrograde » (mécanique SpamBrain) → Vérifié `contesté`.**
Le mécanisme de base est exact (Penguin 4.0 / SpamBrain neutralisent le bénéfice des liens). MAIS deux corrections : (a) **il n'y a PAS eu de « Link Spam Update en juin 2024 »** — c'était un *spam update* général, et Danny Sullivan a clarifié le contraire ; le dernier vrai link spam update = déc. 2022. (b) Google **peut** dégrader la confiance globale (**Gary Illyes** : « it can decide to discount ALL the links, pretty bad for a site » ; **Mueller** : « distrust »). La dichotomie tranchée est trop absolue — **pour un domaine neuf, le risque de distrust est plus élevé, pas plus faible** (peu de bons liens pour diluer).
- [Search Engine Land — Penguin/distrust](https://searchengineland.com/google-on-penguin-algorithm-aims-to-ignore-spammy-links-but-can-lead-to-distrusting-your-site-375655)

**2.6 — Le « sandbox » prouvé par la fuite 2024 ? → Vérifié `contesté`.**
La fuite contient bien `hostAge` et `siteAuthority`. MAIS le texte exact dit que `hostAge` sert à « **sandbox fresh SPAM** » — un filtre anti-spam, **pas un sandbox généralisé de tout nouveau site** (Hobo : « There is NO Sandbox »). Le « 3-6 mois » n'apparaît dans **aucune** source de la fuite (heuristique terrain). **Reformulation honnête : monter en autorité prend du temps ; un site neuf ne doit pas s'attendre à ranker vite — sans présenter le délai comme une certitude documentée.**
- [Hobo — There is no Sandbox / hostAge](https://www.hobo-web.co.uk/there-is-no-sandbox-google-lies-black-hat-accusations-and-the-hostage-attribute/)

**2.7 — Vélocité : seuils chiffrés (3-5, 8-15 RD/mois) → Vérifié `contesté`.**
L'esprit (progressif, pas de dump) est juste et consensuel. MAIS **John Mueller** : « It doesn't really matter how many or in which time » — seul le caractère non naturel compte. Les chiffres absolus sont une heuristique d'agence raisonnable, **pas une loi Google**. Les traiter comme des ordres de grandeur prudents, non comme un seuil de pénalité.
- [Search Engine Journal — Mueller on link velocity](https://www.searchenginejournal.com/google-link-velocity/331637/)

**2.8 — PBN : pros agressifs vs zéro-pénalité.**
**Julien Jimenez** (NextLevel) et **Paul Sanches** (SEO Hackers, grey/black hat) maîtrisent le PBN. Mais pour un domaine B2B neuf avec objectif **zéro pénalité**, le PBN est **à écarter explicitement** (cible historique #1 des pénalités, détection hosting/footprints améliorée). Profil de risque incompatible.

---

## 3. Stratégie recommandée pour claudepartners.fr (priorisée)

> Principe directeur retenu (consensus) : **contenu/topical authority d'abord → fondations → liens gagnés → achat sélectif minoritaire**. La pertinence thématique ET l'autorité réelle priment ; la vélocité reste progressive ; tout lien payant est balisé `sponsored`.

### Priorité 1 — Topical authority + maillage interne (gratuit, zéro risque, le plus durable)
Avant tout netlinking externe, consolider le cluster pilier/cluster sur le cœur de niche : **IA + marketing pour OF, Qualiopi, automatisation OF, SEO/SEA pour OF**. Le pillar Qualiopi déjà publié est le socle.
- Ancres internes exactes vers les pages cibles (levier sûr, §1.6), 3-5 liens internes contextuels/article, ancres qui nomment l'entité.
- Intégrer les entités associées (Qualiopi, CPF, France Travail, BPF, OPCO, Make, Claude) pour densifier le maillage sémantique (co-occurrence).
- **Pourquoi #1 :** seul levier où l'on peut utiliser de l'exact-match sans aucun risque, et c'est ce qui rend tout backlink ultérieur plus efficace.

### Priorité 2 — Fondations / liens fondateurs (mois 1-2)
Google Business Profile, LinkedIn entreprise + profil nominatif Julien, citations NAP cohérentes, annuaires **sérieux et thématiques** : registres d'organismes de formation, écosystème Qualiopi/certificateurs, annuaires B2B/conseil légitimes. Profil d'ancres dominé par la marque + URL nue. Objectif : valider l'entité « Claude Partners ».

### Priorité 3 — Page auteur / E-E-A-T (continu)
Page auteur détaillée de Julien (expérience first-hand réelle = le « E » qui différencie d'un contenu IA), bio, preuves, HTTPS, mentions légales. **Rappel vérifié (`contesté`)** : E-E-A-T n'est **pas un score ni un facteur de ranking direct** — c'est le cadre des Quality Rater Guidelines. Ne pas sur-investir dans des signaux cosmétiques sans contenu réellement expert.

### Priorité 4 — Linkable assets data-first (le moteur du reste)
Produire **1-2 actifs de données originales** propres à la niche, p. ex. *« Baromètre de l'IA dans les organismes de formation français »* ou *« Étude : impact de Qualiopi 2026 sur les OF »*. Données chiffrées + visuels embeddables = munition pour digital PR, broken link building **et** citations IA. C'est le format à plus haut ROI confirmé.

### Priorité 5 — Founder-led + citation d'expert (HARO/Featured/Qwoted)
Julien répond comme expert sous 4h sur des requêtes « IA en entreprise / formation pro / marketing B2B ». Plateformes : **Featured.com** (ex-HARO relancé avril 2025), **Qwoted**, **Help a B2B Writer**, **Source of Sources**. Tribunes, podcasts, interviews fondateur. Liens éditoriaux gagnés = sûrs + marque + E-E-A-T.
- ⚠️ HARO/Featured est aujourd'hui **pollué par les réponses IA** ; nécessite réactivité (<4h) et expertise réelle. Taux de placement ~5-25%.

### Priorité 6 — Digital PR ciblé presse verticale FR
Cibler **médias verticaux accessibles** plutôt qu'un grand média généraliste : presse de la formation pro/EdTech, Centre Inffo, Focus RH, blogs Qualiopi, communautés LinkedIn de responsables formation. Respecter les **codes culturels FR** (vérifié `high`) : pas de cold email transactionnel anglo-saxon — relation et crédibilité d'abord.

### Priorité 7 — Achat de liens sélectif, minoritaire, balisé (à partir du T2 seulement)
Une fois du contenu indexé et un socle gratuit en place. **Plateformes établies, jamais de PBN.** Démarrer par Semjuice (accompagnement) puis RocketLinks/Develink. Filtrer chaque spot (voir §5 + §8). **Lien contextuel in-content** sur site à trafic organique réel et thématique compatible. **Mention « article sponsorisé » + `rel="sponsored"` obligatoires** (conformité Google §1.4 ET droit FR §6).

> **Niche edits** : seulement sur pages hôtes déjà rankées avec ≥100 visites/mois (un lien sur page morte ne vaut presque rien). C'est la partie la plus exposée algorithmiquement — la garder minoritaire.

---

## 4. Stratégie d'ancres chiffrée

> ⚠️ **Statut des fourchettes ci-dessous.** La vérif classe le « consensus chiffré » comme `contesté` : ce sont des **fourchettes-cibles indicatives pour un profil mûr**, à valider contre les concurrents qui rankent, **et à NE PAS appliquer telles quelles à un domaine neuf**. Surveiller en **valeur absolue**, pas seulement en %, car en niche étroite le faible dénominateur fait basculer les ratios très vite.

### Ordre d'introduction par phase (le point le plus important pour un domaine neuf)

| Phase | Période | Ancres marque + URL nue + génériques | Exact-match externe | Partial / longue traîne |
|---|---|---|---|---|
| **Fondation** | Mois 1-3 | **~70-80% (voire 100% les 30 premiers jours)** | **0%** | Anecdotique |
| **Amorçage** | Mois 4-6 | ~65-75% | ≤2% | 15-25% |
| **Montée** | Mois 7-12 | ~60-70% | 1-5% (jamais >1% sur une même expression) | 15-25% |
| **Profil mûr** (cible stationnaire, 12+ mois) | M12+ | 55-65% | 5% max | 15-25% partial, 10-20% générique |

- **Plafond dur exact-match externe : 5% du profil total**, et **jamais >1% sur une même expression non-marque** (« conseil IA organisme de formation », « agence SEO formation »).
- **Privilégier le partial-match** (« accompagnement IA pour OF », « le cabinet spécialisé formation ») qui contient le mot-clé sans être exact.
- **Diversifier les variantes** plutôt que répéter : exact / partial / synonymes / longue traîne / marque+mot-clé (« Claude Partners, conseil IA pour OF »). La diversité naturelle est la meilleure protection (position Ahrefs).
- **Par type de page** (vérifié `medium`) : homepage ≤5% exact-match ; pages service 5-15% ; articles de blog tolèrent un peu plus en contexte éditorial. **Réserver les ancres optimisées aux liens sur les sites les plus forts** (règle SeoMix/Daniel Roch).
- **Cohérence ancre/page obligatoire** : une ancre qui ne décrit pas la page cible (anchorMismatch) peut être dévaluée.

**Source de calibration FR (`high`)** : Daniel Roch / SeoMix — « max ~5% d'ancres optimisées », diversifier, optimiser sur les meilleurs sites uniquement. [SeoMix — Campagne netlinking](https://www.seomix.fr/comment-creer-campagne-netlinking/)

---

## 5. Sources de liens à activer

### Tier 0 — Gratuit / fondateur (mois 1-2, zéro risque)
- Google Business Profile, LinkedIn entreprise + profil Julien.
- Citations NAP & annuaires **sérieux/thématiques** : registres d'OF, écosystème Qualiopi/certificateurs, annuaires B2B-conseil légitimes. (Éviter les annuaires de basse qualité, explicitement listés comme spam par Google — §1.3.)
- Récupération des **mentions de marque non liées** (« Claude Partners ») dès qu'elles circulent.

### Tier 1 — Éditorial gagné (continu, sûr, fort en marque)
- **Featured.com / Qwoted / Help a B2B Writer / Source of Sources** : citations d'expert (Julien).
- **Broken link building & pages ressources** sur sites Qualiopi/formation (opérateurs : sujet + « ressources utiles »/« liens utiles »).
- **Digital PR** adossé au baromètre/étude (§4 Priorité 4-6).
- **Guest posts UNIQUEMENT** sur sites **DR 30-40+** à trafic organique réel et thématiquement alignés (EdTech, RH/L&D, formation pro, transformation digitale, IA appliquée), avec contenu éditorial à forte valeur — **jamais** en volume sur fermes de contenu. (Vince Nero/BuzzStream : le Helpful Content Update a anéanti le trafic de beaucoup de fermes à guest posts.)
- **Partenariats de co-contenu non transactionnels** : webinaires/études conjointes avec éditeurs de logiciels formation, certificateurs, consultants complémentaires (RH, no-code).

### Tier 2 — Premium / plateformes FR (à partir du T2, minoritaire, balisé `sponsored`)
- Marché FR (constat `consensus_actuel`, usage `risqué` pour domaine neuf) : **Semjuice** (accompagnement, bon démarrage), puis **RocketLinks**, **Develink**, **Getfluence** (médias premium).
- **Spécificités FR à exiger** : lien contextuel dofollow… **balisé `rel="sponsored"`** + mention légale « article sponsorisé » ; page hôte déjà indexée et trafiquée ; thématique compatible.
- **Filtrer chaque spot avec Babbar** (Sylvain & Guillaume Peyronnet) — Host Trust, Host Value, Semantic Value et surtout la **« Force Induite »** (puissance réellement transmise entre deux pages thématisées). Le Trust Flow seul est jugé insuffisant/manipulable. [Babbar — amplifier le PageRank](https://freres.peyronnet.eu/comment-amplifier-le-pagerank-13)
- **Hiérarchie de valeur géo** (Sanches/Roch) : un lien FR pertinent > un lien international à fort DR non pertinent. Les liens institutionnels (.gouv.fr, CCI, .univ-*.fr) sont **non achetables** → à gagner par RP/partenariats.

### À écarter explicitement (voir §6)
PBN, achat de liens dofollow nu, link farming, guest posting de masse bas de gamme, « site reputation abuse »/parasite SEO, communiqués bon marché, domaines expirés rachetés.

---

## 6. Pièges & risques à éviter

**6.1 — Manual action « Unnatural links to your site ».** Le risque le plus grave. Un schéma flagrant sur un domaine neuf sans historique peut déclencher une revue manuelle ; récupération 3-6 mois (suppression + réexamen). [GSC — Manual actions](https://support.google.com/webmasters/answer/9044175)

**6.2 — Dévaluation SpamBrain = budget perdu.** L'argent dépensé en liens achetés détectés est neutralisé sans gain durable et **non récupérable**. Sur un domaine neuf, aucun « capital de confiance » à dévaluer : la dévaluation efface tout. (Et risque de **distrust** global, §2.5.)

**6.3 — Lien payant dofollow nu = schéma de liens.** Conformité Google (§1.4) **et** droit français : un contenu acheté est juridiquement une **publicité**. L'**ARPP** et la **loi influence n°2023-451 (9 juin 2023)** imposent la mention « Publicité »/« article sponsorisé » ; absence de mention = publicité trompeuse sanctionnable (DGCCRF). **Olivier Andrieu le corrige lui-même** dans sa vidéo N°217. → **`rel="sponsored"` + mention légale, systématiquement.**
> ⚠️ Correctif de vérif : la formule « acheter des liens = aucun risque judiciaire » (Andrieu N°216) est **inexacte** une fois l'obligation de divulgation prise en compte.

**6.4 — Sur-optimisation des ancres = signal #1 d'un profil artificiel.** Surtout sur un domaine jeune sans marque pour diluer. En niche étroite, quelques ancres exact-match de trop pèsent lourd en proportion → **surveiller en valeur absolue**.

**6.5 — Vélocité trop rapide / pic soudain.** Passer de 0 à des dizaines de liens d'un coup est le signal d'achat le plus évident. (Nuance vérifiée §2.7 : ce n'est pas la vitesse brute mais le caractère non naturel — mais sur un domaine neuf les deux se confondent.) Étaler dans le temps.

**6.6 — Empreinte (footprint).** Achat groupé sur les mêmes plateformes/réseaux. Diversifier les sources ; drip-feed.

**6.7 — Fermes de liens déguisées.** DR élevé mais 90% de pages dormantes / zéro trafic réel : liens sans valeur, parfois toxiques. **Filtre obligatoire : ratio de pages réellement trafiquées** (Alexandre Flament/deux.io).

**6.8 — Incohérence ancre/page (anchorMismatch)** : aligner systématiquement l'ancre sur le sujet réel de la page de destination.

**6.9 — Niche étroite = peu de donneurs thématiques.** Tentation de diluer vers des liens hors-sujet (« sans cohérence » = gains éphémères puis dévaluation). **Élargir intelligemment** (formation pro, marketing B2B, IA en entreprise) sans casser la pertinence ; ne jamais prendre du hors-sujet.

**6.10 — Sur-pilotage des ratios.** Forcer une distribution « parfaite » peut paraître non naturel (Ahrefs). Laisser le profil se construire, viser des fourchettes, pas des pourcentages au décimal.

**6.11 — Negative SEO.** Risque faible (Google ignore en général). **Ne pas courir au désaveu** (§1.5) ; surveiller GSC.

**À NE PAS faire (récapitulatif) :** PBN, dofollow nu payant, link farming, guest posts de masse 40-75€, communiqués bon marché, parasite SEO sur grands médias, domaines expirés, désaveu préventif.

---

## 7. Rythme / velocity mois par mois

> ⚠️ Chiffres = **ordres de grandeur prudents** (vérif `contesté` sur les seuils absolus), pas une loi Google. La régularité, la qualité, la pertinence et la diversité des ancres priment sur le respect au lien près.

| Mois | Focus principal | Nouveaux domaines référents (RD) | Ancres | Actions clés |
|---|---|---|---|---|
| **M1** | Topical authority + fondations | 0 backlink éditorial — fondations uniquement (GBP, LinkedIn, citations NAP, annuaires OF) | 100% marque/URL nue | Page auteur Julien ; finaliser cluster pilier ; GSC + suivi en place |
| **M2** | Fondations + 1er linkable asset | 1-3 (fondateurs/citations) | marque/URL nue | Lancer l'étude/baromètre ; inscriptions Featured/Qwoted |
| **M3** | Premiers liens gagnés | 3-5 | ~70-80% marque ; 0% exact | Réponses HARO/Featured ; premières mentions presse |
| **M4** | Digital PR + guest posts qualifiés | 3-5 | introduire partial 15-25% ; exact ≤2% | Pitch de l'étude ; 1-2 guest posts DR 30+ |
| **M5** | Mix gagné + 1er achat sélectif | 3-5 | partial 15-25% ; exact ≤2% | 1er achat Semjuice (balisé `sponsored`, filtré Babbar) |
| **M6** | Consolidation (~objectif ~15-25 RD qualifiés cumulés) | 3-5 | exact 1-5% (jamais >1%/expression) | Audit trimestriel #1 ; bilan profil |
| **M7-12** | Montée progressive (une fois >30 RD) | **8-15/mois** (ordre de grandeur agressif — rester prudent côté FR) | profil mûr §4 | 1-3 liens achetés qualifiés/mois + digital PR + founder-led continu |

- **Tenir un registre CSV** (domaine, DR, trafic réel, ancre, URL cible, type, payant ou non, balisage `rel`, date) — réutiliser la logique du skill `netlinking-ecole-naturo` (adaptée à une niche **non-YMYL**, donc un cran moins restrictive).
- **Remplir la période « sandbox de facto »** par contenu + fondations + digital PR, **pas** par l'achat massif.

---

## 8. KPI de suivi

**KPI de sécurité (priorité absolue — anti-pénalité)**
- **% exact-match externe** : alerte si >5% du profil total, ou si une seule expression non-marque approche 1%.
- **Velocity** : alerte si pic >2-3× le rythme du mois précédent sur un domaine encore <30 RD.
- **Ratio types de liens** : aucun type (guest post, sponsorisé…) >40-50% du profil.
- **Balisage `rel`** : 100% des liens payants/partenariats en `sponsored` (audit mensuel — un oubli requalifie en achat non conforme).
- **GSC — rapport « Actions manuelles »** : doit rester vide ; surveillance continue.
- **Qualité des donneurs** : % de spots achetés avec trafic organique réel + ≥30% de pages trafiquées (filtre anti-ferme).

**KPI d'autorité / progression**
- **Domaines référents (RD) qualifiés** cumulés (cible indicative ~15-25 à M6 ; >30 pour passer en phase montée). Compter les **RD**, pas les liens bruts.
- **Pertinence thématique** des donneurs (% de liens depuis formation/Qualiopi/RH-L&D/IA/marketing B2B).
- **Force Induite Babbar** moyenne des liens acquis (vs Trust Flow seul).
- **Liens gagnés vs achetés** : viser une majorité de gagnés/éditoriaux (un profil 100% acheté paraît artificiel).
- **Mentions presse / citations d'expert** (Featured/Qwoted/tribunes) par trimestre.

**KPI de résultat (indicatifs, à ne pas surinterpréter)**
- Premières impressions GSC : ~4-8 semaines (moyenne praticiens, **pas une garantie**).
- Trafic/positions : ~3-6 mois (niche étroite = plafond de volume limité → combiner avec SEA/cold email déjà en place).
- Indexation : les tout premiers liens servent surtout à déclencher crawl + indexation (Daniel Roch).
- **Citabilité IA / GEO** : apparitions dans AI Overviews / ChatGPT / Perplexity (les nofollow d'autorité presse y contribuent même sans jus SEO direct — Knowledge Graph).

---

### Synthèse en une phrase
Pour claudepartners.fr, le chemin le moins risqué et le plus durable est **topical authority + maillage interne d'abord, fondations ensuite, liens éditoriaux gagnés (founder-led + data) comme moteur, et achat de liens FR sélectif, balisé `sponsored` et minoritaire à partir du T2** — avec un profil d'ancres ultra-prudent (0% exact-match externe au démarrage, ≤5% à maturité), une vélocité progressive, et un filtrage qualité (trafic réel + Force Induite Babbar) sur chaque donneur.

---

## 9. Addendum — Audit SEO 2026 + rebrand (2026-06-19)

**Impact du rebrand « Claude Partners » → « Claude Agency » sur le netlinking.** La marque/entité de référence est désormais **Claude Agency** (cf. mémoire dédiée). Conséquences :
- **Ancre de marque** = « Claude Agency » pour tous les nouveaux liens/citations. NAP cohérent (nom identique partout).
- **À réconcilier (côté Julien — il détient les comptes)** : la fiche AnnuaireFormation et les candidatures guest post (Tree Learning, Digiformag) ont été soumises sous « Claude Partners ». Mettre à jour le nom affiché vers « Claude Agency » si possible, ou assumer une transition. Le **domaine reste `claudepartners.fr`** (inchangé).

**Quick win appliqué en autonomie (2026-06-19).** Le seul levier réellement automatisable sans Julien est la **fondation on-site / entité** (Priorité 1-3) :
- Entité **Organization** enrichie (`foundingDate`, `founder` lié au Person Julien Rayes, `knowsAbout`) → renforce le Knowledge Graph, support direct des citations IA (GEO).
- La citeabilité des articles (sources primaires, stats, tableaux, PR #7) est aussi un **citable asset** : des pages sourcées attirent plus de liens éditoriaux.

**Quick wins qui nécessitent Julien (comptes/identité — je ne crée pas de compte, règle établie) :**
1. **Page entreprise LinkedIn « Claude Agency »** (seul le profil perso est en `sameAs` Organization) → puis l'ajouter au `sameAs`.
2. **Inscriptions Featured.com / Qwoted** (citations d'expert founder-led, réponses < 4 h).
3. **Relancer** Tree Learning + Digiformag (candidatures du 06-15, en attente).
4. **Nouvelles citations/annuaires** thématiques (Entreprise-IA, Annuaire Qualiopi) sous « Claude Agency ».
5. **Baromètre IA des OF** = LE linkable asset data-first (Priorité 4) : il lui faut de vraies réponses (distribution LinkedIn/cold email/Make) — pas de données fabriquées.

> Cadence inchangée : ~2-4 liens/mois, fondations d'abord, 0 % exact-match externe au démarrage, tout lien payant balisé `sponsored` (T2 seulement).