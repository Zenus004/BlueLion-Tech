const HTTP_STATUS = require("../constants/httpStatusCodes");
const asyncHandler = require("../utils/asyncHandler");
const { getAdminDashboardStats } = require("../services/dashboardService");

const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await getAdminDashboardStats();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Admin dashboard stats fetched successfully",
    data: stats,
  });
});

module.exports = {
  getDashboardStats,
};
