import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const ClassesCard = ({ classData }) => {
  const { id } = useParams();
  const {
    category,
    classImage,
    className,
    classDetails,
    price,
    _id,
  } = classData;

  // Animation
  const animation = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={animation} className="max-w-sm rounded overflow-hidden shadow-lg">
      <img src={classImage} alt={className} className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{className}</div>
        <p className="text-gray-700 text-base">{classDetails}</p>
      </div>
      <div className="px-6 py-2 flex justify-between">
        <span className=" bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Category: {category}
        </span>
        <span className=" bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Price: $ {price}
        </span>
      </div>
      {/* <div className="px-6 pt-4">
        <Link to={`/classes/${_id}`}>
          <button className="btn btn-gradiant w-full">View Details</button>
        </Link>
      </div> */}
    </animated.div>
  );
};

export default ClassesCard;
