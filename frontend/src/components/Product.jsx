import Rating from "./Rating";
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
      <>
      <div className="w-full h-48 overflow-hidden rounded-lg bg-gray-200">
      <img
        alt={product.name}
        src={product.image}
        className="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
    <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
    <p className="mt-1 text-lg font-medium text-gray-900">
      {product.price}
    </p>
    <Rating value={product.rating} />
    </>

  );
};

export default Product;
