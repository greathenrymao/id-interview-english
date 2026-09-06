const CACHE="id-interview-english-v5-fresh-content";
const ASSETS=["./","./index.html","./styles.css","./app.js","./data/lessons.json","./manifest.webmanifest","./icon-180.png","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const url=new URL(e.request.url);
  const fresh=e.request.mode==="navigate"||url.pathname.endsWith(".json")||url.pathname.endsWith(".js")||url.pathname.endsWith(".css");
  if(fresh){
    e.respondWith(fetch(e.request).then(response=>{
      const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(e.request,copy));return response;
    }).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
