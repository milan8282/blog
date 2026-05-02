import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../../components/common/ErrorMessage";
import Loader from "../../components/common/Loader";
import BlogStatusBadge from "../../components/blog/BlogStatusBadge";
import formatDate from "../../utils/formatDate";
import useAuth from "../../hooks/useAuth";
import useToast from "../../hooks/useToast";
import { deleteBlog, getBlogBySlug } from "../../services/blog.service";

const upsertMetaTag = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertLinkTag = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const buildArticleDocument = (blog) => {
  const safeTitle = blog?.title || "Blog";
  const safeCss = blog?.customCss || "";
  const safeHtml = blog?.htmlContent || "";

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${safeTitle}</title>
        <style>
          body {
            margin: 0;
            min-height: 100vh;
            background: #ffffff;
            color: #111827;
            font-family: Georgia, Cambria, "Times New Roman", Times, serif;
          }

          img, video, iframe {
            max-width: 100%;
          }

          * {
            box-sizing: border-box;
          }

          ${safeCss}
        </style>
      </head>
      <body>
        ${safeHtml}
      </body>
    </html>
  `;
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getBlogBySlug(slug);
        setBlog(response.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    if (!blog) return;

    const title = blog.metaTitle || blog.title || "Blog";
    const description = blog.metaDescription || blog.summary || "";
    const ogImage = blog.ogImage || blog.coverImage || "";
    const canonical = blog.canonicalUrl || `${window.location.origin}/blog/${blog.slug}`;
    const robots = blog.robots || "index,follow";

    document.title = title;

    upsertMetaTag('meta[name="description"]', {
      name: "description",
      content: description
    });

    upsertMetaTag('meta[name="robots"]', {
      name: "robots",
      content: robots
    });

    upsertMetaTag('meta[property="og:title"]', {
      property: "og:title",
      content: title
    });

    upsertMetaTag('meta[property="og:description"]', {
      property: "og:description",
      content: description
    });

    upsertMetaTag('meta[property="og:type"]', {
      property: "og:type",
      content: "article"
    });

    if (ogImage) {
      upsertMetaTag('meta[property="og:image"]', {
        property: "og:image",
        content: ogImage
      });
    }

    upsertLinkTag('link[rel="canonical"]', {
      rel: "canonical",
      href: canonical
    });
  }, [blog]);

  const articleDocument = useMemo(() => {
    if (!blog) return "";
    return buildArticleDocument(blog);
  }, [blog]);

  const canEdit =
    blog &&
    user &&
    (user.role === "admin" || user._id === blog.author?._id);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete "${blog.title}"?`);
    if (!confirmed) return;

    try {
      await deleteBlog(blog.slug);
      showToast("Blog deleted successfully");

      if (user?.role === "admin") {
        navigate("/admin/blogs");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to delete blog", "error");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <article className="mx-auto max-w-3xl bg-slate-50">
      <header className="pb-8 pt-6">
        <div className="flex flex-wrap items-center gap-3">
          <BlogStatusBadge status={blog.status} />
          <span className="text-sm text-slate-500">{formatDate(blog.createdAt)}</span>
        </div>

        <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          {blog.title}
        </h1>

        <p className="mt-4 text-xl leading-8 text-slate-600">
          {blog.summary}
        </p>

        <div className="mt-6 flex items-center justify-between border-b border-slate-200 pb-6">
          <div>
            <p className="text-sm font-medium text-slate-950">
              {blog.author?.name || "Unknown author"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {blog.tags?.length ? blog.tags.slice(0, 3).join(" · ") : "Article"}
            </p>
          </div>

          {canEdit ? (
            <div className="flex gap-3">
              {user?.role === "user" ? (
                <button
                  onClick={() => navigate(`/blogs/${blog.slug}/edit`)}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Edit
                </button>
              ) : null}

              <button
                onClick={handleDelete}
                className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>

        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="mt-8 max-h-[460px] w-full rounded object-cover"
          />
        ) : null}
      </header>

      <section className="overflow-hidden rounded bg-white">
        <iframe
          title={blog.title}
          srcDoc={articleDocument}
          sandbox="allow-same-origin"
          className="min-h-[1100px] w-full border-0 bg-white"
        />
      </section>
    </article>
  );
};

export default BlogDetailPage;