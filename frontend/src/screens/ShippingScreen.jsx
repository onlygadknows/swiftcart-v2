import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";
const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [errors, setErrors] = useState({});

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [phone, setPhone] = useState(shippingAddress?.phone || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [message, setMessage] = useState(shippingAddress?.message || "");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!address.trim()) {
      validationErrors.address = "Please enter your Address";
    }

    if (!city.trim()) {
      validationErrors.city = "Please enter your city";
    }

    if (!phone.trim()) {
      validationErrors.phone = "Please enter your Phone number";
    } else if (/\S+@\S\.\S+/.test(phone)) {
      validationErrors.phone = "Phone entered should be numeric!";
    } else if (phone.length !== 11) {
      validationErrors.phone = "Please enter 11 digit Phone number";
    }

    if (!country.trim()) {
      validationErrors.country = "Please enter your Country";
    }

    if (!postalCode.trim()) {
      validationErrors.postalCode = "Please enter your Postal Code";
    }
    if (!message.trim()) {
      validationErrors.message =
        "Please enter your Message for additional information";
    }

    if (Object.keys(validationErrors).length > 0) {
      // Set the validation errors and prevent form submission
      setErrors(validationErrors);
    } else {
      // Proceed with form submission
      setErrors({}); // Clear errors
      dispatch(
        saveShippingAddress({
          address,
          city,
          postalCode,
          country,
          phone,
          message,
        })
      );
      navigate("/payment");
    }
  };
  return (
    <div className="bg-white">
      <CheckoutSteps step1 step2 />
      <Meta title="SwiftCart - Shipping details" />

      <div className="mx-auto max-w-screen-lg px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <h1 className="text-3xl font-poppins uppercase text-gray-700 mb-10">
              Please enter your shipping details
            </h1>
            <p className="max-w-xl text-lg font-poppins text-gray-600">
              This app was created by{" "}
              <a
                href="https://www.linkedin.com/in/gadashellsususco/"
                target="_blank"
                className="text-blue-500"
              >
                Gad Ashell
              </a>{" "}
              , demonstrating a fully functional eCommerce platform with
              seamless user experience, modern design, and integrated features
              such as product catalogs, shopping carts, secure checkout, and
              customer reviews—all optimized for performance and scalability.
            </p>

            <div className="mt-8">
              <p className="text-2xl font-bold text-pink-600 font-lora">
                gadashellsususco7@gmail.com
              </p>

              <p className="mt-2 italic text-gray-700 font-poppins">
                Davao City, Philippines 8000
              </p>
            </div>
          </div>

          <div className="rounded-lg p-8 lg:col-span-3 lg:p-12 border  border-gray-300">
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="h-[4.2rem]">
                <label className="sr-only" htmlFor="name">
                  Address
                </label>
                <input
                  className={`${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="Complete Address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && (
                  <p className="text-red-600 text-xs mt-1 font-poppins">
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="h-[4.2rem]">
                  <label className="sr-only" htmlFor="email">
                    City
                  </label>
                  <input
                    className={`${
                      errors.city ? "border-red-500" : "border-gray-300"
                    } bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    placeholder="City"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {errors.city && (
                    <p className="text-red-600 text-xs mt-1 font-poppins">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div className="h-[4.2rem]">
                  <label className="sr-only" htmlFor="phone">
                    Phone
                  </label>
                  <input
                     className={`${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    placeholder="Phone Number"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1 font-poppins">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
              <div className="h-[4.2rem]">
                <label className="sr-only" htmlFor="name">
                  Postal Code
                </label>
                <input
                   className={`${
                    errors.postalCode ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="Postal Code"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                {errors.postalCode && (
                  <p className="text-red-600 text-xs mt-1 font-poppins">
                    {errors.postalCode}
                  </p>
                )}
              </div>
              <div className="h-[4.2rem]">
                <label className="sr-only" htmlFor="name">
                  Country
                </label>
                <input
                  className={`${
                    errors.country ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="Country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                {errors.country && (
                  <p className="text-red-600 text-xs mt-1 font-poppins">
                    {errors.country}
                  </p>
                )}
              </div>

              <div className="rounded-lg h-[7em]">
                <label className="sr-only" htmlFor="message">
                  Message
                </label>

                <textarea
                   className={`${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="Message"
                  rows="3"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                {errors.message && (
                  <p className="text-red-600 text-xs mt-1 font-poppins">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="flex w-full border bg-blue-600 text-white hover:border-gray-200 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-poppins hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                >
                  Okay
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingScreen;
