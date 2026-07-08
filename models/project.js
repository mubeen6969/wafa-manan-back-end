const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,

    category: {
      type: String,
      enum: [
        "web-design",
        "app-design",
        "graphic-design",
        "logo-design",
      ],
    },

    media: String,

    thumb: String,

    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Project",
  projectSchema
);