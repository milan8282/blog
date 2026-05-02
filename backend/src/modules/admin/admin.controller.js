import mongoose from "mongoose";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import {
  getAllUsers,
  deleteUserById,
  getAllBlogsForAdmin,
  getDashboardStats,
} from "./admin.service.js";

export const getAllUsersController = asyncHandler(async (req, res) => {
  const result = await getAllUsers(req.query);

  return ApiResponse.success(res, "Users fetched successfully", result);
});

export const deleteUserController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const result = await deleteUserById({
    userIdToDelete: id,
    currentUserId: req.user._id,
  });

  return ApiResponse.success(res, "User deleted successfully", result);
});

export const getAllBlogsForAdminController = asyncHandler(async (req, res) => {
  const result = await getAllBlogsForAdmin(req.query);

  return ApiResponse.success(res, "All blogs fetched successfully", result);
});

export const getDashboardStatsController = asyncHandler(async (req, res) => {
  const result = await getDashboardStats();

  return ApiResponse.success(res, "Dashboard stats fetched successfully", result);
});