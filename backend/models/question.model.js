import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    question_title: String,
    question_image: String,
  },
  options: [
    {
      option: {
        option_title: String,
        option_image: String,
      },
    },
  ],
  answer: {
    answer_title: String,
    answer_image: String,
  },
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
