import { useEffect, useMemo, useState } from "react";
import BlogList from "../../components/blog/BlogList";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import Loader from "../../components/common/Loader";
import { getPublishedBlogs } from "../../services/blog.service";
import { SelectDropdown } from "../../components/common/SelectDropdown";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = async (pageNumber = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await getPublishedBlogs({
        page: pageNumber,
        limit: 50
      });

      setBlogs(response.data.items || []);
      setMeta(response.data.meta || null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch published blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const filteredBlogs = useMemo(() => {
    let nextBlogs = [...blogs];

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      nextBlogs = nextBlogs.filter((blog) => {
        return (
          blog.title?.toLowerCase().includes(query) ||
          blog.summary?.toLowerCase().includes(query) ||
          blog.author?.name?.toLowerCase().includes(query) ||
          blog.tags?.some((tag) => tag.toLowerCase().includes(query))
        );
      });
    }

    nextBlogs.sort((a, b) => {
      if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      if (sort === "title-desc") return b.title.localeCompare(a.title);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return nextBlogs;
  }, [blogs, search, sort]);

  const trending = filteredBlogs.slice(0, 5);
  const topics = [...new Set(filteredBlogs.flatMap((blog) => blog.tags || []))].slice(0, 10);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="min-w-0">
          <div className="sticky top-[73px] z-20 border-b border-slate-200 bg-slate-50/95 py-4 backdrop-blur">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-6 text-sm">
                <button className="border-b border-slate-950 pb-3 font-medium text-slate-950">
                  For you
                </button>
                <button className="pb-3 text-slate-500 hover:text-slate-900">
                  Featured
                </button>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search"
                  className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:border-slate-400 sm:w-64"
                />

                <SelectDropdown
                  value={sort}
                  onChange={setSort}
                  className="min-w-[150px] rounded-full"
                  options={[
                    { label: "Newest", value: "newest" },
                    { label: "Oldest", value: "oldest" },
                    { label: "A-Z", value: "title-asc" },
                    { label: "Z-A", value: "title-desc" }
                  ]}
                />
              </div>
            </div>
          </div>

          {loading ? <div className="py-8"><Loader /></div> : null}
          {!loading && error ? <div className="py-8"><ErrorMessage message={error} /></div> : null}

          {!loading && !error && filteredBlogs.length === 0 ? (
            <div className="py-8">
              <EmptyState
                title="No published blogs found"
                description="Try changing the search term or publish new blogs."
              />
            </div>
          ) : null}

          {!loading && !error && filteredBlogs.length > 0 ? (
            <>
              <BlogList blogs={filteredBlogs} showAuthor />

              <div className="flex items-center justify-between py-8">
                <p className="text-sm text-slate-500">
                  Showing {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? "s" : ""}
                </p>

                <div className="flex gap-3">
                  <button
                    disabled={!meta || meta.page <= 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <button
                    disabled={!meta || meta.page >= meta.totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </main>

        <aside className="hidden border-l border-slate-200 pl-8 lg:block">
          <div className="sticky top-24 space-y-10">
            <section>
              <h3 className="text-sm font-bold text-slate-950">Trending on BlogPlatform</h3>

              <div className="mt-5 space-y-5">
                {trending.length === 0 ? (
                  <p className="text-sm text-slate-500">No trending blogs yet.</p>
                ) : (
                  trending.map((blog, index) => (
                    <div key={blog._id} className="flex gap-4">
                      <span className="text-xl font-bold text-slate-200">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="line-clamp-2 text-sm font-bold leading-5 text-slate-950">
                          {blog.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {formatDateShort(blog.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-slate-950">Recommended topics</h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {topics.length === 0 ? (
                  <p className="text-sm text-slate-500">No topics yet.</p>
                ) : (
                  topics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setSearch(topic)}
                      className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200"
                    >
                      {topic}
                    </button>
                  ))
                )}
              </div>
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
};

const formatDateShort = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric"
  });
};

export default HomePage;