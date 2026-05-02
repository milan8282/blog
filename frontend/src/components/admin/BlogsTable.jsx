import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";

const BlogsTable = ({ blogs = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Title
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Author
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Created
              </th>
              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="px-5 py-4">
                  <div className="text-sm font-medium text-slate-900">{blog.title}</div>
                  <div className="mt-1 max-w-md truncate text-xs text-slate-500">
                    {blog.summary}
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {blog.author?.name || "-"}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      blog.status === "published"
                        ? "border border-emerald-200 bg-emerald-100 text-emerald-700"
                        : "border border-amber-200 bg-amber-100 text-amber-700"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {formatDate(blog.createdAt)}
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => navigate(`/blog/${blog.slug}`)}
                    className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogsTable;