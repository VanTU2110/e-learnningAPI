const express = require("express");
const { 
    getAllQuestions, 
    getQuestionById, 
    createQuestion, 
    updateQuestion, 
    deleteQuestion,
    checkAnswer
} = require("../controllers/questionController");

const router = express.Router();

router.get("/all", getAllQuestions);
router.get("/:id", getQuestionById);
router.post("/create", createQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);
router.post("/:id/check", checkAnswer); // Kiểm tra đáp án của người dùng

module.exports = router;
