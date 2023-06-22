import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";

import ImageWithTooltip from "../Tooltip/ImageWithTooltip";
import useAuth from "../../../hooks/useAuth";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [cart] = useCart();

  // Logout handler
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (

    <div className="px-4 py-7 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 sticky top-0 z-10 bg-white shadow opacity-75">
      <nav>
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <div className="w-1/3">
            <Link
              to="/"
              aria-label="Fitmindful"
              title="Fitmindful"
              className="inline-flex items-center"
            >
              <img
                className="w-1/2"
                src="https://i.ibb.co/vHzPBZ8/Logo-Transparent-min.png"
                alt="Fitmindful"
              />
            </Link>
          </div>

          <div className="flex items-center gap-5">
            {/* Desktop navigation */}
            <div className="w-max">
              <ul className="items-center hidden space-x-8 lg:flex">
                <li>
                  <NavLink
                    to="/"
                    aria-label="Home"
                    title="Home"
                    className={({ isActive }) =>
                      isActive ? "active" : "default"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/instructors"
                    aria-label="Instructors"
                    title="Instructors"
                    className={({ isActive }) =>
                      isActive ? "active" : "default"
                    }
                  >
                    Instructors
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/classes"
                    aria-label="Classes"
                    title="Classes"
                    className={({ isActive }) =>
                      isActive ? "active" : "default"
                    }
                  >
                    Classes
                  </NavLink>
                </li>

                {user && (
                  <li>
                    <NavLink
                      to="/dashboard"
                      aria-label="Dashboard"
                      title="Dashboard"
                      className={({ isActive }) =>
                        isActive ? "active" : "default"
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <Link to="/dashboard/selected-classes">
                      <button className="btn bg-transparent border-0 gap-2">
                        <FaShoppingCart></FaShoppingCart>
                        <div className="badge badge-success">
                          +{cart?.length || 0}
                        </div>
                      </button>
                    </Link>
                  </li>
                )}
               
              </ul>
            </div>

            {/* User profile and login/logout buttons */}
            <div className="hidden lg:flex gap-3 items-center w-max ">
              <div>
                {/* User profile image */}
                {user?.photoURL ? (
                  <div>
                    <ImageWithTooltip
                      src={user?.photoURL}
                      name={user?.displayName}
                    />
                  </div>
                ) : (
                  <div style={{ display: "none" }}>Profile</div>
                )}
              </div>

              {/* Login/Logout buttons */}
              {!user && (
                <Link to="/login">
                  <button className="font-semibold">Login</button>
                </Link>
              )}
              {user && (
                <div>
                  <button
                    onClick={handleLogOut}
                    className='className="mr-5 font-semibold hover:text-gray-900'
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile navigation */}
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute z-10 top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        to="/"
                        aria-label="Fitmindful"
                        title="Fitmindful"
                        className="inline-flex items-center"
                      >
                        <img
                          className="w-1/2"
                          src="https://i.ibb.co/vHzPBZ8/Logo-Transparent-min.png"
                          alt="logo"
                        />
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <NavLink
                          to="/"
                          aria-label="Home"
                          title="Home"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/instructors"
                          aria-label="Instructors"
                          title="Instructors"
                          className={({ isActive }) =>
                            isActive ? "active" : "default"
                          }
                        >
                          Instructors
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/classes"
                          aria-label="Classes"
                          title="Classes"
                          className={({ isActive }) =>
                            isActive ? "active" : "default"
                          }
                        >
                          Classes
                        </NavLink>
                      </li>

                      {user && (
                        <li>
                          <NavLink
                            to="/dashboard"
                            aria-label="Dashboard"
                            title="Dashboard"
                            className={({ isActive }) =>
                              isActive ? "active" : "default"
                            }
                          >
                            Dashboard
                          </NavLink>
                        </li>
                      )}
                      {user && (
                        <li>
                          <Link to="/dashboard/selected-classes">
                            <button className="btn bg-transparent border-0 gap-2">
                              <FaShoppingCart></FaShoppingCart>
                              <div className="badge badge-success">
                                +{cart?.length || 0}
                              </div>
                            </button>
                          </Link>
                        </li>
                      )}
               
                      {/* User profile and login/logout */}
                      <div>
                        <div className="flex flex-wrap items-center">
                          {user?.photoURL ? (
                            <div>
                              <ImageWithTooltip
                                src={user?.photoURL}
                                name={user?.displayName}
                              />
                            </div>
                          ) : (
                            <div style={{ display: "none" }}>Profile</div>
                          )}
                        </div>

                        {!user && (
                          <Link to="/login">
                            <button className="font-semibold">Login</button>
                          </Link>
                        )}
                        {user && (
                          <div>
                            <button
                              onClick={handleLogOut}
                              className='className="mr-5 font-semibold hover:text-gray-900'
                            >
                              Sign Out
                            </button>
                          </div>
                        )}
                      </div>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
