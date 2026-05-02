import { useEffect, useMemo, useState } from "react";
import UsersTable from "../../components/admin/UsersTable";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import Loader from "../../components/common/Loader";
import { deleteAdminUser, getAdminUsers } from "../../services/admin.service";
import useToast from "../../hooks/useToast";
import { SelectDropdown } from "../../components/common/SelectDropdown";

const AdminUsersPage = () => {
  const { showToast } = useToast();

  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async (pageNumber = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminUsers({
        page: pageNumber,
        limit: 50
      });

      setUsers(response.data.items || []);
      setMeta(response.data.meta || null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const filteredUsers = useMemo(() => {
    let nextUsers = [...users];

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      nextUsers = nextUsers.filter((user) => {
        return (
          user.name?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query)
        );
      });
    }

    if (roleFilter) {
      nextUsers = nextUsers.filter((user) => user.role === roleFilter);
    }

    return nextUsers;
  }, [users, search, roleFilter]);

  const handleDelete = async (user) => {
    const confirmed = window.confirm(`Delete user "${user.email}"? This will also delete their blogs.`);
    if (!confirmed) return;

    try {
      await deleteAdminUser(user._id);
      showToast("User deleted successfully");
      fetchUsers(page);
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to delete user", "error");
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-blue-600">Admin Panel</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          User Management
        </h1>
        <p className="mt-3 text-slate-600">
          View all users and remove accounts when needed.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_180px]">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          />

          <SelectDropdown
            value={roleFilter}
            onChange={setRoleFilter}
            placeholder="All roles"
            className="w-full"
            options={[
              { label: "All roles", value: "" },
              { label: "User", value: "user" },
              { label: "Admin", value: "admin" }
            ]}
          />
        </div>
      </section>

      {loading ? <Loader /> : null}
      {!loading && error ? <ErrorMessage message={error} /> : null}

      {!loading && !error && filteredUsers.length === 0 ? (
        <EmptyState
          title="No users found"
          description="Try changing the search or role filter."
        />
      ) : null}

      {!loading && !error && filteredUsers.length > 0 ? (
        <>
          <UsersTable users={filteredUsers} onDelete={handleDelete} />

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4">
            <p className="text-sm text-slate-600">
              Showing {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}
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

export default AdminUsersPage;