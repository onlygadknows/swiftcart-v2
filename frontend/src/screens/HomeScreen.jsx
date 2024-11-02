import Product from "../components/Product.jsx";
import { useParams } from "react-router-dom";
import Loader from "../components/ProductListLoader.jsx";
import Message from "../components/Message.jsx";
import ProductSlider from "../components/Slider.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Pagination from "../components/Pagination.jsx";
import Meta from "../components/Meta.jsx";
const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <div className="bg-white w-full">
      <Meta title="SwiftCart v2 - Equip your inventory with ease!" />

      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6  sm:py-24 md:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="font-lora text-2xl font-semibold text-gray-700">
          Best sellers right here &#128513;
        </h2>
      </div>
      <div className="mx-auto rounded-lg max-w-2xl px-4 py-5 sm:px-6 sm:py-5 md:py-10 lg:max-w-7xl lg:px-8">
        <ProductSlider />
      </div>

      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-24 md:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="font-lora text-2xl mb-4 font-semibold text-gray-700">
          Check our awesomesauce products &#128517;
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <Loader count={12} />
          </div>
        ) : error ? (
          <Message
            variant="alert"
            message={error?.data?.message || error.error}
          />
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Pagination
        pages={data?.pages}
        page={data?.page}
        keyword={keyword ? keyword : ""}
      />
    </div>
  );
};

export default HomeScreen;
