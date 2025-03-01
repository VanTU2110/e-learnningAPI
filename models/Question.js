const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    passage_id: { type: mongoose.Schema.Types.ObjectId, ref: "ReadingPassage", default: null }, // Không bắt buộc
    content: { type: String, required: true },
    content: { type: String, required: true }, // Nội dung câu hỏi
    question_type: { 
        type: String, 
        enum: [
            "Multiple Choice", "Fill in the Blank", "Matching", "True/False", "Short Answer", 
            "Speaking", "Reading", "Writing", "Listening", "Sentence Ordering", "Essay", "Letter", "Summary", "Chart Description"
        ], 
        required: true 
    },
    skill: { type: String, enum: ["Listening", "Speaking", "Reading", "Writing"], required: true },
    topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
    difficulty_level: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },

    // Dành cho Listening
    audio_url: { type: String }, // Đường dẫn file âm thanh

    // Dành cho câu hỏi trắc nghiệm (Multiple Choice, True/False)
    options: [
        {
            content: { type: String },
            is_correct: { type: Boolean },
        }
    ],

    // Dành cho Matching (Nối các ý)
    matching_pairs: [
        {
            left: { type: String }, // Câu hỏi
            right: { type: String } // Đáp án nối
        }
    ],

    // Dành cho Speaking
    speaking_config: {
        sample_text: { type: String }, // Đoạn văn cần đọc
        recording_required: { type: Boolean } // Có cần thu âm hay không
    },

    // Dành cho Writing
    writing_config: {
        word_limit: { type: Number }, // Giới hạn số từ
        required_format: { type: String } // "Essay", "Letter", "Summary", "Sentence Completion", "Chart Description"
    },

    // Dành cho Fill in the Blank, Short Answer
    correct_answer: { type: mongoose.Schema.Types.Mixed }, // Có thể là mảng hoặc chuỗi

    // Dành cho Sentence Ordering (Sắp xếp đúng thứ tự)
    shuffled_words: [{ type: String }],

    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", QuestionSchema);
