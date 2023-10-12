import ms from "ms";
import dotenv from "dotenv";

dotenv.config();

const CONFIGS = {
    APP_NAME: "mentorMe",

    DEFAULT_EMAIL_FROM: "mentorMe <danireptor7@gmail.com>",

    MONGODB_URI: process.env.MONGO_ATLAS_URI || "mongodb://127.0.0.1:27017/mentorMe",

    BCRYPT_SALT: Number(process.env.BCRYPT_SALT) || 10,

    JWT_SECRET: process.env.JWT_SECRET || "000-12345-000",

    ACCESS_TOKEN_JWT_EXPIRES_IN: process.env.ACCESS_TOKEN_JWT_EXPIRES_IN ? ms(process.env.ACCESS_TOKEN_JWT_EXPIRES_IN) : ms("700h"),
    DEFAULT_DB_TOKEN_EXPIRY_DURATION: process.env.DEFAULT_DB_TOKEN_EXPIRY_DURATION ? ms(process.env.DEFAULT_DB_TOKEN_EXPIRY_DURATION) : ms("15m"),

    ROLES: {
        USER: ["user", "admin"],
        ADMIN: ["admin"],
    },

    URL: {
        AUTH_BASE_URL: process.env.AUTH_BASE_URL || "http://localhost:3000",
        LANDING_BASE_URL: process.env.LANDING_BASE_URL || "http://localhost:3000",
    },

    MAILER: {
        SMTP_HOST: process.env.MAILER_SMTP_HOST,
        SMTP_PORT: process.env.MAILER_SMTP_PORT,
        SMTP_USER: process.env.MAILER_SMTP_USER,
        SMTP_PASSWORD: process.env.MAILER_SMTP_PASSWORD,
        SECURE: process.env.MAILER_SECURE === "true" ? true : false,
    },

    AWS: {
        ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        REGION: process.env.AWS_REGION,
    },

    SENTRY: {
        DSN: process.env.SENTRY_DSN,
    },

    PAYSTACK: {
        SECRET_KEY: process.env.PAYSTACK_SK || "",
        PUBLIC_KEY: process.env.PAYSTACK_SK || "",
    },
};

// Uncomment below to check configs set
// console.log("CONFIGS:", CONFIGS);

export { CONFIGS };
