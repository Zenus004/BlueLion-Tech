import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

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
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-4 py-24 text-white">
      <div className="mx-auto max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
          <h1 className="mb-2 text-3xl font-bold">Create Account</h1>
          <p className="mb-6 text-blue-100">Use the same email from your forms to track progress</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3" placeholder="Full Name" value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} required />
            <input className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
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
            <button disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 font-semibold transition hover:scale-[1.01] disabled:opacity-50">{loading ? "Please wait..." : "Sign Up"}</button>
          </form>

          <p className="mt-5 text-center text-sm text-blue-100">Already have an account? <Link className="font-semibold text-cyan-300" to="/login">Login</Link></p>
        </motion.div>
      </div>
    </div>
  );
}
