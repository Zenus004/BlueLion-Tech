const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    grade: {
      type: String,
      required: true,
      trim: true,
    },
    selectedProgram: {
      type: String,
      enum: [
        "Junior Innovators",
        "Tech Explorers",
        "Pre-Professional",
        "Industry & Startup",
      ],
      required: true,
    },
    duration: {
      type: String,
      enum: ["3 Months", "6 Months"],
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "enrollments",
  }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
