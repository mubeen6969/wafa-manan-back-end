const mongoose = require("mongoose");

const mediaItemSchema = new mongoose.Schema(
  { url: String, width: Number, height: Number },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: String,

    category: {
      type: String,
      enum: ["web-design", "app-design", "graphic-design", "logo-design"],
    },

    media: String,

    thumb: String,

    gallery: [mediaItemSchema],

    restricted: { type: Boolean, default: false }, // NEW — NDA-gated project

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);