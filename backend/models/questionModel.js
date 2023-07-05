const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
  {
    question: {
      type: Number,
    },
    test: {
      type: String,
    },
    options: [
      {
        type: String,
      },
    ],
    answer: {
      type: String,
    },
    explain: {
      type: String,
    },
    content: {
      type: String,
    },
    upload: {
      type: String,
    },
    part: {
      type: Number,
    },
    types: {
      type: String,
    },

    questions: [
      {
        question: {
          type: Number,
        },
        options: [
          {
            type: String,
          },
        ],
        answer: {
          type: String,
        },
        content: {
          type: String,
        }
       
      },
    ],
  },
  {
    timestamps: true,
  }
);


const groupQuestionSchema = mongoose.Schema({
    content:{
      type:String
    },
    upload:{
        type:String
    },
    test:{
      type:String
  },
    part:{
        type:Number
    },types:{
        type: String, default: "group"
    },question:{
        type:Number
    },
    

    questions:[{question: {
        type: Number

    },
    options: [{
        type: String
    }]
    , answer: {
        type: String
    },question:{
        type:Number
    },content:{
        type:String
    }
    }]
}, {
    timestamps: true,
});


module.exports = Question = mongoose.model('Question', questionSchema);
