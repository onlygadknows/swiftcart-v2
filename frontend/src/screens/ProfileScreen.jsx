import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useProfileMutation } from "../slices/usersApiSlice";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [profile, { isLoading }] = useProfileMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can add validation here and handle registration logic

    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = "Full name is required";
    }

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (/\S+@\S\.\S+/.test(email)) {
      validationErrors.email = "Email is required";
    }
    if (!confirmEmail.trim()) {
      validationErrors.confirmEmail = "Confirm Email is required";
    } else if (email !== confirmEmail) {
      validationErrors.confirmPassword = "Email not matched";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password should be at least 6 characters";
    }

    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Password not matched";
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await profile({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));

        navigate("/myorders");
      } catch (error) {
        validationErrors.email = error?.data?.message || error.error;
      }
    }
    setErrors(validationErrors);
  };
  return (
    <div className="flex w-full items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-none sm:shadow-xl max-w-sm w-full border-0 sm:border">
        <h2 className="text-2xl font-lora text-center mb-4 text-gray-700">
          User Profile
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 h-20">
            <label className="block text-gray-700 text-sm font-semibold font-lora mb-2">
              Full Name *
            </label>
            <input
              type="text"
              className={`form-input w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : ""
              }  rounded-lg  text-gray-700 focus:ring-blue-500`}
              placeholder={userInfo.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1 font-poppins">
                {errors.name}
              </p>
            )}
          </div>
          <div className="mb-4 h-20">
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
              }  rounded-lg  text-gray-700 focus:ring-blue-500`}
              placeholder={userInfo.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1 font-poppins">
                {errors.email}
              </p>
            )}
          </div>
          <div className="mb-4 h-20">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold font-lora mb-2"
            >
              Confirm Email Address *
            </label>
            <input
              type="email"
              id="email"
              className={`form-input w-full px-4 py-2 border ${
                errors.confirmEmail ? "border-red-500" : ""
              }  rounded-lg  text-gray-700 focus:ring-blue-500`}
              placeholder={userInfo.email}
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
            {errors.confirmEmail && (
              <p className="text-red-600 text-xs mt-1 font-poppins">
                {errors.confirmEmail}
              </p>
            )}
          </div>
          <div className="mb-4 h-20">
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
              }  rounded-lg  text-gray-700 focus:ring-blue-500`}
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
          <div className="mb-10 h-20">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold font-lora mb-2"
            >
              Confirm Password *
            </label>
            <input
              type="password"
              id="password"
              className={`form-input w-full px-4 py-2 border ${
                errors.confirmPassword ? "border-red-500" : ""
              }  rounded-lg  text-gray-700 focus:ring-blue-500`}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1 font-poppins">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                Register
                <AiOutlineLoading3Quarters className="animate-spin ml-2" />
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
