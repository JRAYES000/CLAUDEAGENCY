# Chantier G — Site, conversion et preuve · tâches délégables à SOLOHERY

> Établi le **14/08/2026**, après relecture complète du site (code source du dépôt, qui est ce qui
> est déployé) et relevé Ubersuggest du jour.
>
> **Ce document complète le sprint en cours, il ne le remplace pas.** Les 66 tâches des chantiers
> A à F (autorité, LinkedIn, SEO, prospection, netlinking payant) vivent dans le Google Sheet
> « Plan d'action SOLOHERY ». Les tâches ci-dessous en sont **absentes** : elles traitent ce que le
> sprint ne couvre pas — la mesure, la preuve client et la conversion.
>
> Méthode et règles générales : [`PLAN-SOLOHERY.md`](./PLAN-SOLOHERY.md). Mémoire SEO :
> [`seo/JOURNAL.md`](./seo/JOURNAL.md), [`seo/BACKLOG.md`](./seo/BACKLOG.md).

---

## 1. Ce que dit l'analyse du site

### Ce qui est déjà bon — ne pas y toucher

L'audit mécanique ne trouve rien à corriger sur l'hygiène de base, et c'est rare :

| Contrôle | Résultat au 14/08/2026 |
| :--- | :--- |
| `title` > 70 caractères | **0** article sur 54 |
| `description` > 160 caractères | **0** |
| Article sans image de couverture | **0** |
| Articles orphelins (aucun lien interne entrant) | **2** (voir G5) |
| `robots.txt` | Ouvert aux bots IA (GPTBot, ClaudeBot, PerplexityBot…) — cohérent avec la stratégie de citation |
| Sitemap | `lastmod` réel par article, pages `noindex` exclues |
| Formulaires | Contact, diagnostic et lead magnet fonctionnels, anti-spam en place |
| Encart de conversion dans les articles | Inséré automatiquement avant le 3ᵉ H2 des articles longs |

**Conclusion : le problème du site n'est pas technique, et il n'est pas éditorial.**

### Les trois vrais manques

**1 — On ne mesure aucune conversion. C'est le plus grave, et personne ne l'a vu.**

Quatre événements de conversion sont bien écrits dans le code — `Contact Form Submit`,
`Diagnostic Submit`, `Lead Magnet Submit`, `Calculator Used` — mais tous les quatre appellent
`window.plausible(...)`, **et Plausible n'est chargé nulle part sur le site** (vérifié : aucune
occurrence de `plausible.io` ni de `data-domain` dans tout le dépôt). Ces quatre appels ne font
donc strictement rien.

GA4 (`G-6SG03DR5J9`), lui, est bien chargé — mais il ne reçoit **aucun événement personnalisé** :
le seul `gtag('event', …)` du site envoie une conversion à Google Ads, pas à GA4.

Traduit en clair : **aujourd'hui, si quelqu'un remplit le formulaire de contact ou le diagnostic,
rien ne l'enregistre nulle part.** Impossible de dire combien de visiteurs se transforment, ni
quelle page transforme. Toute discussion sur « le taux de transformation du site » est, en l'état,
une discussion sans chiffres. → **G1, à faire en premier.**

**2 — Zéro preuve client sur tout le site.**

Aucun témoignage, aucun logo client, aucun avis, aucune étude de cas nommée. La seule preuve
affichée est celle de l'organisme de formation interne (« +3 M€ de CA ») et le portrait du
fondateur. C'est honnête, mais un dirigeant qui hésite cherche un pair qui a déjà signé, pas une
promesse. → **G6, G7, G8.**

Or **la page `/semaine-offerte/` est exactement la machine à fabriquer cette preuve** : une semaine
de travail offerte contre un témoignage vidéo sous 30 jours et un avis Google. La page est écrite,
aboutie, et… en `noindex`, reliée à rien. Elle n'existe que si quelqu'un envoie son lien. → **G7.**

**3 — L'autorité reste à zéro, comme prévu.**

Relevé Ubersuggest du 14/08/2026 : **0 backlink, 0 domaine référent, autorité 1/100**,
3 mots-clés positionnés, ~1 visiteur organique par mois. Une seule requête sort : « agence claude »,
position 19. Rien n'a bougé depuis le 12/08 — c'est normal, la vague 1 vient d'être lancée.

**Ce chiffre commande l'ordre des priorités : les tâches ci-dessous ne remplacent pas le chantier A,
elles viennent après ou en parallèle sur les temps morts.**

---

## 2. Les tâches, prêtes à coller dans le Sheet

Format identique aux onglets existants. Trois niveaux : 🔴 à faire dans le sprint,
🟡 après le 27/08, ⚪ quand le reste tourne.

