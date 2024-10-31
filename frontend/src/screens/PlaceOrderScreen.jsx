import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

import { LuLoader2 } from "react-icons/lu";

import Message from "../components/Message";
const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    } else if (!cartItems) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, cartItems, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());

      navigate(`/order/${res._id}`);
    } catch (error) {}
  };

  return (
    <div className="bg-white min-h-screen">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 sm:mt-8 md:gap-2 lg:flex lg:items-start xl:gap-3 rounded-lg border p-4 flex-col">
          <h2 className="text-xl font-lora font-semibold text-gray-700">
            Shipping Details
          </h2>
          <div>
            <p className="text-base font-semibold font-lora text-gray-700">
              Address
            </p>
            <p className="text-base font-poppins text-gray-700">
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.country} {shippingAddress.postalCode}
            </p>
          </div>
          <div>
            <p className="text-base font-semibold font-lora text-gray-700">
              Address
            </p>
            <p className="text-base font-poppins text-gray-700">
              {shippingAddress.phone}
            </p>
          </div>
          <div>
            {" "}
            <p className="text-base font-semibold font-lora text-gray-700">
              Message
            </p>
            <p className="text-base font-poppins text-gray-700">
              {shippingAddress.message}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-11 md:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-lora font-semibold text-gray-700">
          Items Ordered
        </h2>
        {cartItems.length === 0 ? (
          <Message variant={alert} message="Oops! Your cart is empty! :(" />
        ) : (
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm "
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <Link
                        to={`/product/${item._id}`}
                        className="md:w-36 w-32 min-h-28 bg-cover"
                      >
                        <img
                          className="md:w-36 h-28 w-32 hover:scale-110 transition"
                          src={item.image}
                          alt={item.name}
                        />
                      </Link>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="text-center md:order-4 md:w-32">
                          <p className="text-base font-lora text-green-600">
                            <span className="text-gray-700 font-semibold">
                              Item Price
                            </span>{" "}
                            &#8369;{item.price.toFixed(2)}
                          </p>
                          <p className="text-base font-lora text-green-600">
                            <span className="text-gray-700 font-semibold">
                              Total Price
                            </span>{" "}
                            &#8369;{(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="w-full text-center min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <Link
                          to={`/product/${item._id}`}
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
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <h1 className="text-xl font-lora font-semibold text-gray-700">
                  Order summary
                </h1>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base font-semibold font-lora text-gray-700">
                        No. Item(s)
                      </p>
                      <p className="text-base font-poppins text-gray-700">
                        ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                        pc/s.
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base font-semibold font-lora text-gray-700">
                        Items Price
                      </p>
                      <p className="text-base font-poppins text-gray-700">
                        &#8369;{cart.itemsPrice}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base font-semibold font-lora text-gray-700">
                        Discount
                      </p>
                      <p className="text-base font-poppins text-green-600">
                        &#8369;{cart.itemsPrice > 1000 ? 199 : 0}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base font-semibold font-lora text-gray-700">
                        Shipping Price
                      </p>
                      <p className="text-base font-poppins text-gray-700">
                        &#8369;{cart.shippingPrice}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base font-semibold font-lora text-gray-700">
                        Tax
                      </p>
                      <div className="text-base font-poppins text-gray-700">
                        &#8369;{cart.taxPrice}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                    <p className="text-base font-lora font-semibold text-gray-700">
                      Total
                    </p>
                    <p className="text-base font-bold text-gray-700">
                      &#8369;{cart.totalPrice}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                    <p className="text-base font-lora font-semibold text-gray-700">
                      Pay via:
                    </p>
                    <p className="text-base font-bold text-gray-700">
                      {paymentMethod}
                    </p>
                  </div>
                </div>

                <button
                  className="flex w-full border bg-blue-600 text-white hover:border-gray-200 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-poppins hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order{" "}
                  {isLoading && <LuLoader2 className="ml-2 animate-spin" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
