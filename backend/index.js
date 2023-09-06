import app from "./app.js";
import "dotenv/config"
import dbConnect from "./config/dbConnect.js";

const PORT = process.env.PORT || 3000

app.listen(PORT, async ()=>{
    await dbConnect()
    console.log(`App is listening on Port : ${PORT}`)
})
