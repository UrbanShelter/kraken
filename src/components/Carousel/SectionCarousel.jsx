// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
import priceImage3 from "assets/img/card-1.jpeg";
import priceImage1 from "assets/img/card-2.jpeg";
import priceImage2 from "assets/img/card-3.jpeg";
import carouselStyle from "assets/jss/material-dashboard-pro-react/components/carouselStyle.jsx";
import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";

class SectionCarousel extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false
    };
    return (
      <Carousel {...settings}>
        <div>
          <img src={priceImage1} alt="First slide" className="slick-image" />
        </div>
        <div>
          <img src={priceImage2} alt="Second slide" className="slick-image" />
        </div>
        <div>
          <img src={priceImage3} alt="Third slide" className="slick-image" />
          <div className="slick-caption">
            <h4>
              <LocationOn className="slick-icons" />
              Yellowstone National Park, United States
            </h4>
          </div>
        </div>
      </Carousel>
    );
  }
}

export default withStyles(carouselStyle)(SectionCarousel);
