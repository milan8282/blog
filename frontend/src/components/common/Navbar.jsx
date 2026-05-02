import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const getNavLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-slate-950 text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
  }`;

const getMobileNavClass = ({ isActive }) =>
  `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
    isActive
      ? "bg-slate-950 text-white"
      : "text-slate-700 hover:bg-slate-100"
  }`;

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const navItems = (
    <>
      <NavLink to="/" end className={getNavLinkClass}>
        Home
      </NavLink>

      {!isAuthenticated ? (
        <>
          <NavLink to="/login" className={getNavLinkClass}>
            Login
          </NavLink>
          <NavLink to="/register" className={getNavLinkClass}>
            Register
          </NavLink>
        </>
      ) : (
        <>
          {user?.role === "user" && (
            <>
              <NavLink to="/dashboard" end className={getNavLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/blogs/create" end className={getNavLinkClass}>
                Create
              </NavLink>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <NavLink to="/admin" end className={getNavLinkClass}>
                Admin
              </NavLink>
              <NavLink to="/admin/users" end className={getNavLinkClass}>
                Users
              </NavLink>
              <NavLink to="/admin/blogs" end className={getNavLinkClass}>
                Blogs
              </NavLink>
            </>
          )}

          <button
            type="button"
            onClick={logout}
            className="rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            Logout
          </button>
        </>
      )}
    </>
  );

  const mobileNavItems = (
    <>
      <NavLink to="/" end onClick={closeMenu} className={getMobileNavClass}>
        Home
      </NavLink>

      {!isAuthenticated ? (
        <>
          <NavLink to="/login" onClick={closeMenu} className={getMobileNavClass}>
            Login
          </NavLink>
          <NavLink to="/register" onClick={closeMenu} className={getMobileNavClass}>
            Register
          </NavLink>
        </>
      ) : (
        <>
          {user?.role === "user" && (
            <>
              <NavLink to="/dashboard" end onClick={closeMenu} className={getMobileNavClass}>
                Dashboard
              </NavLink>
              <NavLink to="/blogs/create" end onClick={closeMenu} className={getMobileNavClass}>
                Create Blog
              </NavLink>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <NavLink to="/admin" end onClick={closeMenu} className={getMobileNavClass}>
                Admin Dashboard
              </NavLink>
              <NavLink to="/admin/users" end onClick={closeMenu} className={getMobileNavClass}>
                Users
              </NavLink>
              <NavLink to="/admin/blogs" end onClick={closeMenu} className={getMobileNavClass}>
                Blogs
              </NavLink>
            </>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-2xl bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Logout
          </button>
        </>
      )}
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-lg font-extrabold tracking-tight text-slate-950">
            BlogPlatform
          </Link>

          <nav className="hidden items-center gap-2 md:flex">{navItems}</nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[100] md:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={closeMenu}
            className="absolute inset-0 bg-slate-950/40"
          />

          <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <Link
                to="/"
                onClick={closeMenu}
                className="text-lg font-extrabold tracking-tight text-slate-950"
              >
                BlogPlatform
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-2 p-5">{mobileNavItems}</nav>
          </aside>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;