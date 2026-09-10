const express= require("express");
const {getSituations}= require("../controllers/situations.controller");
const router= express.Router();

router.get("/", getSituations);

module.exports= router;