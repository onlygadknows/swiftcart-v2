import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Meta from "../components/Meta";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (/\S+@\S\.\S+/.test(email)) {
      validationErrors.email = "Use correct email";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password should be at least 6 characters";
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      validationErrors.password = error?.data?.message || error.error;
    }

    setErrors(validationErrors);
  };

  return (
    <div className="flex w-full items-center justify-center h-[80vh]">
      <Meta title="SwiftCart - Login" />

      <div className="p-8 rounded-lg shadow-none sm:shadow-lg max-w-sm w-full border bg-gray-50 border-gray-300  sm:border">
        <h2 className="text-2xl font-lora text-center mb-4 text-gray-700">
          SwiftCart by Gad Ashell
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="h-24">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold font-lora mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              className={`form-input w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : ""
              } rounded-lg text-gray-700 focus:ring-blue-500`}
              placeholder="gadashell@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1 font-poppins">
                {errors.email}
              </p>
            )}
          </div>
          <div className="mb-4 h-24">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold font-lora mb-2"
            >
              Password *
            </label>
            <input
              type="password"
              id="password"
              className={`form-input w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : ""
              } rounded-lg text-gray-700 focus:ring-blue-500`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1 font-poppins">
                {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                Login
                <AiOutlineLoading3Quarters className="animate-spin ml-2" />
              </span>
            ) : (
              "Login"
            )}
          </button>
          <p className="text-gray-600 text-xs text-center font-poppins mt-4">
            Not yet registered?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-blue-500 hover:underline"
            >
              {" "}
              Register here
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
