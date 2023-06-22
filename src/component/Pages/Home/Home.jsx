import CarouselSlider from "../TopSlider/Carousel";
import ClassesCard from "../Classes/ClassesCard";
import InstructorCard from "../Instructor/InstructorCard";
import { Link } from "react-router-dom";
import NewsLetter from "./NewsLetter/NewsLetter";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import ParallaxSection from "./ParallaxSection/ParallaxSection";
import TitleSubtitle from "../../Shared/TitleSubtitle/TitleSubtitle";
import useClasses from "../../../hooks/useClasses";
import DarkModeToggle from "../../Shared/DarkMode/DarkModeToggle";
import { useState } from "react";


const Home = () => {
  const [classes] = useClasses();

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleModeToggle = (checked) => {
    setIsDarkMode(checked);
    if (checked) {
      // Apply dark mode styles or classes
      document.body.classList.add("dark");
    } else {
      // Remove dark mode styles or classes
      document.body.classList.remove("dark");
    }
  };
  
  // Sort yoga classes by available seats (from least to greatest)
  const sortedClasses = classes.sort(
    (a, b) => a.enrollStudent - b.enrollStudent
  );

  // Sort yoga instructors by the number of enrolled students
  const sortedInstructors = classes.sort(
    (a, b) => b.enrollStudent - a.enrollStudent
  );

  return (
    <div className={`dark:bg-black ${isDarkMode ? "dark:text-white" : "dark:text-black"}`}>
    
 {/* Dark Mode Toggle */}
 <div className="fixed bottom-4 right-4">
      <DarkModeToggle isDarkMode={isDarkMode} onToggle={handleModeToggle} />
    </div>
      {/* Page Title */}
      <PageTitle title="FitMindful | Home" />
    
      {/* Carousel Slider */}
      <CarouselSlider />

      <div>
        {/* Title and Subtitle */}
        <TitleSubtitle
          title="Embark on a Journey of Wellness and Serenity with Yoga"
          subtitle="Restore Balance, Strengthen Body and Mind, and Find Inner Peace"
        />

        {/* Yoga Classes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4 py-12">
          {sortedClasses.slice(0, 6).map((classData) => (
            <ClassesCard key={classData._id} classData={classData} />
          ))}
        </div>
        <div className="px-6 pt-4 py-12 mx-auto text-center">
          <Link to="/classes">
            <button className="btn btn-gradiant  mx-auto">
              View More Class
            </button>
          </Link>
        </div>
      </div>

      {/* Parallax Section */}
      <ParallaxSection
        imagePath="https://i.ibb.co/NrDh4P6/Pinterest-Download-2.png"
        title="Experience the Blissful Harmony of Yoga "
        subTitle="Rejuvenate, Revitalize, and Reconnect with Your True Self"
      />

      <div>
        {/* Title and Subtitle */}
        <TitleSubtitle
          title="Discover the Joy of Yoga with Experienced Instructors"
          subtitle="Unlock Your Mind, Body, and Spirit through Guided Practice"
        />

        {/* Yoga Instructors */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4 py-12">
          {sortedInstructors.slice(0, 6).map((instructorData) => (
            <InstructorCard
              key={instructorData._id}
              instructorData={instructorData}
            />
          ))}
        </div>
        <div className="px-6 pt-4 mx-auto text-center">
          <Link to="/instructors">
            <button className="btn btn-gradiant  mx-auto">
              Explore our Instructor
            </button>
          </Link>
        </div>
      </div>

      <div>
        {/* Title and Subtitle */}
        <TitleSubtitle
          title="Awaken Your Senses and Embrace the Art of Yoga"
          subtitle="Discover Inner Peace, Strength, and Flexibility through Yoga Practice"
        />

        {/* Image Gallery */}
        <section className="py-6 dark:bg-gray-800 dark:text-gray-50">
          <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
            <img
              src="https://i.ibb.co/L5hYMs9/88b7c64c-ec56-4023-9388-6e9f9e6fed3a.jpg"
              alt=""
              className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square"
            />
            <img
              alt=""
              className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/Wgw5zg7/Vinyasa-Yoga2.webp"
            />
            <img
              alt=""
              className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/x3MqSP2/amritaprasad.jpg"
            />
            <img
              alt=""
              className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/Kqqxf1p/Yoga-Cartoon4.webp"
            />
            <img
              alt=""
              className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/4Y2Y5wk/Asthanga-yoga-1.jpg"
            />
            <img
              alt=""
              className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/XDNgy0f/Kids-yoga-class-in-Singapore-2.jpg"
            />
            <img
              alt=""
              className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/XF49QFN/Yoga-in-education.webp"
            />
            <img
              alt=""
              className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/WvwGwnB/Pinterest-Download-2.jpg"
            />
            <img
              alt=""
              className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/rQmsfLJ/24.jpg"
            />
            <img
              src="https://i.ibb.co/rsrdbSk/68276330-beautiful-woman-doing-yoga-outdoors-in-the-snow-in-yellow-t-shirt.webp"
              alt=""
              className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-1 md:row-start-3 dark:bg-gray-500 aspect-square"
            />
          </div>
        </section>
      </div>

      {/* Newsletter */}
      <NewsLetter />
    </div>
  );
};

export default Home;
