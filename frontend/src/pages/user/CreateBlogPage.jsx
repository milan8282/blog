import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogForm from "../../components/blog/BlogForm";
import ErrorMessage from "../../components/common/ErrorMessage";
import { createBlog } from "../../services/blog.service";
import useToast from "../../hooks/useToast";

const CreateBlogPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiFieldErrors, setApiFieldErrors] = useState({});

  const handleSubmit = async (payload) => {
    try {
      setSubmitting(true);
      setApiError("");
      setApiFieldErrors({});

      const response = await createBlog(payload);
      showToast("Blog created successfully");
      navigate(`/blog/${response.data.slug}`);
    } catch (err) {
      if (err?.response?.data?.errors) {
        setApiFieldErrors(err.response.data.errors);
      } else {
        setApiError(err?.response?.data?.message || "Failed to create blog");
        showToast(err?.response?.data?.message || "Failed to create blog", "error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-blue-600">Create Blog</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          Build a new blog page
        </h1>
        <p className="mt-3 text-slate-600">
          Add content, design, SEO/meta fields, and publish when ready.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        {apiError ? <ErrorMessage message={apiError} /> : null}

        <BlogForm
          onSubmit={handleSubmit}
          submitting={submitting}
          apiErrors={apiFieldErrors}
        />
      </div>
    </div>
  );
};

export default CreateBlogPage;