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