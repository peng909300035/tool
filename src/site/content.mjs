export const SITE = {
  origin: "https://api.tooloralab.xyz",
  domain: "api.tooloralab.xyz",
  name: "Toolorial",
  email: "hello@tooloralab.xyz",
  description:
    "Private, browser-native image tools. Remove photo backgrounds locally without uploads, accounts, or server storage.",
};

export const NAV = [
  { label: "Remove BG", href: "/remove-background/" },
  { label: "Docs", href: "/docs/" },
  { label: "Blog", href: "/blog/" },
  { label: "FAQ", href: "/faq/" },
  { label: "About", href: "/about/" },
];

export const TOOL_FAQS = [
  {
    q: "How does the background remover work?",
    a: "The page downloads a small segmentation model to your browser. When you choose a photo, the model draws a subject mask locally and the page applies that mask with Canvas. Your photo is never uploaded to our server.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no sign-up, no login, and no upload queue. Choose an image and start processing immediately.",
  },
  {
    q: "Does it work offline?",
    a: "After the page, script, and model files have been cached by your browser, the core editing flow can continue without a network connection. Clearing site data removes that cache.",
  },
  {
    q: "Which images work best?",
    a: "Clear portraits, avatars, ID-style photos, and profile pictures work best. The current model is trained primarily for people, so complex product scenes or multiple distant objects may need manual cleanup.",
  },
  {
    q: "What formats can I download?",
    a: "The result is exported as a PNG. Choose transparent background for an alpha channel, or solid background to flatten the result onto a color of your choice.",
  },
  {
    q: "Is there a file size limit?",
    a: "There is no server upload limit. For smooth performance, use images below 15 MB. Large images are resized in the browser before segmentation to keep memory use reasonable.",
  },
];

export const GENERAL_FAQS = [
  {
    q: "Is Toolorial free?",
    a: "Yes. The browser-based tools are free to use. Advertising may be shown on content pages to support hosting and maintenance.",
  },
  {
    q: "Are my photos stored anywhere?",
    a: "No. Photos are read from your device into browser memory, processed locally, and exported back to your device. We do not write them to a database, object storage, or analytics system.",
  },
  {
    q: "Why is a model downloaded on first use?",
    a: "The segmentation model runs in your browser rather than on a server. It is downloaded once and can be cached for later visits.",
  },
  {
    q: "Does advertising read my photos?",
    a: "No. Ad scripts can set cookies or read standard browser signals for ad delivery, but they do not receive the pixels of images you process in this tool.",
  },
  {
    q: "Can I use the result commercially?",
    a: "You are responsible for the rights to the source image and for the final use of the exported file. Please review our Terms before publishing results.",
  },
];

