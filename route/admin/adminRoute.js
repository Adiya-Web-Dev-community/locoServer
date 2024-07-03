const express = require('express');
const router = express.Router();
const {isAdmin}=require('../../middleware/rolebaseuserValidate');
const { UserRegister,UserLogin,getUser,getAllUsers,getUserById,UpdateUser,deleteUser} = require("../../controller/admin/adminController");


router.post('/register', UserRegister);
router.post("/login",UserLogin);
router.get("/get_myself",isAdmin,getUser);

router.get("/all-user",isAdmin,getAllUsers);
router.get("/getuser/:id",isAdmin,getUserById);
router.put("/update-user/:id",isAdmin,UpdateUser)
router.delete("/userDelete/:id",isAdmin,deleteUser)

module.exports = router;