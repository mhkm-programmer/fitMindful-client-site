import React, { useState } from "react";
import useClasses from "../../../hooks/useClasses";
import ReactPaginate from "react-paginate";
import { useSpring, animated } from "react-spring";
import ClassesDetails from "./ClassesDetails";
import ParallaxSection from "../Home/ParallaxSection/ParallaxSection";

const Classes = () => {
  const [classes] = useClasses();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Number of items to display per page

  // Sort yoga classes by available seats (from least to greatest)
  const sortedClasses = classes.sort(
    (a, b) => a.availableSeats - b.availableSeats
  );

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Calculate pagination indexes
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClasses = sortedClasses.slice(startIndex, endIndex);

  // Animation
  const animation = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <div>
      {/* Parallax Section */}
      <ParallaxSection
        imagePath="https://i.ibb.co/NrDh4P6/Pinterest-Download-2.pnghttps://i.ibb.co/hycrTXK/fun-with-beach-yoga-pose-in-aonang-krabi-1024x448-min.jpg"
        title="Join Our Yoga Community and Embrace a Path of Wellness"
        subTitle="Elevate Your Health, Ignite Your Spirit, and Create Balance in Life"
      />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 text-center ">
            {paginatedClasses.map((item) => (
              <animated.div key={item._id} style={animation}>
                <ClassesDetails item={item} />
              </animated.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="flex justify-center my-4">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          pageCount={Math.ceil(classes.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="flex justify-center my-4"
          pageLinkClassName="mr-2 px-3 py-2 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-200"
          activeLinkClassName="mr-2 px-3 py-2 rounded-md bg-[#93DB1F] text-sm text-gray-900"
          previousLinkClassName="mr-2 px-3 py-2 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-200"
          nextLinkClassName="mr-2 px-3 py-2 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-200"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default Classes;
