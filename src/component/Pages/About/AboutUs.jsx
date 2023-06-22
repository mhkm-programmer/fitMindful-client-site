import { animated, useSpring } from 'react-spring';

import PageTitle from '../../Shared/PageTitle/PageTitle';
import React from 'react';

const AboutUs = () => {
  const fadeInAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <div>
      <PageTitle title="FitMindful|About Us" />

      <div>
        <div className='container mx-auto pb-24 pt-10 px-16'>
          <animated.h2
            className='text-center text-black-500 h2 pb-8'
            style={fadeInAnimation}
          >
            About Us
          </animated.h2>
          <animated.p style={fadeInAnimation}>
            "Welcome to FitMindful, where we believe that food brings people
            together and that every meal should be a celebration of delicious
            flavors, fresh ingredients, and culinary creativity. Our team of
            passionate food enthusiasts is dedicated to sharing our love of
            cooking with you by providing a vast collection of recipes, cooking
            tips, and culinary inspiration.
          </animated.p>
          <br />
          <br />
          <animated.p style={fadeInAnimation}>
            At FitMindful, we believe that cooking should be approachable, fun,
            and above all, delicious. Whether you're an experienced home cook
            or just starting out, we're here to help you explore new cuisines,
            techniques, and flavors. Our recipes are carefully crafted to be
            easy to follow, with step-by-step instructions and helpful tips to
            ensure success every time.
          </animated.p>
          <br />
          <br />
          <animated.p style={fadeInAnimation}>
            We know that food is not only about nourishment, but also about
            connecting with others and exploring new cultures. That's why we're
            committed to showcasing the diversity of global cuisine, from
            classic dishes to modern interpretations. Our recipes range from
            comforting favorites to exciting new creations, all designed to
            inspire you to get into the kitchen and create something wonderful.
          </animated.p>
          <br />
          <br />
          <animated.p style={fadeInAnimation}>
            At FitMindful, we believe in using fresh, high-quality ingredients
            to create delicious, healthy meals that nourish both body and soul.
            We're dedicated to providing you with the best possible cooking
            experience, from the first time you visit our website to the last
            bite of your meal. Thank you for joining us on this tasty journey,
            and we can't wait to see what you create in your kitchen!"
          </animated.p>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
