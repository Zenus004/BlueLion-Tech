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

const router = express.Router();

router.post("/user/register", userRegister);
router.post("/user/login", userLogin);
router.get("/user/me", verifyUser, userMe);

router.post("/admin/login", adminLogin);
router.post("/admin/create", verifyAdmin, verifySuperAdmin, createAdmin);
router.get("/admin/me", verifyAdmin, adminMe);

module.exports = router;
