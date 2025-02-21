const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const paymentSchema = Schema(
  {
    taskId: {
      type: mongoose.Types.ObjectId,
      unique: [true, "Payment already exist with this task ID"],
      required: [true, "taskId is required"],
      ref: "Task",

    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    currency: {
      type: String,
      default: "IDR",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    method: {
      type: String,
      enum: ["cash", "bank_transfer"],
    },
    paymentDate: {
      type: Date,
      required: [true, "Payment date is required"]
    },
  },
  {
    timestamps: true,
  }
);

const Payment = model("Payment", paymentSchema);

module.exports = {
  Payment,
};
