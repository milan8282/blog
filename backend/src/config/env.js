import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGODB_URI || "",
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  clientUrl: process.env.CLIENT_URL,
  appBaseUrl: process.env.APP_BASE_URL,
};

if (!env.mongoUri) {
  throw new Error("MONGODB_URI is missing in environment variables");
}

if (!env.jwtSecret) {
  throw new Error("JWT_SECRET is missing in environment variables");
}

export default env;