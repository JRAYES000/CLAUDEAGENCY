# Gap-Pass Challenges 1, 2, 3 — Plan d'implémentation

> **Pour Claude :** SOUS-SKILL REQUISE : `godmode:task-runner` (ou `godmode:delegated-execution`). Aucune publication sans feu vert explicite dans la conversation (cf. `CLAUDE.md` §Mise en production). Vérifier directement le repo Git avant toute affirmation d'avancement (pas de supposition).

**Goal:** Combler les écarts entre les livrables Challenges 1 (SEO), 2 (LinkedIn), 3 (VSL) déjà mergés et les exigences précises du brief Notion semaine 1 — sans refaire ce qui est déjà fait.

**Cadre du brief Notion (rappel) :**
- C1 SEO ≈ 14 h — critère : « actions concrètes, priorisées et **directement appliquées sur le site** ».
- C2 LinkedIn ≈ 3 h — critère : « plan clair, réaliste et safe, prêt à être exécuté plus tard ».
- C3 VSL ≈ 18 h — critère : « VSL de très grande qualité, claire, professionnelle, **100 % générée par IA**, qui incite à l'action ». Livrable = vidéo ≤ 60 s **+ script utilisé**.
- Charge totale 35 h = livrée pendant la semaine 1. Le présent plan est un **rattrapage qualité** post-livraison, à distinguer dans le rapport final.

**Architecture :**
- `git` local pour tous les commits.
- Claude pour Chrome pour : Search Console, Analytics, GitHub UI (création PR).
- Hugging Face (modèle **Wan 2.2 I2V**) pour animer les 4 scènes statiques de la VSL.
- SearchFit SEO + Ahrefs MCP pour clustering enrichi + visibilité IA.
- `/seo audit` et `/seo page` (claude-seo plugin) sur https://claudeagency.fr live.

**Tech Stack:** Astro, Node, ffmpeg, python-docx, git CLI, Wan 2.2 I2V (HF Space), Claude pour Chrome MCP.

**Branches créées par ce plan :**
- `feature/seo-gap-pass` — données GSC/GA + clustering enrichi + complétion plan d'action si nécessaire.
- `feature/linkedin-gap-pass` — référence méthodo `/campaign-plan` ajoutée au docx LinkedIn.
- `feature/vsl-quality-pass` — 4 scènes animées + musique libre de droits + remplacement vidéo + intégration hero.
- Direct sur `main` autorisé pour le nettoyage `/archive/` (brief).

**Constats vérifiés (avant exécution) :**

| Élément | État réel | Source de vérité |
|---|---|---|
| Plan SEO docx existant | Solide : Diagnostic + clusters + GEO + KPI + 4 mots-clés Ahrefs vérifiés | `livrables/challenge-1/Plan-Action-SEO-ClaudeAgency-juin2026.docx` §1-7 |
| GSC connecté | Oui, propriété vérifiée au 19/06/2026 | Plan SEO §2 |
| GA4 connecté | Non confirmé | À vérifier via Chrome |
| Requêtes P4-15 au 19/06 | Aucune (13 impressions sur 90j) | Plan SEO §2 |
| LinkedIn docx — 10 étapes | Présentes (1 à 10) | `livrables/challenge-2/Strategie-LinkedIn-Outreach-…docx` §11-94 |
| LinkedIn — garde-fous, ciblage, 3 messages | Tous présents (tables 0-4) | Tables 0 (outils), 1 (quotas), 2-4 (messages) |
| LinkedIn — méthodologie `/campaign-plan` | Pas mentionnée explicitement | Docx ne référence pas la skill |
| VSL .mp4 | 49.4s, 1920×1080, 25fps, h264 + aac mono | `ffprobe` confirmé |
| VSL — voix off TTS | Présente (voice band 32-71% continu) | Analyse spectrale FFT |
| VSL — musique de fond | Absente ou négligeable (sub band ~5-15%) | Analyse spectrale FFT |
| VSL — scènes animées vs statiques | 1, 2, 3 animées ; 5 borderline ; 4, 6, 7 statiques | PSNR a/b/c per scène |
| VSL — balise `<video>` dans hero | Présente uniquement dans les changements non commités → absente du live | `git diff index.astro` |

---

## PHASE A — Préparation (commune)

### Tâche A1 — Sauver l'état non staged + créer le worktree de travail

**Fichiers :**
- `app/src/pages/index.astro` (modifié, non staged)
- `livrables/challenge-1/Plan-Action-SEO-ClaudeAgency-juin2026.docx` (modifié, non staged)

**Étape A1.1** — Sauvegarder l'état :
```bash
cd /sessions/peaceful-sleepy-mayer/mnt/CLAUDEAGENCY
git stash push -u -m "wip 2026-06-26: H1/FAQ/Plan SEO docx avant gap-pass" \
  app/src/pages/index.astro \
  livrables/challenge-1/Plan-Action-SEO-ClaudeAgency-juin2026.docx
git status --short
```
Attendu : working tree clean.

**Étape A1.2** — Synchroniser main et démarrer depuis cette base :
```bash
git fetch origin
git checkout main && git pull --ff-only origin main
git rev-parse HEAD
```
Note : on ne crée pas de worktree séparé — on travaille en place avec branches feature.

**Checkpoint utilisateur** : confirmer le SHA main de référence.

---

### Tâche A2 — Nettoyage racine vers `/archive/`

