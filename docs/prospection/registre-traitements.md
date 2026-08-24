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
| Données traitées | Nom du décideur, organisme, SIRET, région, thématique, téléphone et e-mail professionnels le cas échéant — aucune donnée sensible |
| Destinataires | Équipe Claude Agency ; Saleshandy comme sous-traitant technique d'envoi |
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

**Correction par rapport à la tâche D14 (Sheet) :** la tâche décrivait la source comme
`moncompteformation.gouv.fr`. Vérification faite sur le fichier réellement utilisé
(`docs/prospection/liste-100-of.csv`, colonne `source`) : la source effective est
`recherche-entreprises.api.gouv.fr`, cohérente avec `docs/PLAN-SOLOHERY.md` (même source citée pour
les mentions légales du site). Aucune trace de `moncompteformation.gouv.fr` dans le dépôt. Cette
ligne documente la source réelle, pas celle annoncée dans la tâche.

Aucun fichier acheté, aucune donnée aspirée sur LinkedIn hors des règles du site — conforme à
l'interdiction de D14.
