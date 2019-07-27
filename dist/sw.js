importScripts('/js-vfx/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/js-vfx/_nuxt/1b65d91edbf22712085b.js",
    "revision": "5364896abff918f2319fc9b7b26b2f3d"
  },
  {
    "url": "/js-vfx/_nuxt/272f831bf19628e448ed.js",
    "revision": "890c2ae0dd2ad7559f34c4fd8559792a"
  },
  {
    "url": "/js-vfx/_nuxt/49e889a464c4c3e7890a.js",
    "revision": "51945a888994a575118ac4f39b6b2ceb"
  },
  {
    "url": "/js-vfx/_nuxt/6dc4e05978eb8a941f91.js",
    "revision": "556d707199505455a6d79be7d0ecf533"
  },
  {
    "url": "/js-vfx/_nuxt/e03e0674231c6abc7b30.js",
    "revision": "14aba0cf68ab6b61a20259d5113c4f30"
  },
  {
    "url": "/js-vfx/_nuxt/f5b8f33d9f3a9edc9994.js",
    "revision": "3b3f4139133b8e95b803520dc750a32d"
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
