

import React from "react";
import { useSpring, animated } from "react-spring";

const TitleSubtitle = ({ title, subtitle }) => {
  const titleAnimation = useSpring({ opacity: 1, from: { opacity: 0 } });
  const subtitleAnimation = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <div>
      <animated.h1
        className="mt-16 text-center text-3xl font-bold"
        style={titleAnimation}
      >
        {title}
      </animated.h1>
      <animated.p
        className="mb-8 mt-4 text-center text-lg"
        style={subtitleAnimation}
      >
        {subtitle}
      </animated.p>
    </div>
  );
};

export default TitleSubtitle;
