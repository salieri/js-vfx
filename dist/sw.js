importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/181c63e9db341da0b10b.js",
    "revision": "cebaf525a5dd36407fbe9be4f88a68d5"
  },
  {
    "url": "/_nuxt/395adb16c063c8b9f401.js",
    "revision": "6e19d28da9c4bed50fa66280056c442d"
  },
  {
    "url": "/_nuxt/9dc3a73844c5fa6b7993.js",
    "revision": "2e238cc88f75467a9779aefa17eeed59"
  },
  {
    "url": "/_nuxt/a28273f92db0d7528f82.js",
    "revision": "bf3c66137c329dd42ca889be7bbe9ac3"
  },
  {
    "url": "/_nuxt/f522e769adb40ce3da06.js",
    "revision": "580ac2d396699b7a5cd189303842003c"
  },
  {
    "url": "/_nuxt/fc957fb92a957428fb3c.js",
    "revision": "e55909f0ba2d4c32ca74b0281110fb6d"
  }
], {
  "cacheId": "nuxt",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
