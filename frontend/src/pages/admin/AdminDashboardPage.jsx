import { useEffect, useState } from "react";
import StatsCards from "../../components/admin/StatsCards";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import Loader from "../../components/common/Loader";
import { getAdminDashboard } from "../../services/admin.service";


const AdminDashboardPage = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAdminDashboard();
        setDashboard(response.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-blue-600">Admin Panel</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          System Dashboard
        </h1>
        <p className="mt-3 text-slate-600">
          Monitor users, blog counts, and content publishing activity.
        </p>
      </section>

      <StatsCards totals={dashboard?.totals} />

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Blogs Per User
          </h2>
          <p className="text-sm text-slate-600">
            Generated at: {dashboard?.generatedAt ? new Date(dashboard.generatedAt).toLocaleString() : "-"}
          </p>
        </div>

        <div className="mt-6">
          {!dashboard?.blogsPerUser?.length ? (
            <EmptyState
              title="No blog activity yet"
              description="User-wise blog stats will appear here once blogs are created."
            />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        User
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Role
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Total Blogs
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Drafts
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Published
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {dashboard.blogsPerUser.map((item, index) => (
                      <tr key={`${item.authorId || item.email}-${index}`}>
                        <td className="px-5 py-4">
                          <div className="text-sm font-medium text-slate-900">
                            {item.name || "-"}
                          </div>
                          <div className="text-xs text-slate-500">{item.email || "-"}</div>
                        </td>
                        <td className="px-5 py-4 text-sm capitalize text-slate-600">
                          {item.role || "-"}
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-700">
                          {item.blogCount}
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-700">
                          {item.draftCount}
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-700">
                          {item.publishedCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;