const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const platformSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Platform name is already used"],
    },
    url: {
      type: String,
      validate: {
        validator: function (value) {
          return /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/.test(
            value
          );
        },
        message: "Invalid format URL",
      },
      required: [true, "Platform url is required"],
      unique: [true, "Platform URL is already used"],
    },
    iconUrl: {
      type: String,
      validate: {
        validator: function (value) {
          return /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/.test(
            value
          );
        },
        message: "Invalid format URL",
      },
      required: [true, "Icon url is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Platform = model("Platform", platformSchema);

module.exports = {
  Platform,
};
