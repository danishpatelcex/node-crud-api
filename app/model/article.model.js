const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
  title: String,
  description:String,
  url: String,
});

module.exports = mongoose.model("Article", ArticleSchema);