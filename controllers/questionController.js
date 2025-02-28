const mongoose = require("mongoose");
const Question = require("../models/Question");

// Lấy danh sách tất cả câu hỏi
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate("topic_id");
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy chi tiết một câu hỏi theo ID
exports.getQuestionById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Question ID" });
    }

    try {
        const question = await Question.findById(id).populate("topic_id");
        if (!question) return res.status(404).json({ message: "Question not found" });
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo mới một câu hỏi
exports.createQuestion = async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật một câu hỏi
exports.updateQuestion = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Question ID" });
    }

    try {
        const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedQuestion) return res.status(404).json({ message: "Question not found" });
        res.json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa một câu hỏi
exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Question ID" });
    }

    try {
        const deletedQuestion = await Question.findByIdAndDelete(id);
        if (!deletedQuestion) return res.status(404).json({ message: "Question not found" });
        res.json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Kiểm tra đáp án của người dùng
exports.checkAnswer = async (req, res) => {
    const { id } = req.params;
    const { user_answer } = req.body; // Đáp án của người dùng

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Question ID" });
    }

    try {
        const question = await Question.findById(id);
        if (!question) return res.status(404).json({ message: "Question not found" });

        let isCorrect = false;

        switch (question.question_type) {
            case "Multiple Choice":
            case "True/False":
                isCorrect = question.options.some(option => option.content === user_answer && option.is_correct);
                break;

            case "Fill in the Blank":
            case "Short Answer":
                isCorrect = Array.isArray(question.correct_answer)
                    ? question.correct_answer.includes(user_answer.trim())
                    : user_answer.trim() === question.correct_answer.trim();
                break;

            case "Sentence Ordering":
                isCorrect = user_answer.trim() === question.correct_answer.trim();
                break;

            default:
                return res.status(400).json({ message: "This question type cannot be auto-graded." });
        }

        res.json({ isCorrect, correct_answer: question.correct_answer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
