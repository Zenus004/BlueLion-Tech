const { validationResult } = require("express-validator");
const HTTP_STATUS = require("../constants/httpStatusCodes");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(HTTP_STATUS.BAD_REQUEST).json({
    success: false,
    message: "Validation failed",
    errors: errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    })),
  });
};

module.exports = validateRequest;
