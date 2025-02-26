const Lesson = require("../models/Lesson");

exports.getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find().populate("topic_id");
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createLesson = async (req, res) => {
    const { title, content, skill, topic_id, difficulty_level, questions } = req.body;
    try {
        const lesson = new Lesson({ title, content, skill, topic_id, difficulty_level, questions });
        await lesson.save();
        res.status(201).json(lesson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
