import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import {
  validateCreateBlogInput,
  validateUpdateBlogInput,
} from "./blog.validation.js";
import {
  createBlog,
  getPublishedBlogs,
  getMyBlogs,
  getBlogBySlugForAuthenticatedUser,
  updateBlogBySlug,
  deleteBlogBySlug,
} from "./blog.service.js";

export const createBlogController = asyncHandler(async (req, res) => {
  const { isValid, errors, normalizedTags } = validateCreateBlogInput(req.body);

  if (!isValid) {
    return ApiResponse.error(res, "Validation failed", errors, 400);
  }

  const blog = await createBlog({
    title: req.body.title,
    summary: req.body.summary,
    coverImage: req.body.coverImage,
    htmlContent: req.body.htmlContent,
    customCss: req.body.customCss,
    metaTitle: req.body.metaTitle,
    metaDescription: req.body.metaDescription,
    ogImage: req.body.ogImage,
    canonicalUrl: req.body.canonicalUrl,
    robots: req.body.robots,
    tags: normalizedTags,
    status: req.body.status,
    authorId: req.user._id,
  });

  return ApiResponse.success(res, "Blog created successfully", blog, 201);
});

export const getPublishedBlogsController = asyncHandler(async (req, res) => {
  const result = await getPublishedBlogs(req.query);

  return ApiResponse.success(res, "Published blogs fetched successfully", result);
});

export const getMyBlogsController = asyncHandler(async (req, res) => {
  const result = await getMyBlogs({
    userId: req.user._id,
    query: req.query,
  });

  return ApiResponse.success(res, "My blogs fetched successfully", result);
});

export const getBlogBySlugController = asyncHandler(async (req, res) => {
  const blog = await getBlogBySlugForAuthenticatedUser({
    slug: req.params.slug,
    currentUser: req.user,
  });

  return ApiResponse.success(res, "Blog fetched successfully", blog);
});

export const updateBlogBySlugController = asyncHandler(async (req, res) => {
  const { isValid, errors, normalizedTags } = validateUpdateBlogInput(req.body);

  if (!isValid) {
    return ApiResponse.error(res, "Validation failed", errors, 400);
  }

  const blog = await updateBlogBySlug({
    slug: req.params.slug,
    payload: {
      ...req.body,
      tags: normalizedTags !== undefined ? normalizedTags : req.body.tags,
    },
  });

  return ApiResponse.success(res, "Blog updated successfully", blog);
});

export const deleteBlogBySlugController = asyncHandler(async (req, res) => {
  const blog = await deleteBlogBySlug(req.params.slug);

  return ApiResponse.success(res, "Blog deleted successfully", {
    _id: blog._id,
    slug: blog.slug,
  });
});