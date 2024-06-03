const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true
        },
        mobile:{type:Number},
        password: {
            type: String,
        }
    }
)

const User = mongoose.model("user", userModel);
module.exports = User;