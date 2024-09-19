import logo from "../assets/image/swift.png";

const Header = () => {
  return (
    <header>
      <nav className="bg-primary">
        <div className="mx-auto max-w-7x1 items-center justify-between px-2 py-3 sm:px-6 lg:px-8">
          <div className="w-32 flex align-center justify-between">
            <img className="w-9 h-9" src={logo} alt="logo" />
            <p className="font-poppins font-semibold text-base pt-2">
              Swift Cart
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
