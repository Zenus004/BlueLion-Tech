const bcrypt = require("bcryptjs");
const HTTP_STATUS = require("../constants/httpStatusCodes");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const Admin = require("../models/Admin");

const sanitizeAdmin = (admin) => ({
  _id: admin._id,
  username: admin.username,
  role: admin.role,
  isBlocked: admin.isBlocked,
  createdBy: admin.createdBy,
  createdAt: admin.createdAt,
  updatedAt: admin.updatedAt,
});

const getTargetAdmin = async (id) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Admin not found");
  }
  return admin;
};

const assertManageableAdmin = (targetAdmin) => {
  if (targetAdmin.role === "super_admin") {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      "Super admin accounts cannot be managed from this route"
    );
  }
};

const createManagedAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const normalizedUsername = username.trim();

  const existingAdmin = await Admin.findOne({ username: normalizedUsername });
  if (existingAdmin) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({
    username: normalizedUsername,
    password: hashedPassword,
    role: "admin",
    createdBy: req.admin._id,
  });

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Admin created successfully",
    data: { admin: sanitizeAdmin(admin) },
  });
});

const getAllAdmins = asyncHandler(async (req, res) => {
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

  const filter = { role: "admin" };
  if (search) {
    filter.username = new RegExp(search.trim(), "i");
  }

  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const [admins, total] = await Promise.all([
    Admin.find(filter)
      .select("-password")
      .sort(sort)
      .skip(skip)
      .limit(limitNumber)
      .populate("createdBy", "username role"),
    Admin.countDocuments(filter),
  ]);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Admins fetched successfully",
    data: {
      admins,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber) || 1,
      },
    },
  });
});

const blockAdmin = asyncHandler(async (req, res) => {
  const targetAdmin = await getTargetAdmin(req.params.id);
  assertManageableAdmin(targetAdmin);

  targetAdmin.isBlocked = true;
  await targetAdmin.save();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Admin blocked successfully",
    data: { admin: sanitizeAdmin(targetAdmin) },
  });
});

const unblockAdmin = asyncHandler(async (req, res) => {
  const targetAdmin = await getTargetAdmin(req.params.id);
  assertManageableAdmin(targetAdmin);

  targetAdmin.isBlocked = false;
  await targetAdmin.save();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Admin unblocked successfully",
    data: { admin: sanitizeAdmin(targetAdmin) },
  });
});

const deleteAdmin = asyncHandler(async (req, res) => {
  const targetAdmin = await getTargetAdmin(req.params.id);
  assertManageableAdmin(targetAdmin);

  if (targetAdmin._id.toString() === req.admin._id.toString()) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "You cannot delete your own account");
  }

  await Admin.findByIdAndDelete(targetAdmin._id);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Admin deleted successfully",
    data: {},
  });
});

module.exports = {
  createManagedAdmin,
  getAllAdmins,
  blockAdmin,
  unblockAdmin,
  deleteAdmin,
};
