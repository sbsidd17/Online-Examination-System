import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  exam_name: {
    type: String,
    required: true,
    minLenght: [5, "Exam Name should be greater than 5 charachers"],
    maxLenght: [300, "Exam Name should be less than 300 charachers"],
  },
  exam_description: {
    type: String,
    required: true,
    minLenght: [5, "Exam Name should be greater than 5 charachers"],
    maxLenght: [1000, "Exam Name should be less than 1000 charachers"],
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  exam_content: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  catagory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Catagory",
  },
  enrolled_student: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Exam = mongoose.model("exam", examSchema);
export default Exam;
