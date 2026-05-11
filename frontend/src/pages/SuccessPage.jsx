import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SuccessPage() {
  const [params] = useSearchParams();
  const { isAuthenticated, isUser } = useAuth();
  const type = params.get("type") || "submission";

  const titleMap = {
    application: "Application Submitted Successfully! 🎉",
    enrollment: "Enrollment Submitted Successfully! 🎓",
    contact: "Message Sent Successfully! 📨",
    submission: "Submitted Successfully! ✅",
  };

  const subtitleMap = {
    application: "Your application has been received. You can track its status in your profile.",
    enrollment: "Your enrollment is under review. Check your profile for updates.",
    contact: "We've received your message and will get back to you soon.",
    submission: "Your submission has been received.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-4 py-24 text-white">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/20 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-md"
        >
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">{titleMap[type]}</h1>
          <p className="mx-auto mb-8 max-w-xl text-blue-100">{subtitleMap[type]}</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 transition">
              Go Home
            </Link>
            {isAuthenticated && isUser ? (
              <Link to="/profile" className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold hover:scale-105 transition">
                View My Profile
              </Link>
            ) : (
              <Link to="/signup" className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold hover:scale-105 transition">
                Create Account to Track
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
