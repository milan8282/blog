import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
      minlength: [20, "Summary must be at least 20 characters"],
      maxlength: [400, "Summary cannot exceed 400 characters"],
    },
    coverImage: {
      type: String,
      trim: true,
      default: "",
    },
    htmlContent: {
      type: String,
      required: [true, "HTML content is required"],
      trim: true,
      minlength: [20, "HTML content must be at least 20 characters"],
    },
    customCss: {
      type: String,
      trim: true,
      default: "",
    },
    metaTitle: {
      type: String,
      trim: true,
      default: "",
      maxlength: [200, "Meta title cannot exceed 200 characters"],
    },
    metaDescription: {
      type: String,
      trim: true,
      default: "",
      maxlength: [320, "Meta description cannot exceed 320 characters"],
    },
    ogImage: {
      type: String,
      trim: true,
      default: "",
    },
    canonicalUrl: {
      type: String,
      trim: true,
      default: "",
    },
    robots: {
      type: String,
      enum: ["index,follow", "noindex,nofollow"],
      default: "index,follow",
    },
    tags: {
      type: [String],
      default: [],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      immutable: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.index({ status: 1, createdAt: -1 });
blogSchema.index({ author: 1, createdAt: -1 });
blogSchema.index({ tags: 1 });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;