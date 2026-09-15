require("dotenv").config();
const express= require("express");
const situationsRouter= require("./routes/situations.routes");
const phrasesRoutes= require("./routes/phrases.routes");
const app= express();
app.use(express.json());

app.use("/api/situations", situationsRouter);
app.use("/api/phrases", phrasesRoutes);


const PORT= process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})