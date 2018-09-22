var staticAssets = [
  '/.',
  'dist/main.css',
  'dist/main.js',
  'dist/jquery-3.3.1.min.js',
  'manifest.json',
  'img/back.png',
  'img/bg.png',
  'img/bigBoy-happy.png',
  'img/bigBoy-normal.png',
  'img/bigBoy-sad.png',
  'img/bigGirl-happy.png',
  'img/bigGirl-normal.png',
  'img/bigGirl-sad.png',
  'img/boy-happy.png',
  'img/boy-normal.png',
  'img/boy-sad.png',
  'img/cara-feliz@2x.png',
  'img/cara@2x.png',
  'img/chama-se.png',
  'img/girl-happy.png',
  'img/girl-normal.png',
  'img/girl-sad.png',
  'img/glasses.png',
  'img/left-square.png',
  'img/right-square.png',
  'images/icons/icon-72x72.png',
  'images/icons/icon-96x96.png',
  'images/icons/icon-144x144.png',
  'images/icons/icon-152x152.png',
  'images/icons/icon-192x192.png',
  'images/icons/icon-384x384.png',
  'images/icons/icon-512x512.png',
  'dist/font/caviardreams_bold-webfont.woff',
  'dist/font/caviardreams_bold-webfont.woff2',
  'dist/font/caviardreams_bolditalic-webfont.woff',
  'dist/font/caviardreams_bolditalic-webfont.woff2',
  'dist/font/caviardreams_italic-webfont.woff',
  'dist/font/caviardreams_italic-webfont.woff2',
  'dist/font/caviardreams-webfont.woff',
  'dist/font/caviardreams-webfont.woff2',
  'dist/font/lemonmilk-webfont.woff',
  'dist/font/lemonmilk-webfont.woff2',
  'dist/font/lemonmilkbolditalic-webfont.woff',
  'dist/font/lemonmilkbolditalic-webfont.woff2',
  'dist/font/lemonmilkitalic-webfont.woff',
  'dist/font/lemonmilkitalic-webfont.woff2',
  'dist/font/lemonmilklight-webfont.woff',
  'dist/font/lemonmilklight-webfont.woff2',
  'dist/font/lemonmilklightitalic-webfont.woff',
  'dist/font/lemonmilklightitalic-webfont.woff'

]

self.addEventListener('install', async event => {
  var cache = await caches.open('dyslexia-static');
  cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
  var req = event.request;
  var url = new URL(req.url);

  if(url.origin === location.origin){
    event.respondWith(cacheFirst(req));
  }else{
    event.respondWith(networkFirst(req))
  }

});

async function cacheFirst(req){
  var cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
};

async function networkFirst(req){
  var cache = await caches.open('dyslexia-dynamic');

  try{
    var res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  }catch(error){
    return await cache.match(req);
  }
}
