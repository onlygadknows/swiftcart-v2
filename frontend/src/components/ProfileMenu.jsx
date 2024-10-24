import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { logout } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";

const ProfileMenu = ({ isOpen, toggleMenu }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={`z-10 flex w-64 h-screen flex-col justify-between bg-white fixed right-0 top-0 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 border`}
    >
      <div className="px-4 py-6">
        <button onClick={toggleMenu} className="hover:bg-gray-50 grid h-10 place-content-center rounded-2xl text-md w-10 border mb-2">
          <MdOutlineKeyboardArrowRight  className="text-4xl size-5" />
        </button>

        {userInfo && (
          <span className="grid h-10 w-full place-content-center rounded-lg bg-gray-100 text-md text-gray-700">
            Hello, {userInfo.name}!
          </span>
        )}
        {userInfo && userInfo.isAdmin && (
            <ul className="mt-6 space-y-2">
            <li>
              <a
                href="#"
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-poppins text-gray-700"
              >
                Dashboard 
              </a>
            </li>
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-poppins">Admin</span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-poppins text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Products
                    </a>
                  </li>
                  <li>
                    <form action="#">
                      <button
                        type="submit"
                        className="w-full rounded-lg px-4 py-2 text-sm font-poppins text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                      >
                        Users
                      </button>
                    </form>
                  </li>
                  <li>
                    <form action="#">
                      <button
                        type="submit"
                        className="w-full rounded-lg px-4 py-2 text-sm font-poppins text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                      >
                        Orders
                      </button>
                    </form>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        )}
        {userInfo ? (
          <ul className="mt-6 space-y-2">
            <li>
              <a
                href="#"
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-poppins text-gray-700"
              >
                General
              </a>
            </li>
            {/* Other Links */}
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-poppins">Account</span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-poppins text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-poppins text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      My Orders
                    </a>
                  </li>
                  <li>
                    <form action="#">
                      <button
                        type="submit"
                        className="w-full rounded-lg px-4 py-2 text-sm font-poppins text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                        onClick={logoutHandler}
                      >
                        Logout
                      </button>
                    </form>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        ) : (
          <Link
            to="/login"
            className="block rounded-lg bg-gray-100 px-4 mt-6 py-2 text-sm font-poppins text-gray-700"
            onClick={toggleMenu}
          >
            Sign in
          </Link>
        )}
      </div>
      {userInfo && (
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a
            href="#"
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xs">
                <strong className="block font-medium">{userInfo.name}</strong>
                <span> {userInfo.email} </span>
              </p>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