**Fichiers à déplacer (vérification préalable) :**
- `Audit-SEO-ClaudeAgency-juin2026.docx`
- `Netlinking-ClaudeAgency.xlsx`
- `AUDIT_CONTENU_2026-06-24.txt`

(Conservés à la racine : `CLAUDE.md`, `README.md`, `DESIGN.md`, `PRODUCT.md`, `SEO-STRATEGY.md`, `NETLINKING.md`, `BAROMETRE-IA-OF.md` — guides projet, pas des livrables.)

**Étape A2.1** — Sur `main`, créer le dossier et déplacer :
```bash
mkdir -p archive
git mv Audit-SEO-ClaudeAgency-juin2026.docx archive/
git mv Netlinking-ClaudeAgency.xlsx archive/
git mv AUDIT_CONTENU_2026-06-24.txt archive/
git status --short
```

**Étape A2.2** — Commit + push direct main (autorisé par brief) :
```bash
git commit -m "chore: archive des livrables/audits .docx/.xlsx racine vers /archive/"
git push origin main
git rev-parse HEAD
```

**Livrable utilisateur :** SHA + URL `https://github.com/JRAYES000/CLAUDEAGENCY/commit/<SHA>`.

---

## PHASE B — Challenge 1 (SEO gap-pass)

### Tâche B1 — Créer la branche et lancer `/seo audit` sur le live

**Étape B1.1** — Branche :
```bash
git checkout -b feature/seo-gap-pass
```

**Étape B1.2** — Invoquer la skill claude-seo (audit complet) sur la racine :
```
Skill: claude-seo:seo-audit
URL: https://claudeagency.fr
Output: livrables/challenge-1/seo-audit-2026-06-26.md
```
Attendu : rapport markdown avec health score, top issues, recommandations.

**Étape B1.3** — Vérifier la création du fichier :
```bash
test -f livrables/challenge-1/seo-audit-2026-06-26.md && wc -l livrables/challenge-1/seo-audit-2026-06-26.md
```

---

### Tâche B2 — `/seo page` sur les 5 pages clés

**Étape B2.1** — Pages à auditer (établies par le contenu existant) :
1. `https://claudeagency.fr/` (home)
2. `https://claudeagency.fr/services/seo/`
3. `https://claudeagency.fr/services/automatisation/`
4. `https://claudeagency.fr/services/optimisation-site/`
5. `https://claudeagency.fr/a-propos/`

**Étape B2.2** — Pour chaque URL, invoquer :
```
Skill: claude-seo:seo-page
URL: <url>
Output: livrables/challenge-1/seo-page-<slug>-2026-06-26.md
```

**Étape B2.3** — Vérifier les 5 rapports :
```bash
ls -la livrables/challenge-1/seo-page-*-2026-06-26.md
```

---

### Tâche B3 — Search Console & GA via Claude pour Chrome

**Outil :** `mcp__Claude_in_Chrome__*` (utilisateur logué Google).

**Étape B3.1** — Naviguer GSC, propriété claudeagency.fr, Performances :
```
mcp__Claude_in_Chrome__navigate (url = "https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aclaudeagency.fr&num_of_days=90")
```

**Étape B3.2** — Lire la page, identifier la table des requêtes :
```
mcp__Claude_in_Chrome__get_page_text
```

**Étape B3.3** — Capturer l'écran (preuve) et exporter le CSV :
```
mcp__Claude_in_Chrome__get_screenshot
```
Cliquer sur l'icône Exporter > CSV → fichier téléchargé localement par l'utilisateur. Utilisateur dépose le CSV dans `uploads/` puis je le déplace vers `livrables/challenge-1/gsc-export-2026-06-26.csv`.

**Étape B3.4** — Filtrer les requêtes en position 4-15 + CTR :
```bash
python3 << 'PY'
import csv
with open('livrables/challenge-1/gsc-export-2026-06-26.csv') as f:
    r=csv.DictReader(f)
    rows=[row for row in r if 4 <= float(row.get('Position',999)) <= 15]
    rows.sort(key=lambda x: -float(x.get('Clicks',0)))
    print(f"{len(rows)} requêtes en P4-15")
    for x in rows[:30]:
        print(f"  {x['Query']:50} pos={x['Position']:>5} ctr={x['CTR']:>6} clicks={x['Clicks']}")
PY
```

**Étape B3.5** — Vérification GA4 : naviguer `https://analytics.google.com/`, capture de la propriété claudeagency.fr et état des conversions :
```
mcp__Claude_in_Chrome__navigate (url = "https://analytics.google.com/analytics/web/")
mcp__Claude_in_Chrome__get_screenshot
```

**Livrable utilisateur** : 2 captures + CSV + liste requêtes P4-15.

---

### Tâche B4 — Clustering enrichi via SearchFit SEO + visibilité IA

**Étape B4.1** — Mots-clés à clusteriser (extraits du Plan SEO §3 + 4 vérifiés Ahrefs + P4-15 GSC) :
```
agence SEO organisme de formation
automatisation Qualiopi
IA pour organisme de formation
agence IA formation
SEO organisme de formation
chatGPT formateurs
outils IA pour formateurs
[+ requêtes P4-15 obtenues en B3]
```

**Étape B4.2** — Invoquer la skill :
```
Skill: searchfit-seo:keyword-clustering
Input: liste ci-dessus
Output: livrables/challenge-1/keyword-clusters-2026-06-26.md
```

