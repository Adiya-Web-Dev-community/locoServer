const express = require("express");
const router = express.Router();
const { isAdmin } = require("../../middleware/rolebaseuserValidate");

const {CreatQuiz,UpdateQuiz,getAllQuiz,getSingleQuiz,deleteQuiz,CreatQuizQuestiond,deleteQuizQuestion,UpdateQuizQuestion}=require("../../controller/admin/quizController")
//Quiz
router.post("/quiz", isAdmin, CreatQuiz);
router.get("/quiz", isAdmin, getAllQuiz);
router.get("/quiz/:id", isAdmin, getSingleQuiz);
router.put("/quiz/:id", isAdmin, UpdateQuiz);
router.delete("/quiz/:id", isAdmin, deleteQuiz);


//Quiz Questions
router.post("/quiz/question", isAdmin, CreatQuizQuestiond);
router.post("/quiz/question/:id", isAdmin, UpdateQuizQuestion);
router.post("/quiz/question/:id", isAdmin, deleteQuizQuestion);

module.exports = router;
