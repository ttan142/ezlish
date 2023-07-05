const Exam = require('../models/examModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

// @desc    Get all exams
// @route   GET /api/exams
// @access  Public
exports.getAllExam = asyncHandler(async (req, res) => {
  const exams = await Exam.find().exec();
  res.send(exams);
});

// @desc    Get a single exam
// @route   GET /api/exams/:id
// @access  Public
exports.getExam = asyncHandler(async (req, res) => {
  const filter = {
    $and: [
      { name: { $regex: req.params.name, $options: "i" } },
      { category: { $regex: req.params.category, $options: "i" } }
    ]
  }
  const flashcards = await Exam.find(filter);
console.log(flashcards);
  if (flashcards) {
  res.json(flashcards);

  } else {
  res.status(404).json({ message: "Test not found" });
  throw new Error('Test not found');
  }
  })

exports.getExistExam = asyncHandler(async (req, res) => {
  const { name, category } = req.query;

  try {
    const exam = await Exam.findOne({ name, category });

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json(exam);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// @desc    Create or update an exam
// @route   POST /api/exams
// @access  Public
exports.createExam = asyncHandler(async (req, res) => {
  const { name, category, questions } = req.body;

  try {
    const existingExam = await Exam.findOne({ name, category });

    if (existingExam) {
      // Update the existing exam
      existingExam.questions.push(
        ...questions.map(question => ({
          question: question.text,
          choices: question.options.map(option => ({
            option: option.text,
            isCorrect: option.isCorrect || false,
          })),
        }))
      );

      const updatedExam = await existingExam.save();
      res.json(updatedExam);
    } else {
      // Create a new exam
      const exam = await Exam.create({
        name,
        category,
        questions: questions.map(question => ({
          question: question.text,
          choices: question.options.map(option => ({
            option: option.text,
            isCorrect: option.isCorrect || false,
          })),
        })),
      });

      res.status(201).json(exam);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc    Delete an exam
// @route   DELETE /api/exams/:id
// @access  Public
exports.deleteExam = asyncHandler(async (req, res) => {
  try {
    const exam = await Exam.findByIdAndRemove(req.params.id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json({ message: 'Exam removed' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});



// @desc    Update an exam
// @route   PUT /api/exams/:id
// @access  Public
exports.updateExam = async (req, res) => {
  try {
    const { name, category, questions } = req.body;

    const filter = {
      name: { $regex: req.params.name, $options: "i" },
      category: { $regex: req.params.category, $options: "i" }
    };

    const exam = await Exam.findOne(filter);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    exam.name = name;
    exam.category = category;
    exam.questions = questions.map(question => ({
      question: question.text,
      choices: question.options.map(option => ({
        option: option.text,
        isCorrect: option.isCorrect || false,
      })),
    }));

    const updatedExam = await exam.save();

    res.json(updatedExam);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};




// @desc    Delete an exam
// @route   DELETE /api/exams/:id
// @access  Public
exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndRemove(req.params.id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json({ message: 'Exam removed' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
