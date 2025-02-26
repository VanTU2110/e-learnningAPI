const express = require("express");
const { getAllLessons, createLesson } = require("../controllers/lessonController");
const router = express.Router();

router.get("/all", getAllLessons);
router.post("/create", createLesson);

module.exports = router;
