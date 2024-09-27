import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/products/${productId}`
      );
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="w-full min-h-screen flex">
      <div className="h-auto mx-auto max-w-2xl px-4 sm:px-6 sm:flex sm:justify-between sm:flex-col sm:gap-2 md:gap-1 lg:grid-rows-1 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-5">
        <div
          key={product._id}
          className="col-start-1 flex items-center justify-center sm:mt-5 lg:mt-0"
        >
          <img src={product.image} alt={product.name} draggable="false" />
        </div>
        <div className="col-start-2 flex flex-col justify-center">
          <h1 className="font-bold uppercase text-xl">{product.name}</h1>
          <p className="text-poppins italic pt-5">{product.description}</p>

          <div className="h-auto w-full flex align-center justify-between mt-5 gap-5 md:pb-10">
            <div className="flex align-center justify-center flex-col">
              <p className="font-semibold text-orange-400 text-lg">
                Price &#8369; {product.price}
              </p>
              <p className="font-semibold text-black">
                {product.numReviews} reviews
              </p>
            </div>
            <button
              type="button"
              className="text-blue-500 font-poppins bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-10 py-5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
            <div className="flex align-center justify-center flex-col">
              <span className="font-semibold font-poppins">
                {" "}
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </span>
              <p className="font-poppins">
                Count in Stock -{" "}
                <span
                  className={
                    product.countInStock > 0
                      ? product.countInStock < 4
                        ? "text-red-500" // If less than 3, use red
                        : "text-blue-500" // If 3 or more, use black
                      : "text-gray-500" // If out of stock, use gray
                  }
                >
                  {product.countInStock} piece/s left
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
