const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        image:{
            type:String,
        },
        email: {
            type: String,
            required: true
        },
        mobile:{type:Number},
        password: {
            type: String,
        },
        isVerify:{
            type:Boolean,
            default:false
        },
        otp:{
            type:Number
        }
    },
    {
        timestamps:true
    }
)

const User = mongoose.model("user", userModel);
module.exports = User;