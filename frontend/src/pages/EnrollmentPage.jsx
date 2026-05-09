import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { enrollmentService } from "../services/enrollmentService";
import { useToast } from "../context/ToastContext";

const gradeMap = {
  "Junior Innovators": "Grade 3-5",
  "Tech Explorers": "Grade 6-8",
  "Pre-Professional": "Grade 9-10",
  "Industry & Startup": "Grade 11-12",
};

export default function EnrollmentPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const initialProgram = params.get("program") || "Junior Innovators";
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    studentName: "",
    email: "",
    phone: "",
    selectedProgram: initialProgram,
    grade: gradeMap[initialProgram],
    duration: "3 Months",
    address: "",
  });

  const onProgramChange = (selectedProgram) => {
    setForm((p) => ({ ...p, selectedProgram, grade: gradeMap[selectedProgram] }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await enrollmentService.submit(form);
      toast.success("Enrollment submitted successfully");
      navigate("/success?type=enrollment");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 px-4 py-24 text-white">
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
          <h1 className="mb-2 text-3xl font-bold">Grade-Wise Enrollment</h1>
          <p className="mb-6 text-blue-100">Enroll your child into the right innovation track.</p>
          <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
            <input className="rounded-xl border border-white/20 bg-white/10 p-3" placeholder="Student Name" value={form.studentName} onChange={(e) => setForm((p) => ({ ...p, studentName: e.target.value }))} required />
            <input type="email" className="rounded-xl border border-white/20 bg-white/10 p-3" placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
            <input className="rounded-xl border border-white/20 bg-white/10 p-3" placeholder="Phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} required />
            <select className="rounded-xl border border-white/20 bg-white/10 p-3" value={form.selectedProgram} onChange={(e) => onProgramChange(e.target.value)}>
              {Object.keys(gradeMap).map((program) => <option key={program} value={program} className="text-black">{program}</option>)}
            </select>
            <input className="rounded-xl border border-white/20 bg-white/10 p-3" value={form.grade} readOnly />
            <select className="rounded-xl border border-white/20 bg-white/10 p-3" value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))}>
              <option className="text-black">3 Months</option>
              <option className="text-black">6 Months</option>
            </select>
            <textarea className="rounded-xl border border-white/20 bg-white/10 p-3 md:col-span-2" rows="3" placeholder="Address" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} required />
            <button disabled={loading} className="md:col-span-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 font-semibold">{loading ? "Submitting..." : "Submit Enrollment"}</button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
