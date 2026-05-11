const express = require("express");
const {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
  deleteEnrollment,
} = require("../controllers/enrollmentController");
const { verifyAdmin, optionalVerifyUser } = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {
  createEnrollmentValidation,
  adminEnrollmentsListValidation,
  enrollmentIdValidation,
  updateEnrollmentStatusValidation,
} = require("../validations/enrollmentValidation");

const { submissionLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/enrollments", optionalVerifyUser, submissionLimiter, createEnrollmentValidation, validateRequest, createEnrollment);

router.get(
  "/admin/enrollments",
  verifyAdmin,
  adminEnrollmentsListValidation,
  validateRequest,
  getAllEnrollments
);

router.get(
  "/admin/enrollments/:id",
  verifyAdmin,
  enrollmentIdValidation,
  validateRequest,
  getEnrollmentById
);

router.patch(
  "/admin/enrollments/:id/status",
  verifyAdmin,
  updateEnrollmentStatusValidation,
  validateRequest,
  updateEnrollmentStatus
);

router.delete(
  "/admin/enrollments/:id",
  verifyAdmin,
  enrollmentIdValidation,
  validateRequest,
  deleteEnrollment
);

module.exports = router;
