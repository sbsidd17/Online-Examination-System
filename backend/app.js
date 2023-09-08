import express from "express";
import "dotenv/config"
import userRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import examRoute from "./routes/exam.routes.js";

const app = express()
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Backend Is Running...")
})

app.use("/api/v1/auth", userRoute)
app.use("/api/v1/exam", examRoute)

export default app;