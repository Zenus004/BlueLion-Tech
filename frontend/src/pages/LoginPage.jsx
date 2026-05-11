import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm placeholder-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const toast = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isAdmin) {
        const res = await authService.adminLogin({ username: form.username, password: form.password });
        setSession({ token: res.data.data.token, role: res.data.data.admin.role, profile: res.data.data.admin });
        toast.success("Admin login successful");
        navigate("/admin/dashboard");
      } else {
        const res = await authService.userLogin({ email: form.email, password: form.password });
        setSession({ token: res.data.data.token, role: "user", profile: res.data.data.user });
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-16 flex flex-col">
      {/* Navbar link */}
      <div className="mb-10 text-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          BlueLionTech
        </Link>
      </div>

      <div className="mx-auto w-full max-w-md flex-1">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl"
        >
          {/* Header */}
          <h1 className="mb-1 text-2xl font-bold text-gray-800">
            {isAdmin ? "Admin Login" : "Welcome back!"}
          </h1>
          <p className="mb-6 text-sm text-gray-500">
            {isAdmin ? "Access the BlueLion-Tech admin panel" : "Login to your BlueLion-Tech account"}
          </p>

          {/* Role toggle */}
          <div className="mb-6 flex gap-1.5 rounded-xl border border-gray-100 bg-gray-50 p-1">
            <button
              onClick={() => setIsAdmin(false)}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
                !isAdmin ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" : "text-gray-500 hover:text-indigo-600"
              }`}
            >
              User
            </button>
            <button
              onClick={() => setIsAdmin(true)}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
                isAdmin ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" : "text-gray-500 hover:text-indigo-600"
              }`}
            >
              Admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isAdmin ? (
              <input
                className={inputCls}
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                required
              />
            ) : (
              <input
                className={inputCls}
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                required
              />
            )}

            <div className="relative">
              <input
                className={`${inputCls} pr-12`}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-indigo-500 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-[1.01] hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Please wait..." : "Login"}
            </button>
          </form>

          {!isAdmin && (
            <p className="mt-5 text-center text-sm text-gray-500">
              New user?{" "}
              <Link className="font-semibold text-indigo-600 hover:text-indigo-700" to="/signup">
                Create account
              </Link>
            </p>
          )}

          <p className="mt-3 text-center text-sm text-gray-500">
            <Link className="hover:text-indigo-600 transition" to="/">← Back to home</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
