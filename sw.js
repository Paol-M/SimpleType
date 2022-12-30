const cName = "demo-pwa",
cFiles = [
  "index.html",
  "/css/style.css"
];

// (B) CREATE/INSTALL CACHE
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(cName)
    .then((cache) => { return cache.addAll(cFiles); })
    .catch((err) => { console.error(err) })
  );
});
 
// (C) CACHE STRATEGY
self.addEventListener("fetch", (evt) => {
  // (C1) LOAD FROM CACHE FIRST, FALLBACK TO NETWORK IF NOT FOUND
  evt.respondWith(
    caches.match(evt.request)
    .then((res) => { return res || fetch(evt.request); })
  );

});