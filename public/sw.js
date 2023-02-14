self.addEventListener("install", (event) => {
    console.log("installing…");
    // cache a icon
    // event.waitUntil(
    //   caches.open("v1").then((cache) => cache.add("images/icon.png"))
    // );
});

self.addEventListener("activate", (event) => {
    console.log("ready to handle fetches!");
    // 可以在這個階段清除舊的快取
    e.waitUntil(
        caches.keys().then((keyList) => {
            Promise.all(
                keyList.map((key) => {
                    if (key === cacheName) {
                        return;
                    }
                    caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    if (url.origin == location.origin && url.pathname == "/images/dog.jpg") {
        console.log(url);
        event.respondWith(caches.match("images/icon.png"));
    }
});