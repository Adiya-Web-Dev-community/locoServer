const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const UserRegister = async (req, res) => {
    const { name,email,mobile,password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            mobile:mobile,
            password:hashPassword
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data:newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const UserLogin = async (req, res) => {
    const { email,password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ _id: user._id, email:user?.email }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE_TIME,
        });
        return res
        .cookie("Authorization", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 240 * 60 * 60 * 1000),
        })
        .status(200)
        .json({ success: true, message: "Login successful",token:token });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = { UserRegister,UserLogin } 