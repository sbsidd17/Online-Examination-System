import express from "express";
import "dotenv/config"
import userRoute from "./routes/user.routes.js";

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Backend Is Running...")
})

app.use("/api/v1/auth", userRoute)

export default app;