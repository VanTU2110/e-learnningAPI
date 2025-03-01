const express = require("express");
const {
    createReadingPassage, getAllReadingPassages, getReadingPassageById,
    updateReadingPassage, deleteReadingPassage
} = require("../controllers/readingController");

const router = express.Router();

router.post("/create", createReadingPassage);
router.get("/all", getAllReadingPassages);
router.get("/:id", getReadingPassageById);
router.put("/:id", updateReadingPassage);
router.delete("/:id", deleteReadingPassage);

module.exports = router;
