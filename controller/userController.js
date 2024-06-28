const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../model/user");
const Post=require('../model/post');
const Mutual=require('../model/mutual');
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
                .json({ success: false, message: "Invalid Email credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid Password credentials" });
        }
        const token = jwt.sign({ _id: user._id, email:user?.email }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE_TIME,
        });
        return res
        .cookie("authorization", token, {
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
    const getUser=async(req,res)=>{
        try{
            const user = await User.findById(req.userId).select("-password").select("-otp");
            if(!user){
                return res
            .status(403)
            .json({ success: false,message:"user Not Found" });
            }
            return res
            .status(200)
            .json({ success: true,data:user });
        }catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
const userPost= async(req,res)=>{
const { thumnail,content,mediatype } = req.body;

    try{
const newPost = new Post({
    thumnail: thumnail,
    mediatype:mediatype,
    content: content,
    user:req.userId
});

await newPost.save();
res.status(201).json({
    success: true,
    message: "post created successfully",
    data:newPost
});
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
const getAllPost=async(req,res)=>{
    try{
        const response=await Post.find() .populate({
            path: 'user',
            select: '-password -otp'
          });
        if(!response.length>0){
            return res
                .status(404)
                .json({ success: false, message: "Data Not Found" });
        }
        res.status(200).json({
            success: true,
            message: "get post Successfully",
            data:response
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
const getAllPostByUserId=async(req,res)=>{
   const userId= req.userId
    try{
        const response=await Post.find({user:userId});
        console.log("lengthof datah",response?.length)
        if(!response.length>0){
            return res
                .status(404)
                .json({ success: false, message: "Data Not Found" });
        }
        res.status(200).json({
            success: true,
            message: "get post Successfully",
            data:response
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
const userMutualPost = async (req, res) => {
  const { name, email, mobile, currentdivision, designation,currentlobby,wantedlobby,wanteddivision } = req.body;
  const newMutual = new Mutual({
    userId: req.userId,
    name: name,
    email: email,
    mobile: mobile,
    currentdivision: currentdivision,
    designation: designation,
    currentlobby:currentlobby,
    wantedlobby:wantedlobby,
    wanteddivision:wanteddivision,
  });

  await newMutual.save();
  res.status(201).json({
    success: true,
    message: "post created successfully",
    data: newMutual,
  });
  try {
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getAllFormPost=async(req,res)=>{
    try{
        const response=await Mutual.find();
        if(!response.length>0){
            return res
                .status(404)
                .json({ success: false, message: "Data Not Found" });
        }
        res.status(200).json({
            success: true,
            message: "get post Successfully",
            data:response
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
const getAllFormPostByUserId=async(req,res)=>{
   const userId= req.userId
    try{
        const response=await Mutual.find({userId:userId});
    
        if(!response.length>0){
            return res
                .status(404)
                .json({ success: false, message: "Data Not Found" });
        }
        res.status(200).json({
            success: true,
            message: "get post Successfully",
            data:response
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
const escapeRegex = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
  };
const getSeachMutualpostUsingDvision=async(req,res)=>{
    const { search } = req.query;
     try{
        if (!search || search.trim() === "") {
            return res.send({ success: false, message: "Search query cannot be empty" });
          }
        const escapedSearch = escapeRegex(search);
        const searchRegex = new RegExp(`^${escapedSearch}`, 'i');
        const response = await Mutual.find({
            $or: [
              { currentdivision: searchRegex }
            ]
          });
     
         if(!response.length>0){
             return res
                 .status(404)
                 .json({ success: false, message: "Data Not Found" });
         }
         res.status(200).json({
             success: true,
             message: "get post Successfully",
             data:response
         });
     }catch(err){
         res.status(500).json({
             success: false,
             message: err.message,
         });
     }
 }
 const getSeachMutualpostUsingwantedLobby=async(req,res)=>{
    const { search } = req.query;
     try{
        if (!search || search.trim() === "") {
            return res.send({ success: false, message: "Search query cannot be empty" });
          }
        const escapedSearch = escapeRegex(search);
        const searchRegex = new RegExp(`^${escapedSearch}`, 'i');
        const response = await Mutual.find({
            $or: [
              { currentlobby: searchRegex }
            ]
          });
     
         if(!response.length>0){
             return res
                 .status(404)
                 .json({ success: false, message: "Data Not Found" });
         }
         res.status(200).json({
             success: true,
             message: "get post Successfully",
             data:response
         });
     }catch(err){
         res.status(500).json({
             success: false,
             message: err.message,
         });
     }
 }
 const UpdateUserProfile=async(req,res)=>{
    const id=req.userId
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

module.exports = {getUser, UserRegister,UserLogin,userPost,getAllPost,getAllPostByUserId,userMutualPost,getAllFormPost,getAllFormPostByUserId,getSeachMutualpostUsingDvision,getSeachMutualpostUsingwantedLobby,UpdateUserProfile } 