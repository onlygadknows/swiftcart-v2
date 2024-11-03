import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderLoader from "./SliderLoader";
const ProductSlider = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 2000,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 2000,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 2000,
          cssEase: "linear",
        },
      },
    ],
  };

  return isLoading ? (
    <SliderLoader />

  ) : (
    <Slider {...settings}>
      {products?.map((product) => (
        <div className="max-w-sm flex  items-center justify-center  grayscale hover:grayscale-0">
          <Link to={`/product/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="h-[300px] w-full  object-contain max-w-full rounded-r-lg"
            />
          </Link>

          <div className="p-4 rounded-md">
            <h2 className="max-w-md font-lora text-center font-semibold text-gray-600 text-lg">
              {product.name}
            </h2>
            <p className="max-w-md capitalize text-center text-md text-gray-500 font-poppins">
              for only <span>&#x20B1;</span>
              {product.price}
            </p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ProductSlider;
