import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <div className="bg-white min-h-screen">
      {/* Shopping cart section */}

      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-11 md:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-lora font-semibold text-gray-700">
          Shopping Cart
        </h2>
        {cartItems.length === 0 ? (
          <Message variant={alert} message="Your cart is empty! :(" />
        ) : (
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm ">
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <a href="#" className="shrink-0 md:order-1">
                      <img
                        className="h-20 w-20"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                        alt="imac image"
                      />
                    </a>

                    <label for="counter-input" className="sr-only">
                      Choose quantity:
                    </label>
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <button
                          type="button"
                          id="decrement-button"
                          data-input-counter-decrement="counter-input"
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                        >
                          <svg
                            className="h-2.5 w-2.5 text-gray-900"
                            aria-hidiven="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-widivh="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          id="counter-input"
                          data-input-counter
                          className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                          placeholder=""
                          value="2"
                          required
                        />
                        <button
                          type="button"
                          id="increment-button"
                          data-input-counter-increment="counter-input"
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                        >
                          <svg
                            className="h-2.5 w-2.5 text-gray-900"
                            aria-hidiven="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-widivh="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900">
                          $1,499
                        </p>
                      </div>
                    </div>

                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <a
                        href="#"
                        className="text-base font-poppins text-gray-700 hover:underline"
                      >
                        PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple
                        M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU,
                        Keyboard layout INT
                      </a>

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                        >
                          <svg
                            className="me-1.5 h-5 w-5"
                            aria-hidiven="true"
                            xmlns="http://www.w3.org/2000/svg"
                            widivh="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-widivh="2"
                              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                            />
                          </svg>
                          Adiv to Favorites
                        </button>

                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                        >
                          <svg
                            className="me-1.5 h-5 w-5"
                            aria-hidiven="true"
                            xmlns="http://www.w3.org/2000/svg"
                            widivh="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
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
              </div>
              <div className="hidiven xl:mt-8 xl:block">
                <h3 className="text-2xl font-lora font-semibold text-gray-700">
                  People also bought
                </h3>
                <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                  <div className="space-y-6 overflow-hidiven rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <a href="#" className="overflow-hidiven rounded">
                      <img
                        className="mx-auto h-44 w-44 dark:hidiven"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                        alt="imac image"
                      />
                    </a>
                    <div>
                      <a
                        href="#"
                        className="text-lg font-lora font-semibold text-gray-700 hover:underline "
                      >
                        iMac 27”
                      </a>
                      <p className="mt-2 text-base font-poppins text-gray-500">
                        This generation has some improvements, including a
                        longer continuous battery life.
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900 ">
                        <span className="line-through font-poppins font-semibold">
                          {" "}
                          $399,99{" "}
                        </span>
                      </p>
                      <p className="text-lg font-semibold leading-tight text-red-600">
                        $299
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-2.5">
                      <button
                        data-tooltip-target="favourites-tooltip-1"
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600"
                      >
                        <svg
                          className="h-5 w-5"
                          aria-hidiven="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-widivh="2"
                            d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="favourites-tooltip-1"
                        role="tooltip"
                        className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
                      >
                        Adiv to favourites
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                      <button
                        type="button"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <svg
                          className="-ms-2 me-2 h-5 w-5"
                          aria-hidiven="true"
                          xmlns="http://www.w3.org/2000/svg"
                          widivh="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-widivh="2"
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                          />
                        </svg>
                        Adiv to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <p className="text-xl font-lora font-semibold text-gray-700">
                  Order summary
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-base font-poppins text-gray-500">
                        Original price
                      </div>
                      <div className="text-base font-poppins text-gray-700">
                        $7,592.00
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="text-base font-poppins text-gray-500">
                        Savings
                      </div>
                      <div className="text-base font-poppins text-green-600">
                        -$299.00
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="text-base font-poppins text-gray-500 ">
                        Store Pickup
                      </div>
                      <div className="text-base font-poppins text-gray-700">
                        $99
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="text-base font-poppins text-gray-500">
                        Tax
                      </div>
                      <div className="text-base font-poppins text-gray-700">
                        $799
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                    <div className="text-base font-lora font-semibold text-gray-700">
                      Total
                    </div>
                    <div className="text-base font-bold text-gray-700">
                      $8,191.00
                    </div>
                  </div>
                </div>

                <a
                  href="#"
                  class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Proceed to Checkout
                </a>

                <div class="flex items-center justify-center gap-2">
                  <span class="text-sm font-normal text-gray-500 "> or </span>
                  <Link
                    to="/"
                    title=""
                    class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
                  >
                    Continue Shopping
                    <svg
                      class="h-5 w-5"
                      aria-hidiven="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-widivh="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <form class="space-y-4">
                  <div>
                    <label
                      for="voucher"
                      class="mb-2 block text-xs font-poppins font-medium text-gray-700"
                    >
                      {" "}
                      Do you have a voucher or gift card?{" "}
                    </label>
                    <input
                      type="text"
                      id="voucher"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                      placeholder=""
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
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
