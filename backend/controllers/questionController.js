const { request } = require("express");
const asyncHandler = require("express-async-handler");
const Question = require("../models/questionModel");

const Test = require("../models/testModel");

const mongoose = require("mongoose");
// @desc    Fetch all question
// @route   GET /api/questions
// @access  Public


// @desc    Create a new question and associate it with a test
// @route   POST /api/questions
// @access  Public
exports.createQuestion = asyncHandler(async (req, res) => {
  const { question, test, options, answer, explain, content, upload, part, types } = req.body;

  // Create a new question object
  const newQuestion = new Question({
    question,
    test,
    options,
    answer,
    explain,
    content,
    upload,
    part,
    types,
    
  });


  // Save the question to the database
  const createdQuestion = await newQuestion.save();

  // Find the corresponding test and update its 'question' field with the new question's _id
  try {
    // Update the Question collection
    const updatedQuestion = await Question.findOneAndUpdate(
      { _id: createdQuestion._id },
      { $set: { test: createdQuestion.test } },
      { new: true }
    );
  
    if (updatedQuestion) {
      console.log(updatedQuestion);
      console.log(updatedQuestion.id);
      console.log(updatedQuestion.test);
      // The question document has been successfully updated
    } else {
      // The question document was not found
      console.log("Question not found");
    }
  
    // Update the Test collection
   const updatedTest = await Test.findOneAndUpdate(
    { _id: createdQuestion.test },
    {
      $push: {
        question: {
          _id:  mongoose.Types.ObjectId(createdQuestion._id) 
   
        }
      }
    },
    { new: true }
  )
  
    if (updatedTest) {
      console.log(updatedTest);
      console.log(updatedTest._id);
      // The test document has been successfully updated
    } else {
      // The test document was not found
      console.log("Test not found");
    }
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
  
  

  res.status(201).json(createdQuestion);
});


exports.getQuestion = asyncHandler(async (req, res) => {
  const test2 = await Test.aggregate([
  {
    '$match': {
      '_id': mongoose.Types.ObjectId(req.params.testId)
    }
  }, {
    '$lookup': {
      'from': 'questions', 
      'localField': 'question._id', 
      'foreignField': '_id', 
      'as': 'result'
    }
  }
]);

  if (test2) {

    const s = test2[0].result.sort((a, b) =>
      a.question > b.question ? 1 : -1
    );
    
    const grouped = groupBy(s, (item) => item.part);
    const z = new Map([...grouped.entries()].sort());

    const answer = [...z.values()];
    console.log(answer);

    const arr = [];
    for (const key of z.keys()) {
      arr.push(key);
    }

    const array = [];

    for (let i = 0; i < answer.length; i++) {
      var sum = 0;

      const part = answer[i]; // this an array
      part.forEach((element) => {
        if (element.types === "normal") {
          sum++;
        } else sum += element.questions.length;
      });
      array.push({ part: arr[i], numberQuestion: sum });
    }

    res.json({ answer, array });
  } else {
    res.status(404).json({ message: "Question not found" });
    throw new Error("Question not found");
  }
});



function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
