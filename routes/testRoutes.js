const express = require("express");
const { getAllTests, createTest } = require("../controllers/testController");
const router = express.Router();

router.get("/all", getAllTests);
router.post("/create", createTest);

module.exports = router;
