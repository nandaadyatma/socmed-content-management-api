const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "User name shorter than 3 chars is not allowed"],
      maxlength: [50, "User name longer than 50 chars is not allowed"],
    },
    email: {
      type: String,
      unique: [true, "Email already used"],
      required: [true, "Email is required"],
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address format",
      },
    },
    password: {
      type: String,
      inlength: [6, "password shorter than 6 chars is not allowed"],
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["Super admin", "Admin"],
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = model("User", userSchema);

module.exports = {
  User,
};
