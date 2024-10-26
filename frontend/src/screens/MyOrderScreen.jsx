import React from "react";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateConvertUtils";
import Message from "../components/Message";
const MyOrderScreen = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  console.log(orders);
  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <Message variant="alert" message={"Something went wrong!"} />
  ) : !orders || orders.length === 0 ? (
    <div className="bg-white w-full">
      <div className="mx-auto overflow-x-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:max-w-7xl lg:px-8">
        <Message variant="alert" message={"No Orders!"} />
      </div>
    </div>
  ) : (
    <div className="bg-white w-full">
      <div className="mx-auto overflow-x-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:max-w-7xl lg:px-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 font-lora">
                References
              </th>
              <th scope="col" className="px-6 py-3 font-lora">
                Date
              </th>
              <th scope="col" className="px-6 py-3 font-lora">
                Total
              </th>
              <th scope="col" className="px-6 py-3 font-lora">
                Paid
              </th>
              <th scope="col" className="px-6 py-3 font-lora">
                Delivered
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="bg-white border-b  ">
                <Link to={`/order/${order._id}`}>
                  <td
                    scope="row"
                    className="px-6 py-4 font-normal text-blue-900 whitespace-nowrap font-poppins"
                  >
                    {order._id}
                  </td>
                </Link>

                <td className="px-6 py-4 font-normal font-poppins">
                  {formatDate(order.updatedAt)}
                </td>
                <td className="px-6 py-4 font-normal font-poppins">
                  &#8369;{order.totalPrice}
                </td>
                <td className="px-6 py-4 font-normal font-poppins">
                  {order.isPaid ? (
                    <span className="text-blue-500">Paid</span>
                  ) : (
                    <span className="text-red-500">Not Paid</span>
                  )}
                </td>
                <td className="px-6 py-4 font-normal font-poppins">
                  {order.isDelivered ? (
                    <span className="text-blue-500">{order.deliveredAt}</span>
                  ) : (
                    <span className="text-red-500">Not Yet</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderScreen;