export const ARTICLES = [
  {
    slug: "remove-background-without-uploading",
    title: "How to remove an image background without uploading it",
    description:
      "A practical guide to browser-based background removal: what runs locally, what still leaves the device, and how to get a clean transparent PNG.",
    category: "Privacy",
    date: "2026-11-20",
    body: `
      <p>Traditional online background removers ask you to upload a photo to a remote server. That is convenient, but it also means a copy of your image leaves your device. A browser-native tool takes a different path: the model is downloaded to your browser, and the image never enters an upload request.</p>
      <h2 id="what-runs-locally">What actually runs locally</h2>
      <p>The page loads a small segmentation model and a WebAssembly runtime. When you pick a file, the browser reads it with the File API, draws it on a canvas, and sends the canvas pixels to the model. The model returns a mask. The page then combines that mask with the original pixels to produce a transparent PNG.</p>
      <p>At no point does the tool call an endpoint with your photo as the request body. There is no server-side queue, no object storage bucket, and no database row for the image. The Worker that hosts the site only serves static files.</p>
      <h2 id="steps">Steps for a clean result</h2>
      <ol>
        <li>Use a photo where the subject is clearly separated from the background.</li>
        <li>Choose the high-accuracy mode when edge detail matters.</li>
        <li>Inspect hair, shoulders, and hands before exporting.</li>
        <li>Export a transparent PNG if you plan to place the subject on another color.</li>
      </ol>
      <h2 id="limits">Know the limits</h2>
      <p>Local models are smaller than the large cloud models used by paid studios. They are fast and private, but they may struggle with thin translucent objects, heavy motion blur, or scenes with several people. For profile photos and avatars, they are usually more than enough.</p>
      <h2 id="privacy-note">A note about privacy claims</h2>
      <p>“Your image stays on your device” is accurate. “Nothing leaves your device” is not, because the browser still requests scripts, model files, and possibly advertising resources. A truthful privacy statement separates image data from ordinary web requests.</p>
    `,
  },
  {
    slug: "browser-ai-vs-cloud-ai-image-editing",
    title: "Browser AI vs cloud AI for image editing",
    description:
      "Compare latency, privacy, cost, and output quality when choosing between local browser models and cloud inference.",
    category: "AI",
    date: "2026-11-18",
    body: `
      <p>Cloud inference and browser inference solve the same problem in different places. Cloud models can be very large and accurate, while browser models trade some capacity for privacy, speed, and simpler deployment.</p>
      <h2 id="latency">Latency</h2>
      <p>A cloud tool must upload the file, wait in a queue, run inference, and download the result. A browser tool skips the upload and download steps. On a slow connection, that difference is often larger than the difference in model speed.</p>
      <h2 id="privacy">Privacy</h2>
      <p>With local processing, sensitive photos do not need to be copied to someone else's infrastructure. This matters for family photos, identity documents, and unpublished product images.</p>
      <h2 id="quality">Quality</h2>
      <p>Large cloud models still tend to handle difficult edges better. Browser models are improving quickly, but they are constrained by download size and device memory. For portraits and profile pictures, the gap is small enough that the privacy benefit often wins.</p>
      <h2 id="cost">Cost</h2>
      <p>Cloud inference costs money for every request. Browser inference shifts compute to the user's device and only needs static file hosting. That makes a free, no-signup tool financially sustainable.</p>
      <h2 id="hybrid">A practical hybrid</h2>
      <p>Many products offer local processing by default and an optional cloud upgrade for hard cases. If you do that, label the two paths clearly. Users should know exactly when an image leaves the device.</p>
    `,
  },
  {
    slug: "transparent-png-for-profile-photos",
    title: "Create a transparent PNG for profile photos",
    description:
      "How to export a clean cutout, choose the right canvas size, and avoid halos around hair and shoulders.",
    category: "How-to",
    date: "2026-11-15",
    body: `
      <p>A transparent PNG is the safest format when you want to reuse a portrait on different backgrounds. Unlike JPEG, PNG can store an alpha channel, which tells the viewer which pixels should be invisible.</p>
      <h2 id="start">Start with a good source</h2>
      <p>Use a photo with even lighting and a background that contrasts with the subject. Avoid strong shadows behind the head, because dark shadows are often mistaken for hair.</p>
      <h2 id="export">Export settings</h2>
      <ul>
        <li>Choose transparent background, not solid color.</li>
        <li>Use high accuracy for soft edges.</li>
        <li>Keep the subject slightly away from the canvas edge.</li>
        <li>Download the PNG and inspect it on both light and dark backgrounds.</li>
      </ul>
      <h2 id="halos">Fixing halos</h2>
      <p>A pale outline usually comes from background pixels blended into the subject edge. It helps to use a source image with a plain background and to avoid enlarging the cutout far beyond the original resolution.</p>
      <h2 id="reuse">Reusing the file</h2>
      <p>Keep one master transparent PNG. Generate platform-specific versions from that master instead of removing the background again for every social network.</p>
    `,
  },
  {
    slug: "keep-hair-detail-when-removing-background",
    title: "How to keep hair detail when removing a background",
    description:
      "Why fine edges are difficult for segmentation models and what you can do to preserve natural-looking hair.",
    category: "How-to",
    date: "2026-11-12",
    body: `
      <p>Hair is the hardest part of portrait cutouts. Individual strands are thin, semi-transparent, and often overlap the background. A segmentation model must decide whether each pixel belongs to the subject.</p>
      <h2 id="lighting">Lighting matters more than resolution</h2>
      <p>A neat, evenly lit photo with a plain wall behind the subject usually produces a better cutout than a high-resolution photo taken against a busy scene.</p>
      <h2 id="accuracy">Use high accuracy mode</h2>
      <p>Fast mode applies a harder threshold to the mask. That removes more background pixels but can also cut away soft hair edges. High accuracy keeps partial alpha values, which look more natural on both light and dark backgrounds.</p>
      <h2 id="check">Check on two backgrounds</h2>
      <p>Preview the exported PNG on white and black. Hair that looks fine on white may show a gray halo on black. If that happens, try a new source photo rather than repeatedly sharpening the output.</p>
      <h2 id="expectations">Set realistic expectations</h2>
      <p>A browser model can produce a usable cutout in seconds, but it is not a manual masking artist. For commercial beauty retouching, a dedicated editor is still the better final step.</p>
    `,
  },
  {
    slug: "webp-vs-png-transparent-backgrounds",
    title: "WebP vs PNG for transparent backgrounds",
    description:
      "Which format should you use for transparent cutouts on websites, apps, and social platforms?",
    category: "Formats",
    date: "2026-11-10",
    body: `
      <p>Both PNG and WebP can store transparency, but they behave differently in real projects. PNG is the safest interchange format. WebP is often smaller for web delivery.</p>
      <h2 id="png">PNG</h2>
      <p>PNG is supported everywhere and handles sharp edges well. It is the right choice when you need a master file or when you do not know where the image will be published.</p>
      <h2 id="webp">WebP</h2>
      <p>WebP usually produces smaller files than PNG with similar visual quality. Modern browsers support it, but some offline tools and older systems still struggle with it.</p>
      <h2 id="recommendation">A simple rule</h2>
      <p>Keep a transparent PNG as the master. Export WebP only for a known web destination where you control the browser environment. If a platform asks for PNG, give it PNG.</p>
      <h2 id="compression">Compression caution</h2>
      <p>Aggressive compression can create fringed edges around transparent areas. Inspect the result at actual display size before replacing the original.</p>
    `,
  },
  {
    slug: "passport-photo-background-rules",
    title: "Passport photo background rules: a practical checklist",
    description:
      "General background and framing guidance for digital passport photos, plus why you should always confirm official local requirements.",
    category: "Guides",
    date: "2026-11-08",
    body: `
      <p>Passport photo rules vary by country and change over time. This guide is a practical checklist, not legal advice. Always confirm the current requirements from the official authority before submitting.</p>
      <h2 id="background">Background</h2>
      <p>Most biometric photo rules ask for a plain, light-colored background without patterns, shadows, or other people. A neutral wall is easier to clean up than a textured one.</p>
      <h2 id="framing">Framing</h2>
      <p>Keep the head centered and leave even space on both sides. Avoid cropping the chin or the top of the head. Glasses, head coverings, and expressions have specific rules that differ by authority.</p>
      <h2 id="quality">Image quality</h2>
      <p>Use a sharp, evenly lit photo. Local background removal can help with a plain wall, but it cannot fix severe blur, strong shadows, or incorrect framing.</p>
      <h2 id="final-check">Final check</h2>
      <p>Before submitting, view the file at the required physical size. A cutout that looks excellent on a large screen may show edge artifacts when printed at passport scale.</p>
    `,
  },
  {
    slug: "image-metadata-exif-privacy",
    title: "What photo metadata reveals and why local editing helps",
    description:
      "EXIF data can include location, device, and timestamps. Learn how local processing reduces unnecessary exposure.",
    category: "Privacy",
    date: "2026-11-05",
    body: `
      <p>A photo file can contain more than pixels. EXIF metadata may record the camera model, shooting time, GPS coordinates, and software used to edit the file.</p>
      <h2 id="what">What is usually included</h2>
      <p>Phones often store date, time, device model, lens settings, and sometimes location. Social platforms usually strip some metadata, but exported files may keep it.</p>
      <h2 id="why">Why it matters</h2>
      <p>Metadata can reveal a home address, a workplace, or a daily routine when several photos are shared together. If a photo is not meant to carry that information, removing it is a sensible habit.</p>
      <h2 id="local">How local editing helps</h2>
      <p>When the image is processed in the browser, there is no remote copy to inspect or retain. The exported PNG can also be generated from canvas pixels, which naturally drops most original metadata.</p>
      <h2 id="verify">Verify the export</h2>
      <p>Open the exported file in a metadata viewer before publishing it. Do not assume that every platform removes all fields for you.</p>
    `,
  },
  {
    slug: "optimize-images-for-adsense-pagespeed",
    title: "Optimize images for PageSpeed on a content site",
    description:
      "Practical image choices that improve Core Web Vitals without hurting readability or ad revenue.",
    category: "Performance",
    date: "2026-11-02",
    body: `
      <p>PageSpeed affects user experience and search visibility. For content sites, images are usually the easiest place to gain speed.</p>
      <h2 id="dimensions">Set dimensions</h2>
      <p>Always declare image width and height so the browser can reserve space. This prevents layout shifts while images load.</p>
      <h2 id="formats">Choose formats carefully</h2>
      <p>Use WebP or AVIF for photographs when your delivery pipeline supports them. Keep PNG for transparency or screenshots where sharp edges matter.</p>
      <h2 id="lazy">Lazy-load below the fold</h2>
      <p>Images far down the page should load only when needed. Hero images should not be lazy-loaded, because they affect the largest contentful paint.</p>
      <h2 id="ads">Leave room for ads</h2>
      <p>Ads that shift article text create a poor reading experience. Reserve stable containers before the ad script loads, and avoid placing ads next to interactive controls.</p>
      <h2 id="measure">Measure real pages</h2>
      <p>Run PageSpeed on an actual article URL, not just the homepage. Article pages often have more images and ad slots than the landing page.</p>
    `,
  },
  {
    slug: "heic-to-png-in-browser",
    title: "Convert iPhone HEIC photos to PNG in your browser",
    description:
      "Why HEIC files need decoding, and how a browser-based workflow avoids uploading private camera rolls.",
    category: "Formats",
    date: "2026-10-29",
    body: `
      <p>iPhones often save photos in HEIC format. It stores good quality in a smaller file, but many websites and older tools expect JPEG or PNG instead.</p>
      <h2 id="heic">What HEIC is</h2>
      <p>HEIC uses modern compression and can store depth information and sequences. Browser support varies, so conversion is often needed before editing or publishing.</p>
      <h2 id="browser">Browser conversion</h2>
      <p>A local converter decodes the selected file, draws it on a canvas, and exports a PNG or JPEG. The original file stays on the device.</p>
      <h2 id="quality">Quality notes</h2>
      <p>Converting HEIC to PNG preserves detail but increases file size. Use PNG when transparency or lossless output matters; use JPEG for ordinary photos.</p>
      <h2 id="privacy">Privacy benefit</h2>
      <p>Camera roll photos can contain personal details. Local conversion avoids sending an entire original file to a remote service just to change its format.</p>
    `,
  },
  {
    slug: "remove-background-for-profile-photos",
    title: "Background removal for profile photos and avatars",
    description:
      "What makes a good profile portrait, and when a local background remover is the right tool.",
    category: "How-to",
    date: "2026-10-26",
    body: `
      <p>Profile photos are usually small. A clean cutout and a simple background matter more than dramatic retouching.</p>
      <h2 id="subject">Frame the subject</h2>
      <p>Keep the face centered, leave breathing room above the head, and avoid cropping at the chin. A neutral expression travels well across platforms.</p>
      <h2 id="background">Choose the final background</h2>
      <p>Export a transparent PNG first. Then place the subject on a solid brand color or a soft gradient for each platform.</p>
      <h2 id="local">Why local tools fit</h2>
      <p>Personal portraits are exactly the kind of image people hesitate to upload. A browser-native remover gives you a practical cutout without creating another copy on a remote server.</p>
      <h2 id="final">Before publishing</h2>
      <p>Check the avatar at the size where it will actually appear. Fine hair detail that looks good in a large preview may disappear in a 64-pixel circle.</p>
    `,
  },
  {
    slug: "offline-image-tools-with-service-worker",
    title: "How service workers make image tools available offline",
    description:
      "A plain-language look at caching app shells, model files, and the limits of offline browser tools.",
    category: "Engineering",
    date: "2026-10-22",
    body: `
      <p>A service worker is a script that runs in the background of a web page. It can intercept network requests and serve cached files when you are offline.</p>
      <h2 id="shell">App shell caching</h2>
      <p>The HTML, CSS, and JavaScript that make up the interface can be cached during installation. After that, the page can open even without a connection.</p>
      <h2 id="models">Model caching</h2>
      <p>AI models are static files too. Caching them is what makes local inference practical after the first visit. The model is downloaded once, not on every edit.</p>
      <h2 id="limits">Limits</h2>
      <p>Offline support does not remove browser storage limits, and clearing site data removes the cache. Ad scripts and external resources may also fail while offline.</p>
      <h2 id="privacy">Do not cache user images</h2>
      <p>A privacy-first tool should cache only public static assets. Photos selected by the user belong in memory, not in the Cache API or IndexedDB.</p>
    `,
  },
  {
    slug: "why-no-signup-image-tools",
    title: "Why no-signup image tools are worth building",
    description:
      "The usability, privacy, and maintenance benefits of letting people edit an image without creating an account.",
    category: "Opinion",
    date: "2026-10-18",
    body: `
      <p>Sign-up forms are friction. For a one-off task like removing a background, asking for an email address often feels disproportionate.</p>
      <h2 id="friction">Lower friction</h2>
      <p>A visitor with a single photo wants a single result. No password, no verification email, and no onboarding flow means the tool can be used immediately.</p>
      <h2 id="privacy">Less data to protect</h2>
      <p>Accounts create databases, and databases create obligations. If a product does not need identity to work, not collecting it is a design advantage.</p>
      <h2 id="business">A sustainable model</h2>
      <p>Static hosting is inexpensive. Contextual advertising on genuinely useful content can cover those costs without charging for each edit.</p>
      <h2 id="tradeoff">The tradeoff</h2>
      <p>No account means no cloud history and no cross-device sync. For many image tasks, that is a feature rather than a missing capability.</p>
    `,
  },
];

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const urlFor = (path) => (path === "/" ? `${SITE.origin}/` : `${SITE.origin}${path}`);

