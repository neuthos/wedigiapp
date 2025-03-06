/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VAPID_PUBLIC_KEY: string;
  readonly VITE_MANIFEST_API_URL: string;
  readonly VITE_PUSH_SUBSCRIPTION_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
