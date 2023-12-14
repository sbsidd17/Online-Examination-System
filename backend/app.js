import express from "express";
import "dotenv/config"
import userRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import examRoute from "./routes/exam.routes.js";
import adminRoute from "./routes/admin.routes.js";
import cors from "cors"
import paymentRoute from "./routes/payment.routes.js";

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.options('*', cors());
app.get("/",(req,res)=>{
    res.send("Backend Is Running...")
})

app.use("/api/v1/auth", userRoute)
app.use("/api/v1/exam", examRoute)
app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/payment", paymentRoute)

export default app;