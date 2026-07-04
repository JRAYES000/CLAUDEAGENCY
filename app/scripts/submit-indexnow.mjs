// Soumission IndexNow (Bing, Yandex, Seznam, Naver…) après build.
// Ne s'exécute réellement qu'en déploiement Cloudflare Pages (CF_PAGES=1)
// ou si FORCE_INDEXNOW=1 — jamais sur un build local.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const HOST = 'claudeagency.fr';
const KEY = '957b3f3cb57932a0d71427a3377d6a3e';

if (!process.env.CF_PAGES && !process.env.FORCE_INDEXNOW) {
  console.log('[indexnow] build local — soumission ignorée (FORCE_INDEXNOW=1 pour forcer).');
  process.exit(0);
}

const dist = resolve(import.meta.dirname, '../dist');
const index = readFileSync(resolve(dist, 'sitemap-index.xml'), 'utf8');
const sitemaps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const urls = sitemaps.flatMap((sm) => {
  const file = resolve(dist, new URL(sm).pathname.slice(1));
  return [...readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
});

if (!urls.length) {
  console.error('[indexnow] aucune URL trouvée dans le sitemap — abandon.');
  process.exit(0);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls.slice(0, 10000),
  }),
});

console.log(`[indexnow] ${urls.length} URLs soumises — HTTP ${res.status}`);
// Un échec IndexNow ne doit jamais faire échouer le déploiement.
process.exit(0);
