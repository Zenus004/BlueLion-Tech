const express = require("express");
const {
  getAllUsers,
  getUserById,
  blockUser,
  unblockUser,
} = require("../controllers/adminUserController");
const { verifyAdmin } = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {
  adminUsersListValidation,
  userIdValidation,
} = require("../validations/adminUserValidation");

const router = express.Router();

router.get(
  "/admin/users",
  verifyAdmin,
  adminUsersListValidation,
  validateRequest,
  getAllUsers
);

router.get(
  "/admin/users/:id",
  verifyAdmin,
  userIdValidation,
  validateRequest,
  getUserById
);

router.patch(
  "/admin/users/:id/block",
  verifyAdmin,
  userIdValidation,
  validateRequest,
  blockUser
);

router.patch(
  "/admin/users/:id/unblock",
  verifyAdmin,
  userIdValidation,
  validateRequest,
  unblockUser
);

module.exports = router;