function ld(schema) {
  return `<script type="application/ld+json">${JSON.stringify(schema)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")}</script>`;
}

function navHtml() {
  return NAV.map(
    (item) => `<a href="${esc(item.href)}"${item.href === "/remove-background/" ? ' class="nav-cta"' : ""}>${esc(item.label)}</a>`
  ).join("");
}

function footerHtml() {
  return `
    <footer class="site-footer">
      <div class="footer-inner">
        <div>
          <a class="brand" href="/">${esc(SITE.name)}</a>
          <p>Private, browser-native image tools.</p>
        </div>
        <nav aria-label="Footer">
          <a href="/remove-background/">Remove BG</a>
          <a href="/docs/">Docs</a>
          <a href="/blog/">Blog</a>
          <a href="/faq/">FAQ</a>
          <a href="/about/">About</a>
          <a href="/contact/">Contact</a>
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms</a>
        </nav>
      </div>
      <p class="footer-note">Images are processed in your browser. Advertising may use cookies on content pages.</p>
    </footer>
  `;
}

function adSlot(id, label = "Advertisement") {
  return `<aside class="ad-slot" data-slot="${esc(id)}" aria-label="${esc(label)}"><span>${esc(label)}</span></aside>`;
}

function faqHtml(items) {
  return items
    .map(
      (item, index) => `
        <details class="faq-item"${index === 0 ? " open" : ""}>
          <summary>${esc(item.q)}</summary>
          <p>${esc(item.a)}</p>
        </details>`
    )
    .join("");
}

