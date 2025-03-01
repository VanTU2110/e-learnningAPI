const express = require("express");
const { 
    createQuestion, getAllQuestions, getQuestionsByPassage, getStandaloneQuestions, 
    updateQuestion, deleteQuestion 
} = require("../controllers/questionController");

const router = express.Router();

router.post("/create", createQuestion);
router.get("/all", getAllQuestions);
router.get("/passage/:passage_id", getQuestionsByPassage);
router.get("/standalone", getStandaloneQuestions);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

module.exports = router;
