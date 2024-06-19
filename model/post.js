const mongoose = require("mongoose");

const postModel = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
        thumnail: {
            type: String,
          
        },
        mediatype:{
            type:String,
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