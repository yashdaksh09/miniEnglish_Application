require("dotenv").config();
const express= require("express");
const situationsRouter= require("./routes/situations.routes");
const phrasesRoutes= require("./routes/phrases.routes");
const translateRoutes = require("./routes/translate.routes");
const authRoutes= require("./routes/auth.routes.js");
const app= express();
app.use(express.json());

app.use("/api/situations", situationsRouter);
app.use("/api/phrases", phrasesRoutes);
app.use("/api/translate", translateRoutes);
app.use("/api/auth", authRoutes);


const PORT= process.env.PORT;

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "MiniEnglish API",
    timestamp: new Date().toISOString(),
  });
});




app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})