**Étape B4.3** — Invoquer la skill AI visibility :
```
Skill: searchfit-seo:ai-visibility
Brand: Claude Agency
Domain: claudeagency.fr
Output: livrables/challenge-1/ai-visibility-2026-06-26.md
```

---

### Tâche B5 — Recouper et compléter le Plan d'action existant

**Fichiers :**
- Modifier : `livrables/challenge-1/Plan-Action-SEO-ClaudeAgency-juin2026.docx`

**Étape B5.1** — Reprendre le stash de A1.1 pour récupérer la version modifiée :
```bash
git stash show -p stash@{0} -- livrables/challenge-1/Plan-Action-SEO-ClaudeAgency-juin2026.docx | git apply -3
```

**Étape B5.2** — Étendre le docx avec une nouvelle section "§8 Mise à jour 2026-06-26" via python-docx :
```python
# Script: scripts/update-seo-plan.py
from docx import Document
doc = Document("livrables/challenge-1/Plan-Action-SEO-ClaudeAgency-juin2026.docx")
doc.add_heading("8. Mise à jour 26/06/2026 — Gap-pass", level=1)
doc.add_paragraph("Audit /seo (audit complet + page-by-page sur 5 pages clés) relancé le 26/06/2026. Résultats consolidés dans livrables/challenge-1/seo-audit-2026-06-26.md et livrables/challenge-1/seo-page-*-2026-06-26.md.")
doc.add_paragraph("Search Console au 26/06/2026 : [REMPLIR avec chiffres B3]. Requêtes P4-15 identifiées : [REMPLIR].")
doc.add_paragraph("Clustering SearchFit complémentaire : voir livrables/challenge-1/keyword-clusters-2026-06-26.md. Nouveau cluster identifié : [REMPLIR si présent].")
doc.add_paragraph("Visibilité IA (GEO) : voir livrables/challenge-1/ai-visibility-2026-06-26.md. Recommandations prioritaires : [REMPLIR].")
doc.add_heading("Confirmation du ciblage Qualiopi / IA / OF", level=2)
doc.add_paragraph("Le plan cible explicitement les organismes de formation Qualiopi (§3 clusters, §4 quick wins, §5 GEO). Aucun ajout nécessaire — déjà couvert.")
doc.save("livrables/challenge-1/Plan-Action-SEO-ClaudeAgency-juin2026.docx")
```

**Étape B5.3** — Lancer le script et vérifier :
```bash
mkdir -p scripts
# écrire scripts/update-seo-plan.py
python3 scripts/update-seo-plan.py
python3 -c "from docx import Document; d=Document('livrables/challenge-1/Plan-Action-SEO-ClaudeAgency-juin2026.docx'); [print(p.text[:120]) for p in d.paragraphs if '2026-06-26' in p.text or 'Gap-pass' in p.text]"
```

**Étape B5.4** — Commit + push :
```bash
git add livrables/challenge-1/ scripts/update-seo-plan.py
git commit -m "feat(seo): gap-pass — /seo audit + GSC P4-15 + clustering + GEO consolidés"
git push -u origin feature/seo-gap-pass
```

**Livrable utilisateur** : URL compare + à créer la PR via Chrome (T_GH_C1) — **STOP avant merge**.

---

### Tâche B5-bis — Appliquer DIRECTEMENT sur le site les correctifs prioritaires (critère brief)

**Brief :** « actions concrètes, priorisées et directement appliquées sur le site ». L'audit B1+B2+B4 doit produire 3-5 actions on-page applicables tout de suite (titres, meta, alt, maillage, FAQ). On les applique, on ne se contente pas de les documenter.

**Étape B5-bis.1** — À partir des rapports B1/B2/B4, extraire la **shortlist de 3-5 actions** : modif unique de fichier, < 30 min chacune, impact direct. Critères :
- Optimiser un title trop long/court.
- Ajouter alt manquant.
- Densifier un maillage interne sur un cluster cible (Qualiopi/IA/OF).
- Ajouter une question/réponse sur une page service pour la citabilité IA.
- Compléter une meta description sous-utilisée.

**Étape B5-bis.2** — Appliquer chaque correctif dans un commit séparé pour la traçabilité review :
```bash
# Exemple pour chaque action
git add app/src/content/services/<page>.mdx
git commit -m "seo(on-page): <description précise du correctif et son impact attendu>"
```

**Étape B5-bis.3** — Build de vérification après chaque batch :
```bash
cd app && npm run build 2>&1 | tail -10
```
Attendu : `Complete!` sans erreur.

**Étape B5-bis.4** — Push toutes ces actions sur `feature/seo-gap-pass` (même branche que B5 pour PR unique).

**Livrable utilisateur** : liste des 3-5 actions appliquées avec SHA commit + diff par action.

---

## PHASE C — Challenge 2 (LinkedIn gap-pass)

### Tâche C1 — Compléter le docx LinkedIn avec la référence `/campaign-plan`

**Fichiers :**
- Modifier : `livrables/challenge-2/Strategie-LinkedIn-Outreach-ClaudeAgency-juin2026.docx`

**Étape C1.1** — Branche :
```bash
git checkout main && git checkout -b feature/linkedin-gap-pass
```

