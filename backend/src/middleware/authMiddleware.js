const HTTP_STATUS = require("../constants/httpStatusCodes");
const ApiError = require("../utils/ApiError");
const { verifyUserToken, verifyAdminToken } = require("../utils/jwt");
const User = require("../models/User");
const Admin = require("../models/Admin");

const extractBearerToken = (req) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) return null;
  return authHeader.split(" ")[1];
};

const verifyUser = async (req, res, next) => {
  try {
    const token = extractBearerToken(req) || req.cookies.userToken;
    if (!token) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "User token is required");
    }

    const payload = verifyUserToken(token);
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid user token");
    }
    if (user.isBlocked) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, "User account is blocked");
    }

    req.user = user;
    next();
  } catch (error) {
    next(
      error.statusCode
        ? error
        : new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized user")
    );
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const token = extractBearerToken(req) || req.cookies.adminToken;
    if (!token) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Admin token is required");
    }

    const payload = verifyAdminToken(token);
    const admin = await Admin.findById(payload.id).select("-password");
    if (!admin) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid admin token");
    }
    if (admin.isBlocked) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, "Admin account is blocked");
    }

    req.admin = admin;
    next();
  } catch (error) {
    next(
      error.statusCode
        ? error
        : new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized admin")
    );
  }
};

const optionalVerifyUser = async (req, res, next) => {
  try {
    const token = extractBearerToken(req) || req.cookies.userToken;
    if (!token) return next();

    const payload = verifyUserToken(token);
    const user = await User.findById(payload.id).select("-password");
    if (user && !user.isBlocked) {
      req.user = user;
    }
  } catch {
  }
  next();
};

const verifySuperAdmin = (req, res, next) => {
  if (!req.admin) {
    return next(
      new ApiError(HTTP_STATUS.UNAUTHORIZED, "Admin authentication required")
    );
  }

  if (req.admin.role !== "super_admin") {
    return next(
      new ApiError(HTTP_STATUS.FORBIDDEN, "Super admin access required")
    );
  }

  next();
};

module.exports = {
  verifyUser,
  verifyAdmin,
  verifySuperAdmin,
  optionalVerifyUser,
};
