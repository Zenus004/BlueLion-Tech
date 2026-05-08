const express = require("express");
const {
  createManagedAdmin,
  getAllAdmins,
  blockAdmin,
  unblockAdmin,
  deleteAdmin,
} = require("../controllers/adminManagementController");
const { verifyAdmin, verifySuperAdmin } = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {
  createManagedAdminValidation,
  adminListValidation,
  adminIdValidation,
} = require("../validations/adminManagementValidation");

const router = express.Router();

router.post(
  "/admin/admins",
  verifyAdmin,
  verifySuperAdmin,
  createManagedAdminValidation,
  validateRequest,
  createManagedAdmin
);

router.get(
  "/admin/admins",
  verifyAdmin,
  verifySuperAdmin,
  adminListValidation,
  validateRequest,
  getAllAdmins
);

router.patch(
  "/admin/admins/:id/block",
  verifyAdmin,
  verifySuperAdmin,
  adminIdValidation,
  validateRequest,
  blockAdmin
);

router.patch(
  "/admin/admins/:id/unblock",
  verifyAdmin,
  verifySuperAdmin,
  adminIdValidation,
  validateRequest,
  unblockAdmin
);

router.delete(
  "/admin/admins/:id",
  verifyAdmin,
  verifySuperAdmin,
  adminIdValidation,
  validateRequest,
  deleteAdmin
);

module.exports = router;
