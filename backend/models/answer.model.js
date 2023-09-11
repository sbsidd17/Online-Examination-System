import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    answer_title: {
        type: String,
        required:true
    },
    answer_image: {
        type: String,
    },
    answer_description:{
        type: String
    }
},{timestamps:true})

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;