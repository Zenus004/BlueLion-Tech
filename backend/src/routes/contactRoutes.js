const express = require("express");
const {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
} = require("../controllers/contactController");
const { verifyAdmin } = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {
  createContactValidation,
  adminContactsListValidation,
  contactIdValidation,
} = require("../validations/contactValidation");

const { submissionLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/contacts", submissionLimiter, createContactValidation, validateRequest, createContact);

router.get(
  "/admin/contacts",
  verifyAdmin,
  adminContactsListValidation,
  validateRequest,
  getAllContacts
);

router.get(
  "/admin/contacts/:id",
  verifyAdmin,
  contactIdValidation,
  validateRequest,
  getContactById
);

router.delete(
  "/admin/contacts/:id",
  verifyAdmin,
  contactIdValidation,
  validateRequest,
  deleteContact
);

module.exports = router;
