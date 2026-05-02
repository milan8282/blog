import { useEffect, useMemo, useState } from "react";
import BlogsTable from "../../components/admin/BlogsTable";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import Loader from "../../components/common/Loader";
import { getAdminBlogs } from "../../services/admin.service";
import { SelectDropdown } from "../../components/common/SelectDropdown";

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = async ({ pageNumber = 1, blogStatus = "" } = {}) => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page: pageNumber,
        limit: 50
      };

      if (blogStatus) {
        params.status = blogStatus;
      }

      const response = await getAdminBlogs(params);

      setBlogs(response.data.items || []);
      setMeta(response.data.meta || null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs({
      pageNumber: page,
      blogStatus: status
    });
  }, [page, status]);

  const filteredBlogs = useMemo(() => {
    let nextBlogs = [...blogs];

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      nextBlogs = nextBlogs.filter((blog) => {
        return (
          blog.title?.toLowerCase().includes(query) ||
          blog.summary?.toLowerCase().includes(query) ||
          blog.author?.name?.toLowerCase().includes(query)
        );
      });
    }

    nextBlogs.sort((a, b) => {
      if (sort === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (sort === "title-asc") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "title-desc") {
        return b.title.localeCompare(a.title);
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return nextBlogs;
  }, [blogs, search, sort]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-blue-600">Admin Panel</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          Blog Management
        </h1>
        <p className="mt-3 text-slate-600">
          Review all blogs across users and filter by status.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_180px_200px]">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search title, summary, or author..."
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          />

          <SelectDropdown
            value={status}
            onChange={(value) => {
              setPage(1);
              setStatus(value);
            }}
            placeholder="All status"
            className="w-full"
            options={[
              { label: "All status", value: "" },
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" }
            ]}
          />

          <SelectDropdown
            value={sort}
            onChange={setSort}
            className="w-full"
            options={[
              { label: "Newest first", value: "newest" },
              { label: "Oldest first", value: "oldest" },
              { label: "Title A-Z", value: "title-asc" },
              { label: "Title Z-A", value: "title-desc" }
            ]}
          />
        </div>
      </section>

      {loading ? <Loader /> : null}
      {!loading && error ? <ErrorMessage message={error} /> : null}

      {!loading && !error && filteredBlogs.length === 0 ? (
        <EmptyState
          title="No blogs found"
          description="Try changing filters or search terms."
        />
      ) : null}

      {!loading && !error && filteredBlogs.length > 0 ? (
        <>
          <BlogsTable blogs={filteredBlogs} />

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

export default AdminBlogsPage;