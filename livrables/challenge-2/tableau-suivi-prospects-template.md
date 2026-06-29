# Tableau de suivi prospects — Claude Agency LinkedIn Outreach
## Modèle de pilotage prospection B2B OF Qualiopi

---

## Légende des statuts

| Statut | Couleur | Définition |
|---|---|---|
| 🔵 **Invité** | Bleu | Invitation envoyée, pas encore acceptée |
| ⚪ **Connecté** | Gris | Connexion acceptée, message 1 pas encore envoyé |
| 🟡 **Contacté** | Jaune | Message 1 envoyé, en attente de réponse |
| 🟠 **Chaud** | Orange | A répondu positivement, RDV en cours de planification |
| 🔴 **RDV** | Rouge | RDV confirmé |
| 🟢 **Client** | Vert | Proposition signée, client actif |
| ⛔ **Froid** | Noir | Pas de réponse après message 3 (séquence terminée) |
| 🚫 **OPTOUT** | Interdit | Demande de retrait explicite — NE PLUS CONTACTER |

---

## Légende des signaux

| Signal | Code |
|---|---|
| Post IA / ChatGPT | `SIG-IA` |
| Post recrutement pédagogique | `SIG-REC` |
| Certification Qualiopi récente | `SIG-QLP` |
| Nouveau programme CPF | `SIG-CPF` |
| Événement sectoriel | `SIG-EVT` |
| Visite de profil | `SIG-VIS` |
| Commentaire sur votre post | `SIG-CMT` |
| Pas de signal clair | `SIG-GEN` |

---

## Tableau de suivi prospects

| # | Prénom | Nom | Organisme | Domaine formation | Signal | Date invitation | Date acceptation | Msg 1 envoyé | Msg 2 envoyé | Msg 3 envoyé | Date RDV | Statut | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Marie | Dupont | FormaPro Lyon | Management | `SIG-IA` | 02/07/2026 | 03/07/2026 | 04/07/2026 | — | — | 10/07/2026 à 10h | 🔴 **RDV** | A répondu rapidement. Dirige OF 12 salariés. Audit Qualiopi en oct. Budget ~2k€/mois. Décideur seul. |
| 2 | Thomas | Martin | Centre Form'Action | Sécurité incendie | `SIG-QLP` | 02/07/2026 | 04/07/2026 | 05/07/2026 | — | — | — | 🟡 **Contacté** | Certifié Qualiopi janv. 2026. Prochain audit jan. 2027. Relance prévue le 12/07. |
| 3 | Isabelle | Renard | OF Belge Pro | RH & Soft skills | `SIG-GEN` | 01/07/2026 | — | — | — | — | — | 🔵 **Invité** | Bruxelles. Pas de réponse à l'invitation. Relancer manuellement si non acceptée après 10j. |

---

## Tableau de bord KPIs hebdomadaires

| Semaine | Invitations envoyées | Connexions acceptées | % acceptation | Msg 1 envoyés | Réponses reçues | % réponse | RDV confirmés | RDV effectués | Propositions envoyées | Clients signés |
|---|---|---|---|---|---|---|---|---|---|---|
| S1 — 30/06 | | | | | | | | | | |
| S2 — 07/07 | | | | | | | | | | |
| S3 — 14/07 | | | | | | | | | | |
| S4 — 21/07 | | | | | | | | | | |
| S5 — 28/07 | | | | | | | | | | |
| **TOTAL MOIS 1** | | | | | | | | | | |
| S6 — 04/08 | | | | | | | | | | |
| S7 — 11/08 | | | | | | | | | | |
| S8 — 18/08 | | | | | | | | | | |
| S9 — 25/08 | | | | | | | | | | |
| **TOTAL MOIS 2** | | | | | | | | | | |
| S10 — 01/09 | | | | | | | | | | |
| S11 — 08/09 | | | | | | | | | | |
| S12 — 15/09 | | | | | | | | | | |
| S13 — 22/09 | | | | | | | | | | |
| **TOTAL MOIS 3** | | | | | | | | | | |
| **TOTAL 90 JOURS** | | | | | | | **Cible : 15-30** | | | |

---

## Checklist hebdomadaire (à faire chaque lundi matin, 30 min)

- [ ] Calculer les taux de conversion de la semaine écoulée
- [ ] Identifier le message ayant le meilleur taux de réponse (A, B ou C)
- [ ] Basculer les prospects "Invité" depuis > 10 jours sans acceptation → statut "Froid"
- [ ] Envoyer les relances Message 2 (J+7) et Message 3 (J+14) aux bons prospects
- [ ] Confirmer les RDV de la semaine (Message 5 J-1)
- [ ] Relancer les no-shows de la semaine précédente (Message 6)
- [ ] Mettre à jour les statuts dans le tableau
- [ ] Planifier les invitations de la semaine

---

## Pipeline de conversion — Vue synthétique

```
Invitations envoyées
        ↓ (25-35% d'acceptation)
Connexions acceptées
        ↓ (10-20% de réponse positive)
Réponses reçues
        ↓ (30-50% de conversion)
RDV confirmés
        ↓ (70-80% de présence)
RDV effectués
        ↓ (20-40% de conversion)
Propositions envoyées
        ↓ (30-50% de closing)
Clients signés ✅
```

---

## Instructions d'utilisation

### Pour Notion / Airtable
Recréer ce tableau avec les colonnes suivantes et les types associés :
- Prénom, Nom, Organisme : Texte
- Domaine formation : Liste déroulante (Management, Sécurité, RH, Informatique, Langues, Autre)
- Signal : Liste déroulante (voir légende)
- Dates (invitation, acceptation, messages, RDV) : Date
- Statut : Liste déroulante avec couleurs (voir légende)
- Notes : Texte long

**Vues recommandées dans Airtable/Notion** :
- Vue "Pipeline" (groupé par statut) → voir tous les prospects par étape
- Vue "Relances du jour" (filtré : msg 1 envoyé il y a 7 jours OU msg 2 envoyé il y a 7 jours)
- Vue "RDV cette semaine" (filtré : statut = RDV + date RDV = cette semaine)
- Vue "Chauds à relancer" (filtré : statut = Chaud + aucun RDV fixé)

### Pour Excel / Google Sheets
Utiliser ce fichier markdown comme modèle et recréer les colonnes. Ajouter une colonne "Couleur statut" avec mise en forme conditionnelle automatique.

---

*Tableau produit par Claude Agency — Version 2.0 — Juin 2026*
*Confidentiel — Usage interne uniquement*
