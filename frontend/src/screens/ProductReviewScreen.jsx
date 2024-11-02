import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import Rating from "../components/Rating";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { formatDate } from "../utils/dateConvertUtils";

const ProductReviewScreen = ({ productId }) => {
  const [isReviewing, setIsReviewing] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  console.log(rating)
  const {
    data: product,
    isLoading,
    refetch,
    error: productError,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (rating === 0) {
      validationErrors.rating = "No rate, really? Lol.";
    }

    if (!comment.trim()) {
      validationErrors.comment = "Add your review first before hitting submit.";
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        await createReview({
          productId,
          rating,
          comment,
        }).unwrap();
        setRating(0);
        setComment("");
        refetch();
        setIsReviewing(false);
      } catch (err) {
        console.error(err?.data?.message || err.error);
        setError(err?.data?.message || err.error);
        setIsReviewing(false);
      }
    }

    setErrors(validationErrors);
  };

  return (
    <div className="w-full mb-5 mt-5 ">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center max-w-4xl mx-auto">
          <div className="bg-white w-full rounded p-4 lg:p-8">
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-3xl text-gray-700 font-lora font-semibold">
                  {product?.reviews?.length === 0
                    ? "No Reviews Yet"
                    : "Customer Review"}
                </h2>
                <div>
                  {userInfo && (
                    <button
                      onClick={() => {
                        setIsReviewing(true);
                      }}
                      className="text-blue-600 border border-blue-600 transition-[0.5] hover:text-white hover:bg-blue-600 rounded py-2 px-5 md:px-6"
                    >
                      Add your Review
                    </button>
                  )}
                </div>
              </div>
              {isReviewing && (
                <div className="flex justify-between mt-4 items-center w-full">
                  <form className="w-full" onSubmit={submitHandler}>
                    <select
                      id="countries"
                      className={`bg-gray-50 border ${
                        errors.rating ? "border-red-500" : "border-gray-300"
                      } font-poppins text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option selected>Rate me</option>
                      <option value="1">Poor</option>
                      <option value="2">Fair</option>
                      <option value="3">Good</option>
                      <option value="4">Very Good</option>
                      <option value="5">Sensational</option>
                    </select>
                    <textarea
                      id="message"
                      rows="4"
                      className={`block font-poppins p-2.5 w-full mt-3 text-sm text-gray-600 ${
                        errors.comment ? "border-red-500" : "border-gray-300"
                      } bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Write your thoughts here..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>

                    <button
                      type="submit"
                      className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      {loadingProductReview ? (
                        <span className="flex items-center justify-center">
                          Submit Review
                          <AiOutlineLoading3Quarters className="animate-spin ml-2" />
                        </span>
                      ) : (
                        "Submit Review"
                      )}
                    </button>
                  </form>
                </div>
              )}
              {/* Display error */}
              {error && (
                <div className="text-red-600 font-poppins text-sm">{error}</div>
              )}{" "}
              {loadingProductReview && (
                <div className="font-poppins text-sm text-blue-900">
                  <p>Loading reviews...</p>
                </div>
              )}
              {product?.reviews.map((review) => (
                <div>
                  <hr className="my-5" />
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 pt-1.5 border border-gray-300 bg-gray-100 text-4xl font-lora font-semibold text-gray-700 flex item-center justify-center rounded-full mr-2 overflow-hidden">
                        {String(review.name).charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-grow justify-between">
                        <div>
                          <h5 className="font-medium font-lora text-gray-700 mb-1">
                            {review.name}
                          </h5>
                          <div className="text-xs ">
                            <Rating value={review.rating} />
                          </div>
                        </div>
                        <p className="text-sm opacity-50 mb-0">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-poppins opacity-75 mb-6">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewScreen;
