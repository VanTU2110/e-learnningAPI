const Question = require("../models/Question");

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate("topic_id");
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createQuestion = async (req, res) => {
    const { content, question_type, skill, topic_id, difficulty_level, options } = req.body;
    try {
        const question = new Question({ content, question_type, skill, topic_id, difficulty_level, options });
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
