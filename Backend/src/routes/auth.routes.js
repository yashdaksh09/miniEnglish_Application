const express= require('express');
const {signup, login, getMe} = require("../controllers/auth.controller.js");
const authenticateToken= require("../middleware/auth.middleware.js")

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticateToken, getMe);

module.exports= router;