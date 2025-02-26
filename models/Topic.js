const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Topic", TopicSchema);
