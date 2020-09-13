// export default function swDev()
// {
//     let swUrl = `${process.env.PUBLIC_URL}/sw.js`
//     navigator.serviceWorker.register(swUrl).then((response)=>{
//         console.warn("response",response);
//     })
// }

// var cacheName = 'demo-app';
// var filesToCache = [
//   '/',
//   '/app.js',
//   '/style.css',
//   '/index.html',  
// ];

// self.addEventListener("activate", function(e) {
//   console.log("[ServiceWorker] Activate");
// });

// self.addEventListener('install', function(e) {
//   console.log('[ServiceWorker] Install');
//   e.waitUntil(
//    caches.open(cacheName).then(function(cache) {
//       console.log('[ServiceWorker] Caching app shell');
//       return cache.addAll(filesToCache);
//     })
//   );
// });

// self.addEventListener('fetch', function(e) {
//   console.log('[ServiceWorker] Fetch', e.request.url);
//   e.respondWith(
//     caches.match(e.request).then(function(response) {
//       return response || fetch(e.request);
//     })
//   );
// });