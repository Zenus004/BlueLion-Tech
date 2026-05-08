const express = require("express");
const {
  getUserDashboard,
  getUserApplications,
  getUserEnrollments,
  getUserProfile,
} = require("../controllers/userDashboardController");
const { verifyUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/user/dashboard", verifyUser, getUserDashboard);
router.get("/user/applications", verifyUser, getUserApplications);
router.get("/user/enrollments", verifyUser, getUserEnrollments);
router.get("/user/profile", verifyUser, getUserProfile);

module.exports = router;