function articleCards(items, limit = 6) {
  return items
    .slice(0, limit)
    .map(
      (article) => `
        <article class="card post-card">
          <p class="card-meta">${esc(article.category)} · ${esc(article.date)}</p>
          <h3><a href="/blog/${esc(article.slug)}/">${esc(article.title)}</a></h3>
          <p>${esc(article.description)}</p>
        </article>`
    )
    .join("");
}

function breadcrumbHtml(labels) {
  const items = [{ label: "Home", href: "/" }, ...labels];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: urlFor(item.href),
    })),
  };
  return {
    html: `<nav class="breadcrumbs" aria-label="Breadcrumb">${items
      .map(
        (item) =>
          `<a href="${esc(item.href)}">${esc(item.label)}</a>${indexOrSep(items, item)}`
      )
      .join("")}</nav>`,
    schema,
  };
}

function indexOrSep(items, item) {
  return item === items[items.length - 1] ? "" : "<span aria-hidden=\"true\">/</span>";
}

export function layout({
  path,
  title,
  description,
  body,
  lang = "en",
  schema = [],
  hreflang = false,
  bodyClass = "",
}) {
  const canonical = urlFor(path);
  const alternates = hreflang
    ? `<link rel="alternate" hreflang="en" href="${SITE.origin}/">\n    <link rel="alternate" hreflang="zh-Hans" href="${SITE.origin}/zh/">\n    <link rel="alternate" hreflang="x-default" href="${SITE.origin}/">`
    : "";

  return `<!DOCTYPE html>
<html lang="${esc(lang)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="theme-color" content="#f6f8fc">
  <link rel="canonical" href="${esc(canonical)}">
  ${alternates}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(SITE.name)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:image" content="${SITE.origin}/assets/og-cover.svg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${SITE.origin}/assets/og-cover.svg">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="/manifest.json">
  <link rel="stylesheet" href="/styles.css">
  ${schema.map(ld).join("\n  ")}
</head>
<body class="${esc(bodyClass)}">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="/">${esc(SITE.name)}<span class="brand-dot"></span></a>
      <nav aria-label="Main">${navHtml()}</nav>
    </div>
  </header>
  <main id="main">
${body}
  </main>
  ${footerHtml()}
  <script src="/app.js" defer></script>
</body>
</html>
`;
}

