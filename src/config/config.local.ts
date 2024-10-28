export const config = {
    mongodbURI: process.env.MONGODB_URI || "mongodb://localhost:27017/clientwords",
    dbName: process.env.DB_NAME || "sampleDB",
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    paddle: {
        environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || "sandbox",
        vendorID: process.env.NEXT_PUBLIC_PADDLE_VENDER_ID || "testVendorID",
        apiKey: process.env.PADDLE_API_KEY || "testPaddleApiKey",
        clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || "testPaddleClientToken",
    },
    auth: {
        secret: process.env.AUTH_SECRET || "testAuthSecret",
        google: {
            clientID: process.env.AUTH_GOOGLE_ID || "testGoogleClientID",
            clientSecret: process.env.AUTH_GOOGLE_SECRET || "testGoogleSecret",
        },
        github: {
            clientID: process.env.AUTH_GITHUB_ID || "testGithubClientID",
            clientSecret: process.env.AUTH_GITHUB_SECRET || "testGithubSecret",
        },
        trustHost: process.env.AUTH_TRUST_HOST === "TRUE",
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || "testCloudinaryName",
        apiKey: process.env.CLOUDINARY_API_KEY || "testCloudinaryApiKey",
        apiSecret: process.env.CLOUDINARY_API_SECRET || "testCloudinarySecret",
    },
};

export default config;
