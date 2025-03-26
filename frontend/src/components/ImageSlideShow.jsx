/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { getAllSliderImage } from "../redux/slices/adminSlice";

const ImageSlideShow = () => {
  const { sliderImages, isLoading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSliderImage());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!sliderImages || sliderImages.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div>
      <Slide>
        {sliderImages.map((image) => (
          <div key={image._id} className="each-slide-effect">
            <div 
              style={{ 
                backgroundImage: url(${image.image}),
                height: '400px',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ImageSlideShow;
