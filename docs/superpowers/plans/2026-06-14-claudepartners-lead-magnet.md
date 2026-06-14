# Lead magnet « 10 automatisations IA » — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Capter les emails du trafic blog via un aimant PDF (« 10 automatisations IA pour un OF ») et livrer ce PDF + une séquence de nurture, sans backend, via Mailjet.

**Architecture:** Site statique Astro. Un composant réutilisable `LeadMagnet.astro` (formulaire stylé maison) poste vers Mailjet (widget d'inscription public, aucune clé secrète). Mailjet gère stockage, double opt-in RGPD et automation (livraison du PDF + relances). Placement : fin de chaque article + page d'atterrissage dédiée + lien nav. PDF servi en statique depuis `public/`.

**Tech Stack:** Astro 6, Tailwind (tokens existants : `brand`, `cream`, `sand`, `ink`, `muted`, `font-display`), Mailjet (ESP), Plausible (analytics).

**Spec de référence :** `docs/superpowers/specs/2026-06-14-claudepartners-lead-magnet-design.md`

---

## Approche de test (adaptée au codebase)

Ce projet est un site **statique Astro sans runner de tests unitaires** — en introduire un pour des composants de présentation serait du sur-engineering (YAGNI). La vérification de chaque tâche repose donc sur :
1. **`npm run build`** (depuis `app/`) — compile les composants et génère les routes ; échoue sur toute erreur de template/import.
2. **Inspection du `dist/`** — la route attendue existe (`grep` du HTML généré).
3. **Playwright + `npm run preview`** — vérification DOM/visuelle du rendu (le serveur `astro preview` sert `dist/`).
4. **Test email bout-en-bout manuel** — nécessite la config Mailjet (Tâche 8, déblocage Julien).

Toutes les commandes shell s'exécutent depuis `C:/Users/julien/CLAUDEPARTNERS/app` sauf indication contraire.

## Carte des fichiers

| Fichier | Rôle | Action |
|---|---|---|
| `src/data/mailjet.ts` | Config publique du widget Mailjet (action + champs + redirect) | Créer |
| `src/components/LeadMagnet.astro` | Bloc CTA + formulaire stylé (variants `compact`/`full`) | Créer |
| `src/pages/merci-ressource.astro` | Page « vérifiez votre email » (double opt-in) | Créer |
| `src/pages/ressources/10-automatisations-ia.astro` | Landing dédiée | Créer |
| `src/pages/blog/[...id].astro` | Insérer `<LeadMagnet variant="compact" />` | Modifier |
| `src/components/Header.astro` | Ajouter le lien nav « Ressources » | Modifier |
| `public/ressources/10-automatisations-ia.pdf` | L'aimant (PDF) | Créer |
| `docs/superpowers/content/lead-magnet-emails.md` | Copy des 3 emails + opt-in (à coller dans Mailjet) | Créer |

---

## Task 1: Module de configuration Mailjet

**Files:**
- Create: `src/data/mailjet.ts`

- [ ] **Step 1: Créer le module de config**

Ce fichier centralise les **valeurs publiques** du widget d'inscription Mailjet (aucune clé secrète). Les valeurs `REMPLIR_*` sont fournies par Julien depuis Mailjet (Contacts → Widgets → Manage → View code) — c'est l'unique point d'intégration externe.

```ts
// src/data/mailjet.ts
// Configuration PUBLIQUE du widget d'inscription Mailjet (lead magnet).
// Source des valeurs : Mailjet → Contacts → Widgets → (votre widget) → Manage → View code.
// Aucune clé secrète ici : un widget d'inscription est public par nature.
export const MAILJET_FORM = {
  // URL d'action du <form> généré par Mailjet.
  actionUrl: 'REMPLIR_DEPUIS_MAILJET',
  // Noms EXACTS des champs attendus par le widget (à recopier depuis le code généré).
  fields: {
    email: 'email',
    firstName: 'name',
    organisation: 'organisation',
  },
  // Champs cachés requis par le widget (id de liste, jetons, locale…). Coller tels quels.
  hidden: [] as { name: string; value: string }[],
  // Page de remerciement à configurer DANS le widget Mailjet (thank-you page).
  redirectUrl: '/merci-ressource/',
} as const;
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run build`
Expected: build réussit (EXIT 0). Le module n'est pas encore importé ; on valide juste qu'il n'y a pas d'erreur de syntaxe TS.

- [ ] **Step 3: Commit**

```bash
git add app/src/data/mailjet.ts
git commit -m "feat(lead-magnet): config publique du widget Mailjet"
```

---

## Task 2: Composant `LeadMagnet.astro`

**Files:**
- Create: `src/components/LeadMagnet.astro`

- [ ] **Step 1: Créer le composant**

```astro
---
// src/components/LeadMagnet.astro
// Bloc CTA + formulaire d'inscription au lead magnet (poste vers Mailjet).
import { MAILJET_FORM } from '../data/mailjet';

interface Props { variant?: 'compact' | 'full'; }
const { variant = 'compact' } = Astro.props;
const isFull = variant === 'full';
const inputClass =
  'mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 focus:border-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500';
---
<section
  class={`not-prose rounded-2xl border border-sand bg-cream-100 ${isFull ? 'p-8 sm:p-10' : 'p-6 sm:p-7'}`}
  aria-labelledby="lead-magnet-title"
>
  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Ressource gratuite</p>
  <h2 id="lead-magnet-title" class={`mt-2 font-display font-bold text-ink ${isFull ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
    10 automatisations IA qui libèrent 1 jour/semaine dans un organisme de formation
  </h2>
  <p class="mt-3 leading-relaxed text-muted">
    Le guide concret, tiré d'un organisme de formation réel : pour chaque tâche, l'automatisation, le temps gagné et l'outil. Recevez-le par email.
  </p>

  <form id="lead-magnet-form" action={MAILJET_FORM.actionUrl} method="POST" class="mt-6 space-y-4">
    {MAILJET_FORM.hidden.map((h) => (<input type="hidden" name={h.name} value={h.value} />))}
    <input type="checkbox" name="botcheck" class="hidden" style="display:none" tabindex="-1" autocomplete="off" />

    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label for="lm-firstname" class="block text-sm font-medium">Prénom</label>
        <input type="text" id="lm-firstname" name={MAILJET_FORM.fields.firstName} required autocomplete="given-name" class={inputClass} />
      </div>
      <div>
        <label for="lm-email" class="block text-sm font-medium">Email professionnel</label>
        <input type="email" id="lm-email" name={MAILJET_FORM.fields.email} required autocomplete="email" spellcheck="false" class={inputClass} />
      </div>
    </div>
    <div>
      <label for="lm-org" class="block text-sm font-medium">Nom de votre organisme <span class="text-muted">(optionnel)</span></label>
      <input type="text" id="lm-org" name={MAILJET_FORM.fields.organisation} autocomplete="organization" class={inputClass} />
    </div>
    <label class="flex items-start gap-2 text-sm text-muted">
      <input type="checkbox" name="consent" required class="mt-1" />
      <span>J'accepte de recevoir le guide et des conseils par email. Voir la <a href="/confidentialite/" class="text-brand-600 hover:underline">politique de confidentialité</a>. Désinscription en un clic.</span>
    </label>

    <button type="submit" class="rounded-lg bg-brand-500 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-70">
      Recevoir le guide
    </button>
    <p id="lm-result" class="text-sm" role="status" aria-live="polite"></p>
  </form>
</section>

<script is:inline>
  (function () {
    var form = document.getElementById('lead-magnet-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      var hp = form.querySelector('input[name="botcheck"]');
      if (hp && hp.checked) { e.preventDefault(); return; }
      if (window.plausible) window.plausible('Lead Magnet Submit');
    });
  })();
</script>
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run build`
Expected: EXIT 0 (le composant compile ; pas encore utilisé).

- [ ] **Step 3: Commit**

```bash
git add app/src/components/LeadMagnet.astro
git commit -m "feat(lead-magnet): composant LeadMagnet (formulaire Mailjet stylé)"
```

---

## Task 3: Page de remerciement `/merci-ressource/`

**Files:**
- Create: `src/pages/merci-ressource.astro`

- [ ] **Step 1: Créer la page**

Calquée sur le pattern de `src/pages/merci.astro` (même layout). Explique le double opt-in.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Merci — vérifiez votre boîte mail" description="Confirmez votre inscription pour recevoir le guide des 10 automatisations IA.">
  <section class="mx-auto max-w-2xl px-4 py-24 text-center">
    <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Dernière étape</p>
    <h1 class="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">Vérifiez votre boîte mail</h1>
    <p class="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted">
      Nous venons de vous envoyer un email de confirmation. Cliquez sur le lien qu'il contient pour recevoir aussitôt votre guide des 10 automatisations IA.
    </p>
    <p class="mx-auto mt-4 max-w-lg text-sm text-muted">
      Rien reçu après quelques minutes ? Pensez à regarder vos spams, ou écrivez-nous à <a href="mailto:contact@claudepartners.fr" class="text-brand-600 hover:underline">contact@claudepartners.fr</a>.
    </p>
    <a href="/blog/" class="mt-8 inline-block rounded-lg border border-sand bg-cream-50 px-6 py-3 font-semibold text-ink transition-colors hover:border-brand-300">Lire le blog en attendant</a>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Vérifier le build + la route**

Run: `npm run build`
Expected: EXIT 0, et `dist/merci-ressource/index.html` est généré.

Run: `ls dist/merci-ressource/index.html`
Expected: le fichier existe.

- [ ] **Step 3: Commit**

```bash
git add app/src/pages/merci-ressource.astro
git commit -m "feat(lead-magnet): page de confirmation double opt-in"
```

---

## Task 4: Page d'atterrissage dédiée

**Files:**
- Create: `src/pages/ressources/10-automatisations-ia.astro`

- [ ] **Step 1: Créer la landing**

Mirroir du pattern `a-propos.astro` (BaseLayout + breadcrumb schema). Réutilise `LeadMagnet` en variante `full`. Le tableau `teasers` liste les 10 automatisations (titres) — alignés sur le PDF (Tâche 7).

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import LeadMagnet from '../../components/LeadMagnet.astro';

const teasers = [
  "Les relances administratives qui partent toutes seules",
  "Les comptes rendus de visio rédigés automatiquement",
  "Le coaching commercial après chaque appel",
  "La création de tunnels de vente en quelques minutes",
  "Les supports de cours générés depuis votre programme",
  "Quiz, études de cas et corrigés prêts à l'emploi",
  "Le dossier d'audit Qualiopi pré-rempli",
  "L'assistant qui répond aux stagiaires 24/7",
  "Chaque réunion transformée en compte rendu + support",
  "Les relances de paiement et de financement automatisées",
];

const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: new URL('/', Astro.site).href },
    { '@type': 'ListItem', position: 2, name: 'Ressources' },
    { '@type': 'ListItem', position: 3, name: '10 automatisations IA' },
  ],
};
---
<BaseLayout
  title="10 automatisations IA pour organismes de formation (guide gratuit)"
  description="Le guide gratuit des 10 automatisations IA qui libèrent 1 jour/semaine dans un organisme de formation. Tiré d'un OF réel : automatisation, temps gagné, outil."
  pageSchema={[breadcrumb]}
>
  <section class="mx-auto max-w-3xl px-4 py-16">
    <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Guide gratuit</p>
    <h1 class="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
      10 automatisations IA qui libèrent 1 jour/semaine dans un organisme de formation
    </h1>
    <p class="mt-5 text-lg leading-relaxed text-muted">
      Pas de théorie. Ce guide rassemble 10 automatisations réellement déployées dans un organisme de formation : pour chacune, la tâche chronophage, l'automatisation mise en place, le temps gagné et l'outil utilisé.
    </p>

    <ul class="mt-10 grid gap-x-10 gap-y-3 border-t border-sand pt-8 sm:grid-cols-2">
      {teasers.map((t) => (
        <li class="flex gap-3 text-muted">
          <span aria-hidden="true" class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
          <span>{t}</span>
        </li>
      ))}
    </ul>

    <div class="mt-12">
      <LeadMagnet variant="full" />
    </div>

    <p class="mt-8 text-sm text-muted">
      Rédigé par Julien Rayes, fondateur de Claude Partners — directeur commercial et marketing d'un organisme de formation (+3 M€ de CA depuis 2021).
    </p>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Vérifier le build + la route**

Run: `npm run build`
Expected: EXIT 0, `dist/ressources/10-automatisations-ia/index.html` généré.

- [ ] **Step 3: Vérification visuelle (Playwright)**

Démarrer l'aperçu (background) : `npm run preview` puis noter le port affiché (ex. 4321).
Naviguer sur `http://localhost:<port>/ressources/10-automatisations-ia/` et vérifier : le titre H1, la liste des 10 teasers, et le formulaire `LeadMagnet` (champs Prénom/Email/Organisme + case consentement) sont présents. Capturer une capture d'écran pour revue.

- [ ] **Step 4: Commit**

```bash
git add app/src/pages/ressources/10-automatisations-ia.astro
git commit -m "feat(lead-magnet): landing /ressources/10-automatisations-ia"
```

---

## Task 5: Intégration en fin d'article de blog

**Files:**
- Modify: `src/pages/blog/[...id].astro`

- [ ] **Step 1: Importer le composant**

Dans le frontmatter, après la ligne `import { AUTHOR, authorPerson } from '../../data/author';`, ajouter :

```astro
import LeadMagnet from '../../components/LeadMagnet.astro';
```

- [ ] **Step 2: Insérer le bloc après le contenu, avant l'encart auteur**

Localiser la fin du contenu (`</div>` qui ferme `<div class="prose prose-stone mt-8 max-w-none"><Content /></div>`) et insérer juste après, avant `<aside ... aria-label="À propos de l'auteur">` :

```astro
    <div class="mt-14">
      <LeadMagnet variant="compact" />
    </div>
```

- [ ] **Step 3: Vérifier le build**

Run: `npm run build`
Expected: EXIT 0, les pages d'articles se régénèrent.

- [ ] **Step 4: Vérification visuelle (Playwright)**

Avec l'aperçu lancé, naviguer sur un article existant (ex. `/blog/seo-organisme-formation/`) et vérifier que le bloc `LeadMagnet` apparaît entre le contenu et l'encart auteur. Capture d'écran pour revue.

- [ ] **Step 5: Commit**

```bash
git add app/src/pages/blog/[...id].astro
git commit -m "feat(lead-magnet): CTA en fin de chaque article de blog"
```

---

## Task 6: Lien « Ressources » dans la navigation

**Files:**
- Modify: `src/components/Header.astro`

- [ ] **Step 1: Ajouter l'entrée au tableau `links`**

Remplacer le tableau `links` (lignes 2-6) par :

```astro
const links = [
  { href: '/services/', label: 'Services' },
  { href: '/ressources/10-automatisations-ia/', label: 'Ressources' },
  { href: '/blog/', label: 'Blog' },
  { href: '/a-propos/', label: 'À propos' },
];
```

Le rendu desktop et mobile itère déjà sur `links` — aucune autre modification nécessaire.

- [ ] **Step 2: Vérifier le build**

Run: `npm run build`
Expected: EXIT 0.

- [ ] **Step 3: Vérification visuelle (Playwright)**

Avec l'aperçu, vérifier que « Ressources » apparaît dans la nav (desktop) et pointe vers `/ressources/10-automatisations-ia/`.

- [ ] **Step 4: Commit**

```bash
git add app/src/components/Header.astro
git commit -m "feat(lead-magnet): lien Ressources dans la nav"
```

---

## Task 7: Rédiger et générer le PDF

**Files:**
- Create: `public/ressources/10-automatisations-ia.pdf`

- [ ] **Step 1: Rédiger le contenu (charte Claude Partners)**

Structure imposée — **intro** + **10 fiches** + **CTA final**. Chaque fiche suit le gabarit : `Titre` · *La tâche chronophage* · **L'automatisation** · `Temps gagné` · `Outil`. Copy de départ (à finaliser/peaufiner à la rédaction) :

- **Intro** : « Diriger un organisme de formation, c'est faire dix métiers à la fois. Voici 10 tâches que nous avons automatisées dans un organisme réel — et le temps que chacune a rendu. »
1. **Relances administratives** — Émargements, questionnaires de satisfaction, suivi de complétion. Automatisation des relances multicanal. *Temps : 2 h/jour → 2 h/mois.* Outil : Make.
2. **Comptes rendus de visioconférence** — Synthèse + classement automatiques des réunions formateurs/clients. *2–3 h/semaine → 2–3 h/mois.* Outil : Make + IA de transcription.
3. **Coaching commercial** — Un agent IA analyse chaque appel de closing et envoie des conseils personnalisés après l'appel. *Surveillance manuelle → coaching auto.* Outil : agent IA.
4. **Tunnels de vente** — Pages, lead magnets et séquences email générés en minutes. *5–6 h → quelques minutes.* Outil : IA + automatisation.
5. **Supports de cours** — Génération depuis le programme. *Une demi-journée → quelques minutes.* Outil : Claude.
6. **Quiz, études de cas, corrigés** — Adaptés au niveau, sans page blanche. Outil : Claude.
7. **Dossier d'audit Qualiopi** — Pièces pré-remplies automatiquement, il n'y a plus qu'à vérifier. Outil : Make + IA.
8. **Assistant stagiaires 24/7** — Répond aux questions, entraîné sur l'offre. Outil : agent IA.
9. **Réunion → compte rendu + support** — Automatique dès la fin de la réunion. Outil : Make + IA.
10. **Relances de paiement et de financement** — Suivi automatisé des paiements et dossiers de financement. Outil : Make.
- **CTA final** : « Vous voulez ces automatisations chez vous ? Réservez un audit offert : on identifie vos priorités à plus fort ROI et on vous remet une feuille de route chiffrée. → claudepartners.fr/contact »

- [ ] **Step 2: Générer le PDF**

Utiliser la skill `pdf` (ou un gabarit HTML aux couleurs crème/terracotta/serif converti en PDF) pour produire un document propre et de marque. Enregistrer le résultat dans `public/ressources/10-automatisations-ia.pdf`.

- [ ] **Step 3: Vérifier la présence dans le build**

Run: `npm run build`
Expected: EXIT 0 ; `dist/ressources/10-automatisations-ia.pdf` est copié (les fichiers de `public/` sont copiés tels quels).

Run: `ls dist/ressources/10-automatisations-ia.pdf`
Expected: le fichier existe.

- [ ] **Step 4: Commit**

```bash
git add app/public/ressources/10-automatisations-ia.pdf
git commit -m "feat(lead-magnet): PDF des 10 automatisations IA"
```

---

## Task 8: Copy des emails Mailjet + checklist de config

**Files:**
- Create: `docs/superpowers/content/lead-magnet-emails.md`

- [ ] **Step 1: Rédiger le document de copy email**

Contenu complet à coller dans Mailjet (rien à coder). Inclure les 4 messages ci-dessous, puis la checklist de config.

```markdown
# Lead magnet — copy emails (à coller dans Mailjet)

## Email de confirmation (double opt-in)
Objet : Confirmez pour recevoir votre guide des 10 automatisations IA
Corps :
Bonjour {{prénom}},
Merci de votre intérêt ! Un dernier clic pour confirmer votre adresse et recevoir aussitôt le guide.
[ Confirmer et recevoir le guide ]
Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.
— Julien Rayes, Claude Partners

## Email 1 — Livraison (immédiat après confirmation)
Objet : Votre guide : 10 automatisations IA pour votre organisme
Corps :
Bonjour {{prénom}},
Voici votre guide, comme promis : [ Télécharger le PDF ]
Chaque automatisation y est expliquée avec le temps qu'elle fait gagner et l'outil utilisé — toutes déployées dans un organisme de formation réel.
Une question en le lisant ? Répondez simplement à cet email.
— Julien

## Email 2 — Valeur (J+2) [phase Premium]
Objet : Celle qui a rendu 2 h par jour à mon assistante
Corps :
Bonjour {{prénom}},
Si vous ne deviez en tester qu'une : les relances administratives. Avant, 2 h par jour. Aujourd'hui, 2 h par mois — l'assistante ne fait que surveiller que tout tourne.
Je détaille le « comment » dans le guide (automatisation n°1). Bonne lecture.
— Julien

## Email 3 — Invitation audit (J+5) [phase Premium]
Objet : On regarde ensemble ce qui est automatisable chez vous ?
Corps :
Bonjour {{prénom}},
Vous avez le guide. La question suivante, c'est : par où commencer chez vous ?
C'est exactement l'objet de notre audit offert — on identifie vos priorités à plus fort ROI et vous repartez avec une feuille de route chiffrée, que vous travailliez avec nous ensuite ou non.
[ Réserver mon audit offert ]
— Julien

## Checklist de config Mailjet (Julien)
1. Créer la liste « Ressources – 10 automatisations IA ».
2. Créer un widget d'inscription (champs : email, prénom, organisme) ; activer le double opt-in.
3. Définir la thank-you page du widget sur https://claudepartners.fr/merci-ressource/
4. Copier le code du widget (View code) → renseigner src/data/mailjet.ts (actionUrl, fields, hidden).
5. Vérifier le domaine expéditeur claudepartners.fr (déjà authentifié).
6. Automation : déclencheur « inscription confirmée » → Email 1 (maintenant). Ajouter Email 2 (J+2) et Email 3 (J+5) au passage Premium.
7. Insérer le lien du PDF (https://claudepartners.fr/ressources/10-automatisations-ia.pdf) et celui de l'audit (https://claudepartners.fr/contact/) dans les emails.
```

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/content/lead-magnet-emails.md
git commit -m "docs(lead-magnet): copy emails Mailjet + checklist config"
```

---

## Task 9: Câblage Mailjet + test bout-en-bout (déblocage Julien)

**Files:**
- Modify: `src/data/mailjet.ts`

- [ ] **Step 1: Renseigner les valeurs réelles du widget**

Une fois la config Mailjet faite (Tâche 8, checklist), remplacer dans `src/data/mailjet.ts` : `actionUrl`, `fields` (noms exacts), `hidden` (champs cachés du widget). Aligner les `name` du formulaire si Mailjet impose d'autres intitulés.

- [ ] **Step 2: Build + déploiement**

Run: `npm run build`
Expected: EXIT 0.

- [ ] **Step 3: Test bout-en-bout (manuel)**

Sur le site déployé : soumettre le formulaire (landing + un article) avec une vraie adresse → recevoir l'email de confirmation → confirmer → recevoir l'Email 1 avec le PDF. Vérifier que le contact apparaît dans la liste Mailjet et que l'event Plausible `Lead Magnet Submit` est enregistré.

- [ ] **Step 4: Commit**

```bash
git add app/src/data/mailjet.ts
git commit -m "feat(lead-magnet): câblage Mailjet (valeurs réelles du widget)"
```

---

## Self-Review (effectuée)

**1. Couverture de la spec :**
- Aimant PDF → Tâche 7 ✓
- Composant formulaire Mailjet sans backend → Tâches 1, 2 ✓
- Placement fin d'article + landing + nav → Tâches 5, 4, 6 ✓
- Double opt-in + page merci → Tâches 3, 8 ✓
- Nurture 3 emails (phasé) → Tâche 8 ✓ (Email 1 maintenant ; 2-3 en phase Premium)
- RGPD / consentement / honeypot / Plausible → Tâche 2 ✓
- Prérequis Mailjet → Tâches 8, 9 ✓

**2. Placeholders :** Les seules valeurs « REMPLIR » sont dans `mailjet.ts` — config externe légitime fournie par Julien (Tâche 9), pas un trou de plan. Aucun autre TBD.

**3. Cohérence des types :** `MAILJET_FORM` (champs `actionUrl`, `fields.{email,firstName,organisation}`, `hidden[]`, `redirectUrl`) défini en Tâche 1 et consommé tel quel en Tâche 2. Prop `variant: 'compact' | 'full'` cohérente entre Tâches 2, 4, 5. Les 10 teasers (Tâche 4) correspondent aux 10 fiches (Tâche 7).

## Notes d'exécution

- **Ordre :** Tâches 1→7 livrables immédiatement (indépendantes de Mailjet). Tâche 8 = contenu à coller par Julien. Tâche 9 = câblage final, **bloquée** par la config Mailjet de Julien.
- Le formulaire est inopérant tant que `mailjet.ts` n'a pas les vraies valeurs — c'est attendu (Tâche 9). Les Tâches 1-7 restent vérifiables (build + rendu).
