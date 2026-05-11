import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { dashboardService } from "../../services/dashboardService";
import { applicationService } from "../../services/applicationService";
import { enrollmentService } from "../../services/enrollmentService";

const courseDurationMap = {
  "B.Tech": "4 Years",
  BCA: "3 Years",
  "BSc IT": "3 Years",
  BBA: "3 Years",
};

const STATUS_STYLES = {
  pending: { dot: "bg-yellow-400", text: "text-yellow-700", bg: "bg-yellow-50", label: "Pending" },
  reviewed: { dot: "bg-blue-400", text: "text-blue-700", bg: "bg-blue-50", label: "Reviewed" },
  approved: { dot: "bg-green-500", text: "text-green-700", bg: "bg-green-50", label: "Approved" },
  rejected: { dot: "bg-red-400", text: "text-red-700", bg: "bg-red-50", label: "Rejected" },
  contacted: { dot: "bg-purple-400", text: "text-purple-700", bg: "bg-purple-50", label: "Contacted" },
};

function StatusPill({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value || "—"}</p>
    </div>
  );
}

const TABS = ["Overview", "Applications", "Enrollments"];

export default function UserProfilePage() {
  const { auth, clearSession } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      dashboardService.userProfile(),
      applicationService.mine(),
      enrollmentService.mine(),
    ])
      .then(([profileRes, appsRes, enrollRes]) => {
        setProfile(profileRes.data.data.user);
        setApplications(appsRes.data.data.applications);
        setEnrollments(enrollRes.data.data.enrollments);
      })
      .catch((e) => setError(e?.response?.data?.message || "Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

  const initials = auth?.profile?.fullName
    ? auth.profile.fullName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      {/* ── Navbar (matches landing page exactly) ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-gray-100"
      >
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="group">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BlueLionTech
            </h1>
            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300" />
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-600 text-sm font-medium hover:text-indigo-600 transition hidden sm:block">
              ← Back to Home
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:border-red-200 hover:text-red-500 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Page content ── */}
      <div className="container mx-auto max-w-5xl px-4 pt-32 pb-20">

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          </div>
        ) : error ? (
          <Card className="text-center py-12">
            <p className="text-4xl mb-3">⚠️</p>
            <p className="text-gray-500">{error}</p>
          </Card>
        ) : (
          <>
            {/* ── Profile hero card ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="mb-8 !p-8">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                  {/* Avatar */}
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-3xl font-bold text-white shadow-lg ring-4 ring-indigo-100">
                    {initials}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h1 className="text-3xl font-bold text-gray-800">{profile?.fullName}</h1>
                    <p className="mt-1 text-gray-500">{profile?.email}</p>
                    <span className={`mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${profile?.isBlocked ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                      }`}>
                      {profile?.isBlocked ? "Blocked" : "Active Account"}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/apply"
                      className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-105 transition"
                    >
                      Apply for Course
                    </Link>
                    <Link
                      to="/enroll"
                      className="rounded-full border-2 border-indigo-600 text-indigo-600 px-5 py-2.5 text-sm font-semibold hover:bg-indigo-50 transition"
                    >
                      Enroll in Program
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* ── Tabs ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 flex gap-1 rounded-2xl border border-gray-100 bg-white p-1.5 shadow-sm"
            >
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${activeTab === tab
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                      : "text-gray-500 hover:text-indigo-600"
                    }`}
                >
                  {tab}
                  {tab === "Applications" && applications.length > 0 && (
                    <span className={`ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${activeTab === tab ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-600"
                      }`}>
                      {applications.length}
                    </span>
                  )}
                  {tab === "Enrollments" && enrollments.length > 0 && (
                    <span className={`ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${activeTab === tab ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-600"
                      }`}>
                      {enrollments.length}
                    </span>
                  )}
                </button>
              ))}
            </motion.div>

            {/* ── Overview Tab ── */}
            {activeTab === "Overview" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Applications</p>
                        <p className="mt-1 text-4xl font-bold text-indigo-600">{applications.length}</p>
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">📄</div>
                    </div>
                  </Card>
                  <Card>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Enrollments</p>
                        <p className="mt-1 text-4xl font-bold text-purple-600">{enrollments.length}</p>
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-2xl">🎓</div>
                    </div>
                  </Card>
                </div>

                {/* Personal details */}
                <Card>
                  <h2 className="mb-5 text-lg font-bold text-gray-800">Personal Details</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InfoRow label="Full Name" value={profile?.fullName} />
                    <InfoRow label="Email" value={profile?.email} />
                    <InfoRow label="Account Status" value={profile?.isBlocked ? "Blocked" : "Active"} />
                    <InfoRow label="Member Since" value={
                      profile?.createdAt
                        ? new Date(profile.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                        : "—"
                    } />
                  </div>
                </Card>

                {/* Recent activity */}
                {(applications.length > 0 || enrollments.length > 0) ? (
                  <Card>
                    <h2 className="mb-5 text-lg font-bold text-gray-800">Recent Activity</h2>
                    <div className="space-y-3">
                      {[
                        ...applications.slice(0, 3).map((a) => ({ type: "Application", title: a.course, status: a.status, date: a.createdAt })),
                        ...enrollments.slice(0, 3).map((e) => ({ type: "Enrollment", title: e.selectedProgram, status: e.status, date: e.createdAt })),
                      ]
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .slice(0, 5)
                        .map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center justify-between rounded-xl border border-gray-50 bg-gray-50 px-4 py-3 hover:bg-indigo-50 transition"
                          >
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                              <p className="text-xs text-gray-400">
                                {item.type} · {new Date(item.date).toLocaleDateString("en-IN")}
                              </p>
                            </div>
                            <StatusPill status={item.status} />
                          </motion.div>
                        ))}
                    </div>
                  </Card>
                ) : (
                  <Card className="text-center py-12">
                    <p className="text-5xl mb-4">🚀</p>
                    <p className="text-lg font-bold text-gray-800">Get Started!</p>
                    <p className="mt-1 text-sm text-gray-500 mb-5">Submit an application or enroll in a program to start tracking.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                      <Link to="/apply" className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:scale-105 transition">
                        Apply for Course
                      </Link>
                      <Link to="/enroll" className="rounded-full border-2 border-indigo-600 text-indigo-600 px-6 py-2.5 text-sm font-semibold hover:bg-indigo-50 transition">
                        Enroll in Program
                      </Link>
                    </div>
                  </Card>
                )}
              </motion.div>
            )}

            {/* ── Applications Tab ── */}
            {activeTab === "Applications" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {applications.length === 0 ? (
                  <Card className="text-center py-14">
                    <p className="text-5xl mb-4">📄</p>
                    <p className="text-lg font-bold text-gray-800">No applications yet</p>
                    <p className="mt-1 mb-6 text-sm text-gray-500">Apply for a technical course and track your progress here.</p>
                    <Link to="/apply" className="inline-block rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-2.5 text-sm font-semibold text-white hover:scale-105 transition">
                      Apply Now
                    </Link>
                  </Card>
                ) : (
                  applications.map((item, i) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Card>
                        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-lg font-bold text-gray-800">{item.course}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Submitted on {new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                          </div>
                          <StatusPill status={item.status} />
                        </div>
                        <div className="grid gap-3 text-sm sm:grid-cols-2">
                          {[
                            ["Name", item.fullName],
                            ["Duration", courseDurationMap[item.course] || "N/A"],
                            ["Email", item.email],
                            ["Phone", item.phone],
                            ["Qualification", item.qualification],
                            ["City", item.city],
                          ].map(([label, val]) => (
                            <div key={label}>
                              <span className="text-gray-400">{label}: </span>
                              <span className="font-medium text-gray-700">{val}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

            {/* ── Enrollments Tab ── */}
            {activeTab === "Enrollments" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {enrollments.length === 0 ? (
                  <Card className="text-center py-14">
                    <p className="text-5xl mb-4">🎓</p>
                    <p className="text-lg font-bold text-gray-800">No enrollments yet</p>
                    <p className="mt-1 mb-6 text-sm text-gray-500">Enroll in a BlueLion-Tech program and track your status here.</p>
                    <Link to="/enroll" className="inline-block rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-2.5 text-sm font-semibold text-white hover:scale-105 transition">
                      Enroll Now
                    </Link>
                  </Card>
                ) : (
                  enrollments.map((item, i) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Card>
                        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-lg font-bold text-gray-800">{item.selectedProgram}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Submitted on {new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                          </div>
                          <StatusPill status={item.status} />
                        </div>
                        <div className="grid gap-3 text-sm sm:grid-cols-2">
                          {[
                            ["Student", item.studentName],
                            ["Duration", item.duration],
                            ["Grade", item.grade],
                            ["Email", item.email],
                            ["Phone", item.phone],
                            ["Address", item.address],
                          ].map(([label, val]) => (
                            <div key={label}>
                              <span className="text-gray-400">{label}: </span>
                              <span className="font-medium text-gray-700">{val}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </>
        )}
      </div>

    </div>
  );
}
