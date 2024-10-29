import { useState, useEffect } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";

import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
const UserScreen = () => {
  const [email, setEmail] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { id: userId } = useParams();

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);
  console.log(user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setisAdmin(user.isAdmin);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (/\S+@\S\.\S+/.test(email)) {
      validationErrors.email = "Use correct email";
    }

    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (Object.keys(validationErrors).length === 0) {
        try {
            await updateUser({ userId, name, email, isAdmin });
            navigate("/admin/userlist");
          } catch (error) {
            console.log(err);
          }
      }
    setErrors(validationErrors);
  };

  return (
    <div className="flex w-full items-center justify-center h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-none sm:shadow-lg max-w-sm w-full border-0 sm:border-2">
        <h2 className="text-2xl font-lora text-center mb-4 text-gray-700">
          Edit User Power!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 h-24">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold font-lora mb-2"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              className={`form-input w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : ""
              } rounded-lg text-gray-700 focus:ring-blue-500`}
              placeholder={user?.name || "Enter name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1 font-poppins">
                {errors.name}
              </p>
            )}
          </div>
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
              placeholder={user?.email || "Enter Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1 font-poppins">
                {errors.email}
              </p>
            )}
          </div>
          <div class="divide-y divide-gray-200">
            <label
              for="Option1"
              class="flex cursor-pointer items-start gap-4 py-4"
            >
              <div class="flex items-center">
                &#8203;
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setisAdmin(e.target.checked)}
                  class="size-4 rounded-md border-gray-300"
                  id="Option1"
                />
              </div>

              <div>
                <strong class="font-medium text-gray-700 font-lora">
                  {" "}
                  {user?.name || ""}{" "}
                </strong>

                <p class="mt-1 font-poppins text-sm text-gray-700">
                  Set as one of your isAdmin
                </p>
              </div>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <span className="flex items-center justify-center">
              Edit User Details
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserScreen;