### Axe 1 — Améliorer le site

| ID | Prio | Tâche | Comment faire | Livrable | Critère de validation | Durée |
| :-- | :-: | :--- | :--- | :--- | :--- | :-- |
| ~~**G1**~~ | ✅ | ~~**Brancher la mesure des conversions**~~ — **fait le 14/08/2026 (code)**, il ne reste qu'un geste dans l'interface GA4 : marquer les 5 événements comme **événements clés** (Admin → Événements). Détail : entrée du 14/08 (soir) dans `seo/JOURNAL.md`. | Les 4 appels `window.plausible(...)` (dans `ContactForm.astro`, `DiagnosticForm.astro`, `LeadMagnet.astro`, `TimeSavingsCalculator.astro`) ne mènent nulle part. Les remplacer par des `gtag('event', 'nom_evenement')` — GA4 est déjà chargé, c'est gratuit et il n'y a rien à installer. Puis, dans GA4 → Admin → Événements, marquer les 4 comme **conversions**. | 4 événements GA4 : `contact_submit`, `diagnostic_submit`, `lead_magnet_submit`, `calculateur_utilise` | Je remplis le formulaire de contact sur le site en ligne, et je vois l'événement apparaître dans GA4 « Temps réel » en moins de 5 minutes | 1 h |
| **G2** | 🔴 | **Retirer le lien « Admin » du menu public** | `Header.astro` affiche un lien « Admin » vers `reporting.claudeagency.fr` dans le menu du site, version bureau **et** mobile. Tous les visiteurs le voient. Le retirer des deux endroits. | Menu sans « Admin » | Le mot « Admin » n'apparaît plus sur `claudeagency.fr` (bureau + téléphone) | 15 min |
| **G3** | 🔴 | **Compléter les coordonnées de la page contact** | La page `/contact/` ne donne qu'un e-mail. Le code porte même un commentaire « ajouter ici LinkedIn / téléphone quand disponibles ». Ajouter le **07 56 81 34 44** et le lien de la page LinkedIn entreprise, écrits **exactement** comme sur les fiches d'annuaire (règle NAP de la tâche A1), et ajouter l'URL LinkedIn au `sameAs` du JSON-LD. | Page contact complète | Le téléphone et l'adresse affichés sur `/contact/` sont identiques, caractère pour caractère, à ceux de la fiche Google (A2) | 30 min · dépend de B1 |
| **G4** | 🟡 | **Mettre les réseaux dans le pied de page** | Le pied de page ne contient aucun lien social. Ajouter LinkedIn entreprise (et YouTube si G15 se fait). | Pied de page avec liens sociaux | Le lien est cliquable depuis n'importe quelle page et ouvre la bonne page LinkedIn | 20 min · dépend de B1 |
| **G5** | 🟡 | **Raccrocher les 2 articles orphelins** | `cas-usage-claude-organisme-formation` et `meilleure-agence-ia-organisme-formation` ne reçoivent **aucun lien** depuis les autres articles. Les inclure dans le lot de la tâche C3. **À la main, jamais par script** (incident du 03/07 : 62 articles vidés). | 2 à 3 liens entrants vers chacun | Chacun des 2 articles reçoit au moins 2 liens depuis des articles différents | 45 min |
| **G6** | 🟡 | **Tester tout le parcours depuis un téléphone** | Sur un vrai téléphone, pas un simulateur : accueil → service → article → diagnostic → envoi du formulaire → page de remerciement. Noter tout ce qui gêne (texte coupé, bouton trop petit, champ qui saute, calendrier illisible). | Liste des problèmes avec captures | La liste existe et chaque point est soit corrigé, soit noté « accepté » avec la raison | 1 h |

### Axe 2 — Améliorer le taux de transformation

