const User = require("../model/user");
const TestYourSelf=require("../model/test_yourself/text_yourself");
const TestYourSelfQuestion=require("../model/test_yourself/testYourSelfQuestionModel");
const Quiz=require("../model/quiz/quizModel")
const DailyTask=require("../model/daily-taskModel")
const QuizQuestion=require("../model/quiz/quizquestions")
const userComplteteQuiz = async (req, res) => {
    const id=req.userId
    try {
      const response = await User.findById(id);
      if (!response) {
        return res.status(404).json({ success: false, message: 'user not found' });
      }
      response.quiz.push(req.body);
     
      await response.save();
      res.status(200).json({
        success: true,
        message: 'Quiz data added to user successfully',
        data: response
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
   
  };

  const userComplteteTest = async (req, res) => {
    const id=req.userId
    try {
      const response = await User.findById(id);
      if (!response) {
        return res.status(403).json({ success: false, message: 'user not found' });
      }
      response.test_yourself.push(req.body);
     
      await response.save();
      res.status(200).json({
        success: true,
        message: 'Test data added to user successfully',
        data: response
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
   
  };
  const userComplteteDailyTask = async (req, res) => {
    const id=req.userId
    try {
      const response = await User.findById(id);
      if (!response) {
        return res.status(403).json({ success: false, message: 'user not found' });
      }
      response.daily_task.push(req.body);
     
      await response.save();
      res.status(200).json({
        success: true,
        message: 'Test data added to user successfully',
        data: response
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
   
  };
  const getAllTest = async (req, res) => {
    try {
      const response = await TestYourSelf.find().populate("questions");
      if (!response?.length > 0) {
        return res
          .status(200)
          .json({ success: false, mesaage: "Test Not Found" });
      }
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
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
  const getAllDailyTask = async (req, res) => {
    try {
      const response = await DailyTask.find();
      if (!response?.length > 0) {
        return res
          .status(403)
          .json({ success: false, message: "No Daily Task Found" });
      }
      res.status(200).json(response);
    } catch (err) {
      res
        .status(500)
        .send({ success: false, message: "Inter Server Error", error: err });
    }
  };
  module.exports ={userComplteteQuiz,userComplteteTest,userComplteteDailyTask,
    getAllTest,
    getAllQuiz,
    getAllDailyTask
  }