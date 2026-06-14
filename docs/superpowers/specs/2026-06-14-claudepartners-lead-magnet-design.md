# Lead magnet « 10 automatisations IA » — Design

- **Date** : 2026-06-14
- **Statut** : validé (en attente de revue finale Julien)
- **Objectif** : transformer le trafic blog (SEO-first) en emails qualifiés, puis en prospects, via un aimant téléchargeable et une séquence de nurture Mailjet.

## Décisions verrouillées

| Sujet | Décision |
|---|---|
| Aimant | PDF « Les 10 automatisations IA qui libèrent 1 jour/semaine dans un organisme de formation » |
| Capture / livraison | **Mailjet** (ESP déjà possédé par Julien) — approche A |
| Branchement | Formulaire **maison stylé** (charte Claude Partners) reprenant l'action + les champs du widget Mailjet ; **pas de backend, pas de clé secrète exposée** |
| Placement | Fin de **chaque article de blog** + **page d'atterrissage dédiée** |
| Nurture | PDF + séquence de **3 emails** (livraison, J+2 valeur, J+5 audit) |
| Plan Mailjet | **Phasé** : email de livraison d'abord (offres Mailjet inférieures) ; les 2 relances activées au passage **Premium (~27 $/mois)**. Les 3 emails sont rédigés dès maintenant. |
| Opt-in | **Double opt-in** (RGPD), case de consentement explicite |

## L'aimant (PDF)

Fichier statique : `public/ressources/10-automatisations-ia.pdf`. Mise en page à la charte (crème / terracotta / serif éditorial).

Structure : intro (le constat temps perdu) → 10 fiches → CTA final vers l'audit offert. Chaque fiche : **la douleur → l'automatisation → le temps gagné → l'outil**. Base de départ (à partir du bloc preuve de la home + cas d'usage existants) :

