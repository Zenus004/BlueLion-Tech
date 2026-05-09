const HTTP_STATUS = require("../constants/httpStatusCodes");

const notFound = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
    errors: [],
  });
};

module.exports = notFound;
