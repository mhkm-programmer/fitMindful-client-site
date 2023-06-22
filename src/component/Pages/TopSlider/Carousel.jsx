import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const CarouselSlider = () => {
  const slideIn = useSpring({
    from: { opacity: 0, transform: "translateY(100%)" },
    to: { opacity: 1, transform: "translateY(0%)" },
    config: { duration: 1000 },
  });

  return (
    <div className="relative">
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        className="carousel"
      >
        <div className="carousel-item">
          <animated.div style={slideIn}>
            <img
              src="https://i.ibb.co/Y3VjV6K/yoga-kids-classes-min.jpg"
              alt="Image 1"
              className="object-cover rounded-lg w-full h-full opacity-80"
            />
            <div className="carousel-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black">
              <h3 className="h2 mb-4 text-center">
                Summer Serenity Yoga Program
              </h3>
              <p className="h6 mb-6 text-center">
                Explore Inner Peace and Harmony Through Yoga
              </p>
              <Link to="/classes">
                <button className="btn btn-gradiant">Learn More</button>
              </Link>
            </div>
          </animated.div>
        </div>
        <div className="carousel-item">
          <animated.div style={slideIn}>
            <img
              src="https://i.ibb.co/G7Zqfhm/o-KIDS-DOING-YOGA-facebook-min.jpg"
              alt="Image 2"
              className="object-cover rounded-lg w-full h-full opacity-80"
            />
            <div className="carousel-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black">
              <h3 className="h2 mb-4 text-center">Nature's Bliss Yoga Camp</h3>
              <p className="h6 mb-6 text-center">
                "Connect with Nature and Find Balance through Yoga
              </p>
              <Link to="/instructors">
                <button className="btn btn-gradiant">
                  Explore our Instructor
                </button>
              </Link>
            </div>
          </animated.div>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselSlider;