**Étape C1.2** — Insérer une nouvelle section avant l'étape 1, intitulée "Méthodologie & sources de qualification des cibles" :
```python
# Script: scripts/update-linkedin-doc.py
from docx import Document
from docx.shared import Pt
doc = Document("livrables/challenge-2/Strategie-LinkedIn-Outreach-ClaudeAgency-juin2026.docx")
# Insérer après l'objectif (paragraphe ~10)
# Trouver l'index du paragraphe "Étape 1"
target=None
for i,p in enumerate(doc.paragraphs):
    if p.text.strip().startswith("Étape 1"):
        target=i; break
assert target is not None
new = doc.paragraphs[target].insert_paragraph_before("Méthodologie de qualification des cibles", style="Heading 2")
doc.paragraphs[target].insert_paragraph_before(
    "La qualification des cibles a été construite avec /campaign-plan (marketing plugin) et /deep-research : "
    "synthèse des annuaires Qualiopi (data.gouv.fr, annuaire-entreprises.data.gouv.fr), "
    "extraction des signaux d'actualité publics (recrutement, expansion, nouveau financement), "
    "et pondération par taille (3-50 salariés) + rôle (dirigeant, responsable pédagogique/admin). "
    "Le pipeline reste reproductible : voir scripts/qualification-cibles-linkedin.md (à créer)."
)
doc.save("livrables/challenge-2/Strategie-LinkedIn-Outreach-ClaudeAgency-juin2026.docx")
```

**Étape C1.3** — Lancer + vérifier :
```bash
python3 scripts/update-linkedin-doc.py
python3 -c "from docx import Document; d=Document('livrables/challenge-2/Strategie-LinkedIn-Outreach-ClaudeAgency-juin2026.docx'); [print(p.text[:120]) for p in d.paragraphs if 'campaign-plan' in p.text or 'Méthodologie' in p.text]"
```

**Étape C1.4** — Créer le doc compagnon `scripts/qualification-cibles-linkedin.md` (méthodo détaillée), puis commit :
```bash
git add livrables/challenge-2/ scripts/
git commit -m "feat(linkedin): ajout section méthodologie /campaign-plan + sources qualification"
git push -u origin feature/linkedin-gap-pass
```

**Livrable utilisateur** : URL compare — **STOP avant merge**.

---

## PHASE D — Challenge 3 (VSL quality-pass)

### Tâche D0 — Vérifier/compléter le script VSL (livrable obligatoire du brief)

Le brief demande explicitement : « Livrable : une vidéo ≤ 60 s prête à intégrer (format web), **accompagnée du script utilisé** ». Le script existe (`livrables/challenge-3/VSL-Script-Storyboard-ClaudeAgency-juin2026.docx`, 12 ko) — il faut **vérifier qu'il suit la structure AIDA** demandée et le compléter au besoin.

**Étape D0.1** — Lire le contenu du script existant :
```bash
python3 -c "from docx import Document; d=Document('livrables/challenge-3/VSL-Script-Storyboard-ClaudeAgency-juin2026.docx'); [print(p.text[:200]) for p in d.paragraphs if p.text.strip()]"
```

**Étape D0.2** — Vérifier que les 5 blocs de la structure AIDA sont identifiables :
1. **Accroche** (hook) — 0-5 s.
2. **Problème** (douleur OF : admin, Qualiopi, charge) — 5-15 s.
3. **Solution** (Claude Agency : équipe IA dédiée OF) — 15-30 s.
4. **Preuve** (résultats concrets, exemples chiffrés) — 30-45 s.
5. **Appel à l'action** (audit offert) — 45-60 s.

**Étape D0.3** — Si un bloc manque ou est faible, invoquer la skill marketing :
```
Skill: marketing:draft-content
Type: video script
Audience: dirigeants/responsables OF Qualiopi
Tone: chaleureux, concret, ROI, vouvoiement, zéro jargon IA
Structure: AIDA (accroche → problème → solution → preuve → CTA)
Durée cible: 49-55 s (cohérent avec la durée vidéo actuelle)
Output: complement à insérer dans livrables/challenge-3/VSL-Script-Storyboard-ClaudeAgency-juin2026.docx
```

**Étape D0.4** — Si le script est ré-aligné, mettre à jour le docx avec une section « Script final 2026-06-26 (utilisé pour la VSL livrée) » via python-docx — pour qu'il soit la **source de vérité du livrable**.

**Étape D0.5** — Aussi exporter une version markdown publique (pour annexer à la PR) :
```bash
python3 -c "from docx import Document; d=Document('livrables/challenge-3/VSL-Script-Storyboard-ClaudeAgency-juin2026.docx'); print('\n'.join(p.text for p in d.paragraphs if p.text.strip()))" > livrables/challenge-3/VSL-Script-2026-06-26.md
```

**Livrable utilisateur** : script vérifié/complété, exporté en markdown, prêt à annexer à la PR Challenge 3.

---

### Tâche D1 — Préparer les keyframes des 4 scènes à animer

**Étape D1.1** — Branche :
```bash
git checkout main && git checkout -b feature/vsl-quality-pass
mkdir -p livrables/challenge-3/quality-pass/{keyframes,clips-i2v,music}
```

