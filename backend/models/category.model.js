import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  category_name: {
    type: String,
  },
  category_description: {
    type: String,
  },
  exams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },
  ],
},{timestamps:true});

const Category = mongoose.model("Category", categorySchema);
export default Category;
