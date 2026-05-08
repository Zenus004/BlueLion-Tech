const HTTP_STATUS = require("../constants/httpStatusCodes");
const asyncHandler = require("../utils/asyncHandler");
const Application = require("../models/Application");
const Enrollment = require("../models/Enrollment");

const buildLatestActivity = (applications, enrollments) => {
  const appActivities = applications.map((item) => ({
    type: "application",
    id: item._id,
    title: item.course,
    status: item.status,
    createdAt: item.createdAt,
  }));

  const enrollmentActivities = enrollments.map((item) => ({
    type: "enrollment",
    id: item._id,
    title: item.selectedProgram,
    status: item.status,
    createdAt: item.createdAt,
  }));

  return [...appActivities, ...enrollmentActivities]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);
};

const getUserDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [applications, enrollments] = await Promise.all([
    Application.find({ userId })
      .select("course status createdAt")
      .sort({ createdAt: -1 }),
    Enrollment.find({ userId })
      .select("selectedProgram status createdAt")
      .sort({ createdAt: -1 }),
  ]);

  const applicationStatusCounts = applications.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  const enrollmentStatusCounts = enrollments.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User dashboard fetched successfully",
    data: {
      summary: {
        totalApplications: applications.length,
        totalEnrollments: enrollments.length,
        applicationStatusCounts,
        enrollmentStatusCounts,
      },
      latestActivity: buildLatestActivity(applications, enrollments),
    },
  });
});

const getUserApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User applications fetched successfully",
    data: { applications },
  });
});

const getUserEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User enrollments fetched successfully",
    data: { enrollments },
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User profile fetched successfully",
    data: { user: req.user },
  });
});

module.exports = {
  getUserDashboard,
  getUserApplications,
  getUserEnrollments,
  getUserProfile,
};
