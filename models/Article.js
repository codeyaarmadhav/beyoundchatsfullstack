const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  url: String,
  content: String,
  publishedDate: String,
  isUpdated: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Article", articleSchema);
