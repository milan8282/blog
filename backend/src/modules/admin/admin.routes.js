import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";
import {
  getAllUsersController,
  deleteUserController,
  getAllBlogsForAdminController,
  getDashboardStatsController,
} from "./admin.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.get("/users", getAllUsersController);
router.delete("/users/:id", deleteUserController);
router.get("/blogs", getAllBlogsForAdminController);
router.get("/dashboard", getDashboardStatsController);

export default router;