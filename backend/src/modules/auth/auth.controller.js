import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "./auth.validation.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);

  if (!isValid) {
    return ApiResponse.error(res, "Validation failed", errors, 400);
  }

  const result = await registerUser(req.body);

  return ApiResponse.success(
    res,
    "User registered successfully",
    result,
    201
  );
});

export const login = asyncHandler(async (req, res) => {
  const { isValid, errors } = validateLoginInput(req.body);

  if (!isValid) {
    return ApiResponse.error(res, "Validation failed", errors, 400);
  }

  const result = await loginUser(req.body);

  return ApiResponse.success(res, "Login successful", result, 200);
});

export const me = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user._id);

  return ApiResponse.success(res, "Current user fetched successfully", user);
});