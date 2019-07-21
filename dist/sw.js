importScripts('/js-vfx/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/js-vfx/_nuxt/181c63e9db341da0b10b.js",
    "revision": "cebaf525a5dd36407fbe9be4f88a68d5"
  },
  {
    "url": "/js-vfx/_nuxt/19dfaba1809d8b64f50b.js",
    "revision": "6c99353d16d8a536348ea2e59019dc43"
  },
  {
    "url": "/js-vfx/_nuxt/395adb16c063c8b9f401.js",
    "revision": "6e19d28da9c4bed50fa66280056c442d"
  },
  {
    "url": "/js-vfx/_nuxt/81d40940cf9aceae5755.js",
    "revision": "e9d5fed45f5678ff036b43699dc11242"
  },
  {
    "url": "/js-vfx/_nuxt/f522e769adb40ce3da06.js",
    "revision": "580ac2d396699b7a5cd189303842003c"
  },
  {
    "url": "/js-vfx/_nuxt/fc957fb92a957428fb3c.js",
    "revision": "e55909f0ba2d4c32ca74b0281110fb6d"
  }
], {
  "cacheId": "nuxt",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/js-vfx/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/js-vfx/.*'), workbox.strategies.networkFirst({}), 'GET')
