import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
  ({ request }) => request.mode === "navigate",
  createHandlerBoundToURL("/index.html")
);

// registerRoute(
//   ({ request }) => request.destination === "image",
//   new StaleWhileRevalidate({ cacheName: "image-cache" })
// );

registerRoute(
  new RegExp(/^https:\/\/fonts\.googleapis\.com\/.*/i),
  new CacheFirst({ cacheName: "font-cache" })
);

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
self.addEventListener("push", () => console.log("push notif"));
