importScripts('/js-vfx/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/js-vfx/_nuxt/151ed84ce5c425dbf0c7.js",
    "revision": "4f2cca5fef34dfdc877b41ff2084e5df"
  },
  {
    "url": "/js-vfx/_nuxt/1ff0afac15acfd885e5a.js",
    "revision": "c3c4e3e3bf0684ca0af5e94a2d7c8b27"
  },
  {
    "url": "/js-vfx/_nuxt/4f96fc5197f1583217eb.js",
    "revision": "34b89f5932f3f8e4ec8ebab85e310b16"
  },
  {
    "url": "/js-vfx/_nuxt/6dc4e05978eb8a941f91.js",
    "revision": "556d707199505455a6d79be7d0ecf533"
  },
  {
    "url": "/js-vfx/_nuxt/a793ce79c68b9335f173.js",
    "revision": "e29d5ab3be91197fb2d38eaa3a904a80"
  },
  {
    "url": "/js-vfx/_nuxt/ecca8e21a91050dd47b7.js",
    "revision": "f1316dca88879401da27bb6746af775b"
  }
], {
  "cacheId": "js-vfx",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/js-vfx/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/js-vfx/.*'), workbox.strategies.networkFirst({}), 'GET')
