interface ImportMetaEnv {
    readonly VITE_APP_URL: string;
    readonly VITE_APP_GATEWAY_URL: string;
    readonly VITE_APP_BASIC_URL: string;
    readonly VITE_APP_PROJECT_NAME: string;
    readonly PROD: boolean;
    readonly DEV: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module 'avic-common';
