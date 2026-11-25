import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, buildPages, sitemapEntries } from "../src/site/content.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const publicDir = path.join(root, "public");
const today = new Date().toISOString().slice(0, 10);

async function copyDir(from, to) {
  await fs.mkdir(to, { recursive: true });
  const entries = await fs.readdir(from, { withFileTypes: true });

  for (const entry of entries) {
    const source = path.join(from, entry.name);
    const destination = path.join(to, entry.name);
    if (entry.isDirectory()) {
      await copyDir(source, destination);
    } else if (entry.isFile()) {
      await fs.copyFile(source, destination);
    }
  }
}

function outputPathFor(route) {
  if (route === "/") return path.join(dist, "index.html");
  return path.join(dist, route.replace(/^\//, ""), "index.html");
}

function sitemapXml() {
  const urls = sitemapEntries()
    .map(
      (entry) => `  <url>
    <loc>${SITE.origin}${entry.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const robotsTxt = `User-agent: *
Allow: /
Content-Signal: search=yes, ai-input=yes, ai-train=no

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
`;

const adsTxt = `google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
`;

const headersTxt = `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

https://:version.:subdomain.workers.dev/*
  X-Robots-Tag: noindex, nofollow

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/vendor/*
  Cache-Control: public, max-age=604800

/styles.css
  Cache-Control: public, max-age=86400

/app.js
  Cache-Control: public, max-age=86400
`;

const redirectsTxt = `/remove-bg  /remove-background/  301
/index.html  /  301
/docs/how-it-works  /docs/how-it-works/  301
`;

const pages = buildPages();
const blogPaths = sitemapEntries()
  .filter((entry) => entry.path.startsWith("/blog/") && entry.path !== "/blog/")
  .map((entry) => `- ${SITE.origin}${entry.path}`)
  .join("\n");

const llmsTxt = `# ${SITE.name}

${SITE.description}

- Homepage: ${SITE.origin}/
- Background remover: ${SITE.origin}/remove-background/
- Privacy policy: ${SITE.origin}/privacy/
- Docs: ${SITE.origin}/docs/

## Editorial guides

${blogPaths}
`;

async function main() {
  await fs.mkdir(dist, { recursive: true });

  for (const item of pages) {
    const target = outputPathFor(item.path);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, item.html, "utf8");
  }

  await fs.writeFile(path.join(dist, "404.html"), pages.find((item) => item.path === "/404/").html, "utf8");
  await copyDir(publicDir, dist);

  await fs.copyFile(path.join(root, "app.js"), path.join(dist, "app.js"));
  await fs.copyFile(path.join(root, "styles.css"), path.join(dist, "styles.css"));

  await fs.writeFile(path.join(dist, "robots.txt"), robotsTxt, "utf8");
  await fs.writeFile(path.join(dist, "sitemap.xml"), sitemapXml(), "utf8");
  await fs.writeFile(path.join(dist, "llms.txt"), llmsTxt, "utf8");
  await fs.writeFile(path.join(dist, "ads.txt"), adsTxt, "utf8");
  await fs.writeFile(path.join(dist, "_headers"), headersTxt, "utf8");
  await fs.writeFile(path.join(dist, "_redirects"), redirectsTxt, "utf8");

  // Mirror the built site into the project root as well.
  // This keeps Pages deployments with output directory "." working,
  // while Workers continues to deploy from ./dist.
  await copyDir(dist, root);

  const requiredVendor = [
    "selfie_segmentation.js",
    "selfie_segmentation.tflite",
    "selfie_segmentation_landscape.tflite",
    "selfie_segmentation_solution_simd_wasm_bin.js",
    "selfie_segmentation_solution_simd_wasm_bin.wasm",
    "selfie_segmentation_solution_wasm_bin.js",
    "selfie_segmentation_solution_wasm_bin.wasm",
  ];

  const missing = [];
  for (const file of requiredVendor) {
    try {
      await fs.access(path.join(dist, "vendor", "mediapipe", file));
    } catch {
      missing.push(file);
    }
  }

  console.log(`Built ${pages.length} pages into dist/`);
  console.log(`Sitemap entries: ${sitemapEntries().length}`);
  if (missing.length) {
    console.warn(`Missing MediaPipe files: ${missing.join(", ")}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
