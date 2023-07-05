
const asyncHandler = require("express-async-handler");
const express = require("express");
const Comment = require("../models/commentModel");
const mongoose = require('mongoose')

exports.getAllComments = asyncHandler(async (req, res) => {
 
  const comments = await Comment.find({
    'testId': mongoose.Types.ObjectId(req.query.testId),
  });
  
  if (comments) {
    res.json(arrayToObject(comments,'_id'));
  } else {
    res.status(404).json({ message: "Test not found" });
    throw new Error("Test not found");
  }
});


exports.saveComment = asyncHandler(async (req, res) => {
    const  {testId,childComments,parentNodeId,isRootNode,commentText,userId}    =req.body
  
    const comment = await Comment.create({
      testId,
      childComments,
      parentNodeId,
      isRootNode,
      commentText,
      userId
    });
    if(parentNodeId != null){
      const parent = await Comment.findById(mongoose.Types.ObjectId(parentNodeId));
 
   
    parent.childComments.push(comment._id);
      await parent.save();
    }
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: "Test not found" });
    throw new Error("Test not found");
  }
});


const arrayToObject = (arr, key) => {
  return arr.reduce((obj, item) => {
    obj[item[key]] = item;
    return obj;
  }, {});
};

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

exports.getComments = asyncHandler(async (req, res) => {
  try {
    const features = new APIfeatures(
      Comment.find({ testId: req.params.testId }),
      req.query
    )
      .sorting()
      .paginating();

    const comments = await features.query;

    res.json({
      status: "success",
      result: comments.length,
      comments,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});