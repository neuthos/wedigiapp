/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/pwaUtils.ts

/**
 * Register the service worker for the application
 */
export const registerServiceWorker =
  async (): Promise<ServiceWorkerRegistration | null> => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          "/service-worker.js"
        );
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
        return registration;
      } catch (error) {
        console.error("Service Worker registration failed:", error);
        return null;
      }
    } else {
      console.log("Service Workers not supported in this browser");
      return null;
    }
  };

/**
 * Request notification permission
 * @returns Permission status: 'granted', 'denied', 'default', 'not-supported', or 'error'
 */
export const requestNotificationPermission = async (): Promise<
  NotificationPermission | "not-supported" | "error"
> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return "not-supported";
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return "error";
  }
};

/**
 * Subscribe to push notifications
 * @param vapidPublicKey - Your VAPID public key
 * @returns The push subscription object or null
 */
export const subscribeToPushNotifications = async (
  vapidPublicKey: string
): Promise<PushSubscription | null> => {
  try {
    const registration = await navigator.serviceWorker.ready;

    // Convert the VAPID key to the format required by the subscription
    const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

    // Check for existing subscription
    let subscription = await registration.pushManager.getSubscription();

    // Unsubscribe if it exists (to refresh)
    if (subscription) {
      await subscription.unsubscribe();
    }

    // Create a new subscription
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });

    return subscription;
  } catch (error) {
    console.error("Error subscribing to push notifications:", error);
    return null;
  }
};

/**
 * Type definition for web app manifest
 */
interface WebAppManifest {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: string;
  background_color: string;
  theme_color: string;
  orientation: string;
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
    purpose?: string;
  }>;
  [key: string]: any;
}

/**
 * Fetch and update the web app manifest from the API
 * Falls back to default manifest if fetch fails
 */
export const updateDynamicManifest = async (
  apiUrl: string
): Promise<WebAppManifest | null> => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch manifest");
    }

    const manifestData: WebAppManifest = await response.json();

    // Create a new link element for the dynamic manifest
    const dynamicManifest = document.createElement("link");
    dynamicManifest.id = "dynamic-manifest";
    dynamicManifest.rel = "manifest";

    // Convert manifest object to a Blob URL
    const manifestBlob = new Blob([JSON.stringify(manifestData)], {
      type: "application/json",
    });
    const manifestUrl = URL.createObjectURL(manifestBlob);
    dynamicManifest.href = manifestUrl;

    // Remove existing manifest link if present
    const existingManifest = document.querySelector('link[rel="manifest"]');
    if (existingManifest) {
      existingManifest.remove();
    }

    // Add the new manifest to the head
    document.head.appendChild(dynamicManifest);

    // Update theme color if available
    if (manifestData.theme_color) {
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) {
        themeColorMeta.setAttribute("content", manifestData.theme_color);
      } else {
        const newThemeColorMeta = document.createElement("meta");
        newThemeColorMeta.name = "theme-color";
        newThemeColorMeta.content = manifestData.theme_color;
        document.head.appendChild(newThemeColorMeta);
      }
    }

    return manifestData;
  } catch (error) {
    console.error("Error updating manifest:", error);

    // Fallback to the default manifest
    const existingManifest = document.querySelector('link[rel="manifest"]');
    if (!existingManifest) {
      const defaultManifest = document.createElement("link");
      defaultManifest.rel = "manifest";
      defaultManifest.href = "/manifest.json";
      document.head.appendChild(defaultManifest);
    }

    return null;
  }
};

/**
 * Helper function to convert a base64 string to Uint8Array
 * Used for the applicationServerKey in push subscription
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
