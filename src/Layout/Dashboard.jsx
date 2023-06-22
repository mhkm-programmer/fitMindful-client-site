import {
  FaAddressBook,
  FaAddressCard,
  FaBook,
  FaClinicMedical,
  FaFileContract,
  FaHome,
  FaIdCard,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { RiLogoutCircleLine, RiUserLine } from "react-icons/ri";

import ImageWithTooltip from "../component/Shared/Tooltip/ImageWithTooltip";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { useEffect } from "react";
import useInstructor from "../hooks/useInstructor";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  // Logout handler
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex content-center">
      <div className="w-1/4 min-h-screen">
        <aside className="shadow-sm">
          <div className="space-y-2 text-center">
            <img
              className="w-80 px-4 pt-8"
              src="https://i.ibb.co/vHzPBZ8/Logo-Transparent-min.png"
              alt="Fitmindful"
            />
          </div>
          <nav className="space-y-8 text-md">
            <ul className="menu p-4 w-80">
              {isAdmin && (
                <>
                  {/* <li>
                    <NavLink to="/dashboard/admin-home">
                      <FaHome /> Admin Home
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink to="/dashboard/manage-classes">
                      <FaUtensils /> Manage Classes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manage-user">
                      <FaUsers /> Manage User
                    </NavLink>
                  </li>
                </>
              )}
              {isInstructor && (
                <>
                  {/* <li>
                    <NavLink to="/dashboard/instructors-home">
                      <FaHome /> Instructor Home
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink to="/dashboard/add-classes">
                      <FaBook /> Add Classes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-classes">
                      <FaUsers /> My Classes
                    </NavLink>
                  </li>
                </>
              )}
              {!isAdmin && !isInstructor && (
                <>
                  {/* <li>
                    <NavLink to="/dashboard/student-home">
                      <FaHome /> Student Home
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink to="/dashboard/selected-classes">
                      <FaShoppingCart /> Selected Classes{" "}
                      <div className="badge badge-success">
                        +{cart?.length || 0}
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/enrolled-classes">
                      <FaUsers /> Enrolled Classes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/payment">
                      <FaWallet /> Payment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/payment-history">
                      <FaFileContract /> Payment History
                    </NavLink>
                  </li>
                </>
              )}

              {/* Common menu items */}
              <div className="divider" />
              <li>
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/classes">
                  <FaClinicMedical /> Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/instructors">
                  <FaIdCard /> Instructors
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">
                  <FaAddressCard /> About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact">
                  <FaAddressBook /> Contact Us
                </NavLink>
              </li>

              {/* Logout items */}
              <div className="divider" />
              {/* User profile and login/logout */}
              <li className="flex items-center">
                {user?.photoURL && (
                  <div className="mr-3">
                    <ImageWithTooltip
                      src={user?.photoURL}
                      name={user?.displayName}
                    />
                  </div>
                )}

                <div className="flex items-center">
                  {!user && (
                    <Link to="/login" className="mr-3">
                      <button className="flex items-center font-semibold">
                        <RiUserLine className="mr-1" />
                        Login
                      </button>
                    </Link>
                  )}

                  {user && (
                    <div>
                      <button
                        onClick={handleLogOut}
                        className="flex items-center font-semibold text-gray-700 hover:text-gray-900"
                      >
                        <RiLogoutCircleLine className="mr-1" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
      <div className="w-3/4 min-h-screen pt-8 px-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
