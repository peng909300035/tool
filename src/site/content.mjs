export const SITE = {
  origin: "https://tooloralab.xyz",
  domain: "tooloralab.xyz",
  name: "Toolorial",
  email: "wp909300035@gmail.com",
  description:
    "Private, browser-native image tools. Remove photo backgrounds locally without uploads, accounts, or server storage.",
};

export const NAV = [
  { label: "Tools", href: "/tools/" },
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

export const TOOLS = [
  {
    path: "/remove-background/",
    name: "AI Background Remover",
    short: "Remove BG",
    tagline: "Cut out portraits locally",
    description:
      "Remove the background from portraits and avatars in your browser. No upload, no sign-up, transparent PNG export.",
    title: "Free AI Background Remover Online | Private, In-Browser | Toolorial",
    metaDescription:
      "Remove portrait backgrounds in your browser with a small local AI model. No upload, no sign-up, transparent PNG export.",
    script: "/app.js",
    dataTool: "remove-background",
    controls: "",
  },
  {
    path: "/compress-image/",
    name: "Image Compressor",
    short: "Compress",
    tagline: "Shrink files, keep quality",
    description:
      "Compress JPG, PNG, and WebP images in your browser. Adjust quality and compare file sizes before you download.",
    title: "Compress Image Online Without Uploading | Toolorial",
    metaDescription:
      "Compress JPG, PNG and WebP images locally in your browser. No upload, no account, instant download.",
    script: "/tools.js",
    dataTool: "compress",
    controls: `
      <label class="field"><span>Output format</span>
        <select id="outputFormat">
          <option value="image/jpeg">JPG</option>
          <option value="image/webp">WebP</option>
          <option value="image/png">PNG (lossless)</option>
        </select>
      </label>
      <label class="field"><span>Quality (JPG / WebP)</span>
        <input id="qualityRange" type="range" min="10" max="100" value="82">
      </label>
    `,
  },
  {
    path: "/convert-image/",
    name: "Image Converter",
    short: "Convert",
    tagline: "PNG, JPG and WebP in one place",
    description:
      "Convert images between PNG, JPG, and WebP entirely in your browser. Keep your original file on your device.",
    title: "Convert PNG to JPG or WebP Without Uploading | Toolorial",
    metaDescription:
      "Convert images between PNG, JPG and WebP locally in your browser. No upload, no account, original file stays on your device.",
    script: "/tools.js",
    dataTool: "convert",
    controls: `
      <label class="field"><span>Convert to</span>
        <select id="outputFormat">
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPG</option>
          <option value="image/webp">WebP</option>
        </select>
      </label>
      <label class="field"><span>Quality (JPG / WebP)</span>
        <input id="qualityRange" type="range" min="10" max="100" value="90">
      </label>
    `,
  },
  {
    path: "/resize-image/",
    name: "Image Resizer",
    short: "Resize",
    tagline: "Fit any platform size",
    description:
      "Resize images by pixels, percentage, or a preset for social platforms. Everything happens locally in the browser.",
    title: "Resize Image Online Without Uploading | Toolorial",
    metaDescription:
      "Resize images by pixels, percent, or social media presets in your browser. No upload, no account, instant download.",
    script: "/tools.js",
    dataTool: "resize",
    controls: `
      <label class="field"><span>Width (px)</span><input id="targetWidth" type="number" min="1" placeholder="Auto"></label>
      <label class="field"><span>Height (px)</span><input id="targetHeight" type="number" min="1" placeholder="Auto"></label>
      <label class="field"><span>Or scale</span>
        <select id="scalePreset">
          <option value="1">100%</option>
          <option value="0.75">75%</option>
          <option value="0.5">50%</option>
          <option value="0.25">25%</option>
        </select>
      </label>
      <label class="field"><span>Popular size</span>
        <select id="sizePreset">
          <option value="custom">Custom</option>
          <option value="1024x1024">Square 1024 × 1024</option>
          <option value="1080x1350">Portrait 1080 × 1350</option>
          <option value="1200x630">Social card 1200 × 630</option>
          <option value="1920x1080">Widescreen 1920 × 1080</option>
          <option value="500x500">Avatar 500 × 500</option>
        </select>
      </label>
      <label class="field"><span>Output format</span>
        <select id="outputFormat">
          <option value="image/jpeg">JPG</option>
          <option value="image/png">PNG</option>
          <option value="image/webp">WebP</option>
        </select>
      </label>
      <label class="field"><span>Quality (JPG / WebP)</span>
        <input id="qualityRange" type="range" min="10" max="100" value="90">
      </label>
    `,
  },
  {
    path: "/remove-exif/",
    name: "EXIF Remover",
    short: "Remove EXIF",
    tagline: "Strip hidden metadata",
    description:
      "Remove EXIF metadata from photos in your browser. The export is rebuilt from pixels, so location and device tags are left behind.",
    title: "Remove EXIF Data From Photos Without Uploading | Toolorial",
    metaDescription:
      "Strip EXIF location and camera metadata from JPG, PNG and WebP photos locally in your browser. No upload, no account.",
    script: "/tools.js",
    dataTool: "exif",
    controls: `
      <label class="field"><span>Output format</span>
        <select id="outputFormat">
          <option value="image/jpeg">JPG</option>
          <option value="image/png">PNG</option>
          <option value="image/webp">WebP</option>
        </select>
      </label>
      <label class="field"><span>Quality (JPG / WebP)</span>
        <input id="qualityRange" type="range" min="10" max="100" value="92">
      </label>
    `,
  },
];

export const TOOL_FAQS_BY_PATH = {
  "/compress-image/": [
    {
      q: "Does compressing an image reduce quality?",
      a: "JPG and WebP are lossy formats, so lowering quality removes some detail. Start around 80 percent and preview the result. PNG is lossless and will usually get larger instead of smaller.",
    },
    {
      q: "Which output format should I choose?",
      a: "Use JPG for ordinary photos, WebP for smaller web images, and PNG only when you need lossless pixels or transparency.",
    },
    {
      q: "Is my image uploaded anywhere?",
      a: "No. Compression runs through the Canvas API in your browser. The file is read into memory, processed, and exported back to your device.",
    },
    {
      q: "Why did my PNG get bigger?",
      a: "PNG stores pixels losslessly, so re-encoding a photo as PNG often increases file size. Choose JPG or WebP for photographs.",
    },
  ],
  "/convert-image/": [
    {
      q: "Which formats can I convert between?",
      a: "The converter handles PNG, JPG, and WebP. All three are supported natively by modern browsers, so conversion happens locally.",
    },
    {
      q: "Will conversion keep transparency?",
      a: "PNG and WebP can store an alpha channel. JPG cannot, so transparent areas are flattened onto white when you convert to JPG.",
    },
    {
      q: "Does conversion remove EXIF data?",
      a: "Yes. The export is rebuilt from canvas pixels, so metadata from the original file is not carried into the new image.",
    },
    {
      q: "Is there a file size limit?",
      a: "There is no server upload limit because nothing is uploaded. Very large images are limited only by your device memory.",
    },
  ],
  "/resize-image/": [
    {
      q: "How do the width and height fields work?",
      a: "Fill in one dimension and the other is calculated from the original aspect ratio. Fill in both to set an exact size.",
    },
    {
      q: "Which preset should I use?",
      a: "Square works for Instagram posts, 1080 × 1350 for portrait posts, 1200 × 630 for link previews, and 500 × 500 for avatars.",
    },
    {
      q: "Does resizing improve image quality?",
      a: "No. Resizing changes pixel dimensions. Downscaling can reduce file size, but it cannot add detail that was not in the original.",
    },
    {
      q: "Are my images uploaded?",
      a: "No. Resizing uses Canvas in your browser, so the original file never leaves your device.",
    },
  ],
  "/remove-exif/": [
    {
      q: "What is EXIF data?",
      a: "EXIF is metadata stored inside image files. It can include camera model, timestamps, lens settings, and sometimes GPS coordinates.",
    },
    {
      q: "Does this remove every metadata field?",
      a: "The export is generated from decoded pixels, which strips the original metadata blocks. Open the result in a metadata viewer if you need to verify a specific field.",
    },
    {
      q: "Does removing EXIF change the picture?",
      a: "PNG output is lossless. If you choose JPG or WebP, the image is re-encoded at your chosen quality, so keep quality high for best results.",
    },
    {
      q: "Why should I remove EXIF before sharing?",
      a: "Location and device details can reveal a home address, workplace, or routine when several photos are published together.",
    },
  ],
};

export const ARTICLES = [
  {
    slug: "compress-photo-to-100kb-for-a-form",
    title: "How to compress a photo to 100 KB for an online form",
    description:
      "Forms often reject photos over 100 KB. Shrink a JPG to the right size locally, without sending the original to a website.",
    category: "How-to",
    date: "2026-11-27",
    body: `
      <p>That "file too large, maximum 100 KB" message is frustrating because a phone photo is usually 2 to 5 MB. You need to shrink it by a factor of twenty or more, and there's no way around it.</p>

      <h2 id="why-limit">Why forms set a 100 KB limit</h2>
      <p>Usually it's the email. A lot of systems attach your upload to a confirmation message, and large attachments get bounced by the recipient's mail server. Sometimes it's just a small database field. Whatever the reason, the number is hard and you have to work under it.</p>

      <h2 id="format-first">Use JPG for photos, not PNG</h2>
      <p>This alone can save you 80 percent. A photo saved as PNG keeps every pixel and often lands around 8 MB. Save the same shot as a JPG and you're at 1 MB or less before you've touched the quality slider. PNG is for logos and screenshots with flat colors; for anything from a camera, use JPG.</p>

      <h2 id="quality">The quality setting that works</h2>
      <p>Start at 65. A typical 3 MB phone photo drops to roughly 150 to 250 KB there, and often below 100 KB at 55. Go under 50 and you'll start to see blocky patches around edges. A form thumbnail only displays a few hundred pixels wide, so most of that won't be visible anyway.</p>
      <p>If you still have the original, work from that. Re-compressing a JPG that's already been squeezed doesn't do much, and every pass throws away more detail.</p>

      <h2 id="steps">Steps</h2>
      <ol>
        <li>Open our <a href="/compress-image/">image compressor</a>.</li>
        <li>Drop in the photo and set quality to 65.</li>
        <li>Check the size readout. If it's still over 100 KB, try 55.</li>
        <li>Download and upload the compressed copy.</li>
      </ol>

      <h2 id="limits">When this won't work</h2>
      <p>Photos with a lot of small text — a scanned document or a screenshot — get fuzzy under JPG compression. Keep those as PNG and check whether the form accepts another format. If the form wants both 100 KB and a specific pixel size, resize first and compress second. The other order just costs you quality for no gain.</p>
    `,
  },
  {
    slug: "make-transparent-png-from-a-portrait",
    title: "How to make a transparent PNG from a portrait photo",
    description:
      "A transparent PNG lets you drop a person onto any background. Cut out a portrait in your browser and export a clean alpha channel.",
    category: "How-to",
    date: "2026-11-26",
    body: `
      <p>JPG can't store transparency. To put someone on a colored banner or a new backdrop you need a PNG with an alpha channel. Most background removers want you to upload the photo first, and then you're trusting them not to keep a copy of it. You can do the cutout on your own machine instead.</p>

      <h2 id="what-is-alpha">What the alpha channel actually does</h2>
      <p>A PNG has a fourth channel alongside red, green and blue that says how opaque each pixel is. Zero is fully transparent, 255 is solid. Getting a clean cutout mostly comes down to getting that channel right around hair and shoulders.</p>

      <h2 id="how-it-works-here">What happens in the browser</h2>
      <p>Our <a href="/remove-background/">background remover</a> downloads a small segmentation model to your browser. Pick a file and the page draws it on a canvas, then the model returns a mask — a map of which pixels belong to the person. The page combines that mask with the original pixels and gives you a PNG. The photo itself never goes up to a server.</p>

      <h2 id="better-edges">Getting edges that don't look cut out</h2>
      <p>Plain backgrounds help more than anything else. A flat wall or a studio backdrop gives the model a clear boundary to work with. It struggles when there's a chair or a shadow right behind the head.</p>
      <p>Before you download, check the hairline and shoulders at full size. On some images the whole subject disappears and the background stays. If that happens, tick the Invert mask box and run it again — one click, sorted.</p>

      <h2 id="export">Export and check on two backgrounds</h2>
      <p>Download the PNG and open it once on a dark background, once on a light one. Edges that look fine on white often show a faint halo on black. Usually that means the original had a light-colored wall behind the subject, and a little of it bled into the edge pixels.</p>

      <h2 id="limits">Where it falls short</h2>
      <p>It's a portrait tool, made for headshots and profile photos. Products and pets aren't really its job, and overlapping people in a group shot confuse it. Thin, see-through fabric tends to get clipped too. When you hit one of those, a manual selection in an editor is faster than fighting the model.</p>
    `,
  },
  {
    slug: "why-is-my-png-bigger-than-my-jpg",
    title: "Why is my PNG bigger than my JPG?",
    description:
      "The same photo can be ten times larger as a PNG. What causes the difference, and how to choose a format without losing what you need.",
    category: "Formats",
    date: "2026-11-25",
    body: `
      <p>Save the same photo as a PNG and as a JPG, then compare the file sizes. The PNG might be 8 MB while the JPG is 700 KB. The image looks identical, so where did all that weight come from?</p>

      <h2 id="lossless">PNG keeps everything</h2>
      <p>PNG is lossless: every pixel is stored exactly, gradients and all. A photo has millions of slightly different colors and PNG accounts for every one of them. That works great for a logo with three flat colors, and badly for a landscape.</p>

      <h2 id="lossy">JPG throws some of it away</h2>
      <p>JPG groups nearby pixels and discards detail the eye is unlikely to notice. At quality 80 most people can't tell the difference at normal viewing size. The file is smaller because a lot of that data is simply gone, not because it was packed better.</p>

      <h2 id="web-middle">WebP sits in the middle</h2>
      <p>WebP supports lossy compression and transparency, and is usually smaller than the equivalent JPG or PNG. Every modern browser reads it. The only snag is older software and the odd upload form that still only takes JPG or PNG.</p>

      <h2 id="convert">Converting locally</h2>
      <p>You don't need to upload the photo to change its format. Our <a href="/convert-image/">image converter</a> reads the file, draws it on a canvas and exports it in the format you pick. The original metadata gets dropped along the way, which is usually what you want before sharing anyway.</p>

      <h2 id="mistake">A mistake worth avoiding</h2>
      <p>People save a photo as PNG because it sounds like the higher quality format, then wonder why a 12 MB file won't upload anywhere. Keep a PNG master if you plan to edit it later, but publish a JPG or WebP copy. Converting a JPG to PNG won't make it sharper, either — the detail was gone the moment it became a JPG.</p>

      <h2 id="exceptions">When PNG is still the right call</h2>
      <p>Screenshots with text, icons, diagrams, anything with hard edges or real transparency. For those the larger file is a fair trade. Photos go out as JPG or WebP; graphics stay PNG.</p>
    `,
  },
  {
    slug: "resize-photo-to-500x500-for-an-avatar",
    title: "How to resize a photo to 500×500 px for an avatar",
    description:
      "A 500×500 square works on most profile pages. Crop and resize a photo locally instead of uploading it to a random site.",
    category: "Guides",
    date: "2026-11-24",
    body: `
      <p>Profile picture fields can't seem to agree on a size. One wants 400 pixels, another wants 512, and nearly all of them crop to a circle anyway. A 500×500 square covers those without turning into a huge file.</p>

      <h2 id="crop-first">Crop before you resize</h2>
      <p>This is the part people skip. Shrink a 4000×3000 photo straight down to 500 pixels wide and the person ends up small in the middle with a lot of background around them. Crop to a square around the face first, then scale. You usually want the eyes in the upper third of the frame.</p>

      <h2 id="ratio">Keep the ratio unless the site demands otherwise</h2>
      <p>Fill in only the width and the height follows the original proportion, so nothing gets stretched. Type both numbers only when the destination has a hard requirement, and expect to trim a little off the edges.</p>

      <h2 id="steps">Steps</h2>
      <ol>
        <li>Open the <a href="/resize-image/">image resizer</a>.</li>
        <li>Drop in your photo and choose the 500×500 preset, or set the width and let the height follow.</li>
        <li>Check the preview. If the face is too small, crop first and try again.</li>
        <li>Download and use the square as your avatar.</li>
      </ol>

      <h2 id="no-upscale">Don't expect upscaling to help</h2>
      <p>If your original is 150×150, making it 500×500 just spreads the same pixels over a bigger area. Nothing gets sharper. Smoothing helps a little, but you can't recover detail that was never captured. Start from the largest original you have.</p>

      <h2 id="size-check">Check the file size too</h2>
      <p>Dimensions and file size aren't the same thing. A 500×500 PNG can still be a couple of megabytes if the photo is noisy. If the profile page has an upload limit, export as JPG at quality 80 and compare. That usually lands under 100 KB, and at avatar size you won't see the difference.</p>
    `,
  },
  {
    slug: "compress-images-without-uploading",
    title: "How to compress images without uploading them",
    description:
      "A practical guide to browser-based image compression: quality settings, format choices, and how to shrink files without a private photo leaving your device.",
    category: "How-to",
    date: "2026-11-26",
    body: `
      <p>Image compression reduces file size by removing information your eyes are unlikely to notice. Most online compressors ask you to upload the original file first. A browser-based tool can do the same job locally, with no remote copy of the image.</p>
      <h2 id="lossy-vs-lossless">Lossy versus lossless</h2>
      <p>JPG and WebP are lossy formats. They discard detail in exchange for smaller files, and the quality slider controls how much is thrown away. PNG is lossless: it keeps every pixel but usually produces much larger files for photographs.</p>
      <h2 id="quality">Choosing a quality setting</h2>
      <p>Start around 80 percent for JPG and WebP. That is often close to visually identical to the original at normal viewing size. Go lower only when file size matters more than fine texture, such as for a preview thumbnail.</p>
      <h2 id="steps">A simple workflow</h2>
      <ol>
        <li>Open a local compressor, for example our <a href="/compress-image/">image compressor</a>.</li>
        <li>Drop in a photo and compare the original and result sizes.</li>
        <li>Adjust quality until the file is small enough without visible artifacts.</li>
        <li>Download and view it at actual display size before publishing.</li>
      </ol>
      <h2 id="limits">Know the limits</h2>
      <p>Compressing an already-compressed JPG again will not help. Each pass loses more detail. Keep one high-quality master and produce compressed copies from that master instead of chaining exports.</p>
      <h2 id="privacy">Why local matters</h2>
      <p>Photos often contain people, documents, or unpublished work. Processing them in the browser avoids creating another copy on a remote server, which is a small habit with a real privacy benefit.</p>
    `,
  },
  {
    slug: "png-to-jpg-or-webp-which-format-to-choose",
    title: "PNG to JPG or WebP: which format should you choose?",
    description:
      "When to keep PNG, when to switch to JPG, and where WebP wins — plus how to convert images locally without uploading them.",
    category: "Formats",
    date: "2026-11-24",
    body: `
      <p>The right image format depends on what the picture contains and where it will be published. Converting between formats is easy, but choosing the wrong one can add file size or remove transparency you needed.</p>
      <h2 id="png">Keep PNG for transparency and sharp edges</h2>
      <p>PNG stores an alpha channel and preserves hard edges without compression artifacts. Use it for logos, screenshots, icons, and cutouts with transparent backgrounds. The tradeoff is size: photographs become large PNG files.</p>
      <h2 id="jpg">Use JPG for photographs</h2>
      <p>JPG is still the most compatible format for photos. It has no transparency, so transparent areas are flattened onto a solid color, usually white. Set quality around 80 to 90 for a good balance.</p>
      <h2 id="webp">WebP for the modern web</h2>
      <p>WebP supports both lossy compression and transparency, and it is usually smaller than the equivalent JPG or PNG. All modern browsers support it. Choose it when you control the delivery environment.</p>
      <h2 id="conversion">Converting locally</h2>
      <p>A browser converter such as our <a href="/convert-image/">image converter</a> reads the file into memory, draws it on a canvas, and exports the new format. Converting also strips the original metadata, which is often a welcome side effect.</p>
      <h2 id="checklist">A quick checklist</h2>
      <ul>
        <li>Need transparency? PNG or WebP.</li>
        <li>Photograph for maximum compatibility? JPG.</li>
        <li>Web delivery where you control browsers? WebP.</li>
        <li>Unsure? Keep a PNG master and export copies as needed.</li>
      </ul>
    `,
  },
  {
    slug: "how-to-remove-exif-data-from-a-photo",
    title: "How to remove EXIF data from a photo",
    description:
      "What EXIF metadata contains, why it can be sensitive, and a local method for stripping it before you share an image.",
    category: "Privacy",
    date: "2026-11-22",
    body: `
      <p>A photo file is more than a grid of pixels. EXIF metadata can record the camera model, lens settings, the exact time a picture was taken, and sometimes GPS coordinates. That information is useful for organizing a camera roll, but it is not always meant for publication.</p>
      <h2 id="what">What EXIF usually includes</h2>
      <p>Common fields include date and time, device model, aperture and shutter speed, orientation, and software used for editing. Some phones add location. Social networks often strip part of this data, but files exported from editing tools may keep it.</p>
      <h2 id="why">Why remove it</h2>
      <p>Location metadata can reveal where you live or work. When several photos are published together, timestamps can also describe a daily routine. Removing metadata before sharing is a simple way to avoid exposing details you did not intend to publish.</p>
      <h2 id="how">A local method</h2>
      <p>Open a local tool such as our <a href="/remove-exif/">EXIF remover</a>, choose the image, and export it. The tool decodes the pixels and rebuilds the file, so the original metadata blocks are not carried into the new image. Choose PNG for lossless output or keep JPG quality high.</p>
      <h2 id="verify">Verify the result</h2>
      <p>Open the exported file in a metadata viewer before publishing it. Different tools remove different fields, and checking once is faster than assuming the job was done.</p>
      <h2 id="habit">Make it a habit</h2>
      <p>Strip metadata whenever you export a photo for a public destination: a forum, a listing, a job application, or a personal site. It takes a few seconds and avoids a class of privacy mistakes that are easy to overlook.</p>
    `,
  },
  {
    slug: "image-size-presets-for-social-platforms",
    title: "Image size presets for social platforms and avatars",
    description:
      "Common pixel dimensions for profiles, posts, and link previews, plus how to resize a photo locally to fit them.",
    category: "Guides",
    date: "2026-11-20",
    body: `
      <p>Platforms change their recommended dimensions, but a few common sizes cover most needs. Resizing locally lets you prepare the right file without uploading an original to a third-party site.</p>
      <h2 id="sizes">Useful dimensions</h2>
      <ul>
        <li>500 × 500 — a safe avatar size for most services.</li>
        <li>1024 × 1024 — square posts and catalog thumbnails.</li>
        <li>1080 × 1350 — portrait posts where more vertical space helps.</li>
        <li>1200 × 630 — link preview and social card images.</li>
        <li>1920 × 1080 — widescreen backgrounds and presentations.</li>
      </ul>
      <h2 id="ratio">Aspect ratio matters</h2>
      <p>Fill only the width or the height in a resizer and the other side follows the original ratio. That avoids stretching. Use exact dimensions only when the destination requires a specific crop.</p>
      <h2 id="resize">Resizing in the browser</h2>
      <p>Our <a href="/resize-image/">image resizer</a> works with pixels, percentages, and presets. The file is processed through Canvas on your device, so the original photo is not uploaded.</p>
      <h2 id="quality">Quality notes</h2>
      <p>Downscaling reduces file size but cannot add detail. Start from the highest-quality original you have, export at a sensible quality setting, and check the result at the size it will actually be displayed.</p>
    `,
  },
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
        <li>Use a plain background when edge detail matters.</li>
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
        <li>Use an evenly lit source photo for soft edges.</li>
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
      <h2 id="accuracy">Look for soft alpha values</h2>
      <p>A good cutout keeps partial transparency along hair edges instead of a hard on/off mask. The local model uses a confidence mask for this, so individual strands blend more naturally on both light and dark backgrounds.</p>
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
    (item) => `<a href="${esc(item.href)}"${item.href === "/tools/" ? ' class="nav-cta"' : ""}>${esc(item.label)}</a>`
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
          <a href="/tools/">All tools</a>
          ${TOOLS.map((tool) => `<a href="${tool.path}">${esc(tool.short)}</a>`).join("\n          ")}
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
  script = "/app.js",
  dataTool = "",
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
<body class="${esc(bodyClass)}"${dataTool ? ` data-tool="${esc(dataTool)}"` : ""}>
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
  <script src="${esc(script)}" defer></script>
</body>
</html>
`;
}

function homeBody() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Private image tools · No uploads</p>
        <h1>Edit images in your browser, not on someone else's server.</h1>
        <p class="lead">Compress, convert, resize, strip EXIF data, and cut out portraits — without sending a single photo to a server. No accounts, no upload queues, no hidden copies of your files.</p>
        <div class="hero-actions">
          <a class="btn primary" href="/tools/">Browse all tools</a>
          <a class="btn ghost" href="/docs/how-it-works/">How it works</a>
        </div>
        <ul class="trust-list">
          <li>Runs on your device</li>
          <li>No sign-up</li>
          <li>Five free tools</li>
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
        <p class="visual-caption">Every tool reads your file into browser memory, processes it locally, and exports the result back to your device.</p>
      </div>
    </section>

    ${adSlot("home-top")}

    <section class="section" id="tools">
      <div class="section-heading">
        <p class="section-index">01 / Toolkit</p>
        <h2>Five tools, one privacy promise</h2>
        <p>Every tool has its own page and runs entirely in your browser. Pick the one you need and start immediately.</p>
      </div>
      <div class="tool-grid">
        ${TOOLS.map(
          (tool, index) => `
          <a class="tool-card" href="${tool.path}">
            <span class="tool-number">${String(index + 1).padStart(2, "0")}</span>
            <h3>${esc(tool.name)}</h3>
            <p>${esc(tool.tagline)}</p>
            <span class="tool-arrow" aria-hidden="true">→</span>
          </a>`
        ).join("")}
      </div>
      <p><a class="text-link" href="/tools/">Browse the full toolkit</a></p>
    </section>

    <section class="section">
      <div class="section-heading">
        <p class="section-index">02 / Privacy</p>
        <h2>Your photos stay on your device</h2>
        <p>Tools read your file in the browser. We do not operate an upload endpoint or an image database.</p>
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
          <p>Export a clean file you can reuse, with formats that work in real publishing workflows.</p>
        </article>
      </div>
    </section>

    <section class="section split">
      <div>
        <p class="section-index">03 / Speed</p>
        <h2>No upload, no waiting</h2>
        <p>Most tools need no download at all. The only one that loads a model is the background remover, and that model is cached by your browser after first use.</p>
      </div>
      <div class="steps">
        <div><strong>1</strong><span>Choose a tool</span></div>
        <div><strong>2</strong><span>Drop your file</span></div>
        <div><strong>3</strong><span>Download the result</span></div>
      </div>
    </section>

    <section class="section tool-cta">
      <div>
        <p class="section-index">04 / Background remover</p>
        <h2>Clean cutouts for portraits and avatars</h2>
        <p>A small local model removes the background from profile photos and headshots and exports a transparent PNG. Your photo is never uploaded.</p>
      </div>
      <a class="btn primary" href="/remove-background/">Open the tool</a>
    </section>

    <section class="section">
      <div class="section-heading">
        <p class="section-index">FAQ</p>
        <h2>Frequently asked questions</h2>
      </div>
      <div class="faq-list">${faqHtml([...GENERAL_FAQS.slice(0, 2), ...TOOL_FAQS.slice(0, 2)])}</div>
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
          <div class="field"><span>Mask direction</span>
            <label class="checkbox-line"><input id="invertMask" type="checkbox"> Invert if the result looks reversed</label>
          </div>
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

function toolsIndexBody() {
  return `
    <section class="page-hero compact">
      <p class="eyebrow">Toolkit</p>
      <h1>Private image tools, all in one place</h1>
      <p class="lead">Five focused utilities that run in your browser. No uploads, no accounts, no server-side copies of your files.</p>
    </section>
    ${adSlot("tools-top")}
    <section class="section">
      <div class="tool-grid tool-grid-large">
        ${TOOLS.map(
          (tool, index) => `
          <article class="tool-card tool-card-large">
            <span class="tool-number">${String(index + 1).padStart(2, "0")}</span>
            <h2><a href="${tool.path}">${esc(tool.name)}</a></h2>
            <p>${esc(tool.description)}</p>
            <a class="text-link" href="${tool.path}">Open tool →</a>
          </article>`
        ).join("")}
      </div>
    </section>
    <section class="section">
      <div class="section-heading"><p class="section-index">How it works</p><h2>The same privacy model everywhere</h2></div>
      <div class="steps horizontal">
        <div><strong>01</strong><h3>Open a tool</h3><p>Each utility has its own page, so you only load what you need.</p></div>
        <div><strong>02</strong><h3>Drop your file</h3><p>The browser reads the image into memory. Nothing is uploaded.</p></div>
        <div><strong>03</strong><h3>Download locally</h3><p>The result is generated on your device and saved straight to it.</p></div>
      </div>
    </section>
    <section class="section">
      <div class="section-heading"><p class="section-index">FAQ</p><h2>Common questions</h2></div>
      <div class="faq-list">${faqHtml(GENERAL_FAQS)}</div>
    </section>
  `;
}

function genericToolBody(tool) {
  const faqs = TOOL_FAQS_BY_PATH[tool.path] || [];
  const helpText =
    tool.path === "/remove-exif/"
      ? "The export is rebuilt from image pixels, so original metadata blocks are not carried over."
      : tool.path === "/resize-image/"
      ? "Fill in one dimension to keep the aspect ratio, or pick a preset size."
      : "Preview the result and compare file sizes before downloading.";

  return `
    <section class="page-hero compact">
      <p class="eyebrow">Free · Private · No watermark</p>
      <h1>${esc(tool.name)}</h1>
      <p class="lead">${esc(tool.description)}</p>
    </section>

    <section class="tool-layout">
      <div class="tool-panel">
        <div id="dropZone" class="drop-zone" tabindex="0" role="button" aria-label="Choose or drop an image">
          <strong>Drop an image here</strong>
          <span>or click to choose a JPG, PNG, or WebP file</span>
          <input id="imageUpload" type="file" accept="image/png,image/jpeg,image/webp" hidden>
        </div>

        <div class="control-row">${tool.controls}</div>

        <div class="button-row">
          <button id="processBtn" class="btn primary" type="button" disabled>Process image</button>
          <button id="downloadBtn" class="btn ghost" type="button" disabled>Download file</button>
          <button id="clearBtn" class="btn text" type="button">Clear</button>
        </div>

        <p id="status" class="status" role="status" aria-live="polite">Choose an image to start. Processing happens in this browser.</p>
        <p class="size-line">Original: <strong id="originalSize">—</strong> · Result: <strong id="resultSize">—</strong> <span id="saving" class="saving"></span></p>
      </div>

      <div class="preview-grid">
        <article class="preview-card">
          <h2>Original</h2>
          <div class="canvas-frame"><canvas id="sourceCanvas" aria-label="Original image preview"></canvas></div>
        </article>
        <article class="preview-card">
          <h2>Result</h2>
          <div class="canvas-frame"><canvas id="resultCanvas" aria-label="Processed image preview"></canvas></div>
        </article>
      </div>
    </section>

    <noscript><p class="notice">JavaScript is required to process images in your browser.</p></noscript>

    ${adSlot("tool-after-editor")}

    <section class="section">
      <div class="section-heading"><p class="section-index">How it works</p><h2>Local by design</h2><p>${esc(helpText)}</p></div>
      <div class="steps horizontal">
        <div><strong>01</strong><h3>Choose an image</h3><p>The browser reads the selected file into memory.</p></div>
        <div><strong>02</strong><h3>Process locally</h3><p>Canvas handles the work on your device. No upload request is made.</p></div>
        <div><strong>03</strong><h3>Save the result</h3><p>Download the new file straight from your browser.</p></div>
      </div>
    </section>

    <section class="section">
      <div class="section-heading"><p class="section-index">FAQ</p><h2>${esc(tool.short)} questions</h2></div>
      <div class="faq-list">${faqHtml(faqs)}</div>
    </section>

    <section class="section">
      <div class="section-heading"><p class="section-index">More tools</p><h2>Keep working locally</h2></div>
      <div class="tool-grid">
        ${TOOLS.filter((item) => item.path !== tool.path)
          .slice(0, 4)
          .map(
            (item) => `
          <a class="tool-card" href="${item.path}">
            <span class="tool-number">${esc(item.short)}</span>
            <h3>${esc(item.name)}</h3>
            <p>${esc(item.tagline)}</p>
            <span class="tool-arrow" aria-hidden="true">→</span>
          </a>`
          )
          .join("")}
      </div>
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
      <p>Open the <a href="/remove-background/">background remover</a>, choose a portrait, and run the tool. The first edit downloads the model files; later edits use the browser cache. If the mask looks reversed on an unusual photo, tick the Invert option and run it again.</p>
      <h2 id="supported-files">Supported files</h2>
      <p>The picker accepts JPG, PNG, and WebP files. HEIC files should be converted to PNG or JPEG first because browser support varies by operating system.</p>
      <h2 id="privacy-security">Privacy and security</h2>
      <p>Images are read with the File API and processed through Canvas. The Worker serves static files only and never reads a request body. Browser ads may set cookies on content pages, but they do not receive image pixels.</p>
      <h2 id="offline">Offline use</h2>
      <p>After the page shell and model files are cached, the core editing flow can work without a network connection. Clearing site storage removes the cache.</p>
      <h2 id="troubleshooting">Troubleshooting</h2>
      <ul>
        <li><strong>Soft edges:</strong> use a photo with a plain background and even lighting.</li>
        <li><strong>Reversed result:</strong> tick the Invert option and run the tool again.</li>
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
        <h1>图片处理，全部在本地浏览器完成</h1>
        <p class="lead">压缩、格式转换、调整尺寸、清除 EXIF、人像抠图——所有工具都在你的浏览器里运行，照片不会上传到服务器。无需注册，服务器不保存图片。</p>
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
      <div class="section-heading"><p class="section-index">工具</p><h2>五个工具，同一个隐私承诺</h2><p>每个工具都有独立页面，全部在浏览器本地运行。接入广告后，广告脚本可能使用 Cookie，但不会读取你处理的图片像素。</p></div>
      <div class="tool-grid">
        ${TOOLS.map(
          (tool, index) => `
          <a class="tool-card" href="${tool.path}">
            <span class="tool-number">${String(index + 1).padStart(2, "0")}</span>
            <h3>${esc(tool.name)}</h3>
            <p>${esc(tool.tagline)}</p>
            <span class="tool-arrow" aria-hidden="true">→</span>
          </a>`
        ).join("")}
      </div>
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

const toolkitSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Toolorial browser image tools",
  description: "A collection of free image utilities that run entirely in the browser.",
  itemListElement: TOOLS.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: urlFor(tool.path),
  })),
};

