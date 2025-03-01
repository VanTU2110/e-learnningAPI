const Question = require("../models/Question");
const ReadingPassage = require("../models/ReadingPassage");

// 🔹 Tạo câu hỏi mới (Có hoặc không có bài đọc)
exports.createQuestion = async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();

        // Nếu câu hỏi thuộc bài đọc, cập nhật vào bài đọc
        if (newQuestion.passage_id) {
            await ReadingPassage.findByIdAndUpdate(newQuestion.passage_id, {
                $push: { questions: newQuestion._id }
            });
        }

        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 🔹 Lấy danh sách tất cả câu hỏi
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate("passage_id");
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Lấy câu hỏi theo bài đọc
exports.getQuestionsByPassage = async (req, res) => {
    try {
        const questions = await Question.find({ passage_id: req.params.passage_id }).populate("passage_id");
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Lấy câu hỏi KHÔNG thuộc bài đọc
exports.getStandaloneQuestions = async (req, res) => {
    try {
        const questions = await Question.find({ passage_id: null });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Cập nhật câu hỏi
exports.updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuestion) return res.status(404).json({ message: "Question not found" });
        res.json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 🔹 Xóa câu hỏi
exports.deleteQuestion = async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) return res.status(404).json({ message: "Question not found" });

        // Nếu câu hỏi thuộc bài đọc, xóa khỏi danh sách câu hỏi trong bài đọc
        if (deletedQuestion.passage_id) {
            await ReadingPassage.findByIdAndUpdate(deletedQuestion.passage_id, {
                $pull: { questions: deletedQuestion._id }
            });
        }

        res.json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
