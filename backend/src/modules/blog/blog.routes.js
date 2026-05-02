import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";
import ownershipMiddleware from "../../middleware/ownership.middleware.js";
import {
  createBlogController,
  getPublishedBlogsController,
  getMyBlogsController,
  getBlogBySlugController,
  updateBlogBySlugController,
  deleteBlogBySlugController,
} from "./blog.controller.js";

const router = express.Router();

router.get("/", getPublishedBlogsController);

router.get("/me/all", authMiddleware, roleMiddleware("user"), getMyBlogsController);

router.get("/:slug", authMiddleware, getBlogBySlugController);

router.post("/", authMiddleware, roleMiddleware("user"), createBlogController);

router.put(
  "/:slug",
  authMiddleware,
  roleMiddleware("user", "admin"),
  ownershipMiddleware,
  updateBlogBySlugController
);

router.delete(
  "/:slug",
  authMiddleware,
  roleMiddleware("user", "admin"),
  ownershipMiddleware,
  deleteBlogBySlugController
);

export default router;