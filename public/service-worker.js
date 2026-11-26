const CACHE_NAME = "toolorial-cache-v5";

const CORE_ASSETS = [
  "/",
  "/styles.css",
  "/app.js",
  "/tools.js",
  "/manifest.json",
  "/vendor/tasks-vision/vision_bundle.mjs",
  "/vendor/tasks-vision/selfie_segmenter.tflite",
  "/vendor/tasks-vision/wasm/vision_wasm_internal.js",
  "/vendor/tasks-vision/wasm/vision_wasm_internal.wasm",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => undefined)
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isAsset =
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/vendor/") ||
    url.pathname === "/styles.css" ||
    url.pathname === "/app.js" ||
    url.pathname === "/tools.js" ||
    url.pathname === "/manifest.json";

  if (isAsset) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => response)
        .catch(() => caches.match("/").then((cached) => cached || Response.error()))
    );
  }
});
