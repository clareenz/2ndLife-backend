const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  shopId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["read", "unread"],
    default: "unread",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
