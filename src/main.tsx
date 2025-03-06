// src/main.tsx
import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import {registerServiceWorker, updateDynamicManifest} from "./utils/pwaUtils";
import "./index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const initPWA = async (): Promise<void> => {
  await registerServiceWorker();
  // Update manifest from API or fallback to default
  // Replace 'https://your-api.com/manifest' with your actual API endpoint
  const manifestApiUrl =
    (import.meta.env.VITE_MANIFEST_API_URL as string) ||
    "https://your-api.com/manifest";

  // In development, we'll use the default manifest
  if (import.meta.env.DEV) {
    console.log("Using default manifest in development environment");
  } else {
    await updateDynamicManifest(manifestApiUrl);
  }
};

// Initialize PWA after the app has loaded
window.addEventListener("load", initPWA);
