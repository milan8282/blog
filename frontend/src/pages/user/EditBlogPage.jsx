import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "../../components/blog/BlogForm";
import ErrorMessage from "../../components/common/ErrorMessage";
import Loader from "../../components/common/Loader";
import { getBlogBySlug, updateBlog } from "../../services/blog.service";
import useToast from "../../hooks/useToast";

const EditBlogPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiFieldErrors, setApiFieldErrors] = useState({});

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setApiError("");

        const response = await getBlogBySlug(slug);
        const blog = response.data;

        setInitialValues({
          title: blog.title || "",
          summary: blog.summary || "",
          coverImage: blog.coverImage || "",
          htmlContent: blog.htmlContent || "",
          customCss: blog.customCss || "",
          metaTitle: blog.metaTitle || "",
          metaDescription: blog.metaDescription || "",
          ogImage: blog.ogImage || "",
          canonicalUrl: blog.canonicalUrl || "",
          robots: blog.robots || "index,follow",
          tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
          status: blog.status || "draft"
        });
      } catch (err) {
        setApiError(err?.response?.data?.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const handleSubmit = async (payload) => {
    try {
      setSubmitting(true);
      setApiError("");
      setApiFieldErrors({});

      const response = await updateBlog(slug, payload);
      showToast("Blog updated successfully");
      navigate(`/blog/${response.data.slug}`);
    } catch (err) {
      if (err?.response?.data?.errors) {
        setApiFieldErrors(err.response.data.errors);
      } else {
        setApiError(err?.response?.data?.message || "Failed to update blog");
        showToast(err?.response?.data?.message || "Failed to update blog", "error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (apiError && !initialValues) {
    return <ErrorMessage message={apiError} />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-blue-600">Edit Blog</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          Update your blog page
        </h1>
        <p className="mt-3 text-slate-600">
          Edit content, SEO/meta fields, and page styling. Slug remains unchanged.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        {apiError && initialValues ? <ErrorMessage message={apiError} /> : null}

        <BlogForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitting={submitting}
          apiErrors={apiFieldErrors}
        />
      </div>
    </div>
  );
};

export default EditBlogPage;