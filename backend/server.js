require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authrouter = require("./routes/auth");
const interviewRoutes = require("./routes/interview");
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("COnnected Db"))
.catch(err=>console.log(err))

const PORT = process.env.PORT || 5000;
app.get("/", (req , res)=>{
    res.send("server running")
})
app.use("/auth" , authrouter)
app.listen(PORT, ()=>{
    console.log(`RUnning on http://localhost:${PORT}`);
})