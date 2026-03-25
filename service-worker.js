const CACHE_NAME = 'rutinagym-v1';
const urlsToCache = [
    './index.html',
    './app.js',
    './styles.css',
    'https://i.postimg.cc/xCMkWZQ1/icono.jpg',
    'https://i.postimg.cc/zX5W1q3c/Presentacion.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Devuelve el recurso desde el caché si existe, sino lo descarga
                return response || fetch(event.request);
            })
    );
});

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