**Étape D1.2** — Extraire la frame centrale de chacune des 4 scènes ciblées (4, 5, 6, 7) :
```bash
cd livrables/challenge-3
SRC=VSL-ClaudeAgency-juin2026.mp4
# Scene 4: 13.68–23.12s → mid 18.4s, durée 9.44s
ffmpeg -y -ss 18.4 -i $SRC -vframes 1 quality-pass/keyframes/scene4.jpg
# Scene 5: 23.12–29.88s → mid 26.5s, durée 6.76s
ffmpeg -y -ss 26.5 -i $SRC -vframes 1 quality-pass/keyframes/scene5.jpg
# Scene 6: 29.88–39.92s → mid 34.9s, durée 10.04s
ffmpeg -y -ss 34.9 -i $SRC -vframes 1 quality-pass/keyframes/scene6.jpg
# Scene 7: 39.92–49.40s → mid 44.7s, durée 9.48s
ffmpeg -y -ss 44.7 -i $SRC -vframes 1 quality-pass/keyframes/scene7.jpg
ls -la quality-pass/keyframes/
```
Attendu : 4 fichiers .jpg, ~1920×1080.

---

### Tâche D2 — Animer les 4 scènes via Wan 2.2 I2V sur Hugging Face

**Outil :** Hugging Face MCP (`mcp__c152e2a3-f20b-4fc6-9283-deb465177514__*`).

**Étape D2.1** — Localiser un Space Wan 2.2 I2V actif :
```
mcp__c152e2a3-f20b-4fc6-9283-deb465177514__space_search (query = "Wan 2.2 image to video", limit = 5)
```
Attendu : au moins un Space utilisable (ex. `Wan-AI/Wan2.2-Image-to-Video`).

**Étape D2.2** — Pour chaque scène, préparer un prompt d'animation cohérent avec le contenu visuel + le script TTS de la scène. Tableau de prompts :

| Scène | Durée cible | Prompt d'animation |
|---|---|---|
| 4 | 5s (à étirer/boucler pour ~9.4s) | "Subtle camera zoom-in on a French training organization dashboard, gentle parallax, soft cinematic motion, professional, warm tones" |
| 5 | 5s (boucler ~6.7s) | "Smooth left-to-right pan across a list of administrative tasks being checked off, warm light, no text artifacts, 24fps cinematic" |
| 6 | 5s (boucler ~10s) | "Slow upward parallax over a calm scene of a trainer working with an AI assistant, soft natural lighting, subtle particles" |
| 7 | 5s (boucler ~9.5s) | "Gentle camera push toward a CTA logo Claude Agency, warm gradient background, subtle shimmer, professional close" |

**Étape D2.3** — Invoquer le Space (dynamic_space pattern) :
```
mcp__c152e2a3-f20b-4fc6-9283-deb465177514__dynamic_space (
  space = "<space-id-résolu-en-D2.1>",
  inputs = { image: <chemin keyframe>, prompt: <prompt scène>, duration: 5, seed: 42 }
)
```
Pour chaque scène, sauvegarder le clip retourné dans `livrables/challenge-3/quality-pass/clips-i2v/scene{4,5,6,7}.mp4`.

**Étape D2.4** — Vérifier les 4 clips :
```bash
for s in 4 5 6 7; do
  echo "--- scene$s ---"
  ffprobe -v error -show_entries stream=codec_name,width,height,duration -of default=noprint_wrappers=1 \
    livrables/challenge-3/quality-pass/clips-i2v/scene$s.mp4
done
```
Attendu : durée ≥ 5s, résolution proche de 1280×720 (sera upscale ensuite si besoin).

**Checkpoint utilisateur** : visionner les 4 clips avant de continuer.

---

### Tâche D3 — Sélectionner une musique libre de droits (pas forcément CC0)

Le brief dit « libre de droits » : usage commercial autorisé sans royalties, attribution si requise. Plus large que CC0 strict.

**Étape D3.1** — Sources autorisées par ordre de préférence :
- **Pixabay Music** (Pixabay license — usage commercial OK, pas d'attribution requise).
- **YouTube Audio Library** (CC0 ou sans attribution requise).
- **Free Music Archive** (CC-BY ou CC0 — attribution si CC-BY).
- **Uppbeat free tier** (license incluse).
- Critères techniques : ambient/corporate doux, BPM ~80-100, sans voix, sans crescendo brutal qui couvrirait la voix off, durée ≥ 60 s ou bouclable.

L'utilisateur fournit le fichier `.mp3` ou `.wav` dans `uploads/` (ou je le télécharge via WebFetch d'une URL fournie).

**Étape D3.2** — Déplacer vers le dossier projet :
```bash
mv uploads/music-vsl.mp3 livrables/challenge-3/quality-pass/music/music-vsl-cc0.mp3
ffprobe -v error -show_entries format=duration,bit_rate -of default=noprint_wrappers=1 \
  livrables/challenge-3/quality-pass/music/music-vsl-cc0.mp3
```
Attendu : durée ≥ 60s.

