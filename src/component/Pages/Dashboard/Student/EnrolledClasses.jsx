import React from "react";
import usePayment from "../../../../hooks/usePayment";
import { useState } from "react";
import PageTitle from "../../../Shared/PageTitle/PageTitle";
import TitleSubtitle from "../../../Shared/TitleSubtitle/TitleSubtitle";
import ReactPaginate from "react-paginate";

const EnrolledClasses = () => {
  const PAGE_SIZE = 4; // Number of items per page
  const [payment, refetch] = usePayment();

  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the total number of pages
  const pageCount = Math.ceil(payment.length / PAGE_SIZE);

  // Get the items to display on the current page
  const offset = currentPage * PAGE_SIZE;
  const currentPageItems = payment.slice(offset, offset + PAGE_SIZE);

  const totalQuantity = currentPageItems.reduce(
    (sum, item) => item.quantity + sum,
    0
  );

  const totalPrice = currentPageItems.reduce(
    (sum, item) => item.price + sum,
    0
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="w-full">
      {/* Page Title */}
      <PageTitle title="FitMindful | Enrolled Classes" />
      <div className="pb-8">
        <TitleSubtitle title="My Enrolled Classes" />
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="text-black text-md">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Classes Image</th>
              <th className="px-4 py-2">Classes Name</th>
              <th className="px-4 py-2">Seats Available</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((item, index) => (
              <tr key={item._id}>
                <td className="px-4 py-2">{offset + index + 1}</td>
                <td className="px-4 py-2">
                  {item.classImage.map((image) => (
                    <div key={image} className="mask  w-12 h-12">
                      <img src={image} alt="Avatar" />
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2">
                  {item.itemsName.map((name) => (
                    <div key={name} className="mask  w-full h-12">
                    <p key={name}>{name}</p>
                    </div>
                    
                  ))}
                </td>
                <td className="px-4 py-2">
                  {item.seats.map((seat) => (
                    <div key={seat} className="mask  w-full h-12">
                    <p key={seat}>{seat}</p>
                    </div>
                  ))}
                </td>
               
                <td className="px-4 py-2">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-8 mt-4">
        <div className="font-semibold">
          Total Quantity: {totalQuantity}
        </div>
        <div className="font-semibold">
          Total Price: ${totalPrice.toFixed(2)}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"flex"}
          previousLinkClassName={"p-2 border rounded-md m-1 bg-gray-200"}
          nextLinkClassName={"p-2 border rounded-md m-1 bg-gray-200"}
          pageClassName={"p-2 border rounded-md m-1 bg-gray-200"}
          pageLinkClassName={"text-blue-500"}
          activeClassName={"bg-bg-[#93DB1F] text-white"}
        />
      </div>
    </div>
  );
};

export default EnrolledClasses;