function toolSchema(tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `Toolorial ${tool.name}`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web browser",
    url: urlFor(tool.path),
    description: tool.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

function toolFaqSchema(tool) {
  const faqs = TOOL_FAQS_BY_PATH[tool.path] || (tool.path === "/remove-background/" ? TOOL_FAQS : []);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
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
      schema: [websiteSchema, softwareSchema, toolkitSchema],
      hreflang: true,
    }),
    page("/remove-background/", {
      title: "Free AI Background Remover Online | Private, In-Browser | Toolorial",
      description:
        "Remove portrait backgrounds in your browser with a small local AI model. No upload, no sign-up, transparent PNG export.",
      body: toolBody(),
      schema: [softwareSchema, toolFaqSchema(TOOLS[0])],
    }),
    page("/tools/", {
      title: "Free Private Image Tools | Browser-Based Toolkit | Toolorial",
      description:
        "Compress, convert, resize, remove EXIF data, and cut out portraits — five free image tools that run in your browser without uploads.",
      body: toolsIndexBody(),
      schema: [websiteSchema, toolkitSchema, faqSchema],
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

  for (const tool of TOOLS.slice(1)) {
    pages.push(
      page(tool.path, {
        title: tool.title,
        description: tool.metaDescription,
        body: genericToolBody(tool),
        schema: [toolSchema(tool), toolFaqSchema(tool)],
        script: tool.script,
        dataTool: tool.dataTool,
      })
    );
  }

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
    .map((item) => {
      const isTool = item.path === "/tools/" || TOOLS.some((tool) => tool.path === item.path);
      return {
        path: item.path,
        priority: item.path === "/" ? "1.0" : item.path.startsWith("/blog/") ? "0.6" : isTool ? "0.9" : "0.8",
        changefreq: item.path === "/" ? "weekly" : item.path.startsWith("/blog/") ? "monthly" : isTool ? "monthly" : "yearly",
      };
    });
}
