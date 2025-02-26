const express = require("express");
const { getAllTopics, createTopic } = require("../controllers/topicController");
const router = express.Router();

router.get("/all", getAllTopics);
router.post("/create", createTopic);

module.exports = router;
