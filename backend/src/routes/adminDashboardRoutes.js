const express = require("express");
const { getDashboardStats } = require("../controllers/adminDashboardController");
const { verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/admin/dashboard/stats", verifyAdmin, getDashboardStats);

module.exports = router;
