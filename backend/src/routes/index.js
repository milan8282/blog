import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import blogRoutes from "../modules/blog/blog.routes.js";
import adminRoutes from "../modules/admin/admin.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/blogs", blogRoutes);
router.use("/admin", adminRoutes);

export default router;