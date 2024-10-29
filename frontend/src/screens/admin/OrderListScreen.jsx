import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { formatDate } from "../../utils/dateConvertUtils";
import TableLoader from "../../components/TableLoader";
const OrderListScreen = () => {
  const { data: orders, isLoading, refetch, error } = useGetOrdersQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);

  return isLoading ? (
    <TableLoader />
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
        <h2 className="text-2xl font-lora mb-4 text-gray-700">
          Admin &gt; Order History
        </h2>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 font-lora">
                Name
              </th>
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
              <tr key={order._id} className="bg-white border-b  ">
                <td className="px-6 py-4 font-normal font-poppins">
                  {order.user?.name}
                </td>

                <td
                  scope="row"
                  className="px-6 py-4 font-normal text-blue-900 whitespace-nowrap font-poppins"
                >
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </td>
                <td className="px-6 py-4 font-normal font-poppins">
                  {formatDate(order.updatedAt)}
                </td>
                <td className="px-6 py-4 font-normal font-poppins">
                  &#8369;{order.totalPrice}
                </td>
                <td className="px-6 py-4 font-normal font-poppins">
                  {order.isPaid ? (
                    <span className="text-blue-900">Paid</span>
                  ) : (
                    <span className="text-red-500">Not Paid</span>
                  )}
                </td>
                <td className="px-6 py-4 font-normal font-poppins">
                  {order.isDelivered ? (
                    <span className="text-blue-900">
                      {formatDate(order.deliveredAt)}
                    </span>
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

export default OrderListScreen;
