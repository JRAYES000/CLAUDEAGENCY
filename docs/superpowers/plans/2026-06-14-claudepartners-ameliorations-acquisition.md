# Claude Partners — Améliorations acquisition : plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructurer la page d'accueil de claudepartners.fr et ajouter un calculateur de temps gagné + un aimant à leads (guide), en s'inspirant des meilleures idées concurrentes, pour une entreprise à 0 client (preuve par profondeur métier + honnêteté).

**Architecture:** Site Astro statique (SSG) + Tailwind CSS v4. Tout le travail = composants `.astro` + édition de `index.astro`. Une seule signature interactive (calculateur) en **JavaScript natif via `<script is:inline>`**, sans framework ni dépendance. Capture email du guide via le même pattern Web3Forms que le formulaire de contact existant.

**Tech Stack:** Astro 6.4, Tailwind v4 (`@tailwindcss/vite`), Web3Forms, Plausible. Tokens existants : `cream-50/100`, `brand-200/300/500/600/700/800`, `ink`, `muted`, `sand`, `font-display` (Bricolage), `font-sans` (Schibsted).

**Spec source :** `docs/superpowers/specs/2026-06-14-claudepartners-ameliorations-acquisition-design.md`

---

## Notes d'exécution (à lire avant de commencer)

