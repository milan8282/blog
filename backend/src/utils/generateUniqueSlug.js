import slugify from "./slugify.js";
import Blog from "../models/Blog.js";

const randomSuffix = () => {
  return Math.random().toString(36).slice(2, 7);
};

const generateUniqueSlug = async (title) => {
  const baseSlug = slugify(title);

  if (!baseSlug) {
    return `blog-${Date.now()}`;
  }

  let slug = baseSlug;
  let exists = await Blog.exists({ slug });

  while (exists) {
    slug = `${baseSlug}-${randomSuffix()}`;
    exists = await Blog.exists({ slug });
  }

  return slug;
};

export default generateUniqueSlug;