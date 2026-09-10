require("dotenv").config();
const express= require("express");
const situationsRouter= require("./routes/situations.routes");
const app= express();
app.use(express.json());

app.use("/api/situations", situationsRouter)

const PORT= process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})