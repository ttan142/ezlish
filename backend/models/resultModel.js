const mongoose = require("mongoose");
const ResultSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
    },
    answer: [{
        type: String
    }], 
    correct: [{
        type: Number
    }],
    finishDate: Date,
    time: String
});
module.exports = TestResult = mongoose.model("TestResult", ResultSchema);

