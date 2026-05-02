import Blog from "../../models/Blog.js";
import ApiError from "../../utils/ApiError.js";
import generateUniqueSlug from "../../utils/generateUniqueSlug.js";
import { getPagination, getPaginationMeta } from "../../utils/pagination.js";

const blogListProjection =
  "title summary coverImage slug status tags createdAt updatedAt author metaTitle metaDescription ogImage canonicalUrl robots";

const blogDetailProjection =
  "title summary coverImage htmlContent customCss slug status tags createdAt updatedAt author metaTitle metaDescription ogImage canonicalUrl robots";

export const createBlog = async ({
  title,
  summary,
  coverImage,
  htmlContent,
  customCss,
  metaTitle,
  metaDescription,
  ogImage,
  canonicalUrl,
  robots,
  tags,
  status,
  authorId,
}) => {
  const slug = await generateUniqueSlug(title);

  const blog = await Blog.create({
    title: title.trim(),
    summary: summary.trim(),
    coverImage: coverImage ? coverImage.trim() : "",
    htmlContent: htmlContent.trim(),
    customCss: customCss ? customCss.trim() : "",
    metaTitle: metaTitle ? metaTitle.trim() : "",
    metaDescription: metaDescription ? metaDescription.trim() : "",
    ogImage: ogImage ? ogImage.trim() : "",
    canonicalUrl: canonicalUrl ? canonicalUrl.trim() : "",
    robots: robots || "index,follow",
    tags: Array.isArray(tags) ? tags : [],
    status,
    slug,
    author: authorId,
  });

  return await Blog.findById(blog._id)
    .select(blogDetailProjection)
    .populate("author", "name email role");
};

export const getPublishedBlogs = async (query = {}) => {
  const { page, limit, skip } = getPagination(query);

  const filter = { status: "published" };

  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .select(blogListProjection)
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Blog.countDocuments(filter),
  ]);

  return {
    items: blogs,
    meta: getPaginationMeta({ total, page, limit }),
  };
};

export const getMyBlogs = async ({ userId, query = {} }) => {
  const { page, limit, skip } = getPagination(query);

  const filter = { author: userId };

  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .select(blogListProjection)
      .populate("author", "name email role")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Blog.countDocuments(filter),
  ]);

  return {
    items: blogs,
    meta: getPaginationMeta({ total, page, limit }),
  };
};

export const getBlogBySlugForAuthenticatedUser = async ({ slug, currentUser }) => {
  const blog = await Blog.findOne({ slug })
    .select(blogDetailProjection)
    .populate("author", "name email role");

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const isAdmin = currentUser.role === "admin";
  const isOwner = blog.author?._id?.toString() === currentUser._id.toString();

  if (blog.status === "draft" && !isOwner && !isAdmin) {
    throw new ApiError(404, "Blog not found");
  }

  return blog;
};

export const getBlogBySlugForOwnership = async (slug) => {
  const blog = await Blog.findOne({ slug });

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  return blog;
};

export const updateBlogBySlug = async ({ slug, payload }) => {
  const updateData = {};

  if (payload.title !== undefined) {
    updateData.title = payload.title.trim();
  }

  if (payload.summary !== undefined) {
    updateData.summary = payload.summary.trim();
  }

  if (payload.coverImage !== undefined) {
    updateData.coverImage = payload.coverImage ? payload.coverImage.trim() : "";
  }

  if (payload.htmlContent !== undefined) {
    updateData.htmlContent = payload.htmlContent.trim();
  }

  if (payload.customCss !== undefined) {
    updateData.customCss = payload.customCss ? payload.customCss.trim() : "";
  }

  if (payload.metaTitle !== undefined) {
    updateData.metaTitle = payload.metaTitle ? payload.metaTitle.trim() : "";
  }

  if (payload.metaDescription !== undefined) {
    updateData.metaDescription = payload.metaDescription ? payload.metaDescription.trim() : "";
  }

  if (payload.ogImage !== undefined) {
    updateData.ogImage = payload.ogImage ? payload.ogImage.trim() : "";
  }

  if (payload.canonicalUrl !== undefined) {
    updateData.canonicalUrl = payload.canonicalUrl ? payload.canonicalUrl.trim() : "";
  }

  if (payload.robots !== undefined) {
    updateData.robots = payload.robots;
  }

  if (payload.tags !== undefined) {
    updateData.tags = Array.isArray(payload.tags) ? payload.tags : [];
  }

  if (payload.status !== undefined) {
    updateData.status = payload.status;
  }

  const updatedBlog = await Blog.findOneAndUpdate({ slug }, updateData, {
    new: true,
    runValidators: true,
  })
    .select(blogDetailProjection)
    .populate("author", "name email role");

  if (!updatedBlog) {
    throw new ApiError(404, "Blog not found");
  }

  return updatedBlog;
};

export const deleteBlogBySlug = async (slug) => {
  const deletedBlog = await Blog.findOneAndDelete({ slug });

  if (!deletedBlog) {
    throw new ApiError(404, "Blog not found");
  }

  return deletedBlog;
};

export const getPublishedBlogsForSitemap = async () => {
  return await Blog.find({
    status: "published",
    robots: { $ne: "noindex,nofollow" },
  })
    .select("slug updatedAt")
    .sort({ updatedAt: -1 })
    .lean();
};