const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const taskSchema = Schema(
  {
    postTitle: {
      type: String,
      required: [true, "Post title is required"],
      minlength: [3, "Post title shorter than 3 chars is not allowed"],
      maxlength: [50, "Post title longer than 50 chars is not allowed"],
    },
    description: {
      type: String,
      default: "",
    },
    brandId: {
      type: mongoose.Types.ObjectId,
      required: [true, "Brand ID is required"],
      ref: "Brand",
    },
    platformId: {
      type: mongoose.Types.ObjectId,
      required: [true, "Platform ID is required"],
      ref: "Platform",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending"
    },
    isRequiresPayment: {
      type: Boolean,
      required: [true, "Payment requiring status is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);

module.exports = { Task };
