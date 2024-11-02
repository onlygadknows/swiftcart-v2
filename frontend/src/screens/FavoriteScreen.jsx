import Product from "../components/Product.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/ProductListLoader.jsx";
import Message from "../components/Message.jsx";
import { useGetfavoriteProductsQuery } from "../slices/productsApiSlice.js";
import { useSelector } from "react-redux";

const FavoriteScreen = () => {
  const { data: products, isLoading, error } = useGetfavoriteProductsQuery();
  const cart = useSelector((state) => state.cart);
  const { favItems } = cart;
  const navigate = useNavigate();
  const favoriteProducts = products?.filter((product) =>
    favItems.some((favItem) => favItem._id === product._id)
  );

  useEffect(() => {
    if (favItems.length === 0) {
      navigate("/");
    }
  }, [favoriteProducts]);

  return (
    <div className="bg-white w-full">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-11 md:py-10 lg:max-w-7xl lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <Loader count={8} />
          </div>
        ) : error ? (
          <div className="mx-auto overflow-x-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:max-w-7xl lg:px-8">
            <Message variant="alert" message={"Unable to fetch Products 😌"} />{" "}
          </div>
        ) : (
          <>
            <h2 className="text-xl mb-8 font-lora font-semibold text-gray-700">
              Your Favorite Items
            </h2>
            <div className="grid grid-cols-1 mt-8 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {/* favItems.find((favItem) => favItem._id === product._id) */}
              {favoriteProducts.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoriteScreen;
