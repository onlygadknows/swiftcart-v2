import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center justify-center">
      <span className="text-orange-400">
        {value >= 1 ? (
          <FaStar className="h-10 w-5" />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt className="h-10 w-5" />
        ) : (
          <FaRegStar className="h-10 w-5" />
        )}
      </span>
      <span className="text-orange-400">
        {value >= 2 ? (
          <FaStar className="h-10 w-5" />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt className="h-10 w-5" />
        ) : (
          <FaRegStar className="h-10 w-5" />
        )}
      </span>
      <span className="text-orange-400">
        {value >= 3 ? (
          <FaStar className="h-10 w-5" />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt className="h-10 w-5" />
        ) : (
          <FaRegStar className="h-10 w-5" />
        )}
      </span>
      <span className="text-orange-400">
        {value >= 4 ? (
          <FaStar className="h-10 w-5" />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt className="h-10 w-5" />
        ) : (
          <FaRegStar className="h-10 w-5" />
        )}
      </span>
      <span className="text-orange-400">
        {value >= 5 ? (
          <FaStar className="h-10 w-5" />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt className="h-10 w-5" />
        ) : (
          <FaRegStar className="h-10 w-5" />
        )}
      </span>
      <span className="px-1 bg-orange-400 text-white font-poppins rounded-md ml-1 text-sm">{value.toFixed(1)}</span>
    </div>
  );
};

export default Rating;
