import { animated, useSpring } from "react-spring";

import PageTitle from "../../Shared/PageTitle/PageTitle";
import React from "react";
import TitleSubtitle from "../../Shared/TitleSubtitle/TitleSubtitle";

const ContactUs = () => {
  const fadeInAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const iframeStyles = {
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div>
      <PageTitle title="FitMindful|Contact Us" />
      <TitleSubtitle title="Contact Us"/>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 pb-24 pt-16 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-full  flex flex-wrap rounded-lg overflow-hidden p-10">
            <animated.div style={fadeInAnimation} className="w-full h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1477.664232353121!2d90.41860391161788!3d23.730451619137614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1684651400539!5m2!1sen!2sbd"
                className="w-full h-full"
                title="Map"
                allowFullScreen
              ></iframe>
            </animated.div>
          </div>

          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <animated.h2
              style={fadeInAnimation}
              className="text-gray-900 text-lg mb-1 font-medium title-font"
            >
              Get in Touch with Us
            </animated.h2>
            <animated.p style={fadeInAnimation} className="leading-relaxed mb-5 text-gray-600">
              Have a question or need assistance? Fill out the form below and
              we'll get back to you soon!
            </animated.p>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <animated.button style={fadeInAnimation} className="btn-gradiant">
              Send
            </animated.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
