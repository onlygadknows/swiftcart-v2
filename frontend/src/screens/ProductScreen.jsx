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
import ProductReviewScreen from "./ProductReviewScreen";
import Meta from "../components/Meta";

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
            <Meta title="SwiftCart - Add to Cart" />

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
              className="lg:h-[400px] object-cover rounded-lg"
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
              <div className="bg-gray-50 border-gray-300 flex align-center flex-col gap-0 justify-between border rounded-lg flex-1">
                <div className="flex align-center justify-center  flex-col">
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      {product.countInStock > 0 ? (
                        <>
                          <option value="" disabled>
                            Quantity
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
      )}
      <>
      <ProductReviewScreen productId={productId} />
      </>
    </div>
  );
};

export default ProductScreen;
