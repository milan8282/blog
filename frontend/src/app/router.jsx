import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleRoute from "../components/common/RoleRoute";
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import UserDashboardPage from "../pages/user/UserDashboardPage";
import CreateBlogPage from "../pages/user/CreateBlogPage";
import EditBlogPage from "../pages/user/EditBlogPage";
import BlogDetailPage from "../pages/user/BlogDetailPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminBlogsPage from "../pages/admin/AdminBlogsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "register",
        element: <RegisterPage />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "blog/:slug",
            element: <BlogDetailPage />
          }
        ]
      },
      {
        element: <RoleRoute allowedRoles={["user"]} />,
        children: [
          {
            path: "dashboard",
            element: <UserDashboardPage />
          },
          {
            path: "blogs/create",
            element: <CreateBlogPage />
          },
          {
            path: "blogs/:slug/edit",
            element: <EditBlogPage />
          }
        ]
      },
      {
        element: <RoleRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "admin",
            element: <AdminDashboardPage />
          },
          {
            path: "admin/users",
            element: <AdminUsersPage />
          },
          {
            path: "admin/blogs",
            element: <AdminBlogsPage />
          }
        ]
      }
    ]
  }
]);

export default router;