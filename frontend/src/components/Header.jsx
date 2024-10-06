import logo from "../assets/image/swift.png";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { LuShoppingCart } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  return (
    <header>
      <nav>
        <div className="mx-auto max-w-7x1 py-5 flex items-center justify-between max-w-2xl px-5 lg:max-w-7xl lg:px-8">
          {/* Left-side nav links */}
          <ul className="hidden md:flex items-center gap-5">
            <li className="font-poppins uppercase font-semibold">
              <Link className="text-gray-700 hover:text-black" to="/">
                Home
              </Link>
            </li>
            <li className="font-poppins uppercase font-semibold">
              {" "}
              <Link className="text-gray-700 hover:text-black" to="/">
                Shop
              </Link>
            </li>
          </ul>

          {/* Center logo (remains fixed in the center) */}
          <div className="flex items-center justify-center mr-8">
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
              <Link to="#" className="font-poppins  uppercase">
                {" "}
                <CgProfile className="w-6 h-6 text-gray-700 hover:text-black" />
              </Link>
            </li>
            <li>
              <Link to="#" className="font-poppins uppercase">
                <LuShoppingCart className="w-6 h-6 text-gray-700 hover:text-black" />
              </Link>
            </li>
          </ul>

          {/* Mobile view */}
          <div className="md:hidden flex items-center justify-center gap-5">
            <Link to="/" className="font-poppins uppercase">
              <LuShoppingCart className="w-6 h-6 text-gray-700 hover:text-black" />
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
                <span class="sr-only">Toggle navigation</span>
              </button>
            ) : (
              <button
                type="button"
                className="hs-collapse-toggle relative size-10 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent"
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
            className={`absolute md:hidden top-24 bg-gray-50 shadow-md left-0 w-full flex basis-full grow flex-col overflow-hidden transition-all duration-300 items-center ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="w-full shadow-gray-700">
              <Link to="/">
                <li
                  className={`w-full flex items-center hover:bg-white hover:shadow-sm text-lg p-2 font-lora font-semibold text-gray-700 ${
                    isMenuOpen && activeMenu === "Home"
                      ? "bg-white shadow-md"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveMenu("Home");
                    setisMenuOpen(!isMenuOpen);
                  }}
                >
                  Home
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
                  Shop
                </li>
              </Link>
              <Link to="/">
                <li
                  className={`w-full hover:bg-white hover:shadow-sm text-lg p-2 font-lora font-semibold text-gray-700 ${
                    isMenuOpen && activeMenu === "login"
                      ? "bg-white shadow-md"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveMenu("login");
                    setisMenuOpen(!isMenuOpen);
                  }}
                >
                  Login
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
