import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

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
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-4 py-24 text-white">
      <div className="mx-auto max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
          <h1 className="mb-2 text-3xl font-bold">{isAdmin ? "Admin Login" : "User Login"}</h1>
          <p className="mb-6 text-blue-100">Access your BlueLion-Tech account</p>

          <div className="mb-6 flex gap-2 rounded-xl bg-white/10 p-1">
            <button className={`w-full rounded-lg py-2 text-sm font-semibold ${!isAdmin ? "bg-cyan-500 text-white" : "text-blue-100"}`} onClick={() => setIsAdmin(false)}>User</button>
            <button className={`w-full rounded-lg py-2 text-sm font-semibold ${isAdmin ? "bg-cyan-500 text-white" : "text-blue-100"}`} onClick={() => setIsAdmin(true)}>Admin</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isAdmin ? (
              <input className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3" placeholder="Username" value={form.username} onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))} required />
            ) : (
              <input className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
            )}
            <div className="relative">
              <input className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pr-12" type={showPassword ? "text" : "password"} placeholder="Password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-blue-100"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 font-semibold transition hover:scale-[1.01] disabled:opacity-50">{loading ? "Please wait..." : "Login"}</button>
          </form>

          {!isAdmin && <p className="mt-5 text-center text-sm text-blue-100">New user? <Link className="font-semibold text-cyan-300" to="/signup">Create account</Link></p>}
        </motion.div>
      </div>
    </div>
  );
}
