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
})

const Answer = mongoose.model("answer", answerSchema);
export default Answer;