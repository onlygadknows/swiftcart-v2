import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorites, removeFromCart } from "../slices/cartSlice";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import CheckoutSteps from "../components/CheckoutSteps";
const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
  };

  const addToFavoritesHandler = (product) => {
    dispatch(
      addToFavorites({
        ...product,
      })
    );
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Steps */}
      <CheckoutSteps step1/>
      {/* Shopping cart section */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-11 md:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-lora font-semibold text-gray-700">
          Shopping Cart
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
                    className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm "
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <Link to={`/product/${item._id}`} className="md:w-36 w-32 min-h-28 bg-cover">
                        <img
                          className="md:w-36 h-28 w-32 hover:scale-110 transition"
                          src={item.image}
                          alt={item.name}
                        />
                      </Link>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="relative border-2 rounded-lg ">
                          <select
                            value={item.qty}
                            onChange={(e) =>
                              addToCartHandler(item, Number(e.target.value))
                            }
                            className="lg-24 sm:w-28 py-3 px-4 block rounded-lg text-sm font-poppins focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            {item.countInStock > 0 ? (
                              <>
                                <option
                                  className="text-center"
                                  value=""
                                  disabled
                                >
                                  Quantity
                                </option>{" "}
                                {/* Added value and disabled */}
                                {[...Array(item.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option> // Use value instead of defaultValue
                                  )
                                )}
                              </>
                            ) : (
                              <option disabled>Out of Stock</option> // Render out of stock as an option
                            )}
                          </select>
                          <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-8"></div>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
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

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <Link
                          to={`/product/${item._id}`}
                          className="text-base font-poppins text-gray-700 hover:underline"
                        >
                          {item.description}
                        </Link>

                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                            onClick={() => addToFavoritesHandler(item)}
                          >
                            <MdFavoriteBorder className="me-1.5 h-5 w-5" />
                            Adiv to Favorites
                          </button>

                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                            onClick={() => removeFromCartHandler(item._id)}
                          >
                            <svg
                              className="me-1.5 h-5 w-5 hover:animate-ping"
                              xmlns="http://www.w3.org/2000/svg"
                              widivh="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                stroke-widivh="2"
                                d="M6 18 17.94 6M18 18 6.06 6"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidiven mt-8 xl:block">
                <h3 className="text-2xl font-lora font-semibold text-gray-700">
                  People also bought
                </h3>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:mt-8">
                  <div className="space-y-6 overflow-hidden rounded-lg border-2 border-gray-200 bg-white p-6 shadow-sm">
                    <a href="#" className="overflow-hidden rounded">
                      <img
                        className="mx-auto h-44 w-auto max-w-full dark:hidiven"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                        alt="imac image"
                      />
                    </a>
                    <div>
                      <a
                        href="#"
                        className="text-lg md:text-xl font-lora font-semibold text-gray-700 hover:underline"
                      >
                        iMac 27”
                      </a>
                      <p className="mt-2 text-base font-poppins text-gray-500">
                        This generation has some improvements, including a
                        longer continuous battery life.
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        <span className="line-through font-poppins font-semibold">
                          $399.99
                        </span>
                      </p>
                      <p className="text-lg font-semibold leading-tight text-red-600">
                        $299
                      </p>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5">
                      <button
                        data-tooltip-target="favourites-tooltip-1"
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600"
                      >
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                          />
                        </svg>
                      </button>
                      <div
                        id="favourites-tooltip-1"
                        role="tooltip"
                        className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
                      >
                        Add to favourites
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                      <button
                        type="button"
                        className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <svg
                          className="-ms-2 me-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                          />
                        </svg>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm sm:p-6">
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
                </div>

                <button
                  className="flex w-full border hover:border-gray-200 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-poppins text-gray-700 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Proceed to Checkout
                </button>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 ">
                    {" "}
                    or{" "}
                  </span>
                  <Link
                    to="/"
                    title=""
                    className="inline-flex items-center gap-2 text-sm font-poppins text-primary-700 underline hover:no-underline"
                  >
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-widivh="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <form className="space-y-4">
                  <div>
                    <p className="mb-2 block text-xs font-poppins text-gray-700">
                      {" "}
                      Do you have a voucher or gift card?{" "}
                    </p>
                    <input
                      type="text"
                      id="voucher"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                      placeholder=""
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                  >
                    Apply Code
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