| ID | Prio | Tâche | Comment faire | Livrable | Critère de validation | Durée |
| :-- | :-: | :--- | :--- | :--- | :--- | :-- |
| **G7** | 🔴 | **Faire vivre la page « semaine offerte »** | La page `/semaine-offerte/` est écrite et aboutie, mais personne ne la voit : elle est en `noindex` et aucun lien n'y mène — c'est voulu, elle est faite pour être **envoyée**. La mettre dans : le 3ᵉ e-mail de la séquence Saleshandy (chantier D), les messages LinkedIn de la tâche D6, et la signature d'e-mail. Elle reste `noindex` : ce n'est pas une page publique. | Lien intégré aux 3 canaux | Le lien `/semaine-offerte/` apparaît dans la séquence Saleshandy et dans le message LinkedIn type | 45 min · dépend de D4 |
| **G8** | 🟡 | **Obtenir 3 témoignages clients et les publier** | Cible : les clients déjà accompagnés + les 3 premières « semaines offertes ». Format : 3 phrases écrites, prénom, fonction, nom de l'organisme, photo si possible. Les publier dans un bloc « Ils nous font confiance » sur l'accueil, sous la section « La preuve », et sur les pages services concernées. | Bloc témoignages en ligne | 3 témoignages nominatifs visibles sur l'accueil, avec l'accord écrit de chaque personne | 3 h |
| **G9** | 🟡 | **Aller chercher 5 avis Google** | La fiche Google (A2) sans avis ne convertit pas — un dirigeant qui cherche « agence IA formation » compare des étoiles. Demander un avis à chaque client accompagné, par message personnel, jamais en masse. Ne jamais rédiger l'avis à leur place. | 5 avis publiés | La fiche affiche au moins 5 avis et une note visible | 2 h · dépend de A2 |
| **G10** | 🟡 | **Vérifier que la séquence du lead magnet part vraiment** | `docs/lead-magnet-emails.md` décrit une séquence e-mail après le téléchargement des « 10 automatisations ». Vérifier qu'elle est réellement branchée et qu'elle part. Test : s'inscrire avec une adresse personnelle et attendre. Une adresse collectée sans rien derrière est une adresse perdue. | Compte rendu du test | J'ai reçu le PDF **et** le premier e-mail de suite dans ma boîte | 1 h |
| **G11** | ⚪ | **Une page « Combien ça coûte »** | Le site promet « 3 à 4× moins cher » sans jamais donner un seul ordre de grandeur, et la FAQ répond « ça dépend du périmètre ». C'est le premier réflexe d'un dirigeant. Publier des fourchettes « à partir de », par prestation. **Décision de Julien avant rédaction** — c'est un arbitrage commercial, pas une tâche déléguée. | Section tarifs sur `/services/` | Un visiteur trouve un ordre de grandeur en moins de 30 secondes depuis l'accueil | — |

### Axe 3 — Améliorer la notoriété

| ID | Prio | Tâche | Comment faire | Livrable | Critère de validation | Durée |
| :-- | :-: | :--- | :--- | :--- | :--- | :-- |
| **G12** | 🟡 | **Un « post preuve » par mission livrée** | En plus des 10 posts du chantier B (tirés des articles) : après chaque mission, un post qui raconte un cas réel — la situation de départ, ce qui a été fait, le temps gagné, avec l'accord du client. C'est le format qui fait signer, pas les posts pédagogiques. | 1 post par mission | Au moins 1 post « cas réel » publié dans le mois | 1 h / post |
| **G13** | 🟡 | **Se faire inviter dans 3 podcasts ou newsletters du secteur** | Cibles : podcasts et newsletters de la formation professionnelle francophone (Digiformag est déjà en A9). Faire la liste des 10 candidats, vérifier qu'ils reçoivent des invités, envoyer un message personnel avec 3 sujets proposés. Un passage = un backlink thématique **et** une audience déjà réunie. | Liste de 10 + 10 messages envoyés | Au moins 1 réponse positive obtenue | 3 h |
| **G14** | 🟡 | **Répondre dans les groupes où les OF sont déjà réunis** | Groupes LinkedIn et Facebook de dirigeants d'organismes de formation. 3 réponses utiles par semaine, sur des questions Qualiopi / BPF / administratif — le sujet des articles déjà écrits. Aucune promotion : on répond, on signe de son nom, le profil fait le reste. | 3 réponses / semaine | 12 réponses publiées sur 4 semaines, notées dans le Sheet | 30 min / semaine |
| **G15** | ⚪ | **5 vidéos utilitaires (voir l'arbitrage §3)** | Pas une « chaîne » : 5 à 8 démonstrations d'écran de 5 à 8 minutes tirées des articles les mieux placés (BPF, émargement, Qualiopi). À intégrer dans les articles correspondants et dans les e-mails de prospection. Rythme maximum : 1 vidéo toutes les 2 semaines. | 5 vidéos en ligne | Les 5 vidéos sont intégrées dans 5 articles du site | — |

---

## 3. Instagram et YouTube — arbitrage du 14/08/2026

Question posée par Julien le 14/08/2026. **Réponse tranchée ici pour qu'elle ne soit pas
reposée dans trois mois.**

### Instagram — non

Quatre raisons, dans l'ordre d'importance :

1. **La cible n'y est pas en contexte professionnel.** L'acheteur est un dirigeant ou un
   responsable d'organisme de formation. Il choisit un prestataire depuis LinkedIn, une
   recommandation ou une recherche Google — pas depuis Instagram, où il regarde autre chose.
2. **Le coût de production est le plus élevé de tous les canaux**, pour la durée de vie la plus
   courte : un post disparaît en 48 h, ne se recherche pas et ne pose aucun lien cliquable.
3. **Aucun effet sur le référencement.** Les liens y sont `nofollow` et le contenu n'est pas
   indexé par Google.
4. **Et surtout : la page LinkedIn entreprise n'existe même pas encore** (tâche B1, statut « à
   faire »). Ouvrir un deuxième canal avant d'avoir fait tourner le premier, c'est diviser par deux
   un effort déjà insuffisant. Un canal tenu bat trois canaux abandonnés.

