# Lead magnet — les emails et leur configuration

> **Mailjet n'est plus dans le circuit.** L'envoi passe par la boîte
> `contact@claudeagency.fr` (API Hostinger Mail), la liste par **Brevo**. Ce document
> décrivait une configuration de widget Mailjet avec double opt-in : rien de tout cela
> n'existe plus. Réécrit le 2026-08-26 à partir du code et du compte Brevo réels.
>
> **La fonction fait foi, pas ce document** : `app/functions/api/subscribe.js` porte le
> HTML de l'email 1, les identifiants et les libellés. Toute divergence entre les deux
> se tranche en faveur du code.

## Le circuit réel

```
Formulaire du site (LeadMagnet.astro)
   │  POST /api/subscribe   champs : email, firstname, societe, telephone,
   │                                 consent, botcheck (honeypot)
   ▼
app/functions/api/subscribe.js
   ├─ 1. envoie le guide immédiatement — API Hostinger Mail,
   │     depuis contact@claudeagency.fr  (REQUIS : HOSTINGER_MAIL_TOKEN)
   ├─ 2. ajoute le contact à la liste Brevo 12  (facultatif : BREVO_API_KEY —
   │     sans la clé, le guide part quand même, seul l'ajout est sauté)
   └─ 3. redirige en 303 vers /merci-ressource/
         (ou répond en JSON si l'appelant envoie `Accept: application/json`)
```

**Opt-in simple.** La base RGPD est la case de consentement du formulaire : `consent`
est obligatoire côté serveur. **Aucun double opt-in** — ni email de confirmation, ni
lien à cliquer.

`GET /api/subscribe` sert de contrôle de santé : il répond `mode: "hostinger-brevo-v1"`
et dit si `BREVO_API_KEY` est présente (jamais sa valeur).

---

## Email 1 — livraison, immédiat

**Il n'est à coller nulle part** : son HTML et son texte vivent dans `subscribe.js`.
Le modifier veut dire modifier la fonction, puis déployer.

**Objet réel :** `Votre guide : 10 automatisations IA pour votre organisme`

Corps servi (résumé) : salutation avec le prénom s'il est fourni, bouton
« Télécharger le guide (PDF) » vers
`https://claudeagency.fr/ressources/10-automatisations-ia.pdf`, une phrase sur ce que
contient le guide, une invitation à répondre à l'email, signature « Julien Rayes,
Claude Agency ».

---

## Emails 2 et 3 — brouillons, **pas en place**

Aucune relance n'est envoyée aujourd'hui. Les textes ci-dessous sont des brouillons ;
la séquence complète (6 emails) et ses deux options de mise en œuvre vivent dans
[`marketing/nurture-lead-magnet.md`](../marketing/nurture-lead-magnet.md), qui fait foi
sur le calendrier et les objets.

### Email 2 — Valeur (J+2)

**Objet :** Celle qui a rendu 2 h par jour à mon assistante

Bonjour {{prénom}},

Si vous ne deviez en tester qu'une seule : les **relances administratives** (émargements,
questionnaires de satisfaction, suivi de complétion).

Avant : 2 h par jour. Aujourd'hui : 2 h par mois — l'assistante ne fait plus que vérifier
que tout tourne.

Je détaille le « comment » dans le guide (automatisation n°1). Bonne lecture.

— Julien

### Email 3 — Invitation audit (J+5)

**Objet :** On regarde ensemble ce qui est automatisable chez vous ?

Bonjour {{prénom}},

Vous avez le guide. La vraie question, maintenant, c'est : **par où commencer chez vous ?**

C'est exactement l'objet de notre **audit offert** : on identifie vos priorités à plus fort
ROI et vous repartez avec une feuille de route chiffrée — que vous travailliez avec nous
ensuite ou non.

**[ Réserver mon audit offert ]** → `https://claudeagency.fr/contact/`

— Julien

---

## Email de confirmation — **non utilisé, ne pas brancher**

Conservé seulement pour mémoire. Le circuit est en opt-in simple ; brancher un double
opt-in demanderait de modifier `subscribe.js`, pas de coller ce texte quelque part.

> **Objet :** Confirmez pour recevoir votre guide des 10 automatisations IA
>
> Bonjour {{prénom}}, merci de votre intérêt ! Un dernier clic pour confirmer votre
> adresse et recevoir aussitôt le guide. **[ Confirmer et recevoir le guide ]**
> Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.
> — Julien Rayes, Claude Agency

---

## Ce qui doit exister côté Brevo

Relevé dans le compte le **2026-08-26** — à revérifier à la source avant de s'y fier.

| Élément | État constaté |
|---|---|
| Liste **12** « Claude Agency - 10 automatisations IA » | existe ; c'est celle que vise `LIST_ID` dans `subscribe.js` |
| Attributs `MARQUE`, `SOURCE`, `PRENOM`, `SMS` | existent — ce sont les seuls que la fonction renseigne |
| Expéditeur `Claude Agency <contact@claudeagency.fr>` (id 4) | vérifié et actif |

**Un attribut inconnu fait échouer tout l'appel Brevo.** C'est pour cette raison que la
fonction se limite à ces quatre-là : tout nouvel attribut doit être créé dans le compte
**avant** d'être renseigné dans le code.

**Le compte est partagé** entre Claude Agency, L'Ossature et École Naturo — 6 listes et
4 expéditeurs au 2026-08-26. `MARQUE = Claude Agency` sert précisément à distinguer les
activités : toute campagne ou automation doit filtrer sur la liste 12 ou sur cet attribut.

## Écarts connus

- **`societe` est collecté par le formulaire mais jamais transmis à Brevo** : aucun
  attribut ne lui correspond dans le compte. L'information est perdue à l'inscription.
  Pour la garder : créer l'attribut d'abord, l'ajouter à la fonction ensuite.
- **Aucun attribut de suivi de séquence** (date d'inscription, étape) n'existe. L'option
  « cron serverless » de la séquence nurture en aurait besoin.
- **Brevo n'envoie rien aujourd'hui** dans ce circuit : il ne sert que de liste. Les emails
  partent de la boîte Hostinger.
