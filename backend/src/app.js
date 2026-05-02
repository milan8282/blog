import express from "express";
import cors from "cors";
import corsOptions from "./config/cors.js";
import routes from "./routes/index.js";
import publicRoutes from "./routes/public.routes.js";
import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Blog platform API is running",
  });
});

app.use(publicRoutes);
app.use("/api", routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;