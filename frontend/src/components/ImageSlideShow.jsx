/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { getAllSliderImage } from "../redux/slices/adminSlice";

const ImageSlideShow = () => {
  const { sliderImages } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  async function getData() {
    await dispatch(getAllSliderImage());
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Slide>
        {sliderImages?.map((image) => {
          return (
            <div key={image._id} className="each-slide-effect">
              <div style={{ backgroundImage: `url(${image.image})` }}></div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
};

export default ImageSlideShow;
