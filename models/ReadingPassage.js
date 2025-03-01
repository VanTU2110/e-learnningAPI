const mongoose = require("mongoose");

const ReadingPassageSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Tiêu đề bài đọc
    content: { type: String, required: true }, // Nội dung bài đọc
    topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" }, // Chủ đề
    difficulty_level: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // Danh sách câu hỏi liên quan
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ReadingPassage", ReadingPassageSchema);
