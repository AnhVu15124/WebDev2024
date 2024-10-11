declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Environment variables
            NODE_ENV?: 'test' | 'development' | 'production';
            HOST?: string;
            PORT?: string;
            DATABASE_URL?: string;
            USER?: string;
            PASSWORD?: string;
            DATABASE_HOST?: string;
            DATABASE_PORT?: string;
            DATABASE?: string;
        }
    }
}