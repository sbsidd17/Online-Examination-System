import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const SliderImages = mongoose.model("SliderImages", sliderSchema);
export default SliderImages;
