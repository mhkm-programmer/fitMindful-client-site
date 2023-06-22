import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your newsletter subscription logic here
  };

  const handleReset = () => {
    setEmail("");
  };

  return (
    <section className="md:pt-8 pb-16 md:pb-24 mx-auto">
      <div className="relative overflow-hidden py-14 rounded-2xl px-4 md:px-8 md:mx-8">
        <animated.div style={animationProps} className="relative z-10 max-w-xl mx-auto sm:text-center">
          <div className="space-y-3">
            <h3 className="text-3xl text-black font-bold">
              Never Miss a Yoga!
            </h3>
            <p className="text-black leading-relaxed font-semibold">
              Join thousands of FitMindful subscribers and get our best yogas and meditations
              class, content, and more each week!
            </p>
          </div>
          <div className="mt-6">
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-center bg-white rounded-lg p-1 sm:max-w-md sm:mx-auto"
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="text-gray-500 w-full p-2 outline-none"
              />
              <button
                type="submit"
                onClick={handleReset}
                className="p-2 px-3 rounded-lg font-medium text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 duration-150 outline-none shadow-md focus:shadow-none sm:px-4"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 max-w-lg text-sm text-black font-semibold sm:mx-auto">
              No spam ever, we care about the protection of your data. Read
              our{" "}
              <Link to="/terms" className="underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </animated.div>
        <animated.div
          style={{ ...animationProps, backgroundImage: `url("https://i.ibb.co/cDWQRfn/Pngtree-cute-boy-meditation-sports-illustration-6223218.png")` }}
          className="absolute inset-0 opacity-95 w-full h-full bg-cover bg-no-repeat bg-center shadow-2xl"
        ></animated.div>
      </div>
    </section>
  );
};

export default NewsLetter;
