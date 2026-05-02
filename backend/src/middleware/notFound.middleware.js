import ApiResponse from "../utils/ApiResponse.js";

const notFoundMiddleware = (req, res) => {
  return ApiResponse.error(
    res,
    `Route not found: ${req.method} ${req.originalUrl}`,
    null,
    404
  );
};

export default notFoundMiddleware;