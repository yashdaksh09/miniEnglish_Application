const express= require("express");
const {translatePhrase}= require("../controllers/translate.controller");

const router= express.Router();

router.post("/", translatePhrase);

module.exports=router;