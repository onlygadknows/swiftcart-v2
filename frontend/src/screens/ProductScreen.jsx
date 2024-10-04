import { useParams } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { ColorRing } from 'react-loader-spinner'

const ProductScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  return (
    <div className="w-full flex">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
        <ColorRing
          height="100"
          width="100"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }} // Correctly formatted
          wrapperClass="loading-wrapper" // Optional: add a class name if needed
        />
      </div>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <div className="h-auto mx-auto max-w-2xl px-4 sm:px-6 sm:flex sm:justify-between sm:flex-col sm:gap-2 md:gap-1 lg:grid-rows-1 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-5">
          <div
            key={product._id}
            className="col-start-1 flex items-center justify-center sm:mt-5 lg:mt-0 p-5"
          >
            <img src={product.image} alt={product.name} draggable="false" />
          </div>
          <div className="col-start-2 flex flex-col justify-center bg-slate-100 rounded-md shadow-inner p-10">
            <h1 className="font-bold uppercase text-xl">{product.name}</h1>
            <p className="text-poppins italic pt-5">{product.description}</p>

            <div className="h-auto w-full flex flex-col md:flex-row align-center justify-between mt-5 gap-5 md:pb-10">
              <div className="flex align-center justify-center flex-col">
                <p className="font-semibold text-orange-400 text-lg text-center md:text-left">
                  Price &#8369; {product.price}
                </p>
                <p className="font-semibold text-black text-center md:text-left">
                  {product.numReviews} reviews
                </p>
              </div>

              <button
                type="button"
                className="bg-blue-500 font-poppins text-gray-100 py-5 px-5 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm text-center flex items-center justify-center dark:focus:ring-gray-500 me-2 mb-2"
                disabled={product.countInStock === 0}
              >
                <MdAddShoppingCart className="mr-2" />
                Add to Cart
              </button>
              <div className="flex align-center justify-center flex-col md:text-left text-center">
                <span className="font-semibold font-poppins">
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
                <p className="font-poppins text-center">
                  <span
                    className={
                      product.countInStock > 0
                        ? product.countInStock < 4
                          ? "text-red-500"
                          : "text-blue-500"
                        : "text-gray-500"
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
