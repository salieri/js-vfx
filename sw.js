importScripts('/js-vfx/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/js-vfx/_nuxt/151ed84ce5c425dbf0c7.js",
    "revision": "4f2cca5fef34dfdc877b41ff2084e5df"
  },
  {
    "url": "/js-vfx/_nuxt/4440970977cf4c335fc4.js",
    "revision": "cde3717f02a732353afb93164e30f1e4"
  },
  {
    "url": "/js-vfx/_nuxt/4626b90c916ed07c51f0.js",
    "revision": "fc04e5428c9fd82bfa010b9183821810"
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
