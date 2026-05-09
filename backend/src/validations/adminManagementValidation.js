const { body, query, param } = require("express-validator");

const createManagedAdminValidation = [
  body("username").trim().notEmpty().withMessage("username is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
];

const adminListValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("page must be >= 1"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be between 1 and 100"),
  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("sortOrder must be asc or desc"),
  query("createdFrom")
    .optional()
    .isISO8601()
    .withMessage("createdFrom must be a valid date"),
  query("createdTo")
    .optional()
    .isISO8601()
    .withMessage("createdTo must be a valid date"),
];

const adminIdValidation = [
  param("id").isMongoId().withMessage("Valid admin id is required"),
];

module.exports = {
  createManagedAdminValidation,
  adminListValidation,
  adminIdValidation,
};
