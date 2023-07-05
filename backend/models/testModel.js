const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    name: {
        type: String
      
    },
    test: {
        type:String
     
    },
    tag: {
        type: String
       
    },
    
    part: {
        type: Number
    },
      time: {
        type:Number
    }, 
    numberQuestion: {
        type: Number
    },audio:{
        type:String
    },
    question: [
        {
            _id: {
              
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question'
              
            }
          }
    ]
}, {
    timestamps: true,
});

module.exports = Test = mongoose.model('Test', testSchema);