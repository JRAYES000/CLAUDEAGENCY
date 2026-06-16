# Plan éditorial longue traîne — Claude Partners

> Cluster de contenu pour étoffer le SEO autour des douleurs opérationnelles des organismes de formation (OF) français.
> Marché : France (locId 2250), langue FR. Données Ubersuggest collectées le 2026-06-16 (snapshots métriques `updated_at` 2025-12 pour le volume/sd ; SERP datées dans chaque analyse).
>
> **Positionnement SEO** : le mot-clé « ia organisme de formation » a **0 volume**. L'angle d'entrée est donc la **douleur opérationnelle** (Qualiopi, convention, BPF, émargement, déclaration d'activité, gestion administrative) ; l'IA et l'automatisation sont présentées comme la **solution / le bénéfice**, jamais comme la requête cible.
>
> **Contrainte autorité** : domaine neuf (DA 1, 0 backlink, 0 mot-clé positionné). On vise en priorité une **difficulté SEO (sd) ≤ 25** et des SERP où les concurrents privés plafonnent à DA ~40, en évitant le frontal sur les têtes de requête trop dures.

---

## 1. Méthode

1. **Graines analysées** (`keyword_suggestions`, métriques inline volume + sd) : `convention de formation`, `qualiopi`, `indicateurs qualiopi`, `bpf organisme de formation`, `bilan pédagogique et financier`, `émargement formation`, `feuille d'émargement`, `logiciel organisme de formation`, `déclaration d'activité organisme de formation`, `numéro de déclaration d'activité`, `certificat de réalisation`, `règlement intérieur organisme de formation`, `livret d'accueil stagiaire`, `audit qualiopi`, `questionnaire satisfaction formation`, `développement des compétences`, `positionnement formation`.
2. **Volume + difficulté** : lus directement dans les réponses `keyword_suggestions` (champ `volume` et `sd` = SEO difficulty), pour économiser les appels (compte tier1, ~200 maj métriques/mois). Aucun appel redondant `keyword_overview`.
3. **Gagnabilité SERP** : 3 `serp_analysis` réalisées sur les cibles phares (`convention de formation`, `bilan pédagogique et financier`, `feuille d'émargement`) pour lire la **Domain Authority (DA) réelle des pages classées**.
4. **Anti-doublon** : les 20 articles déjà publiés (`app/src/content/blog/*.mdx`) ont été lus ; chaque sujet proposé ci-dessous est **nouveau ou un angle complémentaire** explicitement distinct de l'existant.
5. **Données réelles uniquement** : tous les chiffres ci-dessous sont des relevés Ubersuggest, rien n'est inventé. `google_suggestions` était systématiquement en HTTP 429 (rate limit compte) — non utilisé ; compensé par des graines `keyword_suggestions` ciblées.

`sd` = SEO difficulty (0-100). Volume = recherches mensuelles France.

---

## 2. Articles déjà publiés (à NE PAS reproposer)

audit-surveillance-qualiopi · automatiser-bpf-organisme-formation · automatiser-emargement-suivi-stagiaires · automatiser-qualiopi-ia · convention-de-formation · creer-organisme-formation · creer-supports-formation-ia · externaliser-marketing-organisme-formation · financer-formation-opco-cpf-france-travail · indicateurs-qualiopi · integrer-ia-organisme-formation · logiciel-organisme-formation · optimisation-site-organisme-formation · programme-de-formation · qualiopi-guide-organisme-formation · reduire-charge-administrative-organisme-formation · referencer-formation-mon-compte-formation · remplir-sessions-formation · sea-google-ads-organisme-formation · seo-organisme-formation

Les sujets ci-dessous comblent des **trous documentaires** (documents obligatoires, démarches administratives, modèles) ou apportent un **angle informationnel/template** là où l'existant ne couvre qu'un angle « automatisation ».

---

## 3. Plan priorisé (TOP 15)

Services Claude Partners disponibles pour le maillage : **Automatisation des process**, **Audit & diagnostic IA**, **Outils IA sur mesure**, **Formation des équipes à l'IA**, **Optimisation de site**, **SEO**, **SEA**.

| # | Sujet d'article proposé | Requête cible | Vol. | sd | Intention | Gagnabilité SERP (DA concurrents) | Service à mailler | Angle douleur → IA |
|---|---|---|---|---|---|---|---|---|
| 1 | Feuille d'émargement de formation : modèle Word/PDF + valeur légale | feuille d'émargement | **3600** | 20 | Info + transactionnel (modèle) | **Bon.** SERP vérifiée : concurrents privés digiforma DA40, yousign DA50, edusign DA36, quali-sante DA24, victorias DA37 ; reste = dictionnaires/govt à faible intention. Gagnable avec un modèle + section légalité. | Automatisation des process | Émargement papier = preuve fragile et chronophage → émargement numérique + relances automatiques |
| 2 | Numéro de déclaration d'activité : à quoi il sert, comment l'obtenir et le vérifier | numéro de déclaration d'activité | **1000** | 7 | Informationnel/démarche | **Très bon.** sd 7, peu de concurrence privée structurée. | Automatisation des process | Démarche admin opaque → checklist + suivi de dossier assistés |
| 3 | Bilan pédagogique et financier : guide pour le remplir (Cerfa, MAF) | bilan pédagogique et financier | **1300** | 5 | Informationnel/démarche | **Moyen-bon.** SERP vérifiée : dominée par govt (service-public DA92, travail-emploi DA73) mais 1 seul privé fort (digiforma DA40). Viser l'angle « comment remplir » (les pages govt sont des formulaires bruts). Complémentaire de l'article « Automatiser le BPF » existant. | Automatisation des process | Ressaisie des chiffres = erreurs + stress de l'échéance → consolidation automatique des données |
| 4 | Certificat de réalisation : modèle et obligations | certificat de réalisation | **590** | 13 | Info + modèle | **Bon.** sd 13, document obligatoire OPCO peu traité en profondeur côté privé. | Automatisation des process | Génération manuelle session par session → édition automatisée des certificats |
| 5 | Audit Qualiopi : comment se préparer (initial vs surveillance) | audit qualiopi | **480** | 29 | Informationnel | **Moyen.** sd 29 (au-dessus du seuil 25) ; angle initial distinct de l'article « audit de surveillance » existant. À traiter une fois l'autorité acquise. | Audit & diagnostic IA | Préparation des preuves = panique avant l'audit → dossier de preuves tenu en continu |
| 6 | Questionnaire de satisfaction de formation : modèle et indicateurs | questionnaire satisfaction formation | **110** | 16 | Info + modèle | **Bon.** sd 16. Lié à l'indicateur Qualiopi (appréciation). | Outils IA sur mesure | Dépouillement manuel des retours → synthèse automatique + verbatims |
| 7 | Livret d'accueil du stagiaire : que doit-il contenir (+ modèle) | livret d'accueil stagiaire | **70** | 13 | Info + modèle | **Bon.** sd 13 (variante sans apostrophe sd 5). Document Qualiopi peu couvert. | Outils IA sur mesure | Réécriture à chaque session → génération personnalisée du livret |
| 8 | Règlement intérieur d'un organisme de formation : obligations + modèle | règlement intérieur organisme de formation | **30** | 8 | Info + modèle | **Très bon.** sd 8. Document obligatoire, faible concurrence. | Outils IA sur mesure | Document figé/non à jour → trame générée et maintenue à jour |
| 9 | Déclaration d'activité d'un organisme de formation : procédure pas à pas | déclaration d'activité organisme de formation | **30** | 6 | Démarche | **Très bon.** sd 6. Renforce le cluster « créer un OF » (lien interne fort). | Automatisation des process | Première démarche décourageante → accompagnement + suivi de dossier |
| 10 | RNQ : qu'est-ce que le Référentiel National Qualité (lien avec Qualiopi) | rnq qualiopi | **210** | 21 | Informationnel | **Moyen-bon.** sd 21. Entrée latérale vers le cluster Qualiopi sans frontal sur « qualiopi » (sd 47). | Audit & diagnostic IA | Référentiel jugé abscons → décryptage indicateur par indicateur + preuves |
| 11 | OPCO et Qualiopi : ce que la certification change pour le financement | opco qualiopi | **50** | 22 | Informationnel | **Moyen-bon.** sd 22. Croise financement (article OPCO/CPF existant) et Qualiopi. | Audit & diagnostic IA | Conditionnalité du financement mal comprise → diagnostic d'éligibilité |
| 12 | BPF : qui doit le déposer et dans quels délais | bpf organisme de formation | **30** | 6 | Démarche | **Très bon.** sd 6. Angle « obligation/échéance » complémentaire de l'article automatisation BPF. | Automatisation des process | Échéance oubliée = sanction → rappels et pré-remplissage automatiques |
| 13 | Certification RNQ : étapes pour l'obtenir | certification rnq | **90** | 18 | Informationnel | **Bon.** sd 18. Variante « certification rnq qualiopi » sd 13. | Audit & diagnostic IA | Parcours de certification flou → feuille de route + preuves prêtes |
| 14 | Convention vs contrat de formation : quelle différence, quel document utiliser | (longue traîne convention) | n/a* | bas | Informationnel | **Bon** (cf. SERP convention : privés digiforma DA40, valsoftware DA31, ppf DA22). Angle comparatif complémentaire de l'article « convention de formation » existant. | Automatisation des process | Mauvais document = non-conformité → génération du bon document selon le client |
| 15 | Logiciel de gestion d'organisme de formation continue : critères de choix | logiciel organisme de formation continue | 10 | 5 | Transactionnel | **Très bon** mais volume faible. Variante longue traîne de l'article « logiciel OF » existant ; à traiter comme section/angle plutôt qu'article autonome si besoin de prioriser. | Outils IA sur mesure / Automatisation | Empilement d'outils → brique IA sur-mesure qui relie l'existant |

\* La requête tête « convention de formation » (720-880 vol, sd 14) a **déjà un article publié** ; le #14 propose l'angle comparatif longue traîne non couvert.

---

## 4. Verdict gagnabilité — synthèse des 3 SERP analysées

- **`convention de formation`** : tête dominée par le govt (DREETS DA39-53, préfectures DA64, code.travail DA63) mais à faibles clics ; concurrents privés accessibles (digiforma DA40, valsoftware DA31, ppf-conseil DA22). Article déjà publié → exploiter via angles longue traîne (#14).
- **`bilan pédagogique et financier`** : SERP très institutionnelle (service-public DA92, travail-emploi DA73, MAF DA62) ; **un seul** acteur privé bien classé (digiforma DA40). Le sd 5 sous-estime la difficulté réelle de la tête ; viser l'intention « **comment remplir / délais / qui** » (#3, #12) plutôt que la définition brute.
- **`feuille d'émargement`** : **la meilleure opportunité volume×accessibilité**. 3600 vol, concurrents privés DA24-50, le reste de la SERP étant des pages à faible intention (dictionnaires, académies). Un article « modèle + valeur légale + numérisation » est clairement gagnable (#1).

---

## 5. Requêtes écartées (et pourquoi)

| Requête | Donnée | Raison de l'écart |
|---|---|---|
| `qualiopi` | 22 200 vol, **sd 47** | Trop dur en frontal pour un DA 1. On l'attaque par satellites (RNQ, OPCO+Qualiopi, audit, indicateurs). |
| `ia organisme de formation` | **0 volume** | Pas de demande de recherche → ne peut pas être une cible SEO ; reste le bénéfice mis en avant *dans* les articles. |
| `audit certification qualiopi` | 10 vol, **sd 35** | Volume marginal et difficulté élevée. |
| `webinar qualiopi` | 10 vol, sd 37 | Hors sujet éditorial + difficulté élevée. |
| `développement des compétences` | 480 vol, sd 15 | Gagnable mais **intention RH générique**, hors douleur opérationnelle OF → faible pertinence de conversion. |
| `positionnement formation` | 20 vol, sd 19 | Volume trop faible / ambiguïté sémantique. |
| `facforpro convention de stage` | 20 vol, sd 25, **pd 66** | Requête de marque concurrente + convention de *stage* (hors périmètre OF). |
| `convention de stage *` (cap petite enfance, anglais pdf) | 10 vol | Intention « stage étudiant », hors cible OF. |
| `iperia questionnaire satisfaction` | 10 vol | Requête de marque, volume marginal. |

---

## 6. Recommandation de séquencement

1. **Vague 1 (quick wins, sd ≤ 13, fort volume ou démarche)** : #1 feuille d'émargement, #2 numéro de déclaration d'activité, #4 certificat de réalisation, #9 déclaration d'activité, #12 BPF qui/quand. → construit l'autorité du cluster « documents & démarches obligatoires ».
2. **Vague 2 (modèles & satellites Qualiopi)** : #3 remplir le BPF, #6 questionnaire satisfaction, #7 livret d'accueil, #8 règlement intérieur, #13 certification RNQ, #14 convention vs contrat.
3. **Vague 3 (une fois quelques backlinks/positions acquis)** : #5 audit Qualiopi (sd 29), #10 RNQ, #11 OPCO+Qualiopi.

Chaque article doit mailler vers le service Claude Partners indiqué et vers les articles piliers existants (`qualiopi-guide-organisme-formation`, `convention-de-formation`, `logiciel-organisme-formation`, `reduire-charge-administrative-organisme-formation`) pour renforcer le cocon sémantique.
