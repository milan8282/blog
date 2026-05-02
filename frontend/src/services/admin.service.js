import axiosInstance from "./axios";

export const getAdminDashboard = async () => {
  const response = await axiosInstance.get("/admin/dashboard");
  return response.data;
};

export const getAdminUsers = async (params = {}) => {
  const response = await axiosInstance.get("/admin/users", { params });
  return response.data;
};

export const deleteAdminUser = async (id) => {
  const response = await axiosInstance.delete(`/admin/users/${id}`);
  return response.data;
};

export const getAdminBlogs = async (params = {}) => {
  const response = await axiosInstance.get("/admin/blogs", { params });
  return response.data;
};