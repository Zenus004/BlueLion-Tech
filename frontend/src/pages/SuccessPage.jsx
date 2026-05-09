import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";

export default function SuccessPage() {
  const [params] = useSearchParams();
  const type = params.get("type") || "submission";

  const titleMap = {
    application: "Application Submitted Successfully",
    enrollment: "Enrollment Submitted Successfully",
    contact: "Message Sent Successfully",
    submission: "Submitted Successfully",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-4 py-24 text-white">
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/20 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-md">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">{titleMap[type]}</h1>
          <p className="mx-auto mb-8 max-w-xl text-blue-100">Create an account using the same email address to track your submission status.</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold hover:bg-white/20">Go Home</Link>
            <Link to="/signup" className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold">Create Account</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
