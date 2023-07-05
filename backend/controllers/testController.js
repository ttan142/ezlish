const asyncHandler = require('express-async-handler');
const Test = require('../models/testModel');
const Question = require('../models/questionModel')
const mongoose = require("mongoose");


exports.addQuestionToTest = async (req, res) => {
  const { questionId } = req.params;
  const filter = { "_id": "649accbfa24f29a1e09bb8fd" };

  try {
    // Find the test by ID
    const test = await Test.findById(filter._id);
  
    // Convert the questionId to ObjectId
    const questionObjectId = mongoose.Types.ObjectId(questionId);

    // Add the question ID to the question array in the test
    test.question.push(questionObjectId);

    // Save the updated test
    await test.save();

    res.status(200).json({ message: 'Question added to test successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create a new test with questions
// @route   POST /api/tests
// @access  Public
exports.createTest = asyncHandler(async (req, res) => {
  const {
    name,
    questions,
    tag,
    part,
    time,
    numberQuestion,
    audio,
  } = req.body;

  // Create a new test object
  const test = new Test({
    name,
    questions,
    tag,
    part,
    time,
    numberQuestion,
    audio,
  });

  // Save the test to the database
  const createdTest = await test.save();

  res.status(201).json(createdTest);
});


exports.getAllTestNames = asyncHandler(async (req, res) => {
  const tests = await Test.find()().exec();
  const testNames = tests.map((test) => test.name);
  res.send(tests);
});
 
    
exports.findTestByName = asyncHandler(async (req, res) => {
  const filter = { "name": { $regex: req.params.name, "$options": "i" } };

  const tests = await Test.find(filter);
console.log(tests);
  if (tests) {
  res.json(tests);

  } else {
  res.status(404).json({ message: "Test not found" });
  throw new Error('Test not found');
  }
  })

const TestResult = require("../models/resultModel");
// @desc    Fetch all toeic test
// @route   GET /api/tests/toeic
// @access  Public

exports.getToeicInfo = asyncHandler(async (req, res) => {
    const filter = { "tag": { "$regex": "ETS TOEIC 2021", "$options": "i" }, "test": { "$in": ["1", "2", "3"] } };
    const test = await Test.find(filter);
    console.log(test);
    if (test) {
        res.json(test);
       
    } else {
        res.status(404).json({message:"Test not found"});
        throw new Error('Test not found');
    }
})


// @desc    Fetch all ielts test
// @route   GET /api/tests/ielts
// @access  Public
exports.getIeltsInfo = asyncHandler(async (req, res) => {
    const filter = { "tag": { "$regex": "Cam IELTS ", "$options": "i" } };

    const test = await Test.find(filter);
    console.log(test);
    if (test) {
        res.json(test);

    } else {
        res.status(404).json({ message: "Test not found" });
        throw new Error('Test not found');
    }
})


// @desc    Fetch all test
// @route   GET /api/tests/
// @access  Public
exports.getAllTest = asyncHandler(async (req, res) => {

  const test = await Test.find();
  console.log(test);
  if (test) {
    res.json(test);
  } else {
    res.status(404).json({ message: "Test not found" });
    throw new Error("Test not found");
  }
});



exports.getTestByResult = asyncHandler(async (req, res) => {
  const resultId = req.params.resultId;
  const test = await TestResult.aggregate([
    {
      $match: {
        _id: resultId,
      },
    },
    {
      $project: {
        test: 1,
      },
    },
    {
      $lookup: {
        from: "tests",
        localField: "test",
        foreignField: "_id",
        as: "result",
      },
    },
    {
      $unwind: {
        path: "$result",
      },
    },
    {
      $project: {
        result: {
          question: 0,
        },
      },
    },
  ]);
  
  if (test) {
    res.json(test);
  } else {
    res.status(404).json({ message: "Test not found" });
    throw new Error("Test not found");
  }
});