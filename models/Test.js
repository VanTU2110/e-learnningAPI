const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    generated_at: { type: Date, default: Date.now },
    duration: { type: Number, required: true },
    difficulty_level: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // Liên kết câu hỏi trực tiếp
});

module.exports = mongoose.model("Test", TestSchema);
