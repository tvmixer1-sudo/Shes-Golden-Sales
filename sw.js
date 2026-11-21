var CACHE = "discount-calc-v5-0-2-stock";
var MLCACHE = "sg-ml-v1"; /* photo-finder model files: big, never change, kept across app updates */
var CORE = ["./", "index.html", "manifest.webmanifest", "config.js", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
var PHOTOS = ["img/SG001.webp", "img/SG002.webp", "img/SG003.webp", "img/SG004.webp", "img/SG005.webp", "img/SG006.webp", "img/SG007.webp", "img/SG008.webp", "img/SG009.webp", "img/SG010.webp", "img/SG011.webp", "img/SG012.webp", "img/SG013.webp", "img/SG014.webp", "img/SG015.webp", "img/SG016.webp", "img/SG017.webp", "img/SG018.webp", "img/SG019.webp", "img/SG020.webp", "img/SG021.webp", "img/SG022.webp", "img/SG023.webp", "img/SG024.webp", "img/SG025.webp", "img/SG026.webp", "img/SG027.webp", "img/SG028.webp", "img/SG029.webp", "img/SG030.webp", "img/SG031.webp", "img/SG032-SLV.webp", "img/SG032.webp", "img/SG033.webp", "img/SG034.webp", "img/SG035.webp", "img/SG036-SLV.webp", "img/SG036.webp", "img/SG037.webp", "img/SG038.webp", "img/SG039.webp", "img/SG040.webp", "img/SG041.webp", "img/SG042.webp", "img/SG043-SLV.webp", "img/SG043.webp", "img/SG044.webp", "img/SG045.webp", "img/SG046.webp", "img/SG047.webp", "img/SG048.webp", "img/SG049.webp", "img/SG050.webp", "img/SG051.webp", "img/SG052.webp", "img/SG053.webp", "img/SG054.webp", "img/SG055.webp", "img/SG056.webp", "img/SG057.webp", "img/SG058.webp", "img/SG059.webp", "img/SG060.webp", "img/SG061.webp", "img/SG062.webp", "img/SG063.webp", "img/SG064.webp", "img/SG065.webp", "img/SG066.webp", "img/SG067.webp", "img/SG068.webp", "img/SG069.webp", "img/SG070.webp", "img/SG071.webp", "img/SG072.webp", "img/SG073.webp", "img/SG074.webp", "img/SG075.webp", "img/SG076.webp", "img/SG077.webp", "img/SG078.webp", "img/SG079.webp", "img/SG080.webp", "img/SG081.webp", "img/SG082.webp", "img/SG083.webp", "img/SG084.webp", "img/SG085.webp", "img/SG086.webp", "img/SG087.webp", "img/SG088.webp", "img/SG089.webp", "img/SG090.webp", "img/SG091.webp", "img/SG092.webp", "img/SG093.webp", "img/SG094.webp", "img/SG095.webp", "img/SG096.webp", "img/SG097.webp", "img/SG098-GLD.webp", "img/SG098-SLV.webp", "img/SG098.webp", "img/SG099-GLD.webp", "img/SG099-SLV.webp", "img/SG099.webp", "img/SG100.webp", "img/SG101.webp", "img/SG102.webp", "img/SG103.webp", "img/SG104.webp", "img/SG105.webp", "img/SG106.webp", "img/SG107.webp", "img/SG108.webp", "img/SG109.webp", "img/SG110.webp", "img/SG111.webp", "img/SG112.webp", "img/SG113.webp", "img/SG114.webp", "img/SG115.webp", "img/SG116.webp", "img/SG117.webp", "img/SG118.webp", "img/SG119.webp", "img/SG120.webp", "img/SG121.webp", "img/SG122.webp", "img/SG123.webp", "img/SG124.webp", "img/SG125.webp", "img/SG126.webp", "img/SG127.webp", "img/SG128-SLV.webp", "img/SG128.webp", "img/SG129-SLV.webp", "img/SG129.webp", "img/SG130.webp", "img/SG131.webp", "img/SG132.webp", "img/SG133.webp", "img/SG134-SLV.webp", "img/SG134.webp", "img/SG135.webp", "img/SG136.webp", "img/SG137.webp"];
CORE = CORE.concat(PHOTOS);
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return Promise.all(CORE.map(function (u) { return fetch(new Request(u, { cache: "reload" })).then(function (r) { if (!r.ok) throw new Error(u); return c.put(u, r); }); })); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE && k !== MLCACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  if (new URL(e.request.url).pathname.indexOf("/ml/") !== -1) {
    e.respondWith(caches.open(MLCACHE).then(function (c) {
      return c.match(e.request).then(function (m) {
        return m || fetch(e.request).then(function (res) { if (res && res.ok) c.put(e.request, res.clone()); return res; });
      });
    }));
    return;
  }
  if (new URL(e.request.url).pathname.indexOf("/img/") !== -1) {
    /* Photos: show the saved copy at once, then refresh it quietly in the background (no waiting on the network) */
    e.respondWith(caches.open(CACHE).then(function (c) {
      return c.match(e.request).then(function (m) {
        var net = fetch(e.request).then(function (res) { if (res && res.ok) c.put(e.request, res.clone()); return res; });
        if (m) { net.catch(function () {}); return m; }
        return net;
      });
    }));
    return;
  }
  e.respondWith(fetch(e.request, { cache: "no-cache" }).then(function (res) {
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
