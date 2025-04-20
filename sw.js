const firebasestorageURLOrigin = 'https://firebasestorage.googleapis.com';
const firebaseRealtimeURLOrigin = 'https://origin-performing-art-default-rtdb.asia-southeast1.firebasedatabase.app';
const firebasefirestoreURLOrigin = 'https://firestore.googleapis.com';
this.addEventListener('install', event => {
    // waitUntil 確保 SW 在安裝完成後才會去快取這些資源
    event.waitUntil(
        caches.open('v1') // 指定快取的版本號
            .then(cache => {
                return cache.addAll([]); // 指定要快取的資源 ['/ironman.js', '/ironman.css']
            })
    );
})

this.addEventListener('activate', event => {
    // do some work
});

self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);
    if (url.origin == firebasestorageURLOrigin || url.origin == firebasefirestoreURLOrigin) {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    } else if (url.origin == firebaseRealtimeURLOrigin) {
        self.addEventListener('fetch', function (event) {
            event.respondWith(
                fetch(event.request).catch(function () {
                    return caches.match(event.request);
                })
            );
        });
    } else {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});