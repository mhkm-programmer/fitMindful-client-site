import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useTrail, animated } from "react-spring";
import useClasses from "../../../hooks/useClasses";
import ParallaxSection from "../Home/ParallaxSection/ParallaxSection";
import InstructorDetails from "./InstructorDetails";

const Instructor = () => {
  const [classes] = useClasses();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Number of items to display per page

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Calculate pagination indexes
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClasses = classes.slice(startIndex, endIndex);

  const trail = useTrail(paginatedClasses.length, {
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    delay: 200,
  });

  return (
    <div>
      {/* Parallax Section */}
      <ParallaxSection
        imagePath="https://i.ibb.co/MM8dTVx/benjamin-child-r-On57-CBgy-Mo-unsplash-min.jpg"
        title="Yoga Safari Summer Camp"
        subTitle="Embark on an Exciting Journey of Yoga and Fun"
      />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 text-center">
            {trail.map((props, index) => (
              <animated.div key={paginatedClasses[index]._id} style={props}>
                <InstructorDetails item={paginatedClasses[index]} />
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
          activeLinkClassName="mr-2 px-3 py-2 rounded-md bg-gray-900 text-sm text-[#93DB1F]"
          previousLinkClassName="mr-2 px-3 py-2 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-200"
          nextLinkClassName="mr-2 px-3 py-2 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-200"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default Instructor;
