import User from "../../models/User.js";
import Blog from "../../models/Blog.js";
import ApiError from "../../utils/ApiError.js";
import { getPagination, getPaginationMeta } from "../../utils/pagination.js";

export const getAllUsers = async (query = {}) => {
  const { page, limit, skip } = getPagination(query);

  const [users, total] = await Promise.all([
    User.find({})
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    User.countDocuments({}),
  ]);

  return {
    items: users,
    meta: getPaginationMeta({ total, page, limit }),
  };
};

export const deleteUserById = async ({ userIdToDelete, currentUserId }) => {
  if (userIdToDelete.toString() === currentUserId.toString()) {
    throw new ApiError(400, "Admin cannot delete their own account");
  }

  const user = await User.findById(userIdToDelete);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await Blog.deleteMany({ author: user._id });
  await User.findByIdAndDelete(user._id);

  return {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
};

export const getAllBlogsForAdmin = async (query = {}) => {
  const { page, limit, skip } = getPagination(query);

  const filter = {};

  if (query.status && ["draft", "published"].includes(query.status)) {
    filter.status = query.status;
  }

  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .select("title summary coverImage slug status tags createdAt updatedAt author metaTitle metaDescription ogImage canonicalUrl robots")
      .populate("author", "name email role")
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

export const getDashboardStats = async () => {
  const [totalUsers, totalBlogs, totalDrafts, totalPublished, blogsPerUser] =
    await Promise.all([
      User.countDocuments({}),
      Blog.countDocuments({}),
      Blog.countDocuments({ status: "draft" }),
      Blog.countDocuments({ status: "published" }),
      Blog.aggregate([
        {
          $group: {
            _id: "$author",
            blogCount: { $sum: 1 },
            draftCount: {
              $sum: {
                $cond: [{ $eq: ["$status", "draft"] }, 1, 0],
              },
            },
            publishedCount: {
              $sum: {
                $cond: [{ $eq: ["$status", "published"] }, 1, 0],
              },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            authorId: "$author._id",
            name: "$author.name",
            email: "$author.email",
            role: "$author.role",
            blogCount: 1,
            draftCount: 1,
            publishedCount: 1,
          },
        },
        {
          $sort: {
            blogCount: -1,
            name: 1,
          },
        },
      ]),
    ]);

  return {
    totals: {
      users: totalUsers,
      blogs: totalBlogs,
      drafts: totalDrafts,
      published: totalPublished,
    },
    blogsPerUser,
    generatedAt: new Date().toISOString(),
  };
};