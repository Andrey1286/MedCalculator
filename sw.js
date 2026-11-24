var CACHE_NAME = 'medcalc-v1';
var ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/base.css',
  '/assets/js/core.js',
  '/assets/js/bridge.js',
  '/assets/js/catalog.js',
  '/assets/js/summary.js'
];

// Установка: кэшируем базовые файлы
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Активация: удаляем старые кэши
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; })
            .map(function (key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

// Запрос: сначала кэш, потом сеть
self.addEventListener('fetch', function (event) {
  // Не кэшируем запросы к GitHub API и аналитике
  if (event.request.url.includes('api.github.com') || 
      event.request.url.includes('analytics')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;

      return fetch(event.request).then(function (response) {
        // Кэшируем только успешные ответы и HTML/CSS/JS
        if (!response || response.status !== 200) return response;

        var contentType = response.headers.get('content-type') || '';
        if (contentType.includes('text/html') || 
            contentType.includes('text/css') || 
            contentType.includes('application/javascript') ||
            contentType.includes('application/json')) {
          
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, clone);
          });
        }

        return response;
      }).catch(function () {
        // Если нет сети и нет в кэше — возвращаем заглушку для HTML
        if (event.request.mode === 'navigate') {
          return new Response('<h1>Нет подключения</h1><p>Медицинские калькуляторы работают офлайн. Проверьте интернет или переустановите приложение.</p>', {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        }
      });
    })
  );
});
