const HTTP_STATUS = require("../constants/httpStatusCodes");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const Application = require("../models/Application");
const Enrollment = require("../models/Enrollment");

const sanitizeUser = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  isBlocked: user.isBlocked,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const getAllUsers = asyncHandler(async (req, res) => {
  const {
    search = "",
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const filter = {};
  if (search) {
    const regex = new RegExp(search.trim(), "i");
    filter.$or = [{ fullName: regex }, { email: regex }];
  }

  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const [users, total] = await Promise.all([
    User.find(filter)
      .select("-password")
      .sort(sort)
      .skip(skip)
      .limit(limitNumber),
    User.countDocuments(filter),
  ]);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Users fetched successfully",
    data: {
      users,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber) || 1,
      },
    },
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  const [applications, enrollments] = await Promise.all([
    Application.find({ userId }).sort({ createdAt: -1 }),
    Enrollment.find({ userId }).sort({ createdAt: -1 }),
  ]);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User details fetched successfully",
    data: {
      user: sanitizeUser(user),
      applications,
      enrollments,
    },
  });
});

const blockUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isBlocked: true },
    { new: true }
  ).select("-password");

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User blocked successfully",
    data: {
      user: sanitizeUser(user),
    },
  });
});

const unblockUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isBlocked: false },
    { new: true }
  ).select("-password");

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User unblocked successfully",
    data: {
      user: sanitizeUser(user),
    },
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  blockUser,
  unblockUser,
};
