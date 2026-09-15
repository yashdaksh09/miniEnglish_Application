const express= require("express");
const {getSituations}= require("../controllers/situations.controller");
const {getSituationById}= require("../controllers/situations.controller")
const {getSituationSections}= require("../controllers/situations.controller")
const router= express.Router();

router.get("/", getSituations);
router.get("/:id", getSituationById);
router.get("/:id/sections", getSituationSections);

module.exports= router;