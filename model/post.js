const mongoose = require("mongoose");

const postModel = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        thumnail: {
            type: String,
          
        },
        content: {
            type: String,
        }
    },
    {
        timestamps:true
    }
)

const Post = mongoose.model("post", postModel);
module.exports = Post;