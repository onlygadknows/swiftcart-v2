import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../utils/dateConvertUtils";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalCliendIdQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import { LuLoader2 } from "react-icons/lu";
import OrderLoader from "../components/OrderLoader";
import Message from "../components/Message";
const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalCliendIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "PHP",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment succesful");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment succesful");
  }

  function onError(err) {
    toast.error(err.message);
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered!");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <>
    <OrderLoader/>
    </>
  ) : isError ? (
    <Message variant="alert" message={"Something went wrong!"} />
) : (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 sm:mt-8 md:gap-2 lg:flex lg:items-start xl:gap-3 rounded-lg border bg-gray-50 border-gray-300  p-4 flex-col">
          <h2 className="text-xl font-lora font-semibold text-gray-700">
            Reference # {orderId}
          </h2>
        </div>

        <div className="mt-6 sm:mt-8 md:gap-2 lg:flex lg:items-start xl:gap-3 rounded-lg border bg-gray-50 border-gray-300  p-4 flex-col">
          <h2 className="text-xl font-lora font-semibold text-gray-700">
            Shipping Details
          </h2>
          <div>
            <p className="text-base font-semibold font-lora text-gray-700">
              Name
            </p>
            <p className="text-base font-poppins text-gray-700">
              {order.user.name}
            </p>
          </div>
          <div>
            <p className="text-base font-semibold font-lora text-gray-700">
              Email Address
            </p>
            <p className="text-base font-poppins text-gray-700">
              {order.user.email}
            </p>
          </div>
          <div>
            <p className="text-base font-semibold font-lora text-gray-700">
              Address
            </p>
            <p className="text-base font-poppins text-gray-700">
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              City, {order.shippingAddress.country},{" "}
              {order.shippingAddress.postalCode} -{" "}
              {order.isDelivered ? (
                <span className="text-base font-poppins text-blue-900">
                  Delivered on {formatDate(order.deliveredAt)}
                </span>
              ) : (
                <span className="text-base font-poppins text-red-700">
                  Not Delivered
                </span>
              )}
            </p>
          </div>
          <div>
            <p className="text-base font-semibold font-lora text-gray-700">
              Contact
            </p>
            <p className="text-base font-poppins text-gray-700">
              +63{order.shippingAddress.phone}
            </p>
          </div>
          <div>
            <p className="text-base font-semibold font-lora text-gray-700">
              Additional Message
            </p>
            <p className="text-base font-poppins text-gray-700">
              {order.shippingAddress.message}
            </p>
          </div>
          <div>
            {" "}
            <p className="text-base font-semibold font-lora text-gray-700">
              Payment Method
            </p>
            <p className="text-base font-poppins text-gray-700">
              {order.paymentMethod} -{" "}
              {order.isPaid ? (
                <span className="text-base font-poppins text-blue-900">
                  Paid
                </span>
              ) : (
                <span className="text-base font-poppins text-red-700">
                  Not Paid
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-11 md:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-lora font-semibold text-gray-700">
          Items Bought
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {order.orderItems.map((item, index) => (
                <div className="rounded-lg border bg-gray-50 border-gray-300  p-4 shadow-sm ">
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <Link
                      to={`/product/${item.product}`}
                      className="md:w-36 w-32 min-h-28 bg-cover"
                    >
                      <img
                        className="md:w-36 h-28 w-32 hover:scale-110 transition"
                        src={item.image}
                        alt={item.name}
                      />
                    </Link>
                    <div className="flex items-center justify-between md:order-3 md:justify-end w-[12rem]">
                      <div className="text-center md:order-4 md:w-full">
                        <p className="text-base font-poppins text-gray-600">
                       {item.qty} x <span>&#x20B1;</span>
                            {item.price} = <span>&#x20B1;</span>
                           {( item.qty * item.price).toFixed(2) }
                        
                        </p>
                       
                      </div>
                    </div>

                    <div className="text-center w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-base font-poppins text-gray-700 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border bg-gray-50 border-gray-300  p-4 shadow-sm sm:p-6">
              <h1 className="text-xl font-lora font-semibold text-gray-700">
                Order summary
              </h1>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-base font-semibold font-lora text-gray-700">
                      Items Price
                    </p>
                    <p className="text-base font-poppins text-gray-700">
                      &#x20B1; {order.itemsPrice}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-base font-semibold font-lora text-gray-700">
                      Discount
                    </p>
                    <p className="text-base font-poppins text-green-600">
                      &#8369;{order.itemsPrice > 1000 ? 199 : 0}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-base font-semibold font-lora text-gray-700">
                      Shipping Price
                    </p>
                    <p className="text-base font-poppins text-gray-700">
                      &#x20B1; {order.shippingPrice}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-base font-semibold font-lora text-gray-700">
                      Tax
                    </p>
                    <div className="text-base font-poppins text-gray-700">
                      &#x20B1; {order.taxPrice}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                  <p className="text-base font-lora font-semibold text-gray-700">
                    Total
                  </p>
                  <p className="text-base font-bold text-gray-700">
                    &#x20B1; {order.totalPrice}
                  </p>
                </div>
              </div>
              {!order.isPaid && (
                <>
                  {loadingPay && <LuLoader2 className="animate-spin" />}

                  {isPending ? (
                    <>
                      <div className="flex items-center justify-center">
                        <LuLoader2 className="animate-spin text-center" />
                      </div>
                    </>
                  ) : (
                    <div>
                      {/* <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: "10px" }}
                      >
                        Test Pay Order
                      </Button> */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </>
              )}
              {loadingDeliver && <LuLoader2 className="animate-spin" />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <>
                    <button
                      className="flex w-full border bg-blue-600 text-white hover:border-gray-200 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-poppins hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                      onClick={deliverOrderHandler}
                    >
                      Mark as Delivered
                    </button>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default OrderScreen;
