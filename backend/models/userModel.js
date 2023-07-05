const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,

    },
    password: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        default: 'user',
    },
    balance:{
        type: Number,
        default: 100,
    },
    googleId: {
        type: String
    },
    photo:{
        type: String, default: "https://drive.google.com/file/d/1OTRYhABkwuVFTmGVCMr831aPZq1lC4F4/view?usp=sharing"
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
}
    , {
        timestamps: true,
    });
/* nen bao password k chinh xac */
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = User = mongoose.model('User', userSchema);