const express = require("express");
const HTTP_STATUS = require("../constants/httpStatusCodes");
const authRoutes = require("./authRoutes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "BlueLion-Tech backend is running",
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    },
  });
});

router.use("/auth", authRoutes);

module.exports = router;
