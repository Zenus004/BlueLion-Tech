const { body, query, param } = require("express-validator");

const createContactValidation = [
  body("name").trim().notEmpty().withMessage("name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("message is required")
    .isLength({ min: 5, max: 2000 })
    .withMessage("message must be between 5 and 2000 characters"),
];

const adminContactsListValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("page must be >= 1"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be between 1 and 100"),
  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("sortOrder must be asc or desc"),
];

const contactIdValidation = [
  param("id").isMongoId().withMessage("Valid contact id is required"),
];

module.exports = {
  createContactValidation,
  adminContactsListValidation,
  contactIdValidation,
};
