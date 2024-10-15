import Product from "../components/Product.jsx";
import { Link } from "react-router-dom";
import Loader from "../components/ProductListLoader.jsx";
import Message from "../components/Message.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  
  return (
    <div className="bg-white">

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <Loader count={12} />
           
          </div>
        ) : error ? (
          <Message variant="alert" message={error?.data?.message || error.error} />

        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group"
              >
                <Product product={product} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