function homeBody() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Creative studio · Private by design</p>
        <h1>Remove backgrounds without uploading a single photo.</h1>
        <p class="lead">Toolorial runs a small AI model inside your browser. Pick a portrait, clean the background, and export a transparent PNG. No account, no upload step, no server-side image storage.</p>
        <div class="hero-actions">
          <a class="btn primary" href="/remove-background/">Try the remover</a>
          <a class="btn ghost" href="/docs/how-it-works/">How it works</a>
        </div>
        <ul class="trust-list">
          <li>Local processing</li>
          <li>No sign-up</li>
          <li>PNG export</li>
        </ul>
      </div>
      <div class="hero-visual">
        <div class="compare-card">
          <div class="compare-side">
            <span>Original</span>
            <img src="/assets/sample-portrait.svg" width="420" height="420" alt="Illustrated portrait on a blue background">
          </div>
          <div class="compare-side checker">
            <span>Transparent PNG</span>
            <img src="/assets/sample-cutout.svg" width="420" height="420" alt="Portrait cutout with checkerboard background">
          </div>
        </div>
        <p class="visual-caption">Your image is drawn on a canvas, masked in the browser, and exported back to your device.</p>
      </div>
    </section>

    ${adSlot("home-top")}

    <section class="section" id="features">
      <div class="section-heading">
        <p class="section-index">01 / Privacy</p>
        <h2>Your photos stay on your device</h2>
        <p>The editing flow reads your file in the browser. We do not operate an upload endpoint or an image database.</p>
      </div>
      <div class="feature-grid">
        <article class="card">
          <h3>No upload step</h3>
          <p>Select a file and the browser starts working. There is no queue and no remote copy of your photo.</p>
        </article>
        <article class="card">
          <h3>No account gate</h3>
          <p>One-off image tasks should not require a password. Open the page and edit immediately.</p>
        </article>
        <article class="card">
          <h3>Reusable output</h3>
          <p>Export a transparent PNG master, then place the subject on any color or layout you need.</p>
        </article>
      </div>
    </section>

    <section class="section split">
      <div>
        <p class="section-index">02 / Speed</p>
        <h2>Small model, fast start</h2>
        <p>The segmentation model is cached by your browser after first use. The page loads quickly because the model is only requested when you start an edit.</p>
      </div>
      <div class="steps">
        <div><strong>1</strong><span>Choose a portrait</span></div>
        <div><strong>2</strong><span>Mask locally</span></div>
        <div><strong>3</strong><span>Download PNG</span></div>
      </div>
    </section>

    <section class="section tool-cta">
      <div>
        <p class="section-index">03 / AI background remover</p>
        <h2>Clean cutouts for portraits and avatars</h2>
        <p>Best for profile photos, ID-style portraits, and headshots. High accuracy mode keeps soft edges and produces an alpha channel.</p>
      </div>
      <a class="btn primary" href="/remove-background/">Open the tool</a>
    </section>

    <section class="section">
      <div class="section-heading">
        <p class="section-index">FAQ</p>
        <h2>Frequently asked questions</h2>
      </div>
      <div class="faq-list">${faqHtml(TOOL_FAQS.slice(0, 4))}</div>
    </section>

    <section class="section">
      <div class="section-heading"><p class="section-index">From the blog</p><h2>Guides for private image editing</h2></div>
      <div class="card-grid">${articleCards(ARTICLES, 3)}</div>
      <p><a class="text-link" href="/blog/">Read all guides</a></p>
    </section>
  `;
}

function toolBody() {
  return `
    <section class="page-hero compact">
      <p class="eyebrow">Free · Private · No watermark</p>
      <h1>AI Background Remover</h1>
      <p class="lead">Remove a portrait background in your browser. Your photo is never uploaded, and the result is exported as a PNG on your device.</p>
    </section>

    <section class="tool-layout">
      <div class="tool-panel">
        <div id="dropZone" class="drop-zone" tabindex="0" role="button" aria-label="Choose or drop an image">
          <strong>Drop a portrait here</strong>
          <span>or click to choose a JPG, PNG, or WebP file</span>
          <input id="imageUpload" type="file" accept="image/png,image/jpeg,image/webp" hidden>
        </div>

        <div class="control-row">
          <label class="field"><span>Background</span>
            <select id="backgroundMode">
              <option value="transparent">Transparent</option>
              <option value="solid">Solid color</option>
            </select>
          </label>
          <label class="field"><span>Color</span>
            <input id="backgroundColor" type="color" value="#2563eb">
          </label>
          <label class="field"><span>Mode</span>
            <select id="accuracyMode">
              <option value="fast">Fast</option>
              <option value="accurate" selected>High accuracy</option>
            </select>
          </label>
        </div>

        <div class="button-row">
          <button id="segmentBtn" class="btn primary" type="button" disabled>Remove background</button>
          <button id="downloadBtn" class="btn ghost" type="button" disabled>Download PNG</button>
          <button id="clearBtn" class="btn text" type="button">Clear</button>
        </div>

        <p id="status" class="status" role="status" aria-live="polite">Choose a portrait to start. Processing happens in this browser.</p>
        <div id="loader" class="loader" hidden><span></span> Loading local model…</div>
      </div>

      <div class="preview-grid">
        <article class="preview-card">
          <h2>Original</h2>
          <div class="canvas-frame"><canvas id="sourceCanvas" aria-label="Original image preview"></canvas></div>
        </article>
        <article class="preview-card">
          <h2>Result</h2>
          <div class="canvas-frame checker"><canvas id="resultCanvas" aria-label="Background removal result"></canvas></div>
        </article>
      </div>
    </section>

    <noscript><p class="notice">JavaScript is required for the local segmentation model.</p></noscript>

    ${adSlot("tool-after-editor")}

    <section class="section">
      <div class="section-heading"><p class="section-index">How it works</p><h2>Three steps, no upload</h2></div>
      <div class="steps horizontal">
        <div><strong>01</strong><h3>Choose a photo</h3><p>The browser reads the selected file into memory.</p></div>
        <div><strong>02</strong><h3>Local segmentation</h3><p>A small model creates a subject mask on your device.</p></div>
        <div><strong>03</strong><h3>Export PNG</h3><p>Download a transparent cutout or a solid-color version.</p></div>
      </div>
    </section>

    <section class="section">
      <div class="section-heading"><p class="section-index">FAQ</p><h2>Background remover questions</h2></div>
      <div class="faq-list">${faqHtml(TOOL_FAQS)}</div>
    </section>

    <section class="section">
      <div class="section-heading"><p class="section-index">Related guides</p><h2>Learn more</h2></div>
      <div class="card-grid">${articleCards(ARTICLES.slice(0, 3), 3)}</div>
    </section>
  `;
}

function docsBody() {
  return `
    <section class="page-hero compact">
      <p class="eyebrow">Documentation</p>
      <h1>Docs</h1>
      <p class="lead">How the browser-native workflow works, what files are supported, and how to troubleshoot a difficult cutout.</p>
    </section>
    <section class="section prose">
      <h2 id="getting-started">Getting started</h2>
      <p>Open the <a href="/remove-background/">background remover</a>, choose a portrait, and select high accuracy mode. The first edit downloads the model files; later edits use the browser cache.</p>
      <h2 id="supported-files">Supported files</h2>
      <p>The picker accepts JPG, PNG, and WebP files. HEIC files should be converted to PNG or JPEG first because browser support varies by operating system.</p>
      <h2 id="privacy-security">Privacy and security</h2>
      <p>Images are read with the File API and processed through Canvas. The Worker serves static files only and never reads a request body. Browser ads may set cookies on content pages, but they do not receive image pixels.</p>
      <h2 id="offline">Offline use</h2>
      <p>After the page shell and model files are cached, the core editing flow can work without a network connection. Clearing site storage removes the cache.</p>
      <h2 id="troubleshooting">Troubleshooting</h2>
      <ul>
        <li><strong>Soft edges:</strong> use high accuracy mode and a photo with a plain background.</li>
        <li><strong>Subject removed:</strong> try a closer portrait with better contrast.</li>
        <li><strong>Page feels slow:</strong> close other memory-heavy tabs and use a smaller source image.</li>
      </ul>
    </section>
    ${adSlot("docs-mid")}
  `;
}

function faqBody() {
  return `
    <section class="page-hero compact">
      <p class="eyebrow">Questions</p>
      <h1>Frequently asked questions</h1>
      <p class="lead">Everything you need to know about Toolorial's browser-native image tools.</p>
    </section>
    <section class="section">
      <h2>Using the tools</h2>
      <div class="faq-list">${faqHtml(TOOL_FAQS)}</div>
    </section>
    <section class="section">
      <h2>Privacy and business</h2>
      <div class="faq-list">${faqHtml(GENERAL_FAQS)}</div>
    </section>
    ${adSlot("faq-mid")}
  `;
}

function aboutBody() {
  return `
    <section class="page-hero compact">
      <p class="eyebrow">About</p>
      <h1>Small tools, fewer copies of your data</h1>
      <p class="lead">Toolorial builds focused browser utilities that do one job well and avoid unnecessary accounts or uploads.</p>
    </section>
    <section class="section prose">
      <h2>Why we built it</h2>
      <p>Simple image tasks should not require sending private photos to a distant server. Modern browsers can run useful models locally, and static hosting makes that approach practical.</p>
      <h2>What we optimize for</h2>
      <ul>
        <li>Fast-loading pages with readable content</li>
        <li>No account requirement for one-off tasks</li>
        <li>Clear privacy language</li>
        <li>Export formats that work in real workflows</li>
      </ul>
      <h2>How it is funded</h2>
      <p>Contextual advertising on written guides helps cover hosting and maintenance. The editing tools themselves do not send image data to those ad systems.</p>
    </section>
  `;
}

function contactBody() {
  return `
    <section class="page-hero compact">
      <p class="eyebrow">Contact</p>
      <h1>Get in touch</h1>
      <p class="lead">Bug reports, content corrections, and privacy questions are welcome.</p>
    </section>
    <section class="section prose">
      <p>Email: <a href="mailto:${SITE.email}">${SITE.email}</a></p>
      <p>Please include the page URL and a short description of the issue. Do not send private photos as attachments; the tool is designed to avoid needing them.</p>
      <h2>Response times</h2>
      <p>We review messages on a best-effort basis. Privacy requests are prioritized.</p>
    </section>
  `;
}

function privacyBody() {
  return `
    <section class="page-hero compact">
      <p class="eyebrow">Legal</p>
      <h1>Privacy Policy</h1>
      <p class="lead">Last updated: 25 November 2026</p>
    </section>
    <section class="section prose">
      <h2>Image data</h2>
      <p>Photos selected in the background remover are read by your browser and processed locally. We do not upload them to our servers, store them in a database, or place them in object storage.</p>
      <h2>Static files and models</h2>
      <p>The site serves HTML, CSS, JavaScript, WebAssembly, and model files from Cloudflare's network. These files are public application assets, not user content.</p>
      <h2>Advertising</h2>
      <p>We may display Google AdSense advertising on content pages. Google and its partners may use cookies or similar technologies to serve and measure ads. Those technologies do not receive the pixels of images you process in the tool.</p>
      <h2>Analytics</h2>
      <p>We prefer privacy-friendly, aggregate traffic measurement. If analytics are enabled, they should not receive image contents or personal files.</p>
      <h2>Cloudflare logs</h2>
      <p>As with any hosted website, Cloudflare may process ordinary request metadata such as IP address, user agent, and requested URL to deliver and protect the service.</p>
      <h2>Your choices</h2>
      <p>You can clear site data in your browser to remove cached application files. You can manage advertising cookies through your browser settings and Google's ad settings.</p>
      <h2>Contact</h2>
      <p>Questions about this policy can be sent to <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
    </section>
  `;
}

function termsBody() {
  return `
    <section class="page-hero compact">
      <p class="eyebrow">Legal</p>
      <h1>Terms of Use</h1>
      <p class="lead">Last updated: 25 November 2026</p>
    </section>
    <section class="section prose">
      <h2>Acceptable use</h2>
      <p>Use the tools only with images you are allowed to edit and publish. Do not attempt to disrupt the service or misuse advertising resources.</p>
      <h2>Output responsibility</h2>
      <p>You are responsible for reviewing exported files before publishing. The tool provides an automated cutout, not a guarantee of accuracy or legal compliance.</p>
      <h2>Third-party services</h2>
      <p>Cloudflare delivers the site. Advertising partners may operate on content pages under their own terms and privacy policies.</p>
      <h2>Availability</h2>
      <p>The tools are provided as-is. Features may change as browser capabilities and model availability evolve.</p>
      <h2>Contact</h2>
      <p>Terms questions: <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
    </section>
  `;
}

function blogIndexBody() {
  return `
    <section class="page-hero compact">
      <p class="eyebrow">Blog</p>
      <h1>Guides for private image editing</h1>
      <p class="lead">Practical writing about browser AI, image formats, privacy, and getting clean exports from local tools.</p>
    </section>
    ${adSlot("blog-top")}
    <section class="section">
      <div class="card-grid">${articleCards(ARTICLES, ARTICLES.length)}</div>
    </section>
  `;
}

function articleBody(article) {
  const crumb = breadcrumbHtml([
    { label: "Blog", href: "/blog/" },
    { label: article.title, href: `/blog/${article.slug}/` },
  ]);

  return `
    ${crumb.html}
    <article class="article">
      <header class="article-header">
        <p class="card-meta">${esc(article.category)} · <time datetime="${esc(article.date)}">${esc(article.date)}</time></p>
        <h1>${esc(article.title)}</h1>
        <p class="lead">${esc(article.description)}</p>
      </header>
      ${adSlot("article-top")}
      <div class="prose article-body">${article.body}</div>
      ${adSlot("article-mid")}
      <div class="article-cta">
        <h2>Try it yourself</h2>
        <p>Remove a portrait background locally and export a transparent PNG.</p>
        <a class="btn primary" href="/remove-background/">Open the remover</a>
      </div>
    </article>
    <section class="section">
      <div class="section-heading"><p class="section-index">Keep reading</p><h2>Related guides</h2></div>
      <div class="card-grid">${articleCards(ARTICLES.filter((item) => item.slug !== article.slug), 3)}</div>
    </section>
  `;
}

function zhHomeBody() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">浏览器本地处理 · 隐私优先</p>
        <h1>抠图不用上传照片</h1>
        <p class="lead">Toolorial 在浏览器里运行小型 AI 模型，完成人像抠图并导出透明 PNG。无需注册，没有上传步骤，服务器不保存图片。</p>
        <div class="hero-actions">
          <a class="btn primary" href="/remove-background/">开始抠图</a>
          <a class="btn ghost" href="/docs/">查看说明</a>
        </div>
        <ul class="trust-list">
          <li>本地处理</li>
          <li>无需注册</li>
          <li>PNG 导出</li>
        </ul>
      </div>
      <div class="hero-visual">
        <div class="compare-card">
          <div class="compare-side"><span>原图</span><img src="/assets/sample-portrait.svg" width="420" height="420" alt="蓝色背景人像示意图"></div>
          <div class="compare-side checker"><span>透明 PNG</span><img src="/assets/sample-cutout.svg" width="420" height="420" alt="透明背景人像示意图"></div>
        </div>
        <p class="visual-caption">图片在浏览器内存中处理，不会写入服务器存储。</p>
      </div>
    </section>
    <section class="section">
      <div class="section-heading"><p class="section-index">说明</p><h2>当前模型适合人像和头像</h2><p>商品图和复杂多物体场景不在一期支持范围内。接入广告后，广告脚本可能使用 Cookie，但不会读取你处理的图片像素。</p></div>
    </section>
  `;
}

