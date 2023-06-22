import React, { useState } from 'react';
import PageTitle from '../../../Shared/PageTitle/PageTitle';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import usePayment from '../../../../hooks/usePayment';
import TitleSubtitle from '../../../Shared/TitleSubtitle/TitleSubtitle';

const PaymentHistory = () => {
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
    (sum, item) => item.price  + sum,
    0
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="w-full">
      {/* Page Title */}
      <PageTitle title="FitMindful | Dashboard" />
      <div className="pb-8">
        <TitleSubtitle title="Transaction History" />
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full shadow-lg">
          {/* head */}
          <thead className="text-black text-md">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Classes Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Transaction Time</th>
              <th className="px-4 py-2">TransactionId</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((item, index) => (
              <tr key={item._id}>
                <td className="px-4 py-2">{offset + index + 1}</td>
                <td className="px-4 py-2">
                  {item.itemsName.map((name) => (
                    <p key={name}>{name}</p>
                  ))}
                </td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">${item.price}</td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-10 my-4">
        <div className="font-semibold">
          Total Quantity: {totalQuantity}
        </div>
        <div className="font-semibold">
          Total Price: ${totalPrice.toFixed(2)}
        </div>
      </div>
      <div className="flex justify-center mt-48">
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

export default PaymentHistory;
