import Rating from "./Rating";
import { Link } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";

import {
  addToFavorites,
  removeFromFav,
} from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { favItems } = cart;

  const addToFavoritesHandler = (product) => {
    const isFavorite = favItems.find((favItem) => favItem._id === product._id);
    if (isFavorite) {
      dispatch(removeFromFav(product._id));
    } else {
      dispatch(addToFavorites(product));
    }
  };
  return (
    <>
      <div className="w-full h-48 overflow-hidden rounded-lg bg-gray-200 relative">
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="group"
        >
          <img
            alt={product.name}
            src={product.image}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </Link>
      </div>
      <div className="flex mt-5 items-center gap-4">
        <button
          type="button"
          className={`inline-flex items-center text-sm font-medium ${
            favItems.find((favItem) => favItem._id === product._id)
              ? "text-red-500"
              : "text-gray-700"
          } hover:text-gray-900 hover:underline`}
          onClick={() => addToFavoritesHandler(product)}
        >
          <MdFavoriteBorder className={`me-1.5 h-5 w-5`} />
          {favItems.find((favItem) => favItem._id === product._id)
            ? "Dislike"
            : "Like"}
        </button>

      
      </div>
      <div className="h-10 w-full">
      <h3 className="text-sm font-poppins h-10 flex items-center justify-start p-1 text-gray-700">
        {product.name}
      </h3>
      </div>
     
      <div className="flex items-center justify-between w-full">
        <p className="mt-1 text-md font-poppins font-medium text-gray-600 flex-1">
          &#x20B1; {product.price}
        </p>
        <Rating value={product.rating} />
      </div>
    </>
  );
};

export default Product;
