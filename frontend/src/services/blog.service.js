import axiosInstance from "./axios";

export const getPublishedBlogs = async (params = {}) => {
  const response = await axiosInstance.get("/blogs", { params });
  return response.data;
};

export const getMyBlogs = async (params = {}) => {
  const response = await axiosInstance.get("/blogs/me/all", { params });
  return response.data;
};

export const getBlogBySlug = async (slug) => {
  const response = await axiosInstance.get(`/blogs/${slug}`);
  return response.data;
};

export const createBlog = async (payload) => {
  const response = await axiosInstance.post("/blogs", payload);
  return response.data;
};

export const updateBlog = async (slug, payload) => {
  const response = await axiosInstance.put(`/blogs/${slug}`, payload);
  return response.data;
};

export const deleteBlog = async (slug) => {
  const response = await axiosInstance.delete(`/blogs/${slug}`);
  return response.data;
};