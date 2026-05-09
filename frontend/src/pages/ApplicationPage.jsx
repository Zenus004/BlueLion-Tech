import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { applicationService } from "../services/applicationService";
import { useToast } from "../context/ToastContext";

const courses = ["B.Tech", "BCA", "BSc IT", "BBA"];

export default function ApplicationPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: params.get("course") || "B.Tech",
    qualification: "",
    city: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await applicationService.submit(form);
      toast.success("Application submitted successfully");
      navigate("/success?type=application");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-violet-500 px-4 py-24">
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/50 bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">Technical Course Application</h1>
          <p className="mb-6 text-gray-600">Submit your application for BlueLion-Tech programs.</p>
          <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
            <input className="rounded-xl border border-gray-200 p-3" placeholder="Full Name" value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} required />
            <input type="email" className="rounded-xl border border-gray-200 p-3" placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
            <input className="rounded-xl border border-gray-200 p-3" placeholder="Phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} required />
            <select className="rounded-xl border border-gray-200 p-3" value={form.course} onChange={(e) => setForm((p) => ({ ...p, course: e.target.value }))}>
              {courses.map((course) => <option key={course} value={course}>{course}</option>)}
            </select>
            <input className="rounded-xl border border-gray-200 p-3" placeholder="Qualification" value={form.qualification} onChange={(e) => setForm((p) => ({ ...p, qualification: e.target.value }))} required />
            <input className="rounded-xl border border-gray-200 p-3" placeholder="City" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} required />
            <button disabled={loading} className="md:col-span-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 font-semibold text-white">{loading ? "Submitting..." : "Submit Application"}</button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
