const { body, query, param } = require("express-validator");

const COURSE_OPTIONS = ["B.Tech", "BCA", "BSc IT", "BBA"];
const STATUS_OPTIONS = ["pending", "reviewed", "approved", "rejected", "contacted"];

const createApplicationValidation = [
  body("fullName").trim().notEmpty().withMessage("fullName is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("phone")
    .trim()
    .matches(/^[0-9+\-\s()]{8,20}$/)
    .withMessage("Valid phone is required"),
  body("course")
    .trim()
    .isIn(COURSE_OPTIONS)
    .withMessage(`course must be one of: ${COURSE_OPTIONS.join(", ")}`),
  body("qualification").trim().notEmpty().withMessage("qualification is required"),
  body("city").trim().notEmpty().withMessage("city is required"),
];

const adminApplicationsListValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("page must be >= 1"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be between 1 and 100"),
  query("status")
    .optional()
    .isIn(STATUS_OPTIONS)
    .withMessage(`status must be one of: ${STATUS_OPTIONS.join(", ")}`),
  query("course")
    .optional()
    .isIn(COURSE_OPTIONS)
    .withMessage(`course must be one of: ${COURSE_OPTIONS.join(", ")}`),
  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("sortOrder must be asc or desc"),
];

const applicationIdValidation = [
  param("id").isMongoId().withMessage("Valid application id is required"),
];

const updateApplicationStatusValidation = [
  ...applicationIdValidation,
  body("status")
    .trim()
    .isIn(STATUS_OPTIONS)
    .withMessage(`status must be one of: ${STATUS_OPTIONS.join(", ")}`),
];

module.exports = {
  createApplicationValidation,
  adminApplicationsListValidation,
  applicationIdValidation,
  updateApplicationStatusValidation,
  COURSE_OPTIONS,
  STATUS_OPTIONS,
};