import React from "react";
import { useSpring, animated } from "react-spring";

const InstructorDetails = ({ item }) => {
  const animation = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={animation}>
      <div className="mb-10 px-4">
        <div className="rounded-lg h-64 overflow-hidden">
          <img
            alt="content"
            className="object-cover object-center h-full w-full"
            src={item.instructorImage}
          />
        </div>
        <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">
          {item.instructorName}
        </h2>
        <p className="leading-relaxed text-base">
          Email: {item.instructorEmail}
        </p>
        <p className="leading-relaxed text-base">
          Mobile Number: {item.instructorPhoneNumber}
        </p>
      </div>
    </animated.div>
  );
};

export default InstructorDetails;
