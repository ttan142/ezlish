const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  username: String,
  commentText: String,

  childComments: Array,
  createdAt: {
    type: Date,
    required: true,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
  },
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
/*
const CommentSchema = new mongoose.Schema({
  parentNodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default:null
  },userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isRootNode: Boolean,
  commentText: String,

  childComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    
    },
  ],
  
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
  },
});
*/