*À réexaminer si — et seulement si — l'offre s'élargit un jour aux formateurs indépendants et
coachs qui vendent au grand public. Ce n'est pas le positionnement actuel.*

### YouTube — oui, mais pas une « chaîne »

La bonne question n'est pas « faut-il une chaîne YouTube » mais « faut-il des vidéos ». Réponse :
oui, sans le format « chaîne » — pas de rythme de publication à tenir, pas de miniatures à
soigner, pas d'algorithme à courtiser. **Une bibliothèque de 5 à 8 vidéos utilitaires**, et c'est
tout. Quatre bénéfices, dans l'ordre :

1. **La preuve, d'abord.** Les témoignages vidéo demandés en échange de la semaine offerte doivent
   bien être hébergés quelque part. YouTube en non-répertorié coûte 0 € et s'intègre proprement
   dans une page. C'est le vrai déclencheur.
2. **Des requêtes vidéo sans concurrence en France.** « remplir son BPF », « émargement
   dématérialisé », « indicateur 11 Qualiopi » : personne n'a fait ces vidéos en français.
   L'inverse exact du SEO texte, où le site part avec une autorité de 1/100 face à des sites
   installés.
3. **Une vidéo intégrée fait rester le lecteur sur la page** — signal favorable, et surtout un
   visiteur qui comprend mieux ce qu'on vend.
4. **Le contenu existe déjà.** Les 54 articles sont écrits : une vidéo, c'est un article lu à voix
   haute avec un partage d'écran. Aucune rédaction nouvelle.

**Condition, non négociable :** ne pas démarrer avant que le chantier LinkedIn (B) ait tourné
**quatre semaines pleines**. Premier jalon réaliste : mi-septembre, une vidéo toutes les deux
semaines, tirée des articles déjà les mieux placés.

### L'ordre des canaux, pour mémoire

**1. LinkedIn** (décidé, chantier B) → **2. E-mail de prospection** (chantier D) →
**3. Vidéos utilitaires** (G15, à partir de mi-septembre) → **4. Rien d'autre.**

---

## 4. Ce qu'il ne faut PAS faire — s'ajoute à la liste de `PLAN-SOLOHERY.md` §7

| Idée | Écartée le | Pourquoi |
| :--- | :--- | :--- |
| Ouvrir un compte Instagram | 14/08/2026 | Cible B2B absente du réseau en contexte professionnel, coût de production le plus élevé, aucun effet SEO, et la page LinkedIn entreprise n'est pas encore créée. Voir §3. |
| Ouvrir une « chaîne » YouTube avec un rythme de publication | 14/08/2026 | Les vidéos sont utiles (G15), le format « chaîne » ne l'est pas : il impose une charge hebdomadaire pour une audience qui n'est pas là. Bibliothèque utilitaire uniquement. |
| Installer Plausible pour mesurer les conversions | 14/08/2026 | GA4 est déjà chargé et déjà payé (gratuit). Ajouter un second outil de mesure, c'est un script de plus et deux chiffres qui ne concorderont jamais. Voir G1. |
| Rendre `/semaine-offerte/` indexable | 14/08/2026 | La page promet une prestation gratuite sans filtre. Indexée, elle attire des curieux ; envoyée à un prospect qualifié, elle convertit. Elle reste en `noindex`. |
| Écrire de nouveaux articles pour « améliorer le site » | 12/08/2026 | Déjà tranché : 54 articles, 0 backlink, autorité 1/100. Le blocage n'est pas le volume. |

---

*Sources : lecture du code de `app/src/` au 14/08/2026 (commit `f2cef7b`) ; audit mécanique des
54 articles (titres, descriptions, images, liens internes entrants) ; Ubersuggest
`domain_overview` + `backlinks_overview` du 14/08/2026 ; Google Sheet « Plan d'action SOLOHERY »
consulté le 14/08/2026 (66 tâches, 3 faites).*
