import mongoose from "mongoose";

const catagorySchema = mongoose.Schema({
  catagory_name: {
    type: String,
  },
  catagory_description: {
    type: String,
  },
  exams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },
  ],
});

const Catagory = mongoose.model("Catagory", catagorySchema);
export default Catagory;