function notFoundBody() {
  return `
    <section class="page-hero compact">
      <p class="eyebrow">404</p>
      <h1>Page not found</h1>
      <p class="lead">The page you requested does not exist or has moved.</p>
      <p><a class="btn primary" href="/">Back to home</a></p>
    </section>
  `;
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.origin,
  description: SITE.description,
  inLanguage: "en",
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Toolorial AI Background Remover",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web browser",
  url: urlFor("/remove-background/"),
  description:
    "Browser-native portrait background remover. Images are processed locally and exported as transparent PNG files.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...TOOL_FAQS, ...GENERAL_FAQS].map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

function articleSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "en",
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: urlFor(`/blog/${article.slug}/`),
  };
}

function page(path, config) {
  return { path, html: layout({ path, ...config }) };
}

export function buildPages() {
  const pages = [
    page("/", {
      title: "Toolorial — Private Browser Image Tools",
      description: SITE.description,
      body: homeBody(),
      schema: [websiteSchema, softwareSchema],
      hreflang: true,
    }),
    page("/remove-background/", {
      title: "Free AI Background Remover Online | Private, In-Browser | Toolorial",
      description:
        "Remove portrait backgrounds in your browser with a small local AI model. No upload, no sign-up, transparent PNG export.",
      body: toolBody(),
      schema: [softwareSchema, faqSchema],
    }),
    page("/docs/", {
      title: "Docs | Toolorial Browser Image Tools",
      description: "Documentation for Toolorial's browser-native image tools, privacy model, supported formats, and troubleshooting.",
      body: docsBody(),
    }),
    page("/docs/how-it-works/", {
      title: "How local background removal works | Toolorial Docs",
      description: "Learn how the browser loads a small segmentation model and applies a local mask to create a transparent PNG.",
      body: docsBody(),
    }),
    page("/faq/", {
      title: "FAQ | Toolorial",
      description: "Answers about local processing, account-free editing, offline use, advertising, and image exports.",
      body: faqBody(),
      schema: [faqSchema],
    }),
    page("/about/", {
      title: "About | Toolorial",
      description: "Why Toolorial builds small, private, browser-native image tools without unnecessary accounts or uploads.",
      body: aboutBody(),
    }),
    page("/contact/", {
      title: "Contact | Toolorial",
      description: "Contact Toolorial for bug reports, content corrections, and privacy questions.",
      body: contactBody(),
    }),
    page("/privacy/", {
      title: "Privacy Policy | Toolorial",
      description: "How Toolorial handles image data, model files, advertising cookies, analytics, and Cloudflare request metadata.",
      body: privacyBody(),
    }),
    page("/terms/", {
      title: "Terms of Use | Toolorial",
      description: "Terms for using Toolorial's browser-native image tools and exported files.",
      body: termsBody(),
    }),
    page("/blog/", {
      title: "Blog | Toolorial",
      description: "Guides about browser AI, private image editing, transparent PNG exports, image formats, and PageSpeed.",
      body: blogIndexBody(),
    }),
    page("/404/", {
      title: "Page not found | Toolorial",
      description: "The requested Toolorial page does not exist.",
      body: notFoundBody(),
    }),
    page("/zh/", {
      title: "Toolorial — 浏览器本地抠图工具",
      description: "在浏览器中完成人像抠图，不需要上传照片或注册账号，导出透明 PNG。",
      body: zhHomeBody(),
      lang: "zh-Hans",
      hreflang: true,
    }),
  ];

  for (const article of ARTICLES) {
    pages.push(
      page(`/blog/${article.slug}/`, {
        title: `${article.title} | Toolorial`,
        description: article.description,
        body: articleBody(article),
        schema: [articleSchema(article)],
      })
    );
  }

  return pages;
}

export function sitemapEntries() {
  return buildPages()
    .filter((item) => item.path !== "/404/")
    .map((item) => ({
      path: item.path,
      priority: item.path === "/" ? "1.0" : item.path.startsWith("/blog/") ? "0.6" : "0.8",
      changefreq: item.path === "/" ? "weekly" : item.path.startsWith("/blog/") ? "monthly" : "yearly",
    }));
}
