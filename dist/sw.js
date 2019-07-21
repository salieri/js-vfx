importScripts('/js-vfx/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/js-vfx/_nuxt/1711c3b14fa2eaf4652e.js",
    "revision": "5148ddeb2f3d7b040568a4595b687d1b"
  },
  {
    "url": "/js-vfx/_nuxt/6d00fdf54d54674751bf.js",
    "revision": "686763fc8252c3f875fa3ebd99f7d668"
  },
  {
    "url": "/js-vfx/_nuxt/732b6de6d552ee767734.js",
    "revision": "29ab0d9569242af9fd7394164deae242"
  },
  {
    "url": "/js-vfx/_nuxt/df4cd3413e4ee00c44fc.js",
    "revision": "a9ff2427ff418b6c0bf4421b3a01dd86"
  },
  {
    "url": "/js-vfx/_nuxt/e03e0674231c6abc7b30.js",
    "revision": "14aba0cf68ab6b61a20259d5113c4f30"
  },
  {
    "url": "/js-vfx/_nuxt/edef00f2169f188af6e9.js",
    "revision": "9f8de85572fad586b05e8e33bbd95c01"
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
