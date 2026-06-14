# Claude Partners — Améliorations acquisition (inspirées des concurrents) : document de conception (spec)

> Date : 2026-06-14
> Domaine : claudepartners.fr
> Statut : validé par Julien (déroulé approuvé), prêt pour le plan d'implémentation
> Périmètre retenu : **Scope B** — crédibilité + profondeur OF + une signature interactive (calculateur) + guide téléchargeable

---

## 1. Contexte & objectif

Le site Claude Partners est en ligne (Phases 0→6 livrées, refonte « audacieuse » faite). Il convertit aujourd'hui de façon **générique**. Objectif de cette itération : **augmenter la conversion et la crédibilité** en s'inspirant des meilleures idées de trois concurrents, **sans copier ce qui ne s'applique pas** à une entreprise qui démarre.

Concurrents analysés :
- **ia.agency** — généraliste, preuve par le volume (130 clients, logos, 8 témoignages, métriques partout), FAQ dense, roadmap chiffrée, charte éthique, llms.txt.
- **iaagence.fr** (Pulsar IA) — verticalisation par secteur, section douleur (étude Harvard), tableau comparatif, métaphore mémorable (Nespresso vs pièces détachées), garantie de résultat.
- **apsodia.com** — **le plus pertinent pour nous** : ton honnête (démystification « l'IA va-t-elle me remplacer ? »), **démos avant/après chiffrées** (« 45 min → 20 s »), accréditation d'État (« Osez l'IA »), formulaire de qualification progressive.

### Contraintes établies avec Julien (déterminantes)
- **0 client** aujourd'hui : aucun témoignage, logo ni étude de cas réels. Le site doit convaincre **sans preuve sociale de volume**.
- **Leviers de légitimité réels et utilisables** : ✅ expertise secteur OF/Qualiopi · ✅ « construit avec Claude/Anthropic » · ✅ ancrage local / réseau OF. ❌ pas d'accréditation d'État, ❌ pas de clients à citer.

### Critères de succès (priorités projet inchangées)
1. **SEO** (n°1) — chaque ajout doit créer du contenu indexable, riche en intentions de recherche du secteur OF.
2. **Simplicité + intégration Claude** (n°2) — rester statique, sans framework lourd, maintenable par Claude Code.

---

## 2. Insight stratégique (le pivot)

Les trois concurrents sont **généralistes** et compensent par le **volume de preuves**. Nous ne pouvons pas (et ne devons pas) copier ça. On **inverse leur logique** :

> Là où ils vont **large** et prouvent par le **volume**, on va **profond** et on prouve par la **spécificité + l'honnêteté**.

Un acteur tout neuf gagne la confiance en étant **incontestablement expert d'un seul monde** (les organismes de formation) et **honnête** (le ton d'Apsodia, le plus transposable des trois). La preuve sociale de volume est remplacée par : profondeur métier + transparence + visage du fondateur.

---

## 3. Périmètre

### Inclus (cette itération — Scope B)
1. Restructuration de la page d'accueil (11 sections, voir §4).
2. Section **Profils d'OF** (verticalisation) — la profondeur métier différenciante.
3. **Calculateur de temps gagné** (signature interactive).
4. Section **« Parlons franchement »** (démystification honnête).
5. Section **fondateur** (la preuve, à la place de la preuve sociale de volume).
6. **Guide téléchargeable** + page `/guide` (aimant à leads, levier SEO).
7. **FAQ étendue** (3 → ~8) + mise à jour du schéma FAQPage.
8. **Garde-fous honnêteté/contenu** appliqués partout.

### Exclu (reporté Phase 2 — noté, non construit ici)
- Pages SEO par profil d'OF (`/ia-pour-cfa`, `/ia-pour-organisme-qualiopi`…) — **le plus gros pari SEO**, à faire ensuite.
- Démo avant/après animée (le calculateur couvre déjà l'angle ROI).
- Tableau comparatif (« faire seul / agence généraliste / Claude Partners »).
- `llms.txt` / GEO + décision sur le blocage des bots IA Cloudflare.
- Articles de fond / leadership d'opinion.

---

## 4. Architecture de la page d'accueil (nouveau déroulé)

Ordre cible (l'actuel est Hero → Problème → Services → Méthode → Pourquoi → FAQ → CTA) :

| # | Section | État | Détail |
|---|---|---|---|
| 1 | **Hero** | Modifié | Garde la mise en page asymétrique. Affûte le sous-titre. Ajoute une **micro-ligne de crédibilité** sous les boutons : « Spécialiste des organismes de formation · Audit offert · Sans engagement ». |
| 2 | **Problème** | Inchangé | Déjà bon. |
| 3 | **Profils d'OF** | **NOUVEAU** | « Quel organisme êtes-vous ? » → 4 profils (voir §5). Blocs éditoriaux, pas de cartes. |
| 4 | **Services** | Inchangé | Liste éditoriale des 4 services. |
| 5 | **Calculateur de temps gagné** | **NOUVEAU (signature)** | Voir §6. |
| 6 | **Méthode** | Modifié | 3 temps + durées + « sans engagement » : *Diagnostic (audit offert, ~1 semaine) → Mise en place → Autonomie*. |
| 7 | **Parlons franchement** | **NOUVEAU** | 3 blocs honnêtes (voir §7). |
| 8 | **Pourquoi nous faire confiance** | Reformulé | Remplace les 3 blocs abstraits par une **vraie section fondateur** (voir §8). |
| 9 | **Guide gratuit** | **NOUVEAU** | Bandeau sobre → capture email → page `/guide` (voir §9). |
| 10 | **FAQ** | Étendu | 3 → ~8 questions (voir §10) + schéma FAQPage mis à jour. |
| 11 | **CTA final** | Inchangé | Bandeau terracotta. |

Contrainte design : respecter l'identité existante (crème `#F5EFE6` / terracotta `#CC785C` / encre `#2B2724`, Bricolage Grotesque + Schibsted Grotesk, style éditorial **sans grilles de cartes**, anti-slop). Réutiliser les classes/tokens déjà présents (`bg-cream-100`, `text-brand-600`, `font-display`, `border-sand`, etc.).

---

## 5. Section « Profils d'OF » (verticalisation — la force)

Titre : « Quel organisme êtes-vous ? » (ou « On parle votre langue »).
Quatre profils, chacun = un sous-titre + sa douleur précise + ce que l'IA change. Présentation éditoriale (liste/colonnes), pas de cartes décoratives.

| Profil | Douleur spécifique | Ce que l'IA change |
|---|---|---|
| **CFA / organisme multi-formations** | Volume de dossiers, suivi de cohortes, reporting financeurs. | Suivi et reporting semi-automatisés, réponses normalisées. |
| **OF indépendant / petite structure** | Tout repose sur 1-2 personnes ; l'admin mange le temps pédagogique. | Récupère des heures sur l'admin récurrent. |
| **Centre certifié Qualiopi** | Tenue des preuves toute l'année + audit de surveillance lourd (≈10 h, 3 000–4 000 € si externalisé). | Allège la **tenue des preuves au fil de l'année** → l'audit devient moins pénible. ⚠️ Claude Partners n'est **pas** un prestataire d'accompagnement d'audit Qualiopi. |
| **Formateur indépendant** | Création de supports, prospection, facturation, seul. | Supports plus vite, relances et devis assistés. |

> Garde-fou : formuler en « ce que l'IA **peut** changer » / « concrètement », jamais « ce qu'on **a fait** pour ». Aucune implication de client existant.
>
> Cadrage Qualiopi (validé Julien) : le chiffre « audit de surveillance ≈10 h / 3 000–4 000 € externalisé » sert de **contexte de douleur** réel pour le profil « centre Qualiopi ». On positionne l'IA comme ce qui **allège la tenue des preuves toute l'année** (donc rend l'audit moins pénible), **sans** prétendre remplacer l'accompagnement d'audit, qui est un métier distinct.

Bénéfice SEO : couvre les intentions « IA pour CFA », « IA organisme Qualiopi », « IA formateur indépendant » dès la home (et prépare les futures pages dédiées de Phase 2).

---

## 6. Calculateur de temps gagné (signature interactive)

### Intention
**Outil de conversion** : un dirigeant d'OF coche en ~10 secondes les tâches récurrentes qui lui prennent du temps **chaque mois**, et voit une estimation de **temps + € récupérables par mois**, puis un CTA vers l'audit. Rend le bénéfice **concret et personnel** au lieu d'un discours vague. Le calculateur mesure **uniquement du temps récurrent mensuel** (pas les événements périodiques type audit de surveillance).

### Composant
- Nouveau fichier : `app/src/components/TimeSavingsCalculator.astro`.
- **JS natif** dans un `<script>` d'îlot Astro — **aucun framework**, aucune dépendance externe. Reste 100 % statique/SSG.
- Dégradation gracieuse : sans JS, afficher la liste des tâches + un message « activez JavaScript pour l'estimation » + le bouton CTA (le contenu reste indexable).

### Fonctionnement
1. Le visiteur **coche les tâches chronophages** qui le concernent.
2. (Optionnel) saisit le **nombre de personnes** concernées.
3. Le résultat s'affiche **en direct** : **heures/mois** et **€/mois** économisés, sous forme de **fourchette** (basse → haute).
4. CTA contextuel : « Demander un audit offert pour valider ce potentiel ».

### Tâches & fourchettes (valeurs par défaut — `[À VALIDER PAR JULIEN]`, illustratives et ajustables)
| Tâche (libellé visiteur, en clair) | Heures gagnées / mois (fourchette) |
|---|---|
| Tenir à jour vos preuves & indicateurs **Qualiopi** (toute l'année) | 3 – 8 h |
| Créer & mettre à jour vos **supports de cours** | 4 – 10 h |
| **Suivi administratif** des stagiaires (convocations, attestations, émargements) | 3 – 6 h |
| **Emails & relances** (prospects, OPCO, financeurs) | 2 – 5 h |
| Rédiger **conventions, programmes, devis** | 2 – 5 h |
| **Veille** pédagogique / recherche de contenus | 1 – 4 h |

- **Coût horaire** par défaut : `35 €/h` (coût chargé indicatif, **validé par Julien**) — laissé fixe en MVP (option : petit champ éditable plus tard).
- **Calcul** : total = somme des fourchettes des tâches cochées. Le « nombre de personnes » applique un facteur **modéré** (pas une multiplication linéaire brute, pour rester crédible) — formule exacte = décision d'implémentation, défaut proposé : tâches « par personne » (suivi stagiaires, supports) scalées, tâches « structure » (Qualiopi, conventions) non scalées. En MVP, on peut se limiter à la somme simple + mention.

### Honnêteté (obligatoire)
- Libellé visible : **« Estimation indicative, à affiner lors de l'audit »**.
- Toujours une **fourchette**, jamais un chiffre unique faussement précis.
- Aucune mention « nos clients ont gagné… » (0 client).
- **Ne jamais** intégrer le coût d'un audit de surveillance Qualiopi (≈10 h / 3 000–4 000 € externalisé) comme une économie du calculateur : événement périodique + métier distinct. La ligne Qualiopi du calculateur = uniquement la **tenue récurrente des preuves**.

### Accessibilité
- Chaque case = `<label>` associé, navigable au clavier.
- Résultat dans une région `aria-live="polite"`.
- Contrastes conformes (tokens existants), focus-visible déjà en place.

---

## 7. Section « Parlons franchement » (démystification)

Ton honnête d'Apsodia. 3 blocs question → réponse nuancée (pas de promesse creuse) :
1. **« L'IA va-t-elle remplacer les formateurs ? »** → Non : elle enlève l'administratif et la production répétitive, le formateur garde la pédagogie et la relation.
2. **« Mes données (stagiaires) sont-elles en sécurité ? »** → Cadre RGPD, choix d'outils, données qui restent maîtrisées ; on en parle dès l'audit.
3. **« Faut-il être à l'aise avec la technique ? »** → Non : on prend la complexité en charge et on forme en langage clair (cohérent avec la FAQ existante).

Présentation éditoriale (dl/blocs), cohérente avec la FAQ.

---

## 8. Section fondateur (« Pourquoi nous faire confiance »)

Remplace les 3 blocs abstraits actuels (« Spécialistes / Orientés résultats / Vos équipes autonomes ») par une **preuve humaine**, car c'est le seul actif de confiance disponible à 0 client.

Contenu :
- **Photo / visage** du fondateur (Julien) — `[VISUEL À FOURNIR]`.
- **Bio courte et réelle** `[À COMPLÉTER PAR JULIEN]`, ancrée sur les 3 leviers validés :
  - expertise concrète des organismes de formation (Qualiopi, BPF, pédagogie, admin) ;
  - maîtrise de l'IA « construit avec Claude / écosystème Anthropic » (formulation **sobre**, voir garde-fou marque) ;
  - ancrage local / réseau dans le milieu de la formation.
- On peut **conserver** les 3 différenciateurs existants comme sous-points, mais rattachés au fondateur (pas en blocs flottants).

> Garde-fou marque : « construit avec Claude » doit rester factuel et discret ; « Claude » est une marque Anthropic → ne pas suggérer de partenariat officiel. Vigilance déjà notée au niveau du nom commercial.

---

## 9. Guide téléchargeable + page `/guide` (aimant à leads)

### Sur la home
Bandeau sobre (pas une pop-up) : titre « Guide : intégrer l'IA dans votre organisme de formation » + 1 phrase de bénéfice + champ email + bouton.

### Page `/guide`
- Nouvelle page `app/src/pages/guide.astro` : présentation du guide (sommaire, à qui il s'adresse, ce qu'on y apprend) + formulaire de capture.
- **Capture via Web3Forms** (même mécanisme que le formulaire de contact existant). Après soumission → page `/merci` existante (ou variante) + livraison du guide (lien de téléchargement / email).
- **Le contenu du guide (PDF/texte) est un livrable séparé** `[À PRODUIRE]` — la spec couvre la mécanique du site, pas la rédaction du guide. MVP possible : page indexable + capture, le PDF arrive ensuite.
- Bénéfice SEO : page de contenu riche sur l'intention « guide IA organisme de formation ».

> Garde-fou : si le PDF n'est pas prêt au lancement, la page peut annoncer « guide en cours / recevez-le en avant-première » — honnête, et capte quand même les emails.

---

## 10. FAQ étendue

Passer de 3 à ~8 questions (les concurrents en ont 9–13). Questions proposées (réutiliser/garder les 3 actuelles) :
1. Travaillez-vous uniquement avec des organismes de formation ? *(existant)*
2. Faut-il être à l'aise avec la technique ? *(existant)*
3. Comment démarrer ? *(existant)*
4. **Combien ça coûte / quel budget prévoir ?** (réponse honnête : audit offert, devis selon périmètre, sans engagement).
5. **Mes données et celles des stagiaires sont-elles protégées (RGPD) ?**
6. **L'IA est-elle compatible avec mes obligations Qualiopi ?**
7. **En combien de temps voit-on des résultats ?**
8. **Je suis formateur seul, est-ce que c'est pour moi aussi ?**
9. *(optionnel)* **IA générique (ChatGPT) vs outil sur mesure : quelle différence ?**

Mettre à jour l'objet `faqSchema` (JSON-LD FAQPage) dans `index.astro` en conséquence.

---

## 11. Garde-fous honnêteté / contenu (transverses, non négociables)

Parce que le site a **0 client** :
- **Aucune** formulation impliquant des clients/références existants (« nos clients », « ils nous font confiance », logos, chiffres de clients).
- **Tout chiffre** est étiqueté **fourchette / estimation / indicatif** (calculateur, profils, méthode).
- **Bio fondateur réelle** uniquement (placeholders `[À COMPLÉTER]` tant que non fourni — ne rien inventer).
- **« Construit avec Claude »** : factuel, sobre, sans suggérer de partenariat Anthropic officiel.
- Cohérence avec l'ADN du site : éditorial, langage clair, anti-slop, pas de marqueurs IA-par-défaut.

---

## 12. Fichiers impactés (vue d'implémentation)

| Fichier | Action |
|---|---|
| `app/src/pages/index.astro` | Restructuration : nouvelles sections (Profils, Calculateur, Parlons franchement, Fondateur, Guide), méthode enrichie, FAQ étendue + schéma. |
| `app/src/components/TimeSavingsCalculator.astro` | **Nouveau** composant signature. |
| `app/src/pages/guide.astro` | **Nouvelle** page aimant à leads. |
| `app/src/components/ContactForm.astro` | Réutilisation du pattern Web3Forms pour la capture `/guide` (ou composant dédié léger). |
| `app/src/pages/merci.astro` | Vérifier/adapter pour le cas « guide ». |
| Assets | Photo fondateur `[À FOURNIR]` ; éventuel visuel guide. |

---

## 13. Critères de succès & vérification

- Build Astro vert (aucune régression, pages existantes intactes).
- Page d'accueil suit le nouveau déroulé (11 sections), responsive, tokens respectés.
- Calculateur : fonctionne au clic/clavier, résultat en fourchette + mention « estimation indicative », dégradation gracieuse sans JS, `aria-live` opérationnel.
- Page `/guide` indexable, capture email fonctionnelle (Web3Forms), redirection après envoi.
- FAQ étendue + schéma FAQPage valide (test Rich Results).
- **Audit honnêteté** : aucune mention de client/preuve fictive ; tous les chiffres étiquetés ; placeholders réels marqués `[À COMPLÉTER]`.
- Lighthouse/Core Web Vitals non dégradés (SEO = priorité n°1).

---

## 14. Phase 2 (différé, pour mémoire)

1. **Pages SEO par profil d'OF** (`/ia-pour-cfa`, `/ia-pour-organisme-qualiopi`, `/ia-pour-formateur-independant`…) — plus gros levier SEO.
2. Démo avant/après animée.
3. Tableau comparatif (« faire seul / agence généraliste / Claude Partners »).
4. `llms.txt` / GEO + arbitrage blocage bots IA Cloudflare.
5. Articles de fond (leadership d'opinion).
6. Réintroduire la **preuve sociale réelle** (témoignages, logos, études de cas) dès les premières missions.
