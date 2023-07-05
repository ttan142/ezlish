const mongoose = require("mongoose");

const flashcardSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    
    category: {
        type: String
       
    },
    question: {
        type: String
      
    },
    answer: {
        type:String
     
    }}
    );

module.exports = Flashcard = mongoose.model("Flashcard", flashcardSchema);