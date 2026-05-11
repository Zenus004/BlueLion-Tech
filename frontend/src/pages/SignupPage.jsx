import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm placeholder-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition";

export default function SignupPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.userSignup(form);
      setSession({ token: res.data.data.token, role: "user", profile: res.data.data.user });
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-16 flex flex-col">
      {/* Logo */}
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
          <h1 className="mb-1 text-2xl font-bold text-gray-800">Create your account</h1>
          <p className="mb-6 text-sm text-gray-500">
            Use the same email from your application or enrollment to track progress.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className={inputCls}
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
              required
            />
            <input
              className={inputCls}
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
            />
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
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link className="font-semibold text-indigo-600 hover:text-indigo-700" to="/login">
              Login
            </Link>
          </p>
          <p className="mt-3 text-center text-sm text-gray-500">
            <Link className="hover:text-indigo-600 transition" to="/">← Back to home</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
