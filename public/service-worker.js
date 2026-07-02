const CACHE_NAME = 'cutout-cache-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js?v=2',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); }));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Bypass external CDN requests for large binary assets
  if (url.origin !== location.origin) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((resp) => {
        if (!resp || resp.status !== 200 || resp.type !== 'basic') return resp;
        const respClone = resp.clone();
        caches.open(CACHE_NAME).then((cache) => { cache.put(event.request, respClone); });
        return resp;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
