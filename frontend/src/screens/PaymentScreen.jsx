import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <div class="bg-white py-8 antialiased  md:py-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div class="mx-auto max-w-5xl">
            <h2 class="text-xl font-semibold text-gray-600 sm:text-2xl">
              Payment
            </h2>

            <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
              <div class="mt-6 grow sm:mt-8 lg:mt-0">
                <div class="space-y-4 rounded-lg border-2 border-gray-100 p-6">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between gap-4">
                      <p class="font-normal font-poppins text-gray-500 ">
                        Address
                      </p>
                      <p class=" font-normal font-poppins text-green-600 ">
                        {shippingAddress.address}
                      </p>
                    </div>

                    <div class="flex items-center justify-between gap-4">
                      <p class="font-normal font-poppins text-gray-500 ">
                        City
                      </p>
                      <p class="font-normal font-poppins text-green-600">
                        {shippingAddress.city}
                      </p>
                    </div>

                    <div class="flex items-center justify-between gap-4">
                      <p class="font-normal font-poppins text-gray-500 ">
                        Postal Code
                      </p>
                      <p class="font-normal font-poppins text-green-600 ">
                        {shippingAddress.postalCode}
                      </p>
                    </div>

                    <div class="flex items-center justify-between gap-4">
                      <p class="font-normal font-poppins text-gray-500 ">
                        Country
                      </p>
                      <p class="font-normal font-poppins text-green-600 ">
                        {shippingAddress.country}
                      </p>
                    </div>
                    <div class="flex items-center justify-between gap-4">
                      <p class="font-normal font-poppins text-gray-500 ">
                        Phone
                      </p>
                      <p class="font-normal font-poppins text-green-600 ">
                        {shippingAddress.phone}
                      </p>
                    </div>
                    <div class="flex items-center justify-between flex-col gap-4">
                      <p class="font-normal font-poppins text-gray-500 ">
                        Additional Message
                      </p>

                      <p class="font-normal font-poppins text-gray-600 ">
                        {shippingAddress.message}
                      </p>
                    </div>
                  </div>

                  <div class="mt-6 flex items-center justify-center gap-8">
                    <form onSubmit={handleSubmit}>
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <label
                            htmlFor="DeliveryStandard"
                            className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-normal shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                          >
                            <div>
                              {/* <p className="text-gray-700">PayPal</p>

                              <p className="mt-1 text-gray-900">Free</p> */}
                              <img
                                class="h-8 w-auto "
                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                                alt=""
                              />
                            </div>

                            <input
                              type="radio"
                              name="paymentMethod"
                              value="PayPal"
                              id="PayPal"
                              className="sr-only"
                              label="PayPal or Credit Card"
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              checked
                            />
                          </label>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-center">
                        <button
                          type="submit"
                          className="inline-block sm:w-full rounded-lg bg-blue-500 hover:bg-blue-600 px-5 py-3 font-normal text-white"
                        >
                          Okay
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="mt-6 flex items-center justify-center gap-8">
                  <img
                    class="h-8 w-auto "
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <p class="mt-6 text-center text-gray-500  sm:mt-8 lg:text-left">
              Payment processed by{" "}
              <a
                href="#"
                title=""
                class="font-normal text-primary-700 underline hover:no-underline"
              >
                Gad Ashell
              </a>{" "}
              for{" "}
              <a
                href="#"
                title=""
                class="font-normal text-primary-700 underline hover:no-underline"
              >
                Paypal
              </a>
              - Davao City, Philippines
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
