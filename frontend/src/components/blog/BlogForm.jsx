import { useEffect, useState } from "react";
import { validateBlogForm } from "../../utils/validators";
import BlogPreview from "./BlogPreview";
import { SelectDropdown } from "../common/SelectDropdown";

const DEFAULT_FORM_VALUES = {
  title: "",
  summary: "",
  coverImage: "",
  htmlContent: "",
  customCss: "",
  metaTitle: "",
  metaDescription: "",
  ogImage: "",
  canonicalUrl: "",
  robots: "index,follow",
  tags: "",
  status: "draft"
};

const BlogForm = ({
  initialValues,
  onSubmit,
  submitting = false,
  apiErrors = {}
}) => {
  const [formData, setFormData] = useState(initialValues || DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  useEffect(() => {
    if (apiErrors && Object.keys(apiErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        ...apiErrors
      }));
    }
  }, [apiErrors]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateBlogForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      summary: formData.summary.trim(),
      coverImage: formData.coverImage.trim(),
      htmlContent: formData.htmlContent.trim(),
      customCss: formData.customCss,
      metaTitle: formData.metaTitle.trim(),
      metaDescription: formData.metaDescription.trim(),
      ogImage: formData.ogImage.trim(),
      canonicalUrl: formData.canonicalUrl.trim(),
      robots: formData.robots,
      tags: formData.tags,
      status: formData.status
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(420px,520px)]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          />
          {errors.title ? <p className="mt-2 text-xs text-red-600">{errors.title}</p> : null}
        </div>

        <div>
          <label htmlFor="summary" className="mb-2 block text-sm font-medium text-slate-700">
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            rows="4"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Short summary for blog cards and listings"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          />
          {errors.summary ? <p className="mt-2 text-xs text-red-600">{errors.summary}</p> : null}
        </div>

        <div>
          <label htmlFor="coverImage" className="mb-2 block text-sm font-medium text-slate-700">
            Cover Image URL
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="text"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          />
          {errors.coverImage ? <p className="mt-2 text-xs text-red-600">{errors.coverImage}</p> : null}
        </div>

        {formData.coverImage ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img
              src={formData.coverImage}
              alt="Cover preview"
              className="h-56 w-full object-cover"
            />
          </div>
        ) : null}

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-900">SEO / Meta Fields</h3>
          <p className="mt-1 text-xs text-slate-600">
            These fields help search engines and social sharing previews.
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="metaTitle" className="mb-2 block text-sm font-medium text-slate-700">
                Meta Title
              </label>
              <input
                id="metaTitle"
                name="metaTitle"
                type="text"
                value={formData.metaTitle}
                onChange={handleChange}
                placeholder="SEO title for browser/search"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />
              {errors.metaTitle ? <p className="mt-2 text-xs text-red-600">{errors.metaTitle}</p> : null}
            </div>

            <div>
              <label htmlFor="metaDescription" className="mb-2 block text-sm font-medium text-slate-700">
                Meta Description
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                rows="3"
                value={formData.metaDescription}
                onChange={handleChange}
                placeholder="Short description for search/social preview"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />
              {errors.metaDescription ? <p className="mt-2 text-xs text-red-600">{errors.metaDescription}</p> : null}
            </div>

            <div>
              <label htmlFor="ogImage" className="mb-2 block text-sm font-medium text-slate-700">
                OG Image URL
              </label>
              <input
                id="ogImage"
                name="ogImage"
                type="text"
                value={formData.ogImage}
                onChange={handleChange}
                placeholder="https://example.com/share-image.jpg"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />
              {errors.ogImage ? <p className="mt-2 text-xs text-red-600">{errors.ogImage}</p> : null}
            </div>

            <div>
              <label htmlFor="canonicalUrl" className="mb-2 block text-sm font-medium text-slate-700">
                Canonical URL
              </label>
              <input
                id="canonicalUrl"
                name="canonicalUrl"
                type="text"
                value={formData.canonicalUrl}
                onChange={handleChange}
                placeholder="https://yourdomain.com/blog/your-slug"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />
              {errors.canonicalUrl ? <p className="mt-2 text-xs text-red-600">{errors.canonicalUrl}</p> : null}
            </div>

            <div>
              <label htmlFor="robots" className="mb-2 block text-sm font-medium text-slate-700">
                Robots
              </label>
              <SelectDropdown
                value={formData.robots}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    robots: value
                  }))
                }
                className="w-full"
                options={[
                  { label: "index,follow", value: "index,follow" },
                  { label: "noindex,nofollow", value: "noindex,nofollow" }
                ]}
              />
              {errors.robots ? <p className="mt-2 text-xs text-red-600">{errors.robots}</p> : null}
            </div>

            <div>
              <label htmlFor="tags" className="mb-2 block text-sm font-medium text-slate-700">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleChange}
                placeholder="react, nodejs, blog, seo"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="htmlContent" className="mb-2 block text-sm font-medium text-slate-700">
            HTML Content
          </label>
          <textarea
            id="htmlContent"
            name="htmlContent"
            rows="16"
            value={formData.htmlContent}
            onChange={handleChange}
            placeholder="<section><h1>Hello World</h1><p>Your HTML content here...</p></section>"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 font-mono text-sm outline-none transition focus:border-blue-500"
          />
          {errors.htmlContent ? <p className="mt-2 text-xs text-red-600">{errors.htmlContent}</p> : null}
        </div>

        <div>
          <label htmlFor="customCss" className="mb-2 block text-sm font-medium text-slate-700">
            Custom CSS
          </label>
          <textarea
            id="customCss"
            name="customCss"
            rows="12"
            value={formData.customCss}
            onChange={handleChange}
            placeholder="section { max-width: 800px; margin: 0 auto; }"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 font-mono text-sm outline-none transition focus:border-blue-500"
          />
          {errors.customCss ? <p className="mt-2 text-xs text-red-600">{errors.customCss}</p> : null}
        </div>

        <div>
          <label htmlFor="status" className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>
          <SelectDropdown
            value={formData.status}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                status: value
              }))
            }
            className="w-full"
            options={[
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" }
            ]}
          />
          {errors.status ? <p className="mt-2 text-xs text-red-600">{errors.status}</p> : null}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Save Blog"}
        </button>
      </form>

      <div className="xl:sticky xl:top-24 xl:self-start">
        <BlogPreview
          title={formData.title}
          htmlContent={formData.htmlContent}
          customCss={formData.customCss}
        />
      </div>
    </div>
  );
};

export default BlogForm;