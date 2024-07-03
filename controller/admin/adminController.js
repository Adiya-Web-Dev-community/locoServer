const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../../model/user");

const jwt = require("jsonwebtoken");
const UserRegister = async (req, res) => {
  const { name, email, mobile, password, role } = req.body;
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
      mobile: mobile,
      password: hashPassword,
      role: role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password credentials" });
    }
    const token = jwt.sign(
      { _id: user._id, email: user?.email, role: user?.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      }
    );
    return res
      .cookie("authorization", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 240 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ success: true, message: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .select("-otp");
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "user Not Found" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
    try {
      const user = await User.find({role:"user"})
        .select("-password")
        .select("-otp");
      if (!user?.length>0) {
        return res
          .status(403)
          .json({ success: false, message: "user Not Found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  const getUserById = async (req, res) => {
    const {id}=req.params
    try {
      const user = await User.findById(id)
        .select("-password")
        .select("-otp");
      if (!user) {
        return res
          .status(403)
          .json({ success: false, message: "user Not Found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  const UpdateUser=async(req,res)=>{
    const {id}=req.params
    const data = req.body;
     try{
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
          ).select("-password");
      
          if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
          }
      
          res.status(202).send({success:true, message:"user Updated", data:updatedUser});
     }catch(err){
         res.status(500).json({
             success: false,
             message: err.message,
         });
     }
 }
 const deleteUser = async (req, res) => {
    try {
      const response = await User.findByIdAndDelete(req.params.id);
      if (response) {
        res.status(200).json({success:true, message: "User deleted" });
      } else {
        res.status(404).json({success:false, message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
module.exports = {getUser, UserRegister,UserLogin,getAllUsers,getUserById,UpdateUser,deleteUser } 