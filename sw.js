const cacheName = 'sincro-v1';

// Lista completa de ativos para funcionamento offline
const assets = [
  './',
  './index.html',
  './1.html',
  './2.html',
  './3.html',
  './4.html',
  './5.html',
  './6.html',
  './7.html',
  './8.html',
  './9.html',
  './10.html',
  './11.html',
  './12.html',
  './creditos.html',
  './logo-192.png',
  './logo-512.png',
  './1-img.png',
  './2-img.png',
  './3-img.png',
  './4-img.png',
  './5-img.png',
  './6-img.png',
  './7-img.png'
];

// Instalação: Salva tudo no cache do navegador
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('SINCRO: Cache aberto e arquivos sendo armazenados...');
      return cache.addAll(assets);
    })
  );
});

// Ativação: Limpa caches antigos se a versão mudar
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          console.log('SINCRO: Removendo cache antigo:', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// Estratégia Fetch: Tenta o cache primeiro, se não tiver, busca na rede
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});