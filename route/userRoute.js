const express = require('express');
const router = express.Router();
const usermiddleare=require('../middleware/accoundvalidate');
const { UserRegister,UserLogin,userPost,getAllPost,getAllPostByUserId,userMutualPost,getAllFormPost,getAllFormPostByUserId,getSeachMutualpostUsingwantedLobby,getSeachMutualpostUsingDvision } = require('../controller/userController');


router.post('/register', UserRegister);
router.post("/login",UserLogin);
router.post('/post',usermiddleare,userPost);
router.get('/get-all-post',usermiddleare,getAllPost);
router.get('/get-post-by-user',usermiddleare,getAllPostByUserId);
router.post('/mutual-post',usermiddleare,userMutualPost);
router.get("/get-all-mutual-post",usermiddleare,getAllFormPost);
router.get("/get-all-mutual-post-byuser",usermiddleare,getAllFormPostByUserId);
router.get('/get-search/mutual-using-division',usermiddleare,getSeachMutualpostUsingDvision);
router.get('/get-search/mutual-using-wantedlobby',usermiddleare,getSeachMutualpostUsingwantedLobby);

module.exports = router;