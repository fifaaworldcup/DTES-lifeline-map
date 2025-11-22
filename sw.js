/* Service Worker for DTES Lifeline Map
   - Precache core assets
   - Network-first for index and JSON (so updates are fetched), fallback to cache
   - Cache-first for tiles with LRU limit
   - Runtime caching for other assets
*/

const PRECACHE = 'dtes-precache-v2';
const RUNTIME = 'dtes-runtime-v2';
const PRECACHE_URLS = [
  '/', '/index.html', '/manifest.json', '/dtes-resources.json',
  '/icons/icon-192.png', '/icons/icon-512.png',
  '/libs/leaflet/leaflet.js', '/libs/leaflet/leaflet.css',
  '/libs/leaflet-routing-machine/leaflet-routing-machine.js', '/libs/leaflet-routing-machine/leaflet-routing-machine.css',
  '/libs/fontawesome/css/all.min.css',
  '/libs/qrcode/qrcode.min.js',
  '/css/tailwind.min.css'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(PRECACHE).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== PRECACHE && k !== RUNTIME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function limitCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if(keys.length > maxItems) {
    await cache.delete(keys[0]);
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Network-first for navigations and index.html
  if(request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('/index.html')) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        const cache = await caches.open(PRECACHE);
        cache.put('/index.html', response.clone());
        return response;
      } catch (err) {
        const cached = await caches.match('/index.html');
        return cached || Response.error();
      }
    })());
    return;
  }

  // Network-first for JSON data (so updates propagate), fallback to cache
  if(url.pathname.endsWith('/dtes-resources.json')) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        const cache = await caches.open(PRECACHE);
        cache.put('/dtes-resources.json', response.clone());
        return response;
      } catch (err) {
        const cached = await caches.match('/dtes-resources.json');
        return cached || new Response('[]', { headers: { 'Content-Type': 'application/json' }});
      }
    })());
    return;
  }

  // Cache-first for map tiles
  if(url.hostname.includes('tile.openstreetmap.org') || url.hostname.includes('a.tile.openstreetmap.org') || url.hostname.includes('b.tile.openstreetmap.org') || url.hostname.includes('c.tile.openstreetmap.org')) {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME);
      const cached = await cache.match(request);
      if(cached) return cached;
      try {
        const response = await fetch(request);
        if(response && response.status === 200) {
          cache.put(request, response.clone());
          limitCache(RUNTIME, 400); // keep up to 400 tiles
        }
        return response;
      } catch (err) {
        // Return minimal SVG tile as fallback
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-size="14">offline</text></svg>`;
        return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' }});
      }
    })());
    return;
  }

  // Default: try cache then network
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if(cached) return cached;
    try {
      const response = await fetch(request);
      if(request.method === 'GET' && request.url.startsWith(self.location.origin)) {
        const runtimeCache = await caches.open(RUNTIME);
        runtimeCache.put(request, response.clone());
        limitCache(RUNTIME, 200);
      }
      return response;
    } catch (err) {
      return new Response('Offline', { status: 503, statusText: 'Offline' });
    }
  })());
});
