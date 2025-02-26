const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    content: { type: String, required: true },
    question_type: { 
        type: String, 
        enum: ["Multiple Choice", "True/False", "Short Answer", "Essay", "Listening"], 
        required: true 
    },
    skill: { type: String, enum: ["Listening", "Speaking", "Reading", "Writing"], required: true },
    topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
    difficulty_level: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    audio_url: { type: String }, // Dùng cho câu hỏi Listening
    correct_answer: { type: mongoose.Schema.Types.Mixed }, // Dùng cho Short Answer, Essay, Listening
    options: [
        {
            content: { type: String },
            is_correct: { type: Boolean },
        }
    ], // Dùng cho Multiple Choice và True/False
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", QuestionSchema);
