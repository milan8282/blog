import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogList from "../../components/blog/BlogList";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import Loader from "../../components/common/Loader";
import { deleteBlog, getMyBlogs } from "../../services/blog.service";
import useToast from "../../hooks/useToast";
import { SelectDropdown } from "../../components/common/SelectDropdown";

const UserDashboardPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sort, setSort] = useState("updated-desc");
  const [layout, setLayout] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyBlogs = async (pageNumber = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyBlogs({
        page: pageNumber,
        limit: 50
      });

      setBlogs(response.data.items || []);
      setMeta(response.data.meta || null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch your blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs(page);
  }, [page]);

  const filteredBlogs = useMemo(() => {
    let nextBlogs = [...blogs];

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      nextBlogs = nextBlogs.filter((blog) => {
        return (
          blog.title?.toLowerCase().includes(query) ||
          blog.summary?.toLowerCase().includes(query) ||
          blog.tags?.some((tag) => tag.toLowerCase().includes(query))
        );
      });
    }

    if (statusFilter) {
      nextBlogs = nextBlogs.filter((blog) => blog.status === statusFilter);
    }

    nextBlogs.sort((a, b) => {
      if (sort === "updated-asc") return new Date(a.updatedAt) - new Date(b.updatedAt);
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      if (sort === "title-desc") return b.title.localeCompare(a.title);
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return nextBlogs;
  }, [blogs, search, statusFilter, sort]);

  const handleEdit = (blog) => {
    navigate(`/blogs/${blog.slug}/edit`);
  };

  const handleDelete = async (blog) => {
    const confirmed = window.confirm(`Delete "${blog.title}"?`);
    if (!confirmed) return;

    try {
      await deleteBlog(blog.slug);
      showToast("Blog deleted successfully");
      fetchMyBlogs(page);
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to delete blog", "error");
    }
  };

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Author Workspace
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Manage your blogs
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              View drafts, published posts, previews, and update your blog pages from one clean dashboard.
            </p>
          </div>

          <button
            onClick={() => navigate("/blogs/create")}
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Create Blog
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_180px_210px]">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your blogs..."
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          />

          <SelectDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="All status"
            className="w-full min-w-0"
            options={[
              { label: "All status", value: "" },
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" }
            ]}
          />

          <SelectDropdown
            value={sort}
            onChange={setSort}
            className="w-full min-w-0"
            options={[
              { label: "Recently updated", value: "updated-desc" },
              { label: "Oldest updated", value: "updated-asc" },
              { label: "Title A-Z", value: "title-asc" },
              { label: "Title Z-A", value: "title-desc" }
            ]}
          />

          {/* <SelectDropdown
            value={layout}
            onChange={setLayout}
            className="w-full min-w-0"
            options={[
              { label: "Card grid", value: "grid" },
              { label: "Editorial rows", value: "editorial" }
            ]}
          /> */}
        </div>
      </section>

      {loading ? <Loader /> : null}
      {!loading && error ? <ErrorMessage message={error} /> : null}

      {!loading && !error && filteredBlogs.length === 0 ? (
        <EmptyState
          title="No blogs found"
          description="Try adjusting filters or create a new blog."
        />
      ) : null}

      {!loading && !error && filteredBlogs.length > 0 ? (
        <>
          <BlogList
            blogs={filteredBlogs}
            showStatus
            showAuthor={false}
            editable
            onEdit={handleEdit}
            onDelete={handleDelete}
            layout={layout}
          />

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4">
            <p className="text-sm text-slate-600">
              Showing {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? "s" : ""}
            </p>

            <div className="flex gap-3">
              <button
                disabled={!meta || meta.page <= 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <button
                disabled={!meta || meta.page >= meta.totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UserDashboardPage;