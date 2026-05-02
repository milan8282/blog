import env from "./env.js";

const allowedOrigins = [
  env.clientUrl,
  "http://localhost:5173",
  "http://localhost:3000"
];

const corsOptions = {
  origin: true,
  credentials: true,
};

export default corsOptions;