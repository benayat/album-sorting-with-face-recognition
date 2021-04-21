import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../style/albumCarousel.css";

const AlbumCarousel = (props) => {
  return (
    <Carousel autoPlay={true} interval={2000} dynamicHeight={true}>
      {props.imagesByLabel}
    </Carousel>
  );
};
export default AlbumCarousel;
