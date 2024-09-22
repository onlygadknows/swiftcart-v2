import logo from "../assets/image/swift.png";
import { CgProfile } from "react-icons/cg";
import { LuShoppingCart } from "react-icons/lu";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="mx-auto max-w-7x1 flex items-center justify-between px-2 py-3 sm:px-6 lg:px-8">
          {/* Left-side nav links */}
          <ul className="flex items-center space-x-4">
            <li>
              <a href="#" className="font-poppins uppercase font-semibold">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="font-poppins uppercase font-semibold">
                Shop
              </a>
            </li>
          </ul>

          {/* Center logo (remains fixed in the center) */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img className="w-12 h-12" src={logo} alt="logo" />
          </div>

          {/* Right-side nav links */}
          <ul className="flex items-center space-x-4">
            <li>
              <a href="#" className="font-poppins uppercase">
                {" "}
                <CgProfile className="w-6 h-6 text-gray-700 hover:text-black" />
              </a>
            </li>
            <li>
              <a href="#" className="font-poppins uppercase">
                <LuShoppingCart className="w-6 h-6 text-gray-700 hover:text-black" />
              </a>
            </li>
          </ul>

          {/* Mobile view */}
          <div className="sm:hidden" id="mobile-menu">
          <ul className="flex items-center space-x-4">
            <li>
              <a href="#" className="font-poppins uppercase font-semibold">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="font-poppins uppercase font-semibold">
                Shop
              </a>
            </li>
          </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
