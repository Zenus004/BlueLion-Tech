const express = require("express");
const {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/applicationController");
const { verifyAdmin, optionalVerifyUser } = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {
  createApplicationValidation,
  adminApplicationsListValidation,
  applicationIdValidation,
  updateApplicationStatusValidation,
} = require("../validations/applicationValidation");

const { submissionLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post(
  "/applications",
  optionalVerifyUser,
  submissionLimiter,
  createApplicationValidation,
  validateRequest,
  createApplication
);

router.get(
  "/admin/applications",
  verifyAdmin,
  adminApplicationsListValidation,
  validateRequest,
  getAllApplications
);

router.get(
  "/admin/applications/:id",
  verifyAdmin,
  applicationIdValidation,
  validateRequest,
  getApplicationById
);

router.patch(
  "/admin/applications/:id/status",
  verifyAdmin,
  updateApplicationStatusValidation,
  validateRequest,
  updateApplicationStatus
);

router.delete(
  "/admin/applications/:id",
  verifyAdmin,
  applicationIdValidation,
  validateRequest,
  deleteApplication
);

module.exports = router;
