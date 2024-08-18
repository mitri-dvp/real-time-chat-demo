/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly PUBLIC_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
