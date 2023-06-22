import React from 'react';

import { motion } from 'framer-motion';

const InstructorCard = ({ instructorData }) => {
  const { category, instructorImage, instructorName, classDetails, instructorEmail, _id } = instructorData;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div>
      <motion.div
        className="max-w-sm rounded overflow-hidden shadow-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <img src={instructorImage} className="w-full h-48 object-cover" alt={instructorName} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{instructorName}</div>
          <p className="text-gray-700 text-base">{classDetails}</p>
        </div>
        {/* <div className="px-6 pb-5  justify-between">
          <span className=" bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            Email: {instructorEmail}
          </span>
        </div> */}
      </motion.div>
    </div>
  );
};

export default InstructorCard;
