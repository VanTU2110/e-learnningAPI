const Topic = require("../models/Topic");

exports.getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find();
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTopic = async (req, res) => {
    const { name, description } = req.body;
    try {
        const topic = new Topic({ name, description });
        await topic.save();
        res.status(201).json(topic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
