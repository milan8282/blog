import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import BlogStatusBadge from "./BlogStatusBadge";
import useAuth from "../../hooks/useAuth";

const BlogCard = ({
  blog,
  showStatus = false,
  showAuthor = true,
  onEdit,
  onDelete,
  editable = false
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleRead = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: { pathname: `/blog/${blog.slug}` } }
      });
      return;
    }

    navigate(`/blog/${blog.slug}`);
  };

  return (
    <article className="border-b border-slate-200 py-8">
      <div className="grid grid-cols-[minmax(0,1fr)_120px] gap-5 sm:grid-cols-[minmax(0,1fr)_180px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            {showAuthor && blog.author?.name ? (
              <span className="font-medium text-slate-800">{blog.author.name}</span>
            ) : null}
            <span>{formatDate(blog.createdAt)}</span>
            {showStatus ? <BlogStatusBadge status={blog.status} /> : null}
          </div>

          <button onClick={handleRead} className="mt-3 block text-left">
            <h2 className="line-clamp-2 text-xl font-bold leading-snug tracking-tight text-slate-950 transition hover:text-slate-700 sm:text-2xl">
              {blog.title}
            </h2>
          </button>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 sm:text-[15px]">
            {blog.summary}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {blog.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            {editable ? (
              <div className="flex gap-2">
                {onEdit ? (
                  <button
                    onClick={() => onEdit(blog)}
                    className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-md"
                  >
                    Edit
                  </button>
                ) : null}

                {onDelete ? (
                  <button
                    onClick={() => onDelete(blog)}
                    className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-red-100 hover:shadow-md"
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <button
          onClick={handleRead}
          className="h-24 overflow-hidden rounded bg-slate-100 sm:h-32"
        >
          {blog.coverImage ? (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-slate-400">
              No image
            </div>
          )}
        </button>
      </div>
    </article>
  );
};

export default BlogCard;