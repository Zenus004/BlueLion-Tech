const HTTP_STATUS = require("../constants/httpStatusCodes");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const Enrollment = require("../models/Enrollment");

const createEnrollment = asyncHandler(async (req, res) => {
  const { studentName, email, phone, grade, selectedProgram, duration, address } =
    req.body;

  const enrollment = await Enrollment.create({
    userId: null,
    studentName: studentName.trim(),
    email: email.toLowerCase().trim(),
    phone: phone.trim(),
    grade: grade.trim(),
    selectedProgram: selectedProgram.trim(),
    duration: duration.trim(),
    address: address.trim(),
  });

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Enrollment submitted successfully",
    data: { enrollment },
  });
});

const getAllEnrollments = asyncHandler(async (req, res) => {
  const {
    search = "",
    status,
    selectedProgram,
    duration,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const filter = {};
  if (status) filter.status = status;
  if (selectedProgram) filter.selectedProgram = selectedProgram;
  if (duration) filter.duration = duration;
  if (search) {
    const regex = new RegExp(search.trim(), "i");
    filter.$or = [
      { studentName: regex },
      { email: regex },
      { phone: regex },
      { grade: regex },
      { address: regex },
    ];
  }

  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const [enrollments, total] = await Promise.all([
    Enrollment.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNumber)
      .populate("userId", "fullName email"),
    Enrollment.countDocuments(filter),
  ]);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Enrollments fetched successfully",
    data: {
      enrollments,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber) || 1,
      },
    },
  });
});

const getEnrollmentById = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id).populate(
    "userId",
    "fullName email"
  );

  if (!enrollment) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Enrollment not found");
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Enrollment fetched successfully",
    data: { enrollment },
  });
});

const updateEnrollmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const enrollment = await Enrollment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  ).populate("userId", "fullName email");

  if (!enrollment) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Enrollment not found");
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Enrollment status updated successfully",
    data: { enrollment },
  });
});

const deleteEnrollment = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findByIdAndDelete(req.params.id);

  if (!enrollment) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Enrollment not found");
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Enrollment deleted successfully",
    data: {},
  });
});

module.exports = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
  deleteEnrollment,
};
