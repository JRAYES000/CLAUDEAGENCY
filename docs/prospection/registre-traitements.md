# Registre des traitements — prospection commerciale B2B

Traitement tenu pour la campagne de prospection Claude Agency (sprint SOLOHERY, D14). Complète
`app/src/pages/confidentialite.astro`, qui couvre le site mais pas cette activité spécifique.

## Traitement

| Champ | Valeur |
| :--- | :--- |
| Responsable de traitement | BULGARIA EDUCATION EOOD, exploitant la marque Claude Agency — voir `/mentions-legales` |
| Finalité | Prospection commerciale B2B : présentation des services Claude Agency à des organismes de formation francophones |
| Base légale | Intérêt légitime (RGPD art. 6.1.f), dans le cadre des 3 conditions CNIL pour la prospection B2B |
| Personnes concernées | Dirigeants et responsables (pédagogique, administratif, qualité) d'organismes de formation |
| Données traitées | Nom du décideur, organisme, SIRET, région, thématique, téléphone et e-mail professionnels le cas échéant, adresse du profil LinkedIn public et l'élément public ayant motivé la prise de contact — aucune donnée sensible |
| Destinataires | Équipe Claude Agency ; sous-traitants : Saleshandy (envoi e-mail), Closely (envoi LinkedIn), Apify (vérification technique des adresses e-mail) |
| Conservation | 3 ans à compter du dernier contact sans réponse ; suppression immédiate en cas d'opposition |
| Sécurité | Fichiers de contacts exclus du dépôt public (`.gitignore` : `docs/prospection/*.csv`, `vague1-notes-linkedin.md`) |

**Les 3 conditions CNIL B2B, telles qu'appliquées ici :**
1. Le professionnel est informé que ses coordonnées professionnelles sont utilisées à des fins de
   prospection (mention dans la signature des e-mails, détail sur `/donnees-prospection`).
2. Il peut s'y opposer à tout moment et gratuitement — « répondez stop », traité le jour même (D13).
3. Le message porte sur son activité professionnelle (Qualiopi, BPF, émargement — voir
   `docs/prospection/ciblage.md`), jamais sur sa vie privée.

Droits d'accès, de rectification et d'opposition : `contact@claudeagency.fr`, ou la procédure
détaillée sur `/donnees-prospection`.

## Lots importés — source et date

| Lot | Source | Date d'extraction | Volume | Méthode |
| :--- | :--- | :--- | :--- | :--- |
| Vague 1 — organismes de formation | `recherche-entreprises.api.gouv.fr` (annuaire public des entreprises, données SIRENE) | 2026-08-20 | 100 lignes, dédoublonnées par SIRET (`docs/prospection/liste-100-of.csv`, non commité) | API publique du gouvernement, aucune donnée achetée |
| Vague 2 — décideurs d'organismes de formation, canal LinkedIn | Profils LinkedIn publics et contenus publiés ou signés publiquement (article de blog, page d'organisme, interview de presse) | depuis 2026-08-27 | registre `data/prospection-registre.csv` du dépôt `visibilite-ops`, segment `of` | Consultation de pages publiques ; envoi des demandes de connexion et messages par Closely |

**Correction par rapport à la tâche D14 (Sheet) :** la tâche décrivait la source comme
`moncompteformation.gouv.fr`. Vérification faite sur le fichier réellement utilisé
(`docs/prospection/liste-100-of.csv`, colonne `source`) : la source effective est
`recherche-entreprises.api.gouv.fr`, cohérente avec `docs/PLAN-SOLOHERY.md` (même source citée pour
les mentions légales du site). Aucune trace de `moncompteformation.gouv.fr` dans le dépôt. Cette
ligne documente la source réelle, pas celle annoncée dans la tâche.

Aucun fichier acheté — conforme à l'interdiction de D14. Sur LinkedIn, la collecte se limite à
la consultation de profils et de contenus publics ; aucune donnée n'est extraite d'une zone
réservée aux membres connectés d'un réseau.

**Les adresses e-mail de la vague 1 ne viennent pas de SIRENE.** L'annuaire public fournit
l'organisme, le SIRET et la région, pas les adresses : celles-ci ont été **déduites** du motif
`prénom.nom@domaine`, sans confrontation à un serveur. Taux de réussite mesuré le 2026-08-25 :
**18 %** (`visibilite-ops/recherche/2026-08-25-verification-liste-of.md`). C'est cette
formulation-là qui doit figurer sur `/donnees-prospection`, pas « coordonnées issues de SIRENE ».
