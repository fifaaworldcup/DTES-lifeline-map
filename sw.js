const CACHE_NAME = 'dtes-lifeline-cache-v1';
const OFFLINE_TILE_B64 = 'iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABJtFzPAAAAA1BMVEXu7u7lBvE7AAAAMklEQVR4nO3BgQAAAADDoPlTX+EAVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyg8AAGwAAdQBeTwAAAAASUVORK5CYII=';

// Core files for the app shell
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/assets/icons/icon-192.png',
    '/assets/icons/icon-512.png'
];

// Install event: cache the app shell
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event: handle requests
self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);

    // Cache-first strategy for most assets
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Return from cache
                }

                // Special handling for map tiles
                if (requestUrl.hostname.includes('tile.openstreetmap.org')) {
                    return fetch(event.request)
                        .then(networkResponse => {
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, responseToCache);
                                });
                            return networkResponse;
                        })
                        .catch(() => {
                            // Failed to fetch from network (user is offline)
                            console.log('Failed to fetch map tile, serving offline tile.');
                            // Convert base64 to Blob
                            const byteCharacters = atob(OFFLINE_TILE_B64);
                            const byteArrays = [];
                            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                                const slice = byteCharacters.slice(offset, offset + 512);
                                const byteNumbers = new Array(slice.length);
                                for (let i = 0; i < slice.length; i++) {
                                    byteNumbers[i] = slice.charCodeAt(i);
                                }
                                const byteArray = new Uint8Array(byteNumbers);
                                byteArrays.push(byteArray);
                            }
                            const blob = new Blob(byteArrays, {type: 'image/png'});
                            return new Response(blob, { headers: { 'Content-Type': 'image/png' } });
                        });
                }

                // For other requests, just fetch from network
                return fetch(event.request);
            })
    );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