1. Relances administratives (émargements, satisfaction, complétion) — 2 h/jour → 2 h/mois
2. Comptes rendus de visioconférence — 2–3 h/semaine → 2–3 h/mois
3. Coaching commercial (agent IA après chaque appel de closing)
4. Création de tunnels de vente (lead magnets + séquences email) — 5–6 h → quelques minutes
5. Génération de supports de cours depuis le programme
6. Quiz / études de cas / corrigés adaptés au niveau
7. Dossier / audit de surveillance Qualiopi pré-rempli
8. Assistant IA qui répond aux stagiaires (entraîné sur l'offre)
9. Réunion → compte rendu + support automatiques
10. (À confirmer à la rédaction : ex. veille / réponses aux appels d'offres / facturation-relances de paiement)

Contenu rédigé par Claude (Julien valide).

## Architecture (approche A, sans backend)

Site statique Astro, même esprit que le `ContactForm.astro` actuel (POST vers un service externe + amélioration JS + event Plausible).

### Composants / fichiers
- **`src/components/LeadMagnet.astro`** (nouveau) — bloc CTA réutilisable + formulaire stylé.
  - Champs : `email` (requis), `prénom` (requis), `organisme` (optionnel), case de consentement (requise).
  - Action + noms de champs + jetons cachés = ceux **générés par le widget Mailjet** (fournis par Julien).
  - Prop `variant`: `"compact"` (fin d'article) | `"full"` (landing).
  - Honeypot anti-bot (champ caché, comme le `botcheck` Web3Forms).
  - JS : validation, état d'envoi, message de succès/erreur, event Plausible `Lead Magnet Submit`. Comportement de succès : message inline + (selon ce que permet Mailjet) redirection vers `/merci-ressource/`.
- **`src/pages/ressources/10-automatisations-ia.astro`** (nouveau) — landing dédiée : promesse, aperçu des 10 (teasers), `<LeadMagnet variant="full" />`, rappel fondateur (réassurance), mini-FAQ. SEO : `<title>`, meta description, schema.
- **`src/pages/merci-ressource.astro`** (nouveau) — « Vérifiez votre boîte mail pour confirmer et recevoir le guide » (explique le double opt-in).
- **`src/pages/blog/[...id].astro`** (modifié) — insérer `<LeadMagnet variant="compact" />` après `<Content />`, avant l'encart auteur.
- **`src/components/Header.astro`** (modifié) — ajouter un lien **« Ressources »** vers la landing (décidé : oui — découvrabilité + lien interne SEO).
- **`public/ressources/10-automatisations-ia.pdf`** (nouveau) — l'aimant.

## Flux de données

1. Visiteur (blog ou landing) remplit le formulaire `LeadMagnet`.
2. POST → Mailjet : contact ajouté à la liste **« Ressources – 10 automatisations IA »** (non confirmé) → Mailjet envoie l'email de **double opt-in**.
3. Visiteur confirme → contact confirmé → **automation Mailjet** :
   - **Email 1** (immédiat) : livraison du PDF (lien vers `/ressources/10-automatisations-ia.pdf`).
   - **Email 2** (J+2) : un cas concret + valeur. *(activé en phase Premium)*
   - **Email 3** (J+5) : invitation à l'audit offert (CTA `/contact/` ou Calendly). *(activé en phase Premium)*
4. Site : message de succès → `/merci-ressource/`.
5. Event Plausible `Lead Magnet Submit`.

## RGPD, anti-spam, mesure

- Consentement explicite (case à cocher) + lien `/confidentialite/`.
- Double opt-in Mailjet ; désinscription gérée par Mailjet ; hébergement UE (argument fort pour la cible OF).
- Honeypot anti-bot côté formulaire.
- Mesure : confirmés côté Mailjet + event Plausible côté site.

## Contenu rédigé par Claude

- Le **PDF** (10 fiches + intro + CTA).
- L'**email de confirmation** (double opt-in) — texte personnalisé.
- Les **3 emails** de l'automation (livraison, J+2, J+5).

## Prérequis côté Julien (Mailjet)

1. Créer la **liste de contacts** « Ressources – 10 automatisations IA ».
2. Créer un **widget d'inscription** (double opt-in activé) → copier le code généré (URL d'action + noms de champs + jetons) et me le transmettre.
3. Vérifier le **domaine expéditeur** (claudepartners.fr — déjà authentifié).
4. Construire l'**automation** : email de livraison maintenant ; ajouter Email 2 + Email 3 au passage Premium.

## Gestion des erreurs

- Validation HTML5 + JS (email requis/valide, consentement requis).
- Erreur réseau → message clair + repli (« écrivez-nous à contact@claudepartners.fr »).
- Honeypot → soumission ignorée silencieusement.

## Tests / critères d'acceptation

- `npm run build` passe (nouvelles pages + composant).
- Test bout-en-bout avec un vrai email : soumission → email de confirmation → confirmation → email de livraison du PDF reçu (+ relances en phase Premium).
- `LeadMagnet` responsive en variantes `compact` et `full`.
- Event Plausible `Lead Magnet Submit` émis à la soumission.
- Lien PDF valide et fichier accessible.

## Hors scope (YAGNI)

- Pas de fonction serverless / API Mailjet (approche B écartée).
- Pas de téléchargement instantané (livraison par email, cohérent avec le double opt-in).
- Pas de segmentation avancée / scoring au lancement.
- Pas de A/B testing au lancement.

## Dépendances / points ouverts

- Code du widget Mailjet (action + champs) requis avant le câblage final du formulaire.
- 10ᵉ automatisation à arrêter à la rédaction du PDF.
- Passage Mailjet Premium pour activer Email 2 + Email 3.

## Mise à jour 2026-06-15 — déviation d'architecture (Approche B)

Le code d'intégration fourni par Mailjet est un **iframe non-stylable** (formulaire soumis en JS, sans action postable) → l'approche A (formulaire maison postant directement vers Mailjet) est impossible. Le site étant hébergé sur **Cloudflare Pages**, on bascule sur l'**Approche B** (serverless) :

- Formulaire maison `LeadMagnet.astro` → `POST /api/subscribe` (**Cloudflare Pages Function** : `app/functions/api/subscribe.js`) → API Mailjet `contactslist/10523019/managecontact` → l'automation Mailjet envoie le PDF.
- **Opt-in simple** (case de consentement = base RGPD) au lieu du double opt-in du widget.
- Champs Mailjet (noms exacts) : `firstname`, `société`, `téléphone` (+ `email`).
- Secrets en **variables d'environnement Cloudflare Pages** : `MJ_APIKEY`, `MJ_SECRETKEY` (jamais dans le dépôt).
- `src/data/mailjet.ts` (config widget) supprimé.
- **À confirmer** : root directory du projet Pages (emplacement de `functions/`) ; création de l'**automation** Mailjet (déclencheur « inscription à la liste » → Email 1 livraison PDF).
