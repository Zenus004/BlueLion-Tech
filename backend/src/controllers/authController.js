const bcrypt = require("bcryptjs");
const HTTP_STATUS = require("../constants/httpStatusCodes");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const Admin = require("../models/Admin");
const { generateUserToken, generateAdminToken } = require("../utils/jwt");

const sanitizeUser = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  isBlocked: user.isBlocked,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const sanitizeAdmin = (admin) => ({
  _id: admin._id,
  username: admin.username,
  role: admin.role,
  isBlocked: admin.isBlocked,
  createdBy: admin.createdBy,
  createdAt: admin.createdAt,
  updatedAt: admin.updatedAt,
});

const userRegister = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "fullName, email and password are required"
    );
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    fullName: fullName.trim(),
    email: normalizedEmail,
    password: hashedPassword,
  });

  const token = generateUserToken({ id: user._id, role: user.role });

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "User registered successfully",
    data: {
      user: sanitizeUser(user),
      token,
    },
  });
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
  }
  if (user.isBlocked) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "User account is blocked");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
  }

  const token = generateUserToken({ id: user._id, role: user.role });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User login successful",
    data: {
      user: sanitizeUser(user),
      token,
    },
  });
});

const userMe = asyncHandler(async (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User profile fetched successfully",
    data: {
      user: sanitizeUser(req.user),
    },
  });
});

const adminLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "username and password are required"
    );
  }

  const admin = await Admin.findOne({ username: username.trim() });
  if (!admin) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid username or password");
  }
  if (admin.isBlocked) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "Admin account is blocked");
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid username or password");
  }

  const token = generateAdminToken({ id: admin._id, role: admin.role });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Admin login successful",
    data: {
      admin: sanitizeAdmin(admin),
      token,
    },
  });
});

const createAdmin = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "username and password are required"
    );
  }

  if (role && !["admin", "super_admin"].includes(role)) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid role value");
  }

  const normalizedUsername = username.trim();
  const existingAdmin = await Admin.findOne({ username: normalizedUsername });
  if (existingAdmin) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({
    username: normalizedUsername,
    password: hashedPassword,
    role: role || "admin",
    createdBy: req.admin._id,
  });

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Admin created successfully",
    data: {
      admin: sanitizeAdmin(admin),
    },
  });
});

const adminMe = asyncHandler(async (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Admin profile fetched successfully",
    data: {
      admin: sanitizeAdmin(req.admin),
    },
  });
});

module.exports = {
  userRegister,
  userLogin,
  userMe,
  adminLogin,
  createAdmin,
  adminMe,
};
