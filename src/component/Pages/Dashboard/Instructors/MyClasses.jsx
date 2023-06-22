import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import useMyClasses from "../../../../hooks/useMyClasses";
import TitleSubtitle from "../../../Shared/TitleSubtitle/TitleSubtitle";

const MyClasses = () => {
  const [myClasses] = useMyClasses();
  const [pageNumber, setPageNumber] = useState(0);
  const classesPerPage = 5;
  const pagesVisited = pageNumber * classesPerPage;
  const pageCount = Math.ceil(myClasses.length / classesPerPage);
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  const displayedClasses = myClasses
    .slice(pagesVisited, pagesVisited + classesPerPage)
    .sort((a, b) => {
      if (a.status < b.status) return -1;
      if (a.status > b.status) return 1;
      return 0;
    });

  return (
    <div>
      <TitleSubtitle title="My All Class" />
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
                  Available Seat
                </th>
                <th scope="col" className="py-3 pr-6">
                  Price
                </th>
                <th scope="col" className="py-3 pr-6">
                  Edit
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
                    <img
                      src={item.classImage}
                      className="w-10 h-10 rounded-full"
                    />
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
                  <td className="pr-6 py-4 whitespace-nowrap">{item.price}</td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    <button>Edit </button>
                  </td>
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
      <div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"flex items-center justify-center mt-8"}
          previousLinkClassName={
            "px-3 py-2 border rounded-md text-gray-600 border-gray-300 bg-white hover:bg-gray-50"
          }
          nextLinkClassName={
            "px-3 py-2 border rounded-md text-gray-600 border-gray-300 bg-white hover:bg-gray-50"
          }
          disabledClassName={"opacity-50 cursor-not-allowed"}
          activeClassName={"bg-gray-200 px-3"}
        />
      </div>
    </div>
  );
};

export default MyClasses;
