const express = require("express");
const {
  userRegister,
  userLogin,
  userMe,
  adminLogin,
  createAdmin,
  adminMe,
} = require("../controllers/authController");
const {
  verifyUser,
  verifyAdmin,
  verifySuperAdmin,
} = require("../middleware/authMiddleware");

const { authLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/user/register", authLimiter, userRegister);
router.post("/user/login", authLimiter, userLogin);
router.get("/user/me", verifyUser, userMe);

router.post("/admin/login", authLimiter, adminLogin);
router.post("/admin/create", verifyAdmin, verifySuperAdmin, createAdmin);
router.get("/admin/me", verifyAdmin, adminMe);

module.exports = router;
