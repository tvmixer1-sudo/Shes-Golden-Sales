var CACHE = "discount-calc-v3-9-gold";
var CORE = ["./", "index.html", "manifest.webmanifest", "config.js", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
var PHOTOS = ["img/SG001.webp", "img/SG002.webp", "img/SG003.webp", "img/SG004.webp", "img/SG005.webp", "img/SG006.webp", "img/SG007.webp", "img/SG008.webp", "img/SG009.webp", "img/SG010.webp", "img/SG011.webp", "img/SG012.webp", "img/SG013.webp", "img/SG014.webp", "img/SG015.webp", "img/SG016.webp", "img/SG017.webp", "img/SG018.webp", "img/SG019.webp", "img/SG020.webp", "img/SG021.webp", "img/SG022.webp", "img/SG023.webp", "img/SG024.webp", "img/SG025.webp", "img/SG026.webp", "img/SG027.webp", "img/SG028.webp", "img/SG029.webp", "img/SG030.webp", "img/SG031.webp", "img/SG032.webp", "img/SG033.webp", "img/SG034.webp", "img/SG035.webp", "img/SG036.webp", "img/SG037.webp", "img/SG038.webp", "img/SG039.webp", "img/SG040.webp", "img/SG041.webp", "img/SG042.webp", "img/SG043.webp", "img/SG044.webp"];
CORE = CORE.concat(PHOTOS);
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(function (res) {
    if (res && (res.ok || res.type === "opaque")) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
    }
    return res;
  }).catch(function () {
    return caches.match(e.request).then(function (m) {
      return m || (e.request.mode === "navigate" ? caches.match("index.html") : Response.error());
    });
  }));
});
