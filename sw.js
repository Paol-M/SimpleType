const cName = "demo-pwa",
cFiles = [
  "index.html",
  "css/style.css",
  "script.js",
  "wordCount.js"
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cName).then(function(cache) {
      return cache.addAll(cFiles);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});