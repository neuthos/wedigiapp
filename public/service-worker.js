const SW_VERSION = "1.0.0";
const CACHE_NAME = "wedding-album-cache-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("Service Worker installed");
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  console.log("Service Worker activated");
});

self.addEventListener("push", (event) => {
  if (!event.data) return;
  try {
    const data = event.data.json();

    const options = {
      body: data.body || "New update from the wedding album",
      icon: "/icons/192.png",
      badge: "/icons/128.png",
      data: data.url || "/",
      requireInteraction: data.requireInteraction || false,
      actions: data.actions || [],
    };

    event.waitUntil(
      self.registration.showNotification(
        data.title || "Wedding Album Update",
        options
      )
    );
  } catch (error) {
    console.error("Error showing notification:", error);
    const text = event.data.text();
    event.waitUntil(
      self.registration.showNotification("Wedding Album Update", {
        body: text,
        icon: "/icons/192.png",
        badge: "/icons/128.png",
      })
    );
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: "window"}).then((clientList) => {
      const url = event.notification.data || "/";
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
