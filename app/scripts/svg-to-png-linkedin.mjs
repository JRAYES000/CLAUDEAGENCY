import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../docs/seo/visuels-linkedin");

const targets = [
  { svg: "banniere-page-entreprise.svg", png: "banniere-page-entreprise.png", width: 1128, height: 191 },
  { svg: "gabarit-post.svg", png: "gabarit-post.png", width: 1080, height: 1080 },
  { svg: "post2-claude-ai-francais.svg", png: "post2-claude-ai-francais.png", width: 1080, height: 1080 },
  { svg: "post3-formation-claude.svg", png: "post3-formation-claude.png", width: 1080, height: 1080 },
  { svg: "post4-seo-organisme-formation.svg", png: "post4-seo-organisme-formation.png", width: 1080, height: 1080 },
];

for (const t of targets) {
  const svgPath = path.join(dir, t.svg);
  const pngPath = path.join(dir, t.png);
  await sharp(svgPath).resize(t.width, t.height).png().toFile(pngPath);
  const meta = await sharp(pngPath).metadata();
  console.log(`${t.png}: ${meta.width}x${meta.height}`);
}
