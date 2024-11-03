import logo from "../assets/image/swift.png";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import { MdOutlineShoppingCart } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import Search from "./Search";
const Header = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");

  const cart = useSelector((state) => state.cart);
  const { favItems, cartItems } = cart;
  const { userInfo } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false); // Set to false initially
  console.log(favItems);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav>
        <div className="mx-auto max-w-7x1 py-5 flex items-center justify-between max-w-2xl px-5 lg:max-w-7xl lg:px-8">
          {/* Left-side nav links */}
          <ul className="hidden md:flex items-center gap-5">
            <li className="font-lora uppercase font-bold">
              <Link
                className="text-gray-600 hover:text-black transition"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="font-lora uppercase font-bold transition">
              {" "}
              <Link className="text-gray-600 hover:text-black" to="/">
                Shop
              </Link>
            </li>
          </ul>

          {/* Center logo (remains fixed in the center) */}
          <div className="flex  items-center justify-center">
            <Link to="/">
              <img
                className="w-12 hover:scale-105 transition-all"
                src={logo}
                alt="logo"
                onClick={() => setisMenuOpen(false)}
              />
            </Link>
          </div>

          {/* Right-side nav links */}
          <ul className="relative hidden md:flex items-center gap-7">
            <li>
              <Search />
            </li>
            <li>
              <Link
                to="/favorites"
                className="font-poppins transition uppercase relative "
              >
                {favItems.length > 0 ? (
                  <FaHeart className="w-6 h-6 text-red-500 hover:text-black" />
                ) : (
                  <FaRegHeart className="w-6 h-6 text-gray-600 hover:text-black" />
                )}
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                className="font-poppins transition uppercase relative "
              >
                {cartItems.length > 0 && (
                  <>
                    <div className="t-0 absolute left-4 bottom-3 animate-bounce">
                      <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </p>
                    </div>
                  </>
                )}
                <MdOutlineShoppingCart className="w-6 h-6 text-gray-600 hover:text-black" />
              </Link>
            </li>

            <li onClick={toggleMenu}>
              {userInfo ? (
                <FaUserCircle className="w-6 h-6 text-gray-600 cursor-pointer hover:text-black font-poppins transition uppercase " />
              ) : (
                <CgProfile className="w-6 h-6 text-gray-600 cursor-pointer hover:text-black font-poppins transition uppercase " />
              )}
            </li>
          </ul>

          {/* Mobile view */}
          <div className="md:hidden flex items-center justify-center gap-5">
            <Link
              to="/favorites"
              className="font-poppins transition uppercase relative "
            >
              {favItems.length > 0 ? (
                <FaHeart className="w-6 h-6 text-red-500 hover:text-black" />
              ) : (
                <FaRegHeart className="w-6 h-6 text-gray-600 hover:text-black" />
              )}
            </Link>
            <Link to="/cart" className="font-poppins uppercase relative">
              {cartItems.length > 0 && (
                <div className="t-0 absolute left-4 bottom-3 animate-bounce">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-600 p-2 text-xs text-white">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </p>
                </div>
              )}
              <MdOutlineShoppingCart className="w-6 h-6 text-gray-700 hover:text-black" />
            </Link>
            {isMenuOpen ? (
              <button
                type="button"
                className="size-10 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                id="hs-navbar-example-collapse"
                onClick={() => setisMenuOpen(!isMenuOpen)}
              >
                <IoMdClose
                  className="text-slate-600"
                  style={{ fontSize: "30px", fontWeight: "normal" }}
                />
              </button>
            ) : (
              <button
                type="button"
                className="hs-collapse-toggle relative size-10 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                id="hs-navbar-example-collapse"
                onClick={() => setisMenuOpen(!isMenuOpen)}
                aria-expanded="false"
                aria-controls="hs-navbar-example"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-navbar-example"
              >
                <GiHamburgerMenu
                  className="text-slate-600"
                  style={{ fontSize: "25px", fontWeight: "normal" }}
                />
                <span className="sr-only">Toggle navigation</span>
              </button>
            )}
          </div>

          <div
            className={`z-50 absolute md:hidden top-24 bg-gray-50 shadow-md left-0 w-full flex basis-full grow flex-col overflow-hidden transition-all duration-300 items-center ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="w-full shadow-gray-700">
              <li
                className={`w-full flex items-center hover:bg-white hover:shadow-sm text-lg p-2 font-lora font-semibold text-gray-700 ${
                  isMenuOpen && activeMenu === "Home"
                    ? "bg-white shadow-md"
                    : ""
                }`}
              >
                <Search />
              </li>
              <Link to="/">
                <li
                  className={`w-full  text-lg p-2 font-lora font-semibold text-gray-700 ${
                    isMenuOpen && activeMenu === "Home"
                      ? "bg-white shadow-md"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveMenu("Home");
                    setisMenuOpen(!isMenuOpen);
                  }}
                >
                  <p className="text-center">Home</p>
                </li>
              </Link>
              <Link to="/">
                <li
                  className={`w-full hover:bg-white hover:shadow-sm text-lg p-2 font-lora text-gray-700 font-semibold ${
                    isMenuOpen && activeMenu === "Shop"
                      ? "bg-white shadow-md"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveMenu("Shop");
                    setisMenuOpen(!isMenuOpen);
                  }}
                >
                  <p className="text-center">Shop</p>
                </li>
              </Link>
              <Link to="/login">
                <li
                  className={`w-full hover:bg-white hover:shadow-sm text-lg p-2 font-lora font-semibold text-gray-700 ${
                    isMenuOpen && activeMenu === "login"
                      ? "bg-white shadow-md"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveMenu("login");
                    setisMenuOpen(!isMenuOpen);
                    toggleMenu();
                  }}
                >
                  <p className="text-center">
                    {" "}
                    {userInfo ? `Hello, ${userInfo.name}!` : "Sign In"}
                  </p>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
      <ProfileMenu
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
      />
    </header>
  );
};

export default Header;
