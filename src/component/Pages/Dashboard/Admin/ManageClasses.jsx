import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import useClasses from "../../../../hooks/useClasses";
import { useNavigate } from "react-router-dom";
import TitleSubtitle from "../../../Shared/TitleSubtitle/TitleSubtitle";

const ManageClasses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [classes] = useClasses();
  const [newClass, setNewClasses] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const classesPerPage = 5;
  const pagesVisited = pageNumber * classesPerPage;

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleUpdate = (classId, status) => {
    const options = {
      method: "PUT", // Change the request method to PUT
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved" }), // Set the status to "approved"
    };

    fetch(`https://localhost:5000/classes/${classId}/approve`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        // Check if the status is successfully updated
        if (response.status === "approved") {
          const updatedClasses = classes.map((item) => {
            // Update the status of the specific class
            if (item._id === classId) {
              return { ...item, status: "approved" };
            }
            return item;
          });

          console.log(updatedClasses);
          setNewClasses(updatedClasses);
        }
      })
      .catch((err) => console.error(err));
  };

  const sendFeedback = (classId, feedback) => {
    axios
      .post(`/classes/send-feedback`, { id: classId, feedback })
      .then((response) => {
        console.log(response);
        // Handle any success or error response
      })
      .catch((err) => console.error(err));
  };

  const openFeedbackModal = (classId) => {
    Swal.fire({
      title: "Send Feedback",
      input: "text",
      inputPlaceholder: "Enter your feedback...",
      showCancelButton: true,
      confirmButtonText: "Send",
      cancelButtonText: "Cancel",
      preConfirm: (value) => {
        sendFeedback(classId, value);
      },
    });
  };

  const displayedClasses = classes
    .slice(pagesVisited, pagesVisited + classesPerPage)
    .sort((a, b) => {
    
      if (a.status < b.status) return -1;
      if (a.status > b.status) return 1;
      return 0;
    });
  return (
    <div>
      <TitleSubtitle title="Manage All User" />
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12 relative h-max overflow-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th scope="col" className="py-3 pr-6">
                  #
                </th>
                <th scope="col" className="py-3 pr-6">
                  Class Image & Name
                </th>
                <th scope="col" className="py-3 pr-6">
                  Instructor Name & Email
                </th>
                <th scope="col" className="py-3 pr-6">
                  Seats
                </th>
                <th scope="col" className="py-3 pr-6">
                  Enrolled
                </th>
                <th scope="col" className="py-3 pr-6">
                  Price
                </th>
                <th scope="col" className="py-3 pr-6">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {displayedClasses.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td className="flex items-center gap-x-3 py-3 pr-6 whitespace-nowrap">
                    <img src={item.image} className="w-10 h-10 rounded-full" />
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {item.className}
                      </span>
                    </div>
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    <div>
                      <span className="block text-gray-700 text-xs">
                        {item.instructorName}
                      </span>
                      <span className="block text-gray-700 text-xs">
                        {item.email}
                      </span>
                    </div>
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item.availableSeats}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item.enrollStudent}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">${item.price}</td>
                  <td>
                    {item.status === "pending" ? (
                      <span className="font-bold text-green-600 uppercase">
                        Approved
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            handleUpdate(item._id, "pending");
                          }}
                          disabled={
                            item.status === "approved" ||
                            item.status === "denied"
                          }
                          className={`py-2 leading-none px-3 font-medium text-green-600 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            item.status === "denied" ? "cursor-not-allowed" : ""
                          }`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            handleUpdate(item._id, "denied");
                          }}
                          disabled={
                            item.status === "approved" ||
                            item.status === "denied"
                          }
                          className={`py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            item.status === "denied" ? "cursor-not-allowed" : ""
                          }`}
                        >
                          Deny
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        openFeedbackModal(item._id);
                      }}
                      disabled={
                        item.status === "approved" || item.status === "denied"
                      }
                      className={`py-2 leading-none px-3 font-medium text-blue-600 hover:text-blue-500 duration-150 hover:bg-gray-50 rounded-lg ${
                        item.status === "denied" ? "cursor-not-allowed" : ""
                      }`}
                    >
                      Feedback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 mb-8 flex justify-center">
      <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(classes.length / classesPerPage)}
          onPageChange={handlePageChange}
          containerClassName={"flex items-center space-x-2"}
          previousLinkClassName={
            "px-3 py-1 border rounded text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          }
          nextLinkClassName={
            "px-3 py-1 border rounded text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          }
          disabledClassName={"text-gray-400"}
          activeClassName={"bg-blue-500 px-3 text-white"}
        />
      </div>
    </div>
  );
};

export default ManageClasses;
