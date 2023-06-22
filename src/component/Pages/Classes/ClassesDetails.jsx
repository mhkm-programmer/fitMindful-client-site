import React from "react";
import { useSpring, animated } from "react-spring";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";


const ClassesDetails = ({ item }) => {
  const { user } = useAuth();
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

 

  const handleAddToCart = () => {
    console.log(item);
    if (user && user.email) {
      const cartItem = {
        classId: item._id,
        name: item.className,
        image: item.classImage,
        price: item.price,
        email: user.email,
        seats: item.availableSeats,
        instructor: item.instructorName,
      };
      fetch("https://summer-camp-server-side-kabircodefolio.vercel.app/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch(); // refetch cart to update the number of items in the cart
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Selected class added on the cart.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to select the class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  // Animation
  const animation = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={animation}>
   
      <div className="mb-10 px-4 shadow-lg min-h-full pb-4">
        <div className="rounded-lg h-64 overflow-hidden">
          <img
            alt="content"
            className="object-cover object-center h-full w-full"
            src={item.classImage}
          />
        </div>
        <h2 className="title-font text-3xl font-medium text-gray-900 mt-6 mb-3">
          {item.instructorName}
        </h2>
        <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">
          Class: {item.className}
        </h2>

        <div className="flex justify-center gap-8 items-center">
          <p className="leading-relaxed text-base">
            Available Seats: {item.availableSeats}
          </p>
          <p className="leading-relaxed text-base">Price: $ {item.price}</p>
        </div>
        {user && item.availableSeats === 0 ? (
          <button
            className="flex mx-auto my-5 text-white bg-red-500 border-0 py-2 px-5 focus:outline-none rounded"
            disabled
          >
            Select Class
          </button>
        ) : (
          <button className="btn btn-gradiant mt-6" onClick={handleAddToCart}>
            Select Class
          </button>
        )}
      </div>
    </animated.div>
  );
};

export default ClassesDetails;
