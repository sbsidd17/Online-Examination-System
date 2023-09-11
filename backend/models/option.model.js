import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
    option_title: {
        type: String,
        required:true
    },
    option_image: {
        type: String,
    },
},{timestamps:true})

const Option = mongoose.model("Option", optionSchema);
export default Option;