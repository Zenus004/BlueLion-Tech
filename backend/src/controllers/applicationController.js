const HTTP_STATUS = require("../constants/httpStatusCodes");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const Application = require("../models/Application");

const createApplication = asyncHandler(async (req, res) => {
  const { fullName, email, phone, course, qualification, city } = req.body;

  const application = await Application.create({
    userId: null,
    fullName: fullName.trim(),
    email: email.toLowerCase().trim(),
    phone: phone.trim(),
    course: course.trim(),
    qualification: qualification.trim(),
    city: city.trim(),
  });

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Application submitted successfully",
    data: { application },
  });
});

const getAllApplications = asyncHandler(async (req, res) => {
  const {
    search = "",
    status,
    course,
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
  if (course) filter.course = course;
  if (search) {
    const regex = new RegExp(search.trim(), "i");
    filter.$or = [
      { fullName: regex },
      { email: regex },
      { phone: regex },
      { qualification: regex },
      { city: regex },
    ];
  }

  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const [applications, total] = await Promise.all([
    Application.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNumber)
      .populate("userId", "fullName email"),
    Application.countDocuments(filter),
  ]);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Applications fetched successfully",
    data: {
      applications,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber) || 1,
      },
    },
  });
});

const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id).populate(
    "userId",
    "fullName email"
  );

  if (!application) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Application not found");
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Application fetched successfully",
    data: { application },
  });
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  ).populate("userId", "fullName email");

  if (!application) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Application not found");
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Application status updated successfully",
    data: { application },
  });
});

const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findByIdAndDelete(req.params.id);

  if (!application) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Application not found");
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Application deleted successfully",
    data: {},
  });
});

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
};
