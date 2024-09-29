import logo from "../assets/image/swift.png";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { LuShoppingCart } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);

  return (
    <header>
      <nav>
        <div className="mx-auto max-w-7x1 py-5 flex items-center justify-between max-w-2xl px-16 lg:max-w-7xl lg:px-8">
          {/* Left-side nav links */}
          <ul className="hidden md:flex items-center gap-5">
            <li className="font-poppins uppercase font-semibold">
              <Link to="/">Home</Link>
            </li>
            <li className="font-poppins uppercase font-semibold">
              {" "}
              <Link to="/">Shop</Link>
            </li>
          </ul>

          {/* Center logo (remains fixed in the center) */}
          <div className="flex items-center justify-center mr-8">
            <Link to="/">
              <img
                className="w-12 hover:scale-105 transition-all"
                src={logo}
                alt="logo"
              />
            </Link>
          </div>

          {/* Right-side nav links */}
          <ul className="relative hidden md:flex items-center gap-7">
            <li>
              <Link to="#" className="font-poppins uppercase">
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
          <div className="md:hidden" onClick={() => setisMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <IoMdClose style={{ width: "32px", height: "32px" }} />
            ) : (
              <GiHamburgerMenu style={{ width: "32px", height: "32px" }} />
            )}
          </div>

          <div
            className={`absolute md:hidden top-24 left-0 w-full bg-black flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
          >
            <ul className="w-full flex items-center justify-center flex-col">
              <li className="w-full hover:bg-orange-800 text-primary text-2xl p-2 flex items-center justify-center" onClick={() => {setisMenuOpen(!isMenuOpen)}}>
                <Link to="/" className="font-poppins uppercase font-light">
                  Home
                </Link>
              </li>
              <li className="w-full hover:bg-orange-800 text-primary text-2xl p-2 flex items-center justify-center" onClick={() => {setisMenuOpen(!isMenuOpen)}}>
                <Link to="/" className="font-poppins uppercase font-light">
                  Shop
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
