import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product.jsx";
import { Link } from "react-router-dom";
const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:8000/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white min-h-full">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

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
      </div>
    </div>
  );
};

export default HomeScreen;
