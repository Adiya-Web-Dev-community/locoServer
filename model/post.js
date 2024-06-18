const mongoose = require("mongoose");

const postModel = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
        thumnail: {
            type: String,
          
        },
        mediatype:{
            type:string,
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