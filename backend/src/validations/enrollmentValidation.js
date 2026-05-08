const { body, query, param } = require("express-validator");

const PROGRAM_OPTIONS = [
  "Junior Innovators",
  "Tech Explorers",
  "Pre-Professional",
  "Industry & Startup",
];
const DURATION_OPTIONS = ["3 Months", "6 Months"];
const STATUS_OPTIONS = ["pending", "reviewed", "approved", "rejected"];
const GRADE_BY_PROGRAM = {
  "Junior Innovators": "Grade 3-5",
  "Tech Explorers": "Grade 6-8",
  "Pre-Professional": "Grade 9-10",
  "Industry & Startup": "Grade 11-12",
};

const createEnrollmentValidation = [
  body("studentName").trim().notEmpty().withMessage("studentName is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("phone")
    .trim()
    .matches(/^[0-9+\-\s()]{8,20}$/)
    .withMessage("Valid phone is required"),
  body("grade").trim().notEmpty().withMessage("grade is required"),
  body("selectedProgram")
    .trim()
    .isIn(PROGRAM_OPTIONS)
    .withMessage(`selectedProgram must be one of: ${PROGRAM_OPTIONS.join(", ")}`),
  body("duration")
    .trim()
    .isIn(DURATION_OPTIONS)
    .withMessage(`duration must be one of: ${DURATION_OPTIONS.join(", ")}`),
  body("address").trim().notEmpty().withMessage("address is required"),
  body().custom((value) => {
    const selectedProgram = (value.selectedProgram || "").trim();
    const grade = (value.grade || "").trim();
    const expectedGrade = GRADE_BY_PROGRAM[selectedProgram];
    if (!expectedGrade) return true;
    if (grade !== expectedGrade) {
      throw new Error(
        `grade must be "${expectedGrade}" for selectedProgram "${selectedProgram}"`
      );
    }
    return true;
  }),
];

const adminEnrollmentsListValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("page must be >= 1"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be between 1 and 100"),
  query("status")
    .optional()
    .isIn(STATUS_OPTIONS)
    .withMessage(`status must be one of: ${STATUS_OPTIONS.join(", ")}`),
  query("selectedProgram")
    .optional()
    .isIn(PROGRAM_OPTIONS)
    .withMessage(
      `selectedProgram must be one of: ${PROGRAM_OPTIONS.join(", ")}`
    ),
  query("duration")
    .optional()
    .isIn(DURATION_OPTIONS)
    .withMessage(`duration must be one of: ${DURATION_OPTIONS.join(", ")}`),
  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("sortOrder must be asc or desc"),
];

const enrollmentIdValidation = [
  param("id").isMongoId().withMessage("Valid enrollment id is required"),
];

const updateEnrollmentStatusValidation = [
  ...enrollmentIdValidation,
  body("status")
    .trim()
    .isIn(STATUS_OPTIONS)
    .withMessage(`status must be one of: ${STATUS_OPTIONS.join(", ")}`),
];

module.exports = {
  createEnrollmentValidation,
  adminEnrollmentsListValidation,
  enrollmentIdValidation,
  updateEnrollmentStatusValidation,
};
