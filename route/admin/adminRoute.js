const express = require('express');
const router = express.Router();
const {isAdmin}=require('../../middleware/rolebaseuserValidate');
const { UserRegister,UserLogin,getUser} = require("../../controller/admin/adminController");


router.post('/register', UserRegister);
router.post("/login",UserLogin);
router.get("/get_myself",isAdmin,getUser)


module.exports = router;