const User = require("../models/User");
const Application = require("../models/Application");
const Enrollment = require("../models/Enrollment");
const Contact = require("../models/Contact");

const getApplicationStatusBuckets = async () => {
  const [bucket] = await Application.aggregate([
    {
      $group: {
        _id: null,
        pendingApplications: {
          $sum: {
            $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
          },
        },
        approvedApplications: {
          $sum: {
            $cond: [{ $eq: ["$status", "approved"] }, 1, 0],
          },
        },
        rejectedApplications: {
          $sum: {
            $cond: [{ $eq: ["$status", "rejected"] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        pendingApplications: 1,
        approvedApplications: 1,
        rejectedApplications: 1,
      },
    },
  ]);

  return (
    bucket || {
      pendingApplications: 0,
      approvedApplications: 0,
      rejectedApplications: 0,
    }
  );
};

const getRecentSubmissions = async (limit = 10) => {
  const [applications, enrollments, contacts] = await Promise.all([
    Application.find({})
      .select("fullName email course status createdAt")
      .sort({ createdAt: -1 })
      .limit(limit),
    Enrollment.find({})
      .select("studentName email selectedProgram status createdAt")
      .sort({ createdAt: -1 })
      .limit(limit),
    Contact.find({})
      .select("name email createdAt")
      .sort({ createdAt: -1 })
      .limit(limit),
  ]);

  const mapped = [
    ...applications.map((item) => ({
      type: "application",
      id: item._id,
      name: item.fullName,
      email: item.email,
      title: item.course,
      status: item.status,
      createdAt: item.createdAt,
    })),
    ...enrollments.map((item) => ({
      type: "enrollment",
      id: item._id,
      name: item.studentName,
      email: item.email,
      title: item.selectedProgram,
      status: item.status,
      createdAt: item.createdAt,
    })),
    ...contacts.map((item) => ({
      type: "contact",
      id: item._id,
      name: item.name,
      email: item.email,
      title: "Contact Message",
      status: "received",
      createdAt: item.createdAt,
    })),
  ];

  return mapped
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
};

const getRecentUsers = async (limit = 10) => {
  return User.find({})
    .select("fullName email role isBlocked createdAt")
    .sort({ createdAt: -1 })
    .limit(limit);
};

const getAdminDashboardStats = async () => {
  const [
    totalUsers,
    totalApplications,
    totalEnrollments,
    totalContacts,
    statusBuckets,
    recentSubmissions,
    recentUsers,
  ] = await Promise.all([
    User.countDocuments({}),
    Application.countDocuments({}),
    Enrollment.countDocuments({}),
    Contact.countDocuments({}),
    getApplicationStatusBuckets(),
    getRecentSubmissions(10),
    getRecentUsers(10),
  ]);

  return {
    totalUsers,
    totalApplications,
    totalEnrollments,
    totalContacts,
    pendingApplications: statusBuckets.pendingApplications,
    approvedApplications: statusBuckets.approvedApplications,
    rejectedApplications: statusBuckets.rejectedApplications,
    recentSubmissions,
    recentUsers,
  };
};

module.exports = {
  getAdminDashboardStats,
};
