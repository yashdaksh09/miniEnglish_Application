require("dotenv").config();
const express= require("express");
const situationsRouter= require("./routes/situations.routes");
const phrasesRoutes= require("./routes/phrases.routes");
const translateRoutes = require("./routes/translate.routes");
const app= express();
app.use(express.json());

app.use("/api/situations", situationsRouter);
app.use("/api/phrases", phrasesRoutes);
app.use("/api/translate", translateRoutes);


const PORT= process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})