import dotenv from 'dotenv';

// Load environment variables from .env.development file
dotenv.config({ path: '.env.development' });

const requiredEnvVars = [
    'NODE_ENV',
    'HOST',
    'PORT',
    'DATABASE_URL',
    'USER',
    'PASSWORD',
    'DATABASE_HOST',
    'DATABASE_PORT',
    'DATABASE',
];

requiredEnvVars.forEach((variable) => {
    if (process.env[variable] === undefined) {
        throw new Error(`Missing environment variable: ${variable}`);
    }
});

const env = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD || '',
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE: process.env.DATABASE,
};

export default env;