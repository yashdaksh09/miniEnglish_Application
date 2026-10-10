require("dotenv").config();
const express= require("express");
const situationsRouter= require("./routes/situations.routes");
const phrasesRoutes= require("./routes/phrases.routes");
const translateRoutes = require("./routes/translate.routes");
const authRoutes= require("./routes/auth.routes.js");
const pool = require("./config/db");
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

app.get("/health/db", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("Database health check failed:", error.message);

    res.status(503).json({
      status: "error",
      database: "disconnected",
    });
  }
});


app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})