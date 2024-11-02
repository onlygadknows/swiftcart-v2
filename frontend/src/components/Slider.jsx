import React, { useEffect, useRef } from "react";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";

const Slider = () => {
  const sliderRef = useRef(null);
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  useEffect(() => {
    const slider = sliderRef.current;

    const moveSlide = () => {
      const max = slider.scrollWidth - slider.clientWidth;
      const left = slider.clientWidth;

      if (max <= slider.scrollLeft + left) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left, behavior: "smooth" });
      }
    };

    const intervalId = setInterval(moveSlide, 4000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <div
      className="w-full h-[30rem] overflow-hidden flex flex-nowrap text-center"
      id="slider"
      ref={sliderRef}
    >
        
      {products?.map((product) => (
        <div key={product._id} className="flex-none w-[100vw] flex flex-col items-center justify-center">
          <Link to={`/product/${product._id}`}>
            <figure className="relative justify-around max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
              <img
                src={product.image}
                alt={product.name}
                className="h-auto max-w-full"
              />
              <div className=" p-4 rounded-md">
                <h2 className="max-w-md font-lora font-semibold text-gray-600 text-3xl">
                  {product.name}
                </h2>
                <p className="max-w-md capitalize text-lg text-gray-500 font-poppins">
                  for only <span>&#x20B1;</span>
                  {product.price}
                </p>
              </div>
            </figure>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Slider;
