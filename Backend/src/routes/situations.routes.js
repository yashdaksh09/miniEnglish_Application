const express= require("express");
const {getSituations, getSectionById}= require("../controllers/situations.controller");
const {getSituationById}= require("../controllers/situations.controller")
const {getSituationSections}= require("../controllers/situations.controller")
const router= express.Router();

router.get("/", getSituations);
router.get("/sections/:id", getSectionById)
router.get("/:id", getSituationById);
router.get("/:id/sections", getSituationSections);

module.exports= router;