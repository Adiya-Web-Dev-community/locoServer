
const Quiz=require("../../model/quiz/quizModel")
const QuizQuestion=require("../../model/quiz/quizquestions")
const CreatQuiz = async (req, res) => {
    try {
      const response = await Quiz.create(req.body);
      if (response) {
        res
          .status(201)
          .json({ success: true, data: response, message: "Quiz Created" });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Quiz not Created" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const UpdateQuiz = async (req, res) => {
    try {
      const response = await Quiz.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (response) {
     return   res.status(200).json({
          success: true,
          data: response,
          message: "Quiz Updated",
        });
      } else {
       return res.status(404).json({ success: false, message: "Quiz not found" });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  const getAllQuiz = async (req, res) => {
    try {
      const response = await Quiz.find().populate("questions");
      if (!response?.length > 0) {
        return res
          .status(200)
          .json({ success: false, mesaage: "Quiz Not Found" });
      }
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const getSingleQuiz = async (req, res) => {
    const {id}=req.params
    try {
      const response = await Quiz.findById(id).populate("questions");
      if (!response) {
        return res
          .status(200)
          .json({ success: false, mesaage: "Quiz Not Found" });
      }
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const deleteQuiz = async (req, res) => {
    try {
      const response = await Quiz.findByIdAndDelete(req.params.id);
      if (response) {
        res
          .status(200)
          .json({ success: true, message: "Quiz deleted" });
      } else {
        res.status(404).json({ success: false, message: "Quiz not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const CreateQuizQuestions = async (req, res) => {
    const { quizId } = req.params;
  
    try {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ success: false, message: "Quiz Not Found" });
      }
  
      const question = await QuizQuestion.create(req.body);
      if (!question) {
        return res.status(400).json({ success: false, message: "Quiz Question not Created" });
      }
  
      quiz.questions.push(question._id);
      await quiz.save();
  
      res.status(201).json({ success: true, data: question, message: "Quiz Question Created" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  const getSingleQuizQuestions = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await QuizQuestion.findById(id);
      if (!response) {
        return res
          .status(403)
          .json({ success: false, message: "Question Not Found" });
      }

      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  const UpdateQuizQuestion = async (req, res) => {
    try {
      const response = await QuizQuestion.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (response) {
     return   res.status(200).json({
          success: true,
          data: response,
          message: "Quiz Updated",
        });
      } else {
       return res.status(404).json({ success: false, message: "Quiz not found" });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  const deleteQuizQuestion = async (req, res) => {
    try {
      const response = await QuizQuestion.findByIdAndDelete(req.params.id);
      if (response) {
        res
          .status(200)
          .json({ success: true, message: "Quiz deleted" });
      } else {
        res.status(404).json({ success: false, message: "Quiz not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports = {
    CreatQuiz,
    UpdateQuiz,
    getAllQuiz,
    getSingleQuiz,
    deleteQuiz,
    CreateQuizQuestions,
    UpdateQuizQuestion,
    deleteQuizQuestion,
    getSingleQuizQuestions
  };