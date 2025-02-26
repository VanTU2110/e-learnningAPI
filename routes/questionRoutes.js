const express = require("express");
const { getAllQuestions, createQuestion } = require("../controllers/questionController");
const router = express.Router();

router.get("/all", getAllQuestions);
router.post("/create", createQuestion);

module.exports = router;
