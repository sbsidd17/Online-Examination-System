import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const ImageSlideShow = () => {
  const images = [
    "https://cdn.testbook.com/resources/productionimages/Group%2022_All_1678797043.png",
    "https://exambook.co/assets/images/slides/hdr-2.jpg",
    "https://exambook.co/assets/images/slides/hdr-2.jpg",
  ];

  return (
    <Slide>
      <div className="each-slide-effect">
        <div style={{ backgroundImage: `url(${images[0]})` }}></div>
      </div>
      <div className="each-slide-effect">
        <div style={{ backgroundImage: `url(${images[1]})` }}></div>
      </div>
      <div className="each-slide-effect">
        <div style={{ backgroundImage: `url(${images[2]})` }}></div>
      </div>
    </Slide>
  );
};

export default ImageSlideShow;
