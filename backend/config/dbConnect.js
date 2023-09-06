import mongoose from "mongoose";
import "dotenv/config"

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db Conected Successfully");
  } catch (error) {
    console.log("Error in Db Connection");
    console.log(error);
  }
};

export default dbConnect;
