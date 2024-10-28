export const config = {
    mongodbURI: process.env.MONGODB_URI as string,
    dbName: process.env.DB_NAME as string,
    appUrl: process.env.NEXT_PUBLIC_APP_URL as string,
    paddle: {
        vendorID: process.env.NEXT_PUBLIC_PADDLE_VENDER_ID as string,
        apiKey: process.env.PADDLE_API_KEY as string,
        clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN as string,
    },
    auth: {
        secret: process.env.AUTH_SECRET as string,
        google: {
            clientID: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        },
        github: {
            clientID: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        },
        trustHost: process.env.AUTH_TRUST_HOST === "TRUE",
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
        apiKey: process.env.CLOUDINARY_API_KEY as string,
        apiSecret: process.env.CLOUDINARY_API_SECRET as string,
    },
    recaptcha: {
        siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string,
        secretKey: process.env.RECAPTCHA_SECRET_KEY as string,
    },
    upstashRedis: {
        restUrl: process.env.UPSTASH_REDIS_REST_URL as string,
        restToken: process.env.UPSTASH_REDIS_REST_TOKEN as string,
    },
};

export default config;
