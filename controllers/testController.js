const Test = require("../models/Test");

exports.getAllTests = async (req, res) => {
    try {
        const tests = await Test.find();
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTest = async (req, res) => {
    const { title, duration, difficulty_level, questions } = req.body;
    try {
        const test = new Test({ title, duration, difficulty_level, questions });
        await test.save();
        res.status(201).json(test);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