**Étape D3.3** — Tracer **toutes** les ressources dans un fichier de crédits, pour preuve « 100 % IA ou libre de droits » :
```bash
cat > livrables/challenge-3/quality-pass/CREDITS.md << 'MD'
# Crédits VSL — Quality pass 2026-06-26

Conformité brief : toutes les ressources sont soit 100 % générées par IA, soit libres de droits (usage commercial autorisé).

## Musique
- Fichier : music/music-vsl.mp3
- Titre : [À COMPLÉTER]
- Auteur : [À COMPLÉTER]
- Licence : [Pixabay license / CC0 / CC-BY / YouTube Audio Library — PRÉCISER]
- Source : [URL exacte]
- Attribution requise : [oui/non]

## Voix off
- Modèle TTS : [À COMPLÉTER si connu — ElevenLabs / Yann narrator / autre]
- Voix : Yann (narrator) — fichier `voix-off-vsl-complete.mp3` du livrable initial
- 100 % IA : oui

## Visuels — scènes animées (master VSL)
- Scènes 1, 2, 3 : générées et animées dans le master initial (cf. PR #20)
- Modèles utilisés : [À COMPLÉTER depuis le storyboard initial — Midjourney/DALL-E pour les keyframes, ffmpeg pour le montage]
- 100 % IA : oui

## Visuels — scènes animées (quality-pass)
- Scènes 4, 5, 6, 7 : keyframes du master (déjà IA-générées) animées via Wan 2.2 I2V
- Modèle : Wan 2.2 I2V via Hugging Face Space [URL Space]
- 100 % IA : oui

## Vérification finale
- Aucune image / vidéo / musique issue de stock photo payant ou de source non-libre.
- Aucune ressource fournie par un humain (autre que le prompting).
MD
```

**Étape D3.4** — Compléter les `[À COMPLÉTER]` avec les vraies informations au moment du choix de la musique. Le fichier `CREDITS.md` doit être 100 % à jour avant le commit final D6.

---

### Tâche D4 — Recombiner la vidéo finale (ffmpeg)

**Étape D4.1** — Extraire les 3 scènes déjà animées (1, 2, 3) du master :
```bash
cd livrables/challenge-3/quality-pass
SRC=../VSL-ClaudeAgency-juin2026.mp4
ffmpeg -y -ss 0 -t 3.96 -i $SRC -c:v libx264 -crf 18 -preset slow -an scene1.mp4
ffmpeg -y -ss 3.96 -t 4.80 -i $SRC -c:v libx264 -crf 18 -preset slow -an scene2.mp4
ffmpeg -y -ss 8.76 -t 4.92 -i $SRC -c:v libx264 -crf 18 -preset slow -an scene3.mp4
# Scènes 4-7 viennent de clips-i2v/
# Adapter durée des clips i2v aux durées cibles (boucle si trop court, trim si trop long)
for s in 4:9.44 5:6.76 6:10.04 7:9.48; do
  scene=${s%%:*}; dur=${s##*:}
  ffmpeg -y -stream_loop -1 -i clips-i2v/scene${scene}.mp4 \
    -t $dur -c:v libx264 -crf 18 -preset slow -an scene${scene}.mp4
done
ls -la scene*.mp4
```

**Étape D4.2** — Normaliser le format de toutes les scènes (1920×1080, 25fps, h264) :
```bash
for s in 1 2 3 4 5 6 7; do
  ffmpeg -y -i scene$s.mp4 -vf "scale=1920:1080:flags=lanczos,fps=25" -c:v libx264 -crf 18 -preset slow -an scene${s}_norm.mp4
done
```

**Étape D4.3** — Concaténer en une seule piste vidéo :
```bash
for s in 1 2 3 4 5 6 7; do echo "file 'scene${s}_norm.mp4'"; done > concat.txt
ffmpeg -y -f concat -safe 0 -i concat.txt -c copy video-only.mp4
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1 video-only.mp4
```
Attendu : durée ≈ 49.4s (somme des durées originales).

**Étape D4.4** — Extraire la voix off existante et mixer avec la musique (ducking -18 dB pendant la voix) :
```bash
# Voix off du master
ffmpeg -y -i $SRC -vn -c:a copy voix-master.aac
# Mix voix + musique avec sidechain compression sur la musique
ffmpeg -y -i voix-master.aac -i music/music-vsl-cc0.mp3 \
  -filter_complex "[1:a]volume=0.35,aloop=loop=-1:size=2e9[m]; \
                   [m][0:a]sidechaincompress=threshold=0.05:ratio=8:attack=5:release=200[mducked]; \
                   [0:a][mducked]amix=inputs=2:duration=first:dropout_transition=0[aout]" \
  -map "[aout]" -ac 2 -ar 44100 -c:a aac -b:a 192k mixed-audio.aac
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1 mixed-audio.aac
```

**Étape D4.5** — Merger vidéo + audio mixé :
```bash
ffmpeg -y -i video-only.mp4 -i mixed-audio.aac -map 0:v -map 1:a -c:v copy -c:a copy -shortest \
  vsl-claudeagency-final.mp4
ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 vsl-claudeagency-final.mp4
```
Attendu : durée ≤ 60s (objectif 49-50s), taille raisonnable (<15 Mo).

**Étape D4.6** — Générer le poster (frame à 0.5s) :
```bash
ffmpeg -y -ss 0.5 -i vsl-claudeagency-final.mp4 -vframes 1 -q:v 2 vsl-claudeagency-poster.jpg
```

**Checkpoint utilisateur** : valider la vidéo finale avant intégration.

---

### Tâche D5 — Intégrer la vidéo finale dans le hero d'index.astro

**Fichiers :**
- Remplacer : `app/public/videos/vsl-claudeagency.mp4`
- Remplacer : `app/public/videos/vsl-claudeagency-poster.jpg`
- Modifier : `app/src/pages/index.astro` (positionner `<video>` dans le hero, pas en section intermédiaire)

