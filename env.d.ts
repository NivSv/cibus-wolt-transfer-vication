declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: number;
    WOLT_EMAIL?: string;
    CIBUS_USERNAME?: string;
    CIBUS_PASSWORD?: string;
    CIBUS_COMPANY?: string;
  }
}
