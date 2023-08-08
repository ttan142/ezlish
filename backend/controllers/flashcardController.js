const { request } = require("express");
const asyncHandler = require("express-async-handler");
const Flashcard = require("../models/flashcardModel");
const mongoose = require("mongoose");
exports.getAllFlashcard = asyncHandler(async (req, res) => {
 
    const flashcards = await Flashcard.find().exec();
    res.send(flashcards)}
    );
exports.addFlashcard = asyncHandler(async (req, res) => {
 
    const  {category,question,answer}    =req.body
  
    const flashcard = await Flashcard.create({
      category,
      question,
      answer
    })
  if (flashcard) {
    res.json(flashcard);
  } else {
    res.status(404).json({ message: "Test not found" });
    throw new Error("Test not found");
  }
});

exports.getCategoryFlashcard = asyncHandler(async (req, res) => {
 
    const flashcards = await Flashcard.distinct("category").exec();
    res.send(flashcards)}
    );
   
      
exports.findFlashcardByCategory = asyncHandler(async (req, res) => {
    const filter = { "category": { "$regex": req.params.category, "$options": "i" } };

    const flashcards = await Flashcard.find(filter);
console.log(flashcards);
    if (flashcards) {
    res.json(flashcards);

    } else {
    res.status(404).json({ message: "Test not found" });
    throw new Error('Test not found');
    }
    })

    // @desc    Update flashcard information
// @route   PUT /api/flashcards/:id
// @access  Private
exports.updateFlashcard = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;
  const { id } = req.params;

  try {
    const flashcard = await Flashcard.findById(id);

    if (!flashcard) {
      res.status(404).json({ message: 'Flashcard not found' });
      return;
    }

    // Update the flashcard information
    flashcard.question = question || flashcard.question;
    flashcard.answer = answer || flashcard.answer;
    const updatedFlashcard = await flashcard.save();

    res.json(updatedFlashcard);
  } catch (error) {
    console.error('Error updating flashcard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @desc    Delete a flashcard
// @route   DELETE /api/flashcards/:id
// @access  Private (admin only)
exports.deleteFlashcard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const flashcard = await Flashcard.findById(id);

    if (!flashcard) {
      res.status(404).json({ message: 'Flashcard not found' });
      return;
    }

    await flashcard.remove();
    res.json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    console.error('Error deleting flashcard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
