const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    fullName: {
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
    course: {
      type: String,
      enum: ["B.Tech", "BCA", "BSc IT", "BBA"],
      required: true,
    },
    qualification: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected", "contacted"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "applications",
  }
);

module.exports = mongoose.model("Application", applicationSchema);
