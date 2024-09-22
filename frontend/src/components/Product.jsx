import React from "react";

const Product = ({ product }) => {
  return (
      <a key={product._id} href={product.href} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            alt={product.image}
            src={product.image}
            className="h-full w-full min-h-36 object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">
          {product.price}
        </p>
      </a>
  );
};

export default Product;
