import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { getBlogBySlugForOwnership } from "../modules/blog/blog.service.js";

const ownershipMiddleware = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const blog = await getBlogBySlugForOwnership(slug);

  const isAdmin = req.user.role === "admin";
  const isOwner = blog.author.toString() === req.user._id.toString();

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Forbidden: you do not have permission for this blog");
  }

  if (req.user.role === "admin" && req.method === "PUT") {
    req.targetBlog = blog;
    return next();
  }

  req.targetBlog = blog;
  next();
});

export default ownershipMiddleware;