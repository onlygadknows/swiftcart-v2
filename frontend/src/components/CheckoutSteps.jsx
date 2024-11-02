import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
        <div className="">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Steps</h2>

          <ol className="grid grid-cols-1 divide-x divide-gray-100 overflow-hidden rounded-lg border border-gray-300 text-sm text-gray-500 sm:grid-cols-3">
            {step1 ? (
              <Link to={"/login"}>
                <li className="flex items-center justify-center bg-gray-50 border-r border-gray-300 gap-2 p-4">
                  <svg
                    className="size-7 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>

                  <p className="leading-none">
                    <strong className="block font-medium font-poppins"> Details </strong>
                    <small className="mt-1 font-poppins">{userInfo && userInfo.name ? `Hello, ${userInfo.name}` : "Please Sign-in before proceeding."}</small>
                    </p>
                </li>
              </Link>
            ) : (
              <li className="flex items-center bg-gray-50 border-r border-gray-300 justify-center gap-2 p-4">
                <svg
                  className="size-7 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>

                <p className="leading-none">
                  <strong className="block font-medium font-poppins"> Details </strong>
                  <small className="mt-1 font-poppins"> Signed in, grats! </small>
                </p>
              </li>
            )}

            {step2 ? (
              <Link to="/shipping">
                <li className="relative flex items-center justify-center gap-2 bg-gray-50 border-r border-gray-300 p-4">
                  <span className="absolute -left-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50"></span>

                  <span className="absolute -right-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-50 rtl:border-e-0 rtl:border-t-0 rtl:bg-white"></span>

                  <svg
                    className="size-7 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <p className="leading-none">
                    <strong className="block font-medium font-poppins"> Address </strong>
                    <small className="mt-1 font-poppins"> Press Okay for Payment </small>
                  </p>
                </li>
              </Link>
            ) : (
              <li className="relative flex items-center justify-center gap-2 p-4">
                <span className="absolute -left-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50"></span>

                <span className="absolute -right-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-50 rtl:border-e-0 rtl:border-t-0 rtl:bg-white"></span>

                <svg
                  className="size-7 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <p className="leading-none">
                  <strong className="block font-medium font-poppins"> Address </strong>
                  <small className="mt-1 font-poppins"> Where we sending it? </small>
                </p>
              </li>
            )}

            {step3 ? (
              <Link to="/payment">
                <li className="flex items-center justify-center bg-gray-50 gap-2 p-4">
                  <svg
                    className="size-7 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>

                  <p className="leading-none">
                    <strong className="block font-medium font-poppins"> Payment  {step4 && "> Place Order"}   </strong>
                    <small className="mt-1 font-poppins"> Show us the money. </small>
                  </p>
                </li>
              </Link>
            ) : (
              <li className="flex items-center justify-center gap-2 p-4">
                <svg
                  className="size-7 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>

                <p className="leading-none">
                  <strong className="block font-medium font-poppins"> Payment </strong>
                  <small className="mt-1 font-poppins"> Via PayPal. </small>
                </p>
              </li>
            )}
            
          </ol>
        </div>
      </div>
    </>
  );
};

export default CheckoutSteps;
