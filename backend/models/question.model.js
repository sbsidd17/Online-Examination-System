import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question_title: {
        type: String,
        required:true
    },
    question_image: {
        type: String,
    },
    options : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Option"
        }
    ],
    answer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Answer"
    }
})

const Question = mongoose.model("Question", questionSchema);
export default Question;