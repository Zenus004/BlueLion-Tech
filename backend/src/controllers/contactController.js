const HTTP_STATUS = require("../constants/httpStatusCodes");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const Contact = require("../models/Contact");

const createContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  const contact = await Contact.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    message: message.trim(),
  });

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Message sent successfully",
    data: { contact },
  });
});

const getAllContacts = asyncHandler(async (req, res) => {
  const {
    search = "",
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    createdFrom,
    createdTo,
  } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const filter = {};
  if (search) {
    const regex = new RegExp(search.trim(), "i");
    filter.$or = [{ name: regex }, { email: regex }, { message: regex }];
  }
  if (createdFrom || createdTo) {
    filter.createdAt = {};
    if (createdFrom) filter.createdAt.$gte = new Date(`${createdFrom}T00:00:00.000Z`);
    if (createdTo)   filter.createdAt.$lte = new Date(`${createdTo}T23:59:59.999Z`);
  }

  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const [contacts, total] = await Promise.all([
    Contact.find(filter).sort(sort).skip(skip).limit(limitNumber),
    Contact.countDocuments(filter),
  ]);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Contacts fetched successfully",
    data: {
      contacts,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber) || 1,
      },
    },
  });
});

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Contact not found");
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Contact fetched successfully",
    data: { contact },
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Contact not found");
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Contact deleted successfully",
    data: {},
  });
});

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
};
