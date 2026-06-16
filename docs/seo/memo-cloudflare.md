# Mémo Cloudflare — réglages à appliquer manuellement (dashboard)

> Ces réglages se font dans le **dashboard Cloudflare** de la zone `claudepartners.fr`
> (compte plan Free suffisant). Ils ne peuvent **pas** être faits depuis le dépôt /
> l'environnement d'agent (pas d'accès au dashboard). À appliquer toi-même, ou avec
> « Claude in Chrome » exécuté **sur ta machine** (là où tu es connecté à Cloudflare).
>
> Ordre conseillé : **1 → 5**. Les réglages 1-2 améliorent la perf mobile (LCP),
> le 3 est indispensable au SEO (canonicalisation), le 4 débloque le GEO, le 5 corrige
> le lien e-mail de la page contact.

---

## 1. Always Use HTTPS  *(perf + sécurité)*
**Où :** SSL/TLS → **Edge Certificates** → activer **Always Use HTTPS**.
**Effet :** toute requête `http://` est redirigée en `https://` au bord du réseau (301).
**Vérif :** `curl -sIL http://claudepartners.fr/` → doit montrer un 301 vers `https://claudepartners.fr/` puis 200.

---

## 2. HSTS (HTTP Strict Transport Security)  *(perf mobile — supprime le hop http→https)*
**Où :** SSL/TLS → **Edge Certificates** → **HTTP Strict Transport Security (HSTS)** → *Enable*.
**Réglages recommandés :**
- Max-Age : commencer à **6 mois** (puis 12 mois une fois sûr).
- Include subdomains : **activé**.
- Preload : **activé** *(voir avertissement)*.
- No-Sniff header : activé.

**Effet SEO/perf :** après la 1ʳᵉ visite, le navigateur va directement en HTTPS sans passer
par le hop `http→https` → c'est la principale cause des `−630 ms « Redirects »` sur mobile.

> ⚠️ **Action difficilement réversible.** Avec un long max-age (+ preload soumis sur
> https://hstspreload.org), tu **t'engages à servir le site en HTTPS** pour toute la durée :
> impossible de revenir à du http en clair sans attendre l'expiration. Commence avec un
> max-age court (ex. 1 semaine), confirme que tout marche, **puis** monte à 6-12 mois et
> soumets le preload. *(Alternative côté code : on peut aussi poser l'en-tête
> `Strict-Transport-Security` dans `app/public/_headers` — dis-le moi si tu préfères cette
> voie ; je ne l'ai pas appliquée d'office vu son caractère irréversible.)*

---

## 3. Redirect Rules — canonicalisation  *(SEO critique : éviter le contenu dupliqué)*
`_redirects` d'Astro ne gère **pas** les redirections au niveau hostname → on utilise les
**Redirect Rules** de la zone.
**Où :** **Rules** → **Redirect Rules** → *Create rule* (créer 2 règles).

**Règle A — www → apex :**
- When : `Hostname equals www.claudepartners.fr`
- Then : *Dynamic* → `concat("https://claudepartners.fr", http.request.uri.path)`
- Status : **301**, *Preserve query string* : activé.

**Règle B — *.pages.dev → apex :**
- When : `Hostname equals claudepartners.pages.dev`
- Then : *Dynamic* → `concat("https://claudepartners.fr", http.request.uri.path)`
- Status : **301**, *Preserve query string* : activé.

**Effet :** une seule URL canonique (apex + https + slash final), pas de duplication
`www`/`pages.dev` qui diluerait l'autorité.
**Vérif :**
```
curl -sIL http://www.claudepartners.fr/        # → 1 seul 301 → https://claudepartners.fr/ → 200
curl -sIL https://claudepartners.pages.dev/    # → 301 → https://claudepartners.fr/
```

---

## 4. Débloquer les bots IA — AI Crawl Control  *(prérequis du levier GEO)*
Cloudflare injecte par défaut un *Managed robots.txt* qui **bloque** GPTBot, ClaudeBot,
Google-Extended, CCBot, etc. → ton `llms.txt` invite les IA à te citer mais elles ne
peuvent pas accéder au site. Contradiction à lever.
**Où :** **Security** → **Settings** → section *Bots* / **AI Crawl Control** (anciennement
« AI Audit »/« Block AI bots ») → **désactiver le blocage des AI crawlers** (ou passer en
*Allow*).
**Décision :** cohérent avec la stratégie GEO (être cité par ChatGPT/Perplexity dans une
niche B2B pauvre en sources). Si tu ne vises pas le GEO, laisse bloqué **et** retire
`llms.txt` pour éviter l'incohérence.
**Vérif :** `curl -s https://claudepartners.fr/robots.txt` → ne doit pas contenir de
`Disallow` ciblant GPTBot/ClaudeBot/Google-Extended.

---

## 5. Email Address Obfuscation  *(corrige le lien e-mail « 404 » de /contact/)*
Scrape Shield obfusque les e-mails en clair, ce qui peut casser un lien `mailto:` rendu
côté serveur.
**Où :** **Scrape Shield** → **Email Address Obfuscation**.
> ℹ️ Le code utilise déjà `<!--email_off-->` autour de l'e-mail pour s'exclure de
> l'obfuscation. **Vérifie d'abord** `/contact/` dans un navigateur : si le `mailto:`
> fonctionne, **ne touche à rien**. S'il est cassé, soit le `email_off` n'est pas au bon
> endroit (à corriger en code), soit désactive l'obfuscation ici en dernier recours.
**Vérif :** sur `/contact/`, le lien e-mail doit ouvrir le client mail avec la bonne adresse
(pas de `/cdn-cgi/l/email-protection` menant à une 404).

---

## Récapitulatif — checklist
- [ ] 1. Always Use HTTPS activé
- [ ] 2. HSTS activé (max-age court → puis 6-12 mois + preload)
- [ ] 3. Redirect Rules www→apex et *.pages.dev→apex (301)
- [ ] 4. AI Crawl Control : bots IA autorisés (ou `llms.txt` retiré)
- [ ] 5. /contact/ : lien e-mail vérifié (obfuscation OFF seulement si cassé)

**Contrôle final unique :**
```
curl -sIL http://www.claudepartners.fr/
# Attendu : au plus UN 301 → https://claudepartners.fr/ → 200, en-tête strict-transport-security présent
```
