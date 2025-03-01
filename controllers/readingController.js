const ReadingPassage = require("../models/ReadingPassage");

// 🔹 Tạo bài đọc mới
exports.createReadingPassage = async (req, res) => {
    try {
        const newPassage = new ReadingPassage(req.body);
        await newPassage.save();
        res.status(201).json(newPassage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 🔹 Lấy danh sách tất cả bài đọc
exports.getAllReadingPassages = async (req, res) => {
    try {
        const passages = await ReadingPassage.find().populate("questions");
        res.json(passages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Lấy chi tiết một bài đọc (kèm danh sách câu hỏi)
exports.getReadingPassageById = async (req, res) => {
    try {
        const passage = await ReadingPassage.findById(req.params.id).populate("questions");
        if (!passage) return res.status(404).json({ message: "Passage not found" });
        res.json(passage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Cập nhật bài đọc
exports.updateReadingPassage = async (req, res) => {
    try {
        const updatedPassage = await ReadingPassage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPassage) return res.status(404).json({ message: "Passage not found" });
        res.json(updatedPassage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 🔹 Xóa bài đọc
exports.deleteReadingPassage = async (req, res) => {
    try {
        const deletedPassage = await ReadingPassage.findByIdAndDelete(req.params.id);
        if (!deletedPassage) return res.status(404).json({ message: "Passage not found" });
        res.json({ message: "Passage deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
