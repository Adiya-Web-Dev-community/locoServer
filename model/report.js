const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  reportedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  reportedPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  reason: {
    type: String,
    required: true,
    enum: ["Spam", "Inappropriate Content", "Harassment", "Other"],
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Resolved"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);
