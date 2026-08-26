# Séquence d'e-mails — organismes de formation

État réel constaté le 24/08/2026 en relisant le Sheet directement (pas une version à charger : ce
fichier documente ce qui est **déjà en place**). Emplacement réel : onglet
**D+ · Séquences et routage**, section 4 (« La séquence de 2 e-mails »), titre de section ligne 33,
en-tête ligne 34, e-mails **lignes 35-36**.

**Réduite de 5 à 2 e-mails le 22/08/2026 (décision Julien)**, calquée sur une campagne existante :
E1 = problème + note publique + CTA « répondez GO » (offre d'audit sans lien), relance unique E2 à
J+5 ouvrés dans le même fil. Le nom de ce fichier date de la version à 5 e-mails ; il n'est pas
renommé pour ne pas casser les références existantes (`CLAUDE.md`, `D4`/`D12`/`D14` du Sheet),
mais son contenu suit désormais la version à 2 e-mails.

Base : `docs/prospection/ciblage.md` (D1). Signature identique sur les 2 e-mails : Julien RAYES,
fondateur de Claude Agency, 229 rue Saint-Honoré, 75001 Paris. `{{prenom}}` et `{{organisme}}`
restent des variables Saleshandy, remplies à l'envoi.

**Mise à jour du 24/08/2026 (D14, RGPD) :** une ligne de transparence CNIL a été ajoutée dans la
signature des 2 e-mails, en texte simple, **sans URL** : la règle de la section 7 de
`docs/PLAN-SOLOHERY.md` (« un lien maximum » par e-mail) est déjà atteinte par le lien existant de
chaque e-mail (article du blog pour E1, lien de rendez-vous pour E2). Ajouter l'adresse de
`/donnees-prospection` en lien cliquable ferait passer à 2 liens — risque de délivrabilité jugé trop
élevé à la veille du premier envoi (domaines encore en fin de chauffe). La page reste publique et
commitée dans le dépôt, référencée depuis `/confidentialite` et depuis
`docs/prospection/registre-traitements.md`, mais son adresse n'apparaît pas en clair comme lien
dans le corps des e-mails.

⚠ Point encore ouvert en section 9 du Sheet, non traité ici (hors périmètre D14) : l'adresse
postale n'a pas été vérifiée.

---

## E1 — J0, nouveau fil

**Objet** : préparer votre audit Qualiopi

**Corps** :
```
Bonjour {{prenom}},

Une question directe : la dernière fois que {{organisme}} a préparé un audit Qualiopi, combien de
temps est parti à retrouver les preuves — pas à les produire, juste à remettre la main dessus ?

C'est la partie la plus ingrate du métier, et c'est celle que nous prenons en charge chez Claude
Agency : preuves d'audit, BPF, émargements, relances.

J'ai repris les preuves attendues, indicateur par indicateur, dans une note publique :
https://claudeagency.fr/blog/automatiser-qualiopi-ia/
Elle est utile même si nous ne travaillons jamais ensemble.

Pour aller plus loin, répondez « GO » : je vous prépare un audit gratuit et sans engagement de vos
trois processus les plus chronophages, conclu par une feuille de route écrite et chiffrée — que
vous nous confiiez la suite ou non.

Julien RAYES
Fondateur — Claude Agency
229 rue Saint-Honoré, 75001 Paris

Ces coordonnées professionnelles sont utilisées pour de la prospection commerciale B2B ; détail du
traitement sur simple demande à contact@claudeagency.fr.

Vous ne souhaitez plus recevoir de message de ma part ? Répondez « stop » : je vous retire de ma
liste le jour même.
```

**Note du Sheet** : objet en minuscules, court, factuel — ressemble à un e-mail interne, pas à une
campagne. Un seul lien (l'article) ; l'offre d'audit se prend en répondant « GO », sans lien. Le
moyen d'opposition figure dès ce premier message (obligation CNIL B2B). Signature complète — nom,
fonction, adresse postale — sur les 2 e-mails.

---

## E2 — J+5 ouvrés, même fil, objet en « Re: »

**Objet** : Re: préparer votre audit Qualiopi

**Corps** :
```
Bonjour {{prenom}},

Une relance, puis je vous laisse tranquille.

Le cas que nous retrouvons presque partout : les preuves existent toutes, mais réparties entre le
drive, les boîtes mail et les classeurs de trois personnes. Le jour de l'audit, c'est cette
dispersion qui coûte les journées — pas l'absence de preuve. Un test simple : qui, chez
{{organisme}}, saurait dire aujourd'hui où sont les preuves de l'indicateur 11 ?

Mon offre tient toujours : un audit gratuit et sans engagement, conclu par une feuille de route
écrite et chiffrée. Répondez « GO », ou prenez directement 45 minutes en visio :
https://cal.com/claude-agency/diagnostic-gratuit-45-min

« Pas maintenant » me va aussi — je le note et j'arrête là.

Julien

—
Julien RAYES · Claude Agency · 229 rue Saint-Honoré, 75001 Paris
Ces coordonnées professionnelles sont utilisées pour de la prospection commerciale B2B ; détail du
traitement sur simple demande à contact@claudeagency.fr.
Pour ne plus recevoir de message de ma part, répondez « stop ».
```

**Note du Sheet** : relance unique, même fil, cas concret (dispersion des preuves), rappel de
l'offre d'audit, lien de rendez-vous — le seul lien du message. « Pas maintenant » offert pour
clore proprement. Zéro chiffre inventé.

---

E3, E4 et E5 supprimés le 22/08/2026 (décision Julien : séquence limitée à 2 e-mails, calquée sur
la campagne existante). Les étapes correspondantes ont aussi été supprimées de Saleshandy.
