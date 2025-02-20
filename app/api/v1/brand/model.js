const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const brandSchema = Schema(
  {
    name: {
      type: String,
      unique: [true, "Name is already used"],
      required: [true, "Name is required"],
    },
    contact: {
      email: {
        type: String,
        required: [true, "Email contact is required"],
        validate: {
          validator: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          },
          message: "Invalid email format",
        },
      },
      phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^\+?\d{10,15}$/, "Invalid phone number format"],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Brand = model("Brand", brandSchema);

module.exports = { Brand };
