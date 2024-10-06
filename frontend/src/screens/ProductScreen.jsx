import { useParams } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import ProductLoader from "../components/ProductLoader";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  return (
    <div className="w-full mb-5">
      {isLoading ? (
      <ProductLoader />
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <div className="h-auto mx-auto max-w-2xl px-4 sm:px-6 sm:flex sm:justify-between sm:flex-col sm:gap-2 md:gap-1 lg:grid-rows-1 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-5">
          <div
            key={product._id}
            className="col-start-1 flex items-center justify-center sm:mt-5 lg:mt-0 p-5 border rounded-md shadow-md"
          >
            <img src={product.image} alt={product.name} draggable="false"  className="lg:h-[600px] object-cover rounded-lg" />
          </div>
          <div className="col-start-2 flex flex-col justify-center rounded-md p-10">
            <h1 className="font-semibold font-lora text-gray-700 uppercase text-3xl">{product.name}</h1>
            <p className="text-poppins text-gray-700 font-semibold italic pt-5">{product.description}</p>

            <div className="h-auto w-full flex flex-col md:flex-row align-center justify-between mt-5 gap-5 md:pb-10">
              <div className="flex align-center justify-center flex-col">
                <p className="font-semibold text-orange-400 text-lg text-center md:text-left">
                  Price &#8369; {product.price}
                </p>
                <p className="font-semibold text-gray-700 text-center md:text-left">
                  {product.numReviews} reviews
                </p>
              </div>

              <button
                type="button"
                className="bg-blue-500 font-poppins text-gray-100 py-5 px-5 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm text-center flex items-center justify-center dark:focus:ring-gray-500 me-2 mb-2"
                disabled={product.countInStock === 0}
              >
                Add to Cart
                <MdAddShoppingCart className="ml-2" />

              </button>
              <div className="flex align-center justify-center flex-col md:text-left text-center">
                <span className="font-semibold font-poppins text-gray-700">
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
                <p className="font-poppins text-center">
                  <span
                    className={
                      product.countInStock > 0
                        ? product.countInStock < 4
                          ? "text-red-500"
                          : "text-blue-500"
                        : "text-gray-700"
                    }
                  >
                    {product.countInStock} piece/s left
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
    
  );
};

export default ProductScreen;
