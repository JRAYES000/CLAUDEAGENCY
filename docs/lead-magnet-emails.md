# Lead magnet — copy emails (à coller dans Mailjet)

> **Livraison via l'API transactionnelle Mailjet (gratuite)**, depuis la Pages Function `app/functions/api/subscribe.js` — PAS d'automation Mailjet (Premium non souhaité). L'**Email 1** ci-dessous est celui qu'envoie la fonction (son HTML vit dans la fonction). Opt-in simple (case de consentement = base RGPD) ; double opt-in non utilisé.
> Emails 2 & 3 (relances J+2/J+5) : à brancher plus tard via un **Cron Cloudflare + Send API** (toujours sans Premium).
> Liens : PDF = `https://claudepartners.fr/ressources/10-automatisations-ia.pdf` · Audit = `https://claudepartners.fr/contact/`

---

## Email de confirmation (double opt-in)

**Objet :** Confirmez pour recevoir votre guide des 10 automatisations IA

Bonjour {{prénom}},

Merci de votre intérêt ! Un dernier clic pour confirmer votre adresse et recevoir aussitôt le guide.

**[ Confirmer et recevoir le guide ]**

Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.

— Julien Rayes, Claude Agency

---

## Email 1 — Livraison (immédiat, après confirmation)

**Objet :** Votre guide : 10 automatisations IA pour votre organisme

Bonjour {{prénom}},

Voici votre guide, comme promis :

**[ Télécharger le PDF ]**

Chaque automatisation y est expliquée avec le temps qu'elle fait gagner et l'outil utilisé — toutes déployées dans un organisme de formation réel, pas en théorie.

Une question en le lisant ? Répondez simplement à cet email, j'y réponds personnellement.

— Julien

---

## Email 2 — Valeur (J+2) · *phase Premium*

**Objet :** Celle qui a rendu 2 h par jour à mon assistante

Bonjour {{prénom}},

Si vous ne deviez en tester qu'une seule : les **relances administratives** (émargements, questionnaires de satisfaction, suivi de complétion).

Avant : 2 h par jour. Aujourd'hui : 2 h par mois — l'assistante ne fait plus que vérifier que tout tourne.

Je détaille le « comment » dans le guide (automatisation n°1). Bonne lecture.

— Julien

---

## Email 3 — Invitation audit (J+5) · *phase Premium*

**Objet :** On regarde ensemble ce qui est automatisable chez vous ?

Bonjour {{prénom}},

Vous avez le guide. La vraie question, maintenant, c'est : **par où commencer chez vous ?**

C'est exactement l'objet de notre **audit offert** : on identifie vos priorités à plus fort ROI et vous repartez avec une feuille de route chiffrée — que vous travailliez avec nous ensuite ou non.

**[ Réserver mon audit offert ]**

— Julien

---

## Checklist de config Mailjet (Julien)

1. Créer la liste **« Ressources – 10 automatisations IA »**.
2. Créer un **widget d'inscription** (champs : email, prénom, organisme) ; **activer le double opt-in**.
3. Définir la **thank-you page** du widget sur `https://claudepartners.fr/merci-ressource/`.
4. Copier le code du widget (**View code**) → renseigner `app/src/data/mailjet.ts` (`actionUrl`, `fields`, `hidden`).
5. Vérifier le **domaine expéditeur** `claudepartners.fr` (déjà authentifié).
6. **Automation** : déclencheur « inscription confirmée » → **Email 1** (maintenant). Ajouter **Email 2** (J+2) et **Email 3** (J+5) au passage Premium.
7. Insérer le **lien du PDF** et le **lien de l'audit** dans les emails (voir en-tête).
