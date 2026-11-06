// Service worker voor FootPrints.
//
// Deze bewaart met opzet niets in de cache. Hij bestaat alleen zodat Android
// de app als installeerbaar herkent en ze vanaf het startscherm in een eigen
// venster opent. Alles gaat rechtstreeks naar het netwerk, zodat een nieuwe
// versie van de app meteen zichtbaar is en je nooit met een oude versie zit.

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
  // Ruim caches op van een eventuele eerdere versie van deze worker.
  e.waitUntil((async () => {
    const namen = await caches.keys();
    await Promise.all(namen.map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});
