const express = require("express");
const {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
  deleteEnrollment,
} = require("../controllers/enrollmentController");
const { verifyAdmin } = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {
  createEnrollmentValidation,
  adminEnrollmentsListValidation,
  enrollmentIdValidation,
  updateEnrollmentStatusValidation,
} = require("../validations/enrollmentValidation");

const router = express.Router();

router.post("/enrollments", createEnrollmentValidation, validateRequest, createEnrollment);

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