**Étape D5.1** — Copier les assets finaux :
```bash
mkdir -p app/public/videos
cp livrables/challenge-3/quality-pass/vsl-claudeagency-final.mp4 app/public/videos/vsl-claudeagency.mp4
cp livrables/challenge-3/quality-pass/vsl-claudeagency-poster.jpg app/public/videos/vsl-claudeagency-poster.jpg
ls -la app/public/videos/
```

**Étape D5.2** — Modifier index.astro pour mettre la `<video>` dans le hero (et non plus en section indépendante).
La section hero actuelle (lignes ~87-127) utilise une grille 2 colonnes avec `<Image src={heroImg}>` à droite. Remplacer cette image par la `<video>` :

```diff
-  <Image
-    src={heroImg}
-    alt="..."
-    sizes="(min-width: 768px) 42vw, 100vw"
-    widths={[480, 800, 1200, 1600]}
-    format="webp"
-    loading="eager"
-    class="w-full rounded-2xl border border-sand object-cover"
-  />
+  <video
+    class="w-full rounded-2xl border border-sand object-cover aspect-video"
+    controls
+    playsinline
+    preload="metadata"
+    poster="/videos/vsl-claudeagency-poster.jpg"
+    width="1280"
+    height="720"
+  >
+    <source src="/videos/vsl-claudeagency.mp4" type="video/mp4" />
+    Votre navigateur ne supporte pas la lecture vidéo.
+  </video>
```

Et supprimer la section indépendante `<!-- Présentation vidéo (VSL ≤60s) -->` (lignes ~131-149).

**Étape D5.3** — Build local :
```bash
cd app && npm run build 2>&1 | tail -20
```
Attendu : `Complete!` sans erreur.

**Étape D5.4** — Vérifier dans le build :
```bash
grep -c '<video' dist/index.html
grep -o 'vsl-claudeagency\.mp4' dist/index.html | head -1
ls -la dist/videos/
```
Attendu : `1`, `vsl-claudeagency.mp4`, 2 fichiers dans dist/videos/.

**Étape D5.5** — Preview rapide :
```bash
npm run preview &  # PID
sleep 3
curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/
curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/videos/vsl-claudeagency.mp4
kill %1 || true
```
Attendu : 200, 200.

**Checkpoint utilisateur** : confirmer le rendu visuel avant push.

---

### Tâche D6 — Commit + push branche `feature/vsl-quality-pass`

```bash
cd /sessions/peaceful-sleepy-mayer/mnt/CLAUDEAGENCY
git status --short
git add app/public/videos/ app/src/pages/index.astro livrables/challenge-3/quality-pass/
git commit -m "feat(vsl): quality pass — 4 scènes animées (Wan 2.2 I2V) + musique CC0 + intégration hero"
git push -u origin feature/vsl-quality-pass
git rev-parse HEAD
```

---

## PHASE E — Créer les PR via Claude pour Chrome

### Tâche E1 — PR Challenge 1 SEO (feature/seo-gap-pass)

```
mcp__Claude_in_Chrome__navigate (url = "https://github.com/JRAYES000/CLAUDEAGENCY/compare/main...feature/seo-gap-pass?expand=1")
```
Titre : `feat(seo): gap-pass — /seo audit + GSC P4-15 + clustering + GEO consolidés`
Description : récap des artefacts livrés (chemin des .md), résultats clés, lien vers le docx mis à jour.
**STOP merge.**

---

### Tâche E2 — PR Challenge 2 LinkedIn (feature/linkedin-gap-pass)

```
mcp__Claude_in_Chrome__navigate (url = "https://github.com/JRAYES000/CLAUDEAGENCY/compare/main...feature/linkedin-gap-pass?expand=1")
```
Titre : `feat(linkedin): méthodologie /campaign-plan + sources qualification`
Description : "Ajout d'une section méthodo référencant /campaign-plan et /deep-research dans le docx existant, plus doc compagnon scripts/qualification-cibles-linkedin.md."
**STOP merge.**

---

### Tâche E3 — PR Challenge 3 VSL (feature/vsl-quality-pass)

```
mcp__Claude_in_Chrome__navigate (url = "https://github.com/JRAYES000/CLAUDEAGENCY/compare/main...feature/vsl-quality-pass?expand=1")
```
Titre : `feat(vsl): quality pass — 4 scènes animées + musique libre de droits + intégration hero`
Description (doit lister explicitement les 2 livrables du brief) :
```
## Livrables conformes au brief Challenge #3
1. **Vidéo finale** ≤ 60 s : `app/public/videos/vsl-claudeagency.mp4` (durée X.Xs).
2. **Script utilisé** : `livrables/challenge-3/VSL-Script-2026-06-26.md` + source docx.

## Conformité brief
- 100 % généré par IA / libre de droits : voir `livrables/challenge-3/quality-pass/CREDITS.md`.
- Structure AIDA (accroche, problème, solution, preuve, CTA) : vérifiée dans le script.
- Voix off TTS : présente.
- Musique libre de droits : ajoutée (cf. crédits).
- Intégration hero d'index.astro : balise <video> dans la grille hero.

## Changements techniques
- 4 scènes statiques (4, 5, 6, 7) du master remplacées par des clips animés Wan 2.2 I2V.
- Mix audio : voix off + musique avec ducking sidechain -18 dB.
- index.astro : <video> dans le hero (suppression de la section indépendante).
```
**STOP merge.**

---

## PHASE F — Rapport AVANT/APRÈS

