var mongoose = require("mongoose");

// COMMENTS SCHEMA
var commentSchema = mongoose.Schema({
  text: String,
  author: String
});


module.exports = mongoose.model("Comment", commentSchema);