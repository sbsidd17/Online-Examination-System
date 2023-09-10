import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  test_name: {
    type: String,
    minLenght: [5, "User Name should be greater than 5 charachers"],
    maxLenght: [300, "User Name should be less than 300 charachers"],
    required: true,
  },
  total_questions: {
    type: Number,
    required: true,
  },
  total_marks: {
    type: Number,
    required: true,
  },
  total_time: {
    type: Number,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
},{timestamps:true});

const Test = mongoose.model("Test", testSchema);
export default Test;