- **Pas de test unitaire dans le projet** (`app/package.json` n'a que `dev/build/preview/astro`). La vérification de chaque tâche = **`npm run build` doit rester vert** (depuis `app/`) +, pour le calculateur, un **check interactif** (Playwright MCP ou `astro preview`). C'est la forme de test adaptée à ce dépôt statique — ne pas introduire de runner (YAGNI).
- **Toutes les commandes npm s'exécutent depuis `C:\Users\julien\CLAUDEPARTNERS\app`.**
- **Arbre de travail :** 3 fichiers sont déjà modifiés non commités (`CalendlyInline.astro`, `ContactForm.astro`, `mentions-legales.astro`). Avant de commencer, les commiter ou les `git stash` pour ne pas les mêler à ce travail (Task 1 crée une branche dédiée).
- **Garde-fous honnêteté (transverses, non négociables — 0 client) :** aucune mention de client/référence existant ; tout chiffre étiqueté « estimation / fourchette / indicatif » ; bio fondateur factuelle (pas d'invention) ; « construit avec Claude » sobre, sans suggérer de partenariat Anthropic officiel.
- **Identité :** réutiliser les classes/tokens existants, style éditorial **sans grilles de cartes décoratives**, alternance de fonds crème/blanc.

### Ordre cible de la page d'accueil (fond entre parenthèses)
1. Hero (`bg-cream-100`) · 2. Problème (blanc) · 3. Profils d'OF (`bg-cream-100`) · 4. Services (blanc) · 5. Calculateur (`bg-cream-100`) · 6. Méthode (blanc) · 7. Parlons franchement (`bg-cream-100`) · 8. Fondateur (blanc) · 9. Guide (`bg-cream-100`) · 10. FAQ (blanc) · 11. CTA final (`bg-brand-700`).

---

## Task 1: Préparer la branche de travail

**Files:** aucun fichier modifié (git seulement).

- [ ] **Step 1: Mettre de côté les modifications non liées**

Run (depuis `C:\Users\julien\CLAUDEPARTNERS`) :
```bash
git stash push -m "wip-non-lie" -- app/src/components/CalendlyInline.astro app/src/components/ContactForm.astro app/src/pages/mentions-legales.astro
```
Expected : `Saved working directory...` (ou rien à stasher si déjà commité — dans ce cas continuer).

- [ ] **Step 2: Créer et basculer sur la branche**

Run :
```bash
git checkout -b feat/ameliorations-acquisition
```
Expected : `Switched to a new branch 'feat/ameliorations-acquisition'`.

- [ ] **Step 3: Vérifier que le build part d'un état vert**

Run (depuis `app/`) :
```bash
npm run build
```
Expected : build réussi (`Complete!` / pages générées, 0 erreur).

---

## Task 2: Section « Profils d'OF » (verticalisation)

**Files:**
- Modify: `app/src/pages/index.astro` (insérer une nouvelle `<section>` juste après la section « Problème », avant la section « Services »)

- [ ] **Step 1: Insérer la section Profils d'OF**

Repère : la section Problème se termine par `</section>` juste avant le commentaire `<!-- Services (liste éditoriale, pas de grille de cartes) -->`. Insérer le bloc suivant **entre les deux** :

```astro
  <!-- Profils d'OF (verticalisation) -->
  <section class="bg-cream-100">
    <div class="mx-auto max-w-6xl px-4 py-20">
      <h2 class="font-display text-3xl font-bold text-ink sm:text-4xl">Quel organisme êtes-vous ?</h2>
      <p class="mt-4 max-w-2xl text-lg text-muted">On connaît vos contraintes. Voici ce que l'IA peut changer, concrètement, selon votre structure.</p>
      <div class="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
        <div>
          <h3 class="font-display text-xl font-bold text-brand-700">CFA / organisme multi-formations</h3>
          <p class="mt-2 text-muted"><span class="font-semibold text-ink">Votre réalité :</span> volume de dossiers, suivi de cohortes, reporting aux financeurs.</p>
          <p class="mt-1 text-muted"><span class="font-semibold text-ink">Ce que l'IA peut changer :</span> un suivi et un reporting en partie automatisés, des réponses normalisées.</p>
        </div>
        <div>
          <h3 class="font-display text-xl font-bold text-brand-700">OF indépendant / petite structure</h3>
          <p class="mt-2 text-muted"><span class="font-semibold text-ink">Votre réalité :</span> tout repose sur une ou deux personnes ; l'administratif grignote le temps pédagogique.</p>
          <p class="mt-1 text-muted"><span class="font-semibold text-ink">Ce que l'IA peut changer :</span> des heures récupérées sur l'admin récurrent, chaque semaine.</p>
        </div>
        <div>
          <h3 class="font-display text-xl font-bold text-brand-700">Centre certifié Qualiopi</h3>
          <p class="mt-2 text-muted"><span class="font-semibold text-ink">Votre réalité :</span> tenir ses preuves toute l'année, et un audit de surveillance lourd (souvent une dizaine d'heures, 3 000 à 4 000 € s'il est externalisé).</p>
          <p class="mt-1 text-muted"><span class="font-semibold text-ink">Ce que l'IA peut changer :</span> une tenue des preuves allégée au fil de l'année, pour aborder l'audit plus sereinement. Nous ne sommes pas un cabinet d'audit Qualiopi : nous vous faisons gagner du temps sur la préparation.</p>
        </div>
        <div>
          <h3 class="font-display text-xl font-bold text-brand-700">Formateur indépendant</h3>
          <p class="mt-2 text-muted"><span class="font-semibold text-ink">Votre réalité :</span> création de supports, prospection, facturation — et vous êtes seul·e.</p>
          <p class="mt-1 text-muted"><span class="font-semibold text-ink">Ce que l'IA peut changer :</span> des supports produits plus vite, des relances et des devis assistés.</p>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Build vert**

Run (depuis `app/`) : `npm run build`
Expected : succès, 0 erreur.

- [ ] **Step 3: Commit**

```bash
git add app/src/pages/index.astro
git commit -m "feat(home): section Profils d'OF (verticalisation par cible)"
```

---

## Task 3: Section Services → fond blanc (alternance)

**Files:**
- Modify: `app/src/pages/index.astro` (la section Services)

- [ ] **Step 1: Retirer le fond crème de la section Services**

La section Services commence aujourd'hui par :
```astro
  <!-- Services (liste éditoriale, pas de grille de cartes) -->
  <section class="bg-cream-100">
```
La remplacer par (fond blanc pour respecter l'alternance, le Calculateur juste après reprendra le crème) :
```astro
  <!-- Services (liste éditoriale, pas de grille de cartes) -->
  <section>
```

- [ ] **Step 2: Build vert**

Run (depuis `app/`) : `npm run build`
Expected : succès.

- [ ] **Step 3: Commit**

```bash
git add app/src/pages/index.astro
git commit -m "style(home): Services sur fond blanc (alternance des sections)"
```

---

## Task 4: Composant calculateur de temps gagné (signature)

**Files:**
- Create: `app/src/components/TimeSavingsCalculator.astro`

- [ ] **Step 1: Créer le composant**

Créer `app/src/components/TimeSavingsCalculator.astro` avec exactement ce contenu :

```astro
---
// Calculateur de temps gagné — signature interactive, sans dépendance.
// MVP : somme simple des fourchettes des tâches cochées (pas de multiplicateur
// "nombre de personnes" pour éviter toute sur-estimation — honnêteté > flatterie).
const HOURLY_RATE = 35; // €/h, coût chargé indicatif (validé Julien)
const tasks = [
  { low: 3, high: 8, label: "Tenir à jour mes preuves & indicateurs Qualiopi (toute l'année)" },
  { low: 4, high: 10, label: 'Créer & mettre à jour mes supports de cours' },
  { low: 3, high: 6, label: 'Suivi administratif des stagiaires (convocations, attestations, émargements)' },
  { low: 2, high: 5, label: 'Emails & relances (prospects, OPCO, financeurs)' },
  { low: 2, high: 5, label: 'Rédiger conventions, programmes, devis' },
  { low: 1, high: 4, label: 'Veille pédagogique / recherche de contenus' },
];
---
<section class="bg-cream-100" aria-labelledby="calc-title">
  <div class="mx-auto max-w-5xl px-4 py-20">
    <h2 id="calc-title" class="font-display text-3xl font-bold text-ink sm:text-4xl">Combien de temps l'IA pourrait vous faire gagner ?</h2>
    <p class="mt-4 max-w-2xl text-lg text-muted">Cochez les tâches qui vous prennent du temps chaque mois. On vous donne une première estimation — on l'affinera ensemble lors de l'audit.</p>

    <div class="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
      <fieldset id="calc-tasks" class="space-y-3 border-0 p-0">
        <legend class="sr-only">Tâches chronophages de votre organisme</legend>
        {tasks.map((t) => (
          <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-sand bg-cream-50 p-4 transition-colors hover:border-brand-300">
            <input type="checkbox" class="calc-task mt-1 h-5 w-5 shrink-0 accent-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" data-low={t.low} data-high={t.high} />
            <span class="text-ink">{t.label}</span>
          </label>
        ))}
      </fieldset>

      <div class="md:sticky md:top-24 md:self-start">
        <div class="rounded-2xl border border-sand bg-white p-6">
          <p class="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">Votre estimation</p>
          <div aria-live="polite">
            <p id="calc-hours" class="mt-3 font-display text-4xl font-extrabold text-ink">—</p>
            <p id="calc-euros" class="mt-1 text-lg text-muted">Cochez vos tâches pour voir l'estimation.</p>
          </div>
          <p class="mt-4 text-sm text-muted">Estimation indicative, à affiner lors de l'audit (base : 35 €/h).</p>
          <noscript><p class="mt-2 text-sm text-muted">Activez JavaScript pour obtenir l'estimation chiffrée.</p></noscript>
          <a href="/contact/" class="mt-6 inline-block rounded-lg bg-brand-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-600">Valider ce potentiel — audit offert</a>
        </div>
      </div>
    </div>
  </div>
</section>

<script is:inline>
  (function () {
    var RATE = 35;
    var boxes = Array.prototype.slice.call(document.querySelectorAll('.calc-task'));
    var hoursEl = document.getElementById('calc-hours');
    var eurosEl = document.getElementById('calc-euros');
    if (!boxes.length || !hoursEl || !eurosEl) return;
    var nf = new Intl.NumberFormat('fr-FR');
    function update() {
      var low = 0, high = 0;
      boxes.forEach(function (b) {
        if (b.checked) {
          low += Number(b.getAttribute('data-low')) || 0;
          high += Number(b.getAttribute('data-high')) || 0;
        }
      });
      if (high === 0) {
        hoursEl.textContent = '—';
        eurosEl.textContent = "Cochez vos tâches pour voir l'estimation.";
        return;
      }
      hoursEl.textContent = nf.format(low) + '–' + nf.format(high) + ' h / mois';
      eurosEl.textContent = '~ ' + nf.format(low * RATE) + '–' + nf.format(high * RATE) + ' € / mois économisés';
      if (window.plausible) window.plausible('Calculator Used');
    }
    boxes.forEach(function (b) { b.addEventListener('change', update); });
  })();
</script>
```

- [ ] **Step 2: Build vert**

Run (depuis `app/`) : `npm run build`
Expected : succès (le composant n'est pas encore importé ; on vérifie juste qu'il compile une fois utilisé en Task 5 — ici le build ignore les composants non importés, donc succès attendu).

- [ ] **Step 3: Commit**

```bash
git add app/src/components/TimeSavingsCalculator.astro
git commit -m "feat: composant calculateur de temps gagné (sans dépendance)"
```

---

## Task 5: Insérer le calculateur dans la page d'accueil + vérifier l'interactivité

**Files:**
- Modify: `app/src/pages/index.astro` (import + insertion après la section Services, avant la section Méthode)

- [ ] **Step 1: Importer le composant**

Dans le frontmatter de `index.astro`, sous la ligne `import heroImg from '../assets/hero.jpg';`, ajouter :
```astro
import TimeSavingsCalculator from '../components/TimeSavingsCalculator.astro';
```

- [ ] **Step 2: Insérer le composant**

Repère : la section Services se termine par `</section>` juste avant le commentaire `<!-- Méthode (stepper, sans cartes) -->`. Insérer **entre les deux** :
```astro
  <!-- Calculateur de temps gagné (signature) -->
  <TimeSavingsCalculator />
```

- [ ] **Step 3: Build vert**

Run (depuis `app/`) : `npm run build`
Expected : succès, le composant est désormais compilé dans la home.

- [ ] **Step 4: Vérifier l'interactivité (check comportemental)**

Run (depuis `app/`) : `npm run preview` (sert `dist/` en local, note l'URL, ex. `http://localhost:4321`).
Puis, via Playwright MCP (ou manuellement) :
1. Ouvrir la home, scroller jusqu'à « Combien de temps l'IA pourrait vous faire gagner ? ».
2. Cocher **« Créer & mettre à jour mes supports de cours »** (4–10) **et** **« Suivi administratif des stagiaires »** (3–6).
3. Vérifier l'affichage : **`7–16 h / mois`** et **`~ 245–560 € / mois économisés`**.
4. Décocher tout → revient à `—` + « Cochez vos tâches pour voir l'estimation. »
Expected : valeurs exactes ci-dessus (low=3+4=7, high=6+10=16 ; €=7×35–16×35).

- [ ] **Step 5: Commit**

```bash
git add app/src/pages/index.astro
git commit -m "feat(home): intègre le calculateur de temps gagné"
```

---

## Task 6: Méthode enrichie (durées + sans engagement)

**Files:**
- Modify: `app/src/pages/index.astro` (section Méthode)

- [ ] **Step 1: Ajouter les durées et la mention sans engagement**

Dans la section Méthode, remplacer les trois `<li>` actuels par ceux-ci (ajout d'une ligne durée sous chaque titre) :
```astro
      <li><div class="font-display text-5xl font-extrabold text-brand-200">1</div><p class="mt-3 font-display text-lg font-bold">On diagnostique</p><p class="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-brand-600">Audit offert · ~1 semaine</p><p class="mt-1 text-muted">On identifie vos opportunités prioritaires et leur ROI.</p></li>
      <li><div class="font-display text-5xl font-extrabold text-brand-200">2</div><p class="mt-3 font-display text-lg font-bold">On met en place</p><p class="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-brand-600">Selon le périmètre</p><p class="mt-1 text-muted">On forme, on automatise, on outille, de bout en bout.</p></li>
      <li><div class="font-display text-5xl font-extrabold text-brand-200">3</div><p class="mt-3 font-display text-lg font-bold">On rend autonome</p><p class="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-brand-600">Sans dépendance</p><p class="mt-1 text-muted">Vos équipes gardent la main, sans dépendance à un prestataire.</p></li>
```

- [ ] **Step 2: Ajouter une ligne « sans engagement » sous le titre de la section**

Juste après `<h2 class="font-display text-3xl font-bold text-ink sm:text-4xl">Notre méthode, en trois temps</h2>`, ajouter :
```astro
    <p class="mt-4 max-w-2xl text-lg text-muted">On commence toujours par un audit offert, sans engagement.</p>
```

- [ ] **Step 3: Build vert**

Run (depuis `app/`) : `npm run build`
Expected : succès.

- [ ] **Step 4: Commit**

```bash
git add app/src/pages/index.astro
git commit -m "feat(home): méthode enrichie (durées + sans engagement)"
```

---

## Task 7: Section « Parlons franchement » (démystification)

**Files:**
- Modify: `app/src/pages/index.astro` (insérer après la section Méthode, avant la section « Pourquoi »)

- [ ] **Step 1: Insérer la section**

Repère : la section Méthode se termine par `</section>` juste avant le commentaire `<!-- Pourquoi (blocs de texte, pas de cartes) -->`. Insérer **entre les deux** :
```astro
  <!-- Parlons franchement (démystification) -->
  <section class="bg-cream-100">
    <div class="mx-auto max-w-5xl px-4 py-20">
      <h2 class="font-display text-3xl font-bold text-ink sm:text-4xl">Parlons franchement</h2>
      <dl class="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-3">
        <div>
          <dt class="font-display text-lg font-bold text-brand-700">L'IA va-t-elle remplacer les formateurs ?</dt>
          <dd class="mt-2 text-muted">Non. Elle enlève l'administratif et la production répétitive. La pédagogie, la relation, l'animation : ça reste vous, et c'est là qu'est votre valeur.</dd>
        </div>
        <div>
          <dt class="font-display text-lg font-bold text-brand-700">Mes données sont-elles en sécurité ?</dt>
          <dd class="mt-2 text-muted">On choisit des outils respectueux du RGPD et on cadre l'usage des données de vos stagiaires. C'est un point qu'on traite dès l'audit, pas après coup.</dd>
        </div>
        <div>
          <dt class="font-display text-lg font-bold text-brand-700">Faut-il être à l'aise avec la technique ?</dt>
          <dd class="mt-2 text-muted">Non. On prend la complexité en charge et on forme vos équipes en langage clair. Vous gardez la main, sans dépendre d'un prestataire.</dd>
        </div>
      </dl>
    </div>
  </section>
```

- [ ] **Step 2: Build vert**

Run (depuis `app/`) : `npm run build`
Expected : succès.

- [ ] **Step 3: Commit**

```bash
git add app/src/pages/index.astro
git commit -m "feat(home): section Parlons franchement (démystification honnête)"
```

---

## Task 8: Section fondateur (remplace « Pourquoi Claude Partners »)

**Files:**
- Modify: `app/src/pages/index.astro` (frontmatter : retirer le tableau `why` ; corps : remplacer la section « Pourquoi »)

- [ ] **Step 1: Retirer le tableau `why` du frontmatter**

Supprimer du frontmatter le bloc :
```astro
const why = [
  { t: "Spécialistes des organismes de formation", d: "On connaît vos contraintes : Qualiopi, pédagogie, administratif. Pas de discours générique." },
  { t: "Orientés résultats", d: "Des gains de temps concrets et mesurables, pas des promesses en l'air." },
  { t: "Vos équipes autonomes", d: "On forme et on outille pour que vous gardiez la main, sans dépendance." },
];
```

- [ ] **Step 2: Remplacer la section « Pourquoi »**

Remplacer toute la section actuelle (du commentaire `<!-- Pourquoi (blocs de texte, pas de cartes) -->` jusqu'à son `</section>` de fermeture) par cette section fondateur. Le texte est factuel (3 leviers validés : expertise OF, construit avec Claude, ancrage local) — **ne rien inventer au-delà**. Le bloc visuel est optionnel et n'importe aucune image (le build reste vert sans photo) :

```astro
  <!-- Pourquoi nous faire confiance (fondateur = la preuve, à 0 client) -->
  <section>
    <div class="mx-auto max-w-5xl px-4 py-20">
      <h2 class="font-display text-3xl font-bold text-ink sm:text-4xl">Pourquoi nous faire confiance</h2>
      <div class="mt-10 grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <!-- Emplacement photo fondateur : déposer app/src/assets/fondateur.webp puis remplacer ce bloc par un <Image/>. -->
        <div class="aspect-[4/5] w-full rounded-2xl border border-sand bg-cream-100" aria-hidden="true"></div>
        <div class="space-y-5 text-lg leading-relaxed text-muted">
          <p>Claude Partners est spécialisé dans un seul monde : <span class="font-semibold text-ink">les organismes de formation</span>. On en connaît les contraintes concrètes — Qualiopi, BPF, suivi des stagiaires, pédagogie, administratif — parce que c'est notre terrain, pas un secteur parmi d'autres.</p>
          <p>Côté technique, on <span class="font-semibold text-ink">construit nos outils avec Claude</span>, le modèle d'Anthropic. C'est ce qui nous permet d'aller vite et de livrer des solutions sur mesure plutôt que des recettes génériques.</p>
          <p>Et on est <span class="font-semibold text-ink">ancré dans le milieu de la formation</span>, proche du terrain et de votre réalité quotidienne.</p>
        </div>
      </div>
    </div>
  </section>
```

> ⚠️ Avant mise en production : Julien peut ajouter une photo et une phrase personnelle (parcours réel). Le texte ci-dessus est volontairement factuel et publiable tel quel — il n'affirme rien de faux.

- [ ] **Step 3: Build vert**

Run (depuis `app/`) : `npm run build`
Expected : succès (aucune image importée → pas d'erreur d'asset).

- [ ] **Step 4: Commit**

```bash
git add app/src/pages/index.astro
git commit -m "feat(home): section fondateur (preuve humaine remplace blocs abstraits)"
```

---

## Task 9: FAQ étendue (3 → 8) + schéma FAQPage

**Files:**
- Modify: `app/src/pages/index.astro` (tableau `faq` dans le frontmatter — le `faqSchema` se régénère automatiquement à partir du tableau)

- [ ] **Step 1: Étendre le tableau `faq`**

Remplacer le tableau `faq` actuel par :
```astro
const faq = [
  { q: "Travaillez-vous uniquement avec des organismes de formation ?", a: "Oui, c'est notre spécialité : nous connaissons vos contraintes (Qualiopi, pédagogie, administratif)." },
  { q: "Faut-il être à l'aise avec la technique ?", a: "Non. Nous prenons en charge la complexité technique et formons vos équipes en langage clair." },
  { q: "Comment démarrer ?", a: "Par un audit offert : on identifie ensemble vos opportunités prioritaires." },
  { q: "Combien ça coûte ?", a: "L'audit de départ est offert et sans engagement. Ensuite, le devis dépend du périmètre : on propose ce qui a le meilleur retour sur le temps gagné, sans vendre l'inutile." },
  { q: "Mes données et celles de mes stagiaires sont-elles protégées ?", a: "Oui. Nous choisissons des outils respectueux du RGPD et cadrons l'usage des données dès l'audit. Vous gardez la maîtrise de vos informations." },
  { q: "L'IA est-elle compatible avec mes obligations Qualiopi ?", a: "Oui. L'IA aide surtout à tenir vos preuves et votre traçabilité au fil de l'année. Nous ne sommes pas un cabinet d'audit Qualiopi : nous vous faisons gagner du temps sur la préparation." },
  { q: "En combien de temps voit-on des résultats ?", a: "Les premières automatisations simples se mettent en place en quelques jours. L'audit fixe les priorités pour des gains rapides dès le départ." },
  { q: "Je suis formateur indépendant, est-ce que c'est pour moi aussi ?", a: "Oui. Quand on travaille seul, le temps gagné sur l'administratif et la création de supports compte double." },
];
```

- [ ] **Step 2: Build vert**

Run (depuis `app/`) : `npm run build`
Expected : succès.

- [ ] **Step 3: Vérifier le JSON-LD FAQPage**

Dans `dist/index.html` généré, vérifier qu'un script `application/ld+json` de type `FAQPage` contient bien les 8 questions (le `faqSchema` mappe le tableau `faq`).
Run (depuis `app/`) :
```bash
node -e "const s=require('fs').readFileSync('dist/index.html','utf8');const m=s.match(/FAQPage/g);console.log('FAQPage occurrences:',m&&m.length)"
```
Expected : au moins 1 occurrence de `FAQPage`.

- [ ] **Step 4: Commit**

```bash
git add app/src/pages/index.astro
git commit -m "feat(home): FAQ étendue à 8 questions (budget, RGPD, Qualiopi, délais...)"
```

---

## Task 10: Composant d'inscription au guide (aimant à leads)

**Files:**
- Create: `app/src/components/GuideSignup.astro`

- [ ] **Step 1: Créer le composant de capture email**

Réutilise le pattern Web3Forms du `ContactForm.astro` (même `access_key` public, redirection `/merci/`, event Plausible). Le script cible **tous** les `.guide-form` de la page (robuste si plusieurs instances). Créer `app/src/components/GuideSignup.astro` :

```astro
---
// Capture email pour le guide (aimant à leads). Réutilisable : bandeau home + page /guide.
interface Props { idSuffix?: string; }
const { idSuffix = 'band' } = Astro.props;
const formId = `guide-form-${idSuffix}`;
---
<form id={formId} action="https://api.web3forms.com/submit" method="POST" class="guide-form flex flex-col gap-3 sm:flex-row">
  <input type="hidden" name="access_key" value="3e5769c5-994f-4c15-8f58-c18cad18c96d" />
  <input type="hidden" name="subject" value="Demande de guide IA — claudepartners.fr" />
  <input type="hidden" name="from_name" value="Guide IA — organismes de formation" />
  <input type="hidden" name="redirect" value="https://claudepartners.fr/merci/" />
  <input type="checkbox" name="botcheck" class="hidden" style="display:none" tabindex="-1" autocomplete="off" />
  <label for={`${formId}-email`} class="sr-only">Votre email professionnel</label>
  <input type="email" id={`${formId}-email`} name="email" required autocomplete="email" spellcheck="false" placeholder="Votre email professionnel"
         class="w-full rounded-lg border border-sand bg-white px-4 py-3 focus:border-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" />
  <button type="submit" class="shrink-0 rounded-lg bg-brand-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70">Recevoir le guide</button>
</form>
<p class={`guide-result-${idSuffix} mt-2 text-sm`} role="status" aria-live="polite"></p>

<script is:inline>
  (function () {
    var forms = Array.prototype.slice.call(document.querySelectorAll('.guide-form'));
    forms.forEach(function (form) {
      var suffix = form.id.replace('guide-form-', '');
      var result = document.querySelector('.guide-result-' + suffix);
      var btn = form.querySelector('button[type="submit"]');
      var btnLabel = btn ? btn.textContent : '';
      var genericError = "Une erreur est survenue. Réessayez ou écrivez-nous à contact@claudepartners.fr.";
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var json = JSON.stringify(Object.fromEntries(new FormData(form)));
        if (btn) { btn.disabled = true; btn.textContent = 'Envoi…'; }
        if (result) { result.textContent = 'Envoi en cours…'; result.className = 'guide-result-' + suffix + ' mt-2 text-sm text-muted'; }
        fetch('https://api.web3forms.com/submit', {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: json
        }).then(function (res) { return res.json().then(function (data) { return { ok: res.status === 200, data: data }; }); })
          .then(function (r) {
            if (r.ok) {
              if (result) { result.textContent = 'Merci ! On vous envoie le guide par email.'; result.className = 'guide-result-' + suffix + ' mt-2 text-sm text-green-700'; }
              form.reset();
              if (window.plausible) window.plausible('Guide Signup');
            } else if (result) { result.textContent = r.data.message || genericError; result.className = 'guide-result-' + suffix + ' mt-2 text-sm text-red-700'; }
          })
          .catch(function () { if (result) { result.textContent = genericError; result.className = 'guide-result-' + suffix + ' mt-2 text-sm text-red-700'; } })
          .then(function () { if (btn) { btn.disabled = false; btn.textContent = btnLabel; } });
      });
    });
  })();
</script>
```

- [ ] **Step 2: Build vert**

Run (depuis `app/`) : `npm run build`
Expected : succès.

- [ ] **Step 3: Commit**

```bash
git add app/src/components/GuideSignup.astro
git commit -m "feat: composant GuideSignup (capture email Web3Forms réutilisable)"
```

---

## Task 11: Bandeau guide sur la page d'accueil

**Files:**
- Modify: `app/src/pages/index.astro` (import + insertion après la section fondateur, avant la FAQ)

- [ ] **Step 1: Importer le composant**

Dans le frontmatter de `index.astro`, sous l'import de `TimeSavingsCalculator`, ajouter :
```astro
import GuideSignup from '../components/GuideSignup.astro';
```

- [ ] **Step 2: Insérer le bandeau guide**

Repère : insérer juste avant le commentaire `<!-- FAQ -->`. Ajouter :
```astro
  <!-- Guide gratuit (aimant à leads) -->
  <section class="bg-cream-100">
    <div class="mx-auto max-w-4xl px-4 py-20">
      <div class="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <h2 class="font-display text-3xl font-bold text-ink sm:text-4xl">Le guide : intégrer l'IA dans votre organisme de formation</h2>
          <p class="mt-4 text-lg text-muted">Par où commencer, quelles tâches déléguer à l'IA, ce qu'il faut éviter. Concret, pensé pour les OF. Recevez-le par email.</p>
        </div>
        <div>
          <GuideSignup idSuffix="band" />
          <a href="/guide/" class="mt-3 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700">Voir ce que contient le guide <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 3: Build vert**

Run (depuis `app/`) : `npm run build`
Expected : succès.

- [ ] **Step 4: Commit**

```bash
git add app/src/pages/index.astro
git commit -m "feat(home): bandeau guide (aimant à leads)"
```

---

## Task 12: Page `/guide` (landing aimant à leads, indexable SEO)

**Files:**
- Create: `app/src/pages/guide.astro`

- [ ] **Step 1: Créer la page**

Créer `app/src/pages/guide.astro`. Réutilise `BaseLayout` et `GuideSignup`. Honnêteté : le PDF n'étant pas encore produit, la page annonce la réception par email (« en avant-première » si besoin) — ne pas proposer de faux téléchargement.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import GuideSignup from '../components/GuideSignup.astro';

const sommaire = [
  "Les 5 tâches d'un OF où l'IA fait gagner le plus de temps",
  "Par où commencer sans bouleverser votre organisation",
  "Tenir ses preuves Qualiopi au fil de l'année avec l'IA",
  "RGPD et données des stagiaires : les bons réflexes",
  "Les pièges à éviter quand on se lance",
];
---
<BaseLayout
  title="Guide : intégrer l'IA dans votre organisme de formation"
  description="Le guide gratuit pour les organismes de formation : par où commencer avec l'IA, quelles tâches déléguer, ce qu'il faut éviter. Reçu par email."
>
  <section class="mx-auto max-w-3xl px-4 py-20">
    <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Guide gratuit</p>
    <h1 class="mt-5 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">Intégrer l'IA dans votre organisme de formation</h1>
    <p class="mt-6 text-lg leading-relaxed text-muted">Un guide clair et concret, pensé pour les OF : ce que l'IA peut vraiment vous faire gagner, par où commencer, et les erreurs à éviter. Sans jargon, sans survente.</p>

    <h2 class="mt-12 font-display text-2xl font-bold text-ink">Ce que vous y trouverez</h2>
    <ul class="mt-6 space-y-3">
      {sommaire.map((s) => (
        <li class="flex items-start gap-3 text-muted">
          <span aria-hidden="true" class="mt-1 text-brand-500">→</span>
          <span>{s}</span>
        </li>
      ))}
    </ul>

    <div class="mt-12 rounded-2xl border border-sand bg-cream-100 p-6 sm:p-8">
      <h2 class="font-display text-xl font-bold text-ink">Recevez le guide par email</h2>
      <p class="mt-2 text-muted">Laissez votre email professionnel, on vous l'envoie.</p>
      <div class="mt-5"><GuideSignup idSuffix="page" /></div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Build vert + page générée**

Run (depuis `app/`) : `npm run build`
Expected : succès, et `dist/guide/index.html` est généré (vérifier sa présence).

- [ ] **Step 3: Vérifier la capture (check comportemental léger)**

Via `npm run preview` + Playwright MCP (ou manuel) : ouvrir `/guide/`, saisir un email valide, soumettre. Vérifier que le message de statut passe à « Envoi en cours… » (le POST réel part vers Web3Forms ; ne pas spammer — un seul essai suffit, ou se contenter de vérifier le rendu + la validation HTML5 du champ email).
Expected : champ email requis fonctionnel, bouton réactif, zone `role="status"` mise à jour.

- [ ] **Step 4: Commit**

```bash
git add app/src/pages/guide.astro
git commit -m "feat: page /guide (landing aimant à leads, indexable)"
```

---

## Task 13: Hero — micro-ligne de crédibilité

**Files:**
- Modify: `app/src/pages/index.astro` (sous les CTA du hero)

- [ ] **Step 1: Ajouter la micro-ligne**

Dans le hero, juste après la `</div>` qui ferme le bloc des deux boutons (`<div class="mt-9 flex flex-wrap gap-3"> ... </div>`), ajouter :
```astro
        <p class="mt-4 text-sm text-muted">Spécialiste des organismes de formation · Audit offert · Sans engagement</p>
```

- [ ] **Step 2: Build vert**

Run (depuis `app/`) : `npm run build`
Expected : succès.

- [ ] **Step 3: Commit**

```bash
git add app/src/pages/index.astro
git commit -m "feat(home): micro-ligne de crédibilité sous le hero"
```

---

## Task 14: Vérification finale (ordre, build, honnêteté, SEO)

**Files:** aucun (revue + checks).

- [ ] **Step 1: Vérifier l'ordre des sections de la home**

Ouvrir `app/src/pages/index.astro` et confirmer l'ordre : Hero → Problème → Profils d'OF → Services → Calculateur → Méthode → Parlons franchement → Fondateur → Guide → FAQ → CTA. Et l'alternance des fonds (cream/blanc) telle que définie dans les notes d'exécution.

- [ ] **Step 2: Build de production vert**

Run (depuis `app/`) : `npm run build`
Expected : succès, 0 erreur. Le nombre de pages a augmenté de 1 (ajout de `/guide`).

- [ ] **Step 3: Audit honnêteté (grep des formulations interdites)**

Run (depuis `C:\Users\julien\CLAUDEPARTNERS`) — vérifier qu'aucune preuve sociale fictive n'a été introduite :
```bash
git grep -nE "nos clients|ils nous font confiance|déjà accompagné|clients satisfaits|témoignage" -- app/src/pages/index.astro app/src/pages/guide.astro
```
Expected : **aucun résultat** (sinon, corriger).

- [ ] **Step 4: Vérifier que les chiffres du calculateur sont bien étiquetés**

Confirmer visuellement (ou via grep) que la mention « Estimation indicative » est présente dans le composant calculateur.
```bash
git grep -n "Estimation indicative" -- app/src/components/TimeSavingsCalculator.astro
```
Expected : 1 résultat.

- [ ] **Step 5: Revue visuelle responsive**

Via `npm run preview` + Playwright MCP : prendre un screenshot mobile (375px) et desktop (1280px) de la home, vérifier qu'aucune section ne casse (calculateur en colonne sur mobile, profils en 1 colonne, etc.).

- [ ] **Step 6: Commit final éventuel + résumé**

S'il reste des ajustements visuels, les commiter :
```bash
git add -A
git commit -m "fix(home): ajustements responsive post-revue"
```
Sinon, signaler que la branche `feat/ameliorations-acquisition` est prête pour revue/merge.

---

## Couverture spec → tâches (auto-revue)

| Exigence spec | Tâche(s) |
|---|---|
| §4 nouveau déroulé / ordre + alternance | Task 2,3,5,6,7,8,11,13,14 |
| §5 Profils d'OF (verticalisation) | Task 2 |
| §6 Calculateur (sans dépendance, a11y, honnêteté, dégradation) | Task 4,5 |
| §6 libellés en clair + fourchettes + 35 €/h | Task 4 |
| §7 Parlons franchement (démystification) | Task 7 |
| §8 Section fondateur (preuve humaine, factuelle) | Task 8 |
| §9 Guide : bandeau home + page /guide + capture Web3Forms | Task 10,11,12 |
| §10 FAQ étendue + schéma FAQPage | Task 9 |
| §11 Garde-fous honnêteté (audit) | Task 8,14 |
| Hero micro-ligne crédibilité | Task 13 |
| Méthode durées + sans engagement | Task 6 |
| Build vert / non-régression | toutes (+ Task 14) |

## Hors périmètre (Phase 2 — non couvert ici, voir spec §14)
Pages SEO par profil d'OF · démo avant/après animée · tableau comparatif · llms.txt/GEO · articles de fond · réintroduction preuve sociale réelle après premières missions.
