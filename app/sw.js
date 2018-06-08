const staticAssests = [
  './',
  './index.html',
  './styles/bootstrap.css',
  './styles/style.css',
  './styles/app.css',
  './view1/view1.html',
  './view1/view1.js',
  './view2/view2.html',
  './view2/view2.js',
  './app.js',
  './bower_components/angular/angular.js',
  './bower_components/angular-route/angular-route.js'
];
 
self.addEventListener('install', async event => {
	const cache = await caches.open('news-static');
	cache.addAll(staticAssests);
	console.log('Install')
});

self.addEventListener('fetch', event => {
	const req = event.request;
	const url = new URL(req.url);
	
	if(url.origin === location.origin) {
		event.respondWith(cacheFirst(req));
	} else {
		event.respondWith(networkFirst(req));
	}
	
	console.log('fetch')
});

async function cacheFirst(req) {
	const cachedResponse = await caches.match(req);
	return cachedResponse || fetch(req);
}

async function networkFirst(req) {
	const cache = await caches.open('news-dynamic');
		
	try {
		const res = await fetch(req);
		cache.put(req, res.clone());
		return res;
	} catch(error) {
		return await cache.match(req);
	}
}