const { query, param } = require("express-validator");

const adminUsersListValidation = [
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

const userIdValidation = [
  param("id").isMongoId().withMessage("Valid user id is required"),
];

module.exports = {
  adminUsersListValidation,
  userIdValidation,
};
