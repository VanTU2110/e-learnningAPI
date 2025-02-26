const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    skill: { type: String, enum: ["Listening", "Speaking", "Reading", "Writing"], required: true },
    topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
    difficulty_level: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // Liên kết trực tiếp câu hỏi
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Lesson", LessonSchema);
