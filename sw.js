const CACHE_NAME = 'heritage-diagnosis-pro-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // --- ここから全画像 ---
  '/images/shiretoko.jpg', '/images/shirakami.jpg', '/images/ogasawara.jpg', '/images/yakushima.jpg',
  '/images/amami_okinawa.jpg', '/images/hiraizumi.jpg', '/images/jomon.jpg', '/images/nikko.jpg',
  '/images/tomioka.jpg', '/images/fuji.jpg', '/images/lecorbusier.jpg', '/images/kyoto.jpg',
  '/images/nara.jpg', '/images/kii.jpg', '/images/himeji.jpg', '/images/mozu_furuichi.jpg',
  '/images/genbaku.jpg', '/images/itsukushima.jpg', '/images/iwami.jpg', '/images/sado.jpg',
  '/images/okinoshima.jpg', '/images/nagasaki_church.jpg', '/images/meiji_sangyo.jpg',
  '/images/gusuku.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
