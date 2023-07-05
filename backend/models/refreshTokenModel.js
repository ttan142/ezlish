
const mongoose = require("mongoose");


const RefreshTokenSchema = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    expiryDate: Date,
});

module.exports = RefreshToken = mongoose.model("Refreshtoken", RefreshTokenSchema);