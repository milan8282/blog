import ApiResponse from "../utils/ApiResponse.js";

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    const formattedErrors = {};

    Object.keys(err.errors).forEach((key) => {
      formattedErrors[key] = err.errors[key].message;
    });

    return ApiResponse.error(res, "Validation failed", formattedErrors, 400);
  }

  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyPattern || {})[0] || "field";
    return ApiResponse.error(
      res,
      `${duplicateField} already exists`,
      { [duplicateField]: `${duplicateField} already exists` },
      409
    );
  }

  if (err.message === "Not allowed by CORS") {
    return ApiResponse.error(res, "Not allowed by CORS", null, 403);
  }

  return ApiResponse.error(
    res,
    err.message || "Internal server error",
    err.errors || null,
    err.statusCode || 500
  );
};

export default errorMiddleware;