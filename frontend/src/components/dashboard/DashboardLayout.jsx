import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function DashboardLayout({ title, links, children }) {
  const { clearSession, auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  const initials = auth?.profile?.username
    ? auth.profile.username.slice(0, 2).toUpperCase()
    : "AD";

  const roleLabel = auth?.profile?.role === "super_admin" ? "Super Admin" : "Admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      {/* ── Top Navbar ── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-md backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <Link to="/admin/dashboard" className="group flex-shrink-0">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent md:text-2xl">
              BlueLionTech
            </span>
            <div className="h-0.5 w-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Page title — desktop */}
          <h1 className="hidden text-lg font-semibold text-gray-700 md:block">{title}</h1>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Role badge */}
            <span className="hidden rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 sm:inline-block">
              {roleLabel}
            </span>
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-sm font-bold text-white shadow-sm">
              {initials}
            </div>
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 shadow-sm transition hover:border-red-200 hover:text-red-500"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
            {/* Mobile sidebar toggle */}
            <button
              className="rounded-lg border border-gray-200 p-2 text-gray-500 md:hidden"
              onClick={() => setSidebarOpen((p) => !p)}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      <div className="mx-auto max-w-screen-xl px-4 pb-12 pt-24 md:px-6">
        {/* Mobile page title */}
        <h1 className="mb-4 text-xl font-bold text-gray-800 md:hidden">{title}</h1>

        <div className="flex gap-6 lg:grid lg:grid-cols-[240px_1fr]">

          {/* ── Sidebar ── */}
          <aside className={`${sidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-auto`}>
            <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-3 shadow-md">
              <nav className="space-y-1">
                {links.map((link) => {
                  const active = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                        active
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                          : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="min-w-0 flex-1 rounded-2xl border border-gray-100 bg-white p-5 shadow-md md:p-6"
          >
            {children}
          </motion.main>
        </div>
      </div>

    </div>
  );
}
