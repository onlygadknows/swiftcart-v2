import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import ProductLoader from "../components/ProductLoader";
import Rating from "../components/Rating";
import Message from "../components/Message";
const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

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
        <Message variant="alert" message={error?.data?.message || error.error} />
      ) : (
        <div className="h-auto mx-auto max-w-2xl px-4 sm:px-6 sm:flex sm:justify-between sm:flex-col sm:gap-2 md:gap-1 lg:grid-rows-1 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-5">
          <div
            key={product._id}
            className="col-start-1 flex items-center justify-center sm:mt-5 lg:mt-0 p-5 border rounded-md shadow-md"
          >
            <img
              src={product.image}
              alt={product.name}
              draggable="false"
              className="lg:h-[600px] object-cover rounded-lg"
            />
          </div>
          <div className="col-start-2 flex flex-col justify-center rounded-md p-5">
            <h1 className="font-semibold font-lora text-gray-700 uppercase text-3xl">
              {product.name}
            </h1>
            <p className="text-poppins text-gray-700 font-semibold italic pt-5">
              {product.description}
            </p>

            <div className="h-auto w-full flex flex-col align-center justify-between mt-5 gap-5 md:pb-10 sm:flex-row">
              {/* left-column */}
              <div className="flex align-center flex-col gap-0 justify-between flex-1 border-2 rounded-md shadow-sm">
                <div className="flex align-center justify-center flex-col">
                  <p className="font-semibold text-green-600 text-xl text-center">
                     &#8369;{product.price}
                  </p>

                  <div className="flex items-center justify-center flex-col">
                    <p className="text-gray-700 flex-1">
                      {product.numReviews} reviews
                    </p>
                    <span className="flex items-center justify-around flex-1">
                      {" "}
                      <Rating value={product.rating} />
                    </span>
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
                <div className="w-full">
                  <div className="relative border-2 rounded-lg ">
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
                    <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-8"></div>
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-blue-500 font-poppins text-gray-100 py-5 px-5 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm text-center flex items-center justify-center "
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                  <MdAddShoppingCart className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
