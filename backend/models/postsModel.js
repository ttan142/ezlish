const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        categories: {
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
            default: 'Internet',
        },
        image: {
            type: String,
        },
        createAt: {
            type: Date,
            default: new Date(),
        }
    }
) 

module.exports = Post = mongoose.model('Post', postSchema);