### Tâche F1 — Rédiger le rapport `RAPPORT-GAP-PASS-2026-06-26.md`

**Fichier :** `livrables/RAPPORT-GAP-PASS-2026-06-26.md`

**Format strict du rapport par challenge :**

```markdown
# Rapport gap-pass — 26/06/2026

## Challenge 1 — SEO

### Déjà fait AVANT cette session
- Plan d'action SEO complet (Diagnostic, clusters, GEO, KPI, 4 mots-clés Ahrefs) — `livrables/challenge-1/Plan-Action-SEO-ClaudeAgency-juin2026.docx`, mergé via PR #X.
- Correctifs on-page sur 7 pages services — mergé via PR #11-13.
- GSC connecté au 19/06/2026 (41 URL indexées, 13 impressions/90j, aucune requête en P4-15).
- Ciblage Qualiopi/IA/OF explicite dans tout le plan.

### Ajouté MAINTENANT
- /seo audit complet (26/06/2026) → `livrables/challenge-1/seo-audit-2026-06-26.md` ([URL commit])
- /seo page × 5 pages clés → 5 fichiers `seo-page-*-2026-06-26.md` ([URL commit])
- Search Console au 26/06 : [N] requêtes en P4-15 capturées via Chrome → captures + CSV ([URL])
- Vérification GA4 : [état]
- Clustering enrichi SearchFit → `livrables/challenge-1/keyword-clusters-2026-06-26.md` ([URL])
- Audit AI visibility SearchFit → `livrables/challenge-1/ai-visibility-2026-06-26.md` ([URL])
- §8 ajoutée au Plan d'action SEO (docx) avec consolidation des nouvelles données ([URL diff])

### Liens pour Julien
- PR : [URL feature/seo-gap-pass]

## Challenge 2 — LinkedIn

### Déjà fait AVANT cette session
- Stratégie complète en 10 étapes (objectif, cadre légal CGU/RGPD, warm-up, comparatif outils, ciblage, signaux, garde-fous, 3 messages concrets, pilotage, checklist).
- Tableaux complets : outils (Waalaxy/Lemlist/natif), quotas progressifs, 3 messages texte.
- Sources externes : LinkedIn TOS, CNIL, RGPD, data.gouv.fr.

### Ajouté MAINTENANT
- Section "Méthodologie de qualification des cibles" référençant explicitement /campaign-plan et /deep-research ([URL diff])
- Doc compagnon : `scripts/qualification-cibles-linkedin.md` (pipeline reproductible)

### Liens pour Julien
- PR : [URL feature/linkedin-gap-pass]

## Challenge 3 — VSL

### Déjà fait AVANT cette session
- Vidéo VSL master 49.4s, 1920×1080, h264 + voix off TTS (mergée via PR #20).
- 3 scènes animées (1, 2, 3) déjà livrées dans le master.
- Script/storyboard docx : `livrables/challenge-3/VSL-Script-Storyboard-ClaudeAgency-juin2026.docx`.

### Ajouté MAINTENANT
- 4 scènes statiques (4, 5, 6, 7) animées via Wan 2.2 I2V → `livrables/challenge-3/quality-pass/clips-i2v/`
- Musique CC0 ajoutée (ducking sidechain -18 dB) → `livrables/challenge-3/quality-pass/music/`
- Vidéo finale assemblée : durée [XX.Xs] ≤ 60s → `app/public/videos/vsl-claudeagency.mp4`
- Poster JPG → `app/public/videos/vsl-claudeagency-poster.jpg`
- Balise `<video>` intégrée dans le hero d'index.astro (remplace l'image hero) — confirmation grep build : OK
- Crédits → `livrables/challenge-3/quality-pass/CREDITS.md`

### Liens pour Julien
- PR : [URL feature/vsl-quality-pass]

## Nettoyage racine
- `.docx`/`.xlsx`/`.txt` redondants déplacés vers `/archive/` → [URL commit]
```

**Étape F1.1** — Écrire le fichier après que toutes les phases A-E soient terminées, avec les vraies URLs.

**Étape F1.2** — Partager via `mcp__cowork__present_files`.

---

## Récap des checkpoints utilisateur (« STOP avant merge »)

| Phase | Action | Checkpoint |
|---|---|---|
| A1 | Stash + checkout main | SHA main confirmé |
| A2 | Commit /archive/ direct main | Liste fichiers validée |
| B3 | Captures GSC + GA4 | Captures partagées |
| B5 | Push feature/seo-gap-pass | URL compare |
| C1 | Push feature/linkedin-gap-pass | URL compare |
| D2 | Clips i2v générés | Visionnage utilisateur |
| D3 | Musique CC0 fournie | Source/licence validée |
| D4 | Vidéo finale mixée | Visionnage utilisateur |
| D5 | Build + preview OK | Rendu visuel validé |
| D6 | Push feature/vsl-quality-pass | URL compare |
| E1, E2, E3 | PR ouvertes | **STOP merge** sur chaque PR |

---

## Choix d'exécution

Recommandation : **délégation par phase** dans cette session (godmode:delegated-execution). Chaque phase A/B/C/D/E est indépendante des autres une fois A faite. La phase D (VSL) est la plus longue — peut être déléguée en parallèle de B et C.

Le rapport F1 doit être exécuté **en dernier**, après que B5, C1, D6, E1-E3 aient leurs vraies URLs.
