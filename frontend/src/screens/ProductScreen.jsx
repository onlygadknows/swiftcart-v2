import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import ProductLoader from "../components/ProductLoader";
import Rating from "../components/Rating";
import Message from "../components/Message";
import { FaHeart } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";

import PropTypes from "prop-types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart, faShareAlt, faStar } from "@fortawesome/free-solid-svg-icons";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  useEffect(() => {
    refetch();
  }, []);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
    navigate("/cart");
  };
  return (
    <div className="w-full mb-5">
      {isLoading ? (
        <ProductLoader />
      ) : error ? (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:max-w-7xl lg:px-8">
          <Message
            variant="alert"
            message={error?.data?.message || error.error}
          />
        </div>
      ) : (
        <div className="mt-10 h-auto mx-auto max-w-2xl px-4 sm:px-6 sm:flex sm:justify-between sm:flex-col sm:gap-2 md:gap-1 lg:grid-rows-1 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-5">
          <div
            key={product._id}
            className="col-start-1 flex items-center justify-center sm:mt-5 lg:mt-0 p-5 rounded-md"
          >
            <img
              src={product.image}
              alt={product.name}
              draggable="false"
              className="lg:h-[600px] object-cover rounded-lg"
            />
          </div>
          <div className="col-start-2 flex flex-col justify-center rounded-md p-0 sm:p-5">
            <h1 className="font-semibold font-lora text-gray-700 uppercase text-4xl">
              {product.name}
            </h1>
            <p className="text-poppins text-gray-500 font-semibold italic pt-5">
              {product.description}
            </p>

            <div className="h-auto w-full flex flex-col align-center justify-between mt-5 gap-5 md:pb-10 sm:flex-row">
              {/* left-column */}
              <div className="flex align-center flex-col gap-0 justify-between flex-1">
                <div className="flex align-center justify-center flex-col">
                  <h1 className="font-semibold text-gray-600 text-2xl text-center">
                    &#8369;{product.price}
                  </h1>

                  <div className="flex items-center justify-center flex-col">
                    <p className="text-gray-700 flex-1">
                      <Rating value={product.rating} />
                    </p>
                  </div>
                </div>
                <div className="flex align-center justify-center flex-col md:text-left text-center">
                  <p className="font-normal font-poppins text-gray-600 text-center">
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                  <p
                    className={`font-poppins text-center ${
                      product.countInStock > 0
                        ? product.countInStock < 4
                          ? "text-red-500"
                          : "text-blue-500"
                        : "text-gray-700"
                    }`}
                  >
                    {product.countInStock} piece/s left
                  </p>
                </div>
              </div>

              <div className="sm:w-screen flex flex-col gap-1 align-center justify-between flex-1">
                {/* button */}
                <div className="w-full flex items-center justify-between">
                  <div className="relative border rounded-lg flex-1">
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="py-3 px-4 pe-16 block w-full rounded-lg text-sm font-poppins focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {product.countInStock > 0 ? (
                        <>
                          <option value="" disabled>
                            Select Quantity
                          </option>{" "}
                          {/* Added value and disabled */}
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option> // Use value instead of defaultValue
                          ))}
                        </>
                      ) : (
                        <option disabled>Out of Stock</option> // Render out of stock as an option
                      )}
                    </select>
                  </div>
                  <div className="flex-1 flex items-center justify-between px-5">
                    <button className="hover:bg-blue-600 rounded hover:bg-opacity-10 text-blue-500 mr-2 px-3 py-2 text-lg font-bold">
                      <FaHeart className="text-2xl" />
                    </button>
                    <button className="hover:bg-blue-600 rounded hover:bg-opacity-10 text-blue-500 px-3 py-2 text-lg font-bold">
                      <FaShareAlt className="text-2xl" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-blue-500 font-poppins text-gray-100 py-5 px-5 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm text-center flex items-center justify-center "
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                  <MdAddShoppingCart className="ml-2 text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>

        // <>
        //   <section className="py-14 md:py-24 bg-white text-zinc-900 relative overflow-hidden z-10">
        //     <div className="container px-4 mx-auto">
        //       <div className="grid grid-cols-2 gap-6">
        //         <div className="col-span-2 flex items-center justify-center lg:col-span-1">
        //           <img
        //             src={product.image}
        //             alt={product.name}
        //             draggable="false"
        //             className="lg:h-[600px] object-cover rounded-lg"
        //           />{" "}
        //         </div>
        //         <div className="col-span-2 lg:col-span-1">
        //           <div className="mb-6 lg:mb-12">
        //             <h1 className="text-2xl leading-none md:text-4xl font-poppins mb-4">
        //               {product.name}
        //             </h1>
        //             <h3 className="text-2xl text-blue-600 font-medium">
        //               {" "}
        //               {product.price.toLocaleString("en-US", {
        //                 style: "currency",
        //                 currency: "PHP",
        //               })}
        //             </h3>
        //             <div className="opacity-70 flex mb-6">
        //               <Rating value={product.rating} />
        //             </div>
        //           </div>

        //           <div>
        //             <div className="mb-6">
        //               <h5 className="font-medium mb-2">
        //                 QTY {product.countInStock}
        //               </h5>
        //               <div className="h-11 border dark:border-slate-700 rounded-full flex w-36 relative mt-4 overflow-hidden">
        //                 <button
        //                   className="w-full pb-1 inline-flex justify-center items-center text-2xl font-medium border-r dark:border-slate-700 text-blue-600 hover:bg-blue-600 hover:bg-opacity-20"
        //                   type="button"
        //                   onClick={() => setValue(parseInt(value) - 1)}
        //                 >
        //                   -
        //                 </button>
        //                 <input
        //                   className="text-lg font-bold px-4 pl-5 py-1 inline-flex justify-center max-w-[60px] text-center bg-transparent focus:outline-none"
        //                   type="number"
        //                   placeholder=""
        //                   value={value}
        //                   onChange={(e) => setValue(e.target.value)}
        //                 />
        //                 <button
        //                   className="w-full pb-1 inline-flex justify-center items-center text-2xl font-medium border-l dark:border-slate-700 text-blue-600 hover:bg-blue-600 hover:bg-opacity-10"
        //                   type="button"
        //                   onClick={() => setValue(parseInt(value) + 1)}
        //                 >
        //                   +
        //                 </button>
        //               </div>{" "}
        //             </div>

        //             <div className="flex items-center my-7">
        //               <button className="bg-blue-600 border border-blue-600 text-white text-sm rounded uppercase hover:bg-opacity-90 px-10 py-2.5 mr-2">
        //                 Buy Now
        //               </button>
        //               <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm rounded uppercase px-6 py-2.5 mr-2">
        //                 Add To Cart
        //               </button>
        // <button className="hover:bg-blue-600 rounded hover:bg-opacity-10 text-blue-600 mr-2 px-3 py-2 text-lg font-bold">
        //   <FaHeart />
        // </button>
        // <button className="hover:bg-blue-600 rounded hover:bg-opacity-10 text-blue-600 px-3 py-2 text-lg font-bold">
        //   <FaShareAlt />
        // </button>
        //             </div>

        //             <p className="opacity-70 font-poppins lg:mr-56 xl:mr-80">
        //               {product.description}
        //             </p>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </section>
        // </>
      )}
    </div>
  );
};

export default ProductScreen;
