const express = require("express");
const {getPhrasesBySection, getPhraseById}= require("../controllers/phrases.controller")

const router = express.Router();

router.get("/section/:sectionId", getPhrasesBySection);
router.get("/:id", getPhraseById);

module.exports = router;