import { useContext, useState } from "react";
import { Store } from "../../utils/Store";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../utils/Auth";
import { BiCart, BiMenu } from "react-icons/bi";

function Nav() {
  const { state } = useContext(Store);
  const { cart, user } = state;
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
  const Auth = useAuth();

  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <nav className="bg-white shadow fixed top-0 left-0 w-full  z-50">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        {/* Logo Section */}
        <div className="flex justify-between items-center">
          <div>
            <Link
              className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700"
              to="/"
              style={{ fontFamily: "cursive" }}
            >
              Nuelmart
            </Link>
          </div>

          {/* Toggle Button for Small Screens */}
          <div className="flex md:hidden relative">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
              onClick={() => setMenuOpen(!menuOpen)} // Toggle menu visibility
            >
              <BiMenu className="h-7 w-7" />
            </button>
            {cart.length > 0 && (
              <span className="absolute top-0 left-0 z-10 rounded-full bg-indigo-500 text-white px-1 text-xs">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div
          className={`${menuOpen ? "block" : "hidden"} md:flex items-center`} // Conditionally show/hide menu
        >
          <div className="flex flex-col h-screen md:h-min md:flex-row md:mx-6">
            <Link
              className="my-3 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              to="/"
            >
              Home
            </Link>
            <Link
              className="my-3 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              to="/products"
            >
              Shop
            </Link>
            <Link
              className="my-3 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              to="/#contact"
            >
              Contact
            </Link>
            <Link
              className="my-3 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              to="/#about"
            >
              About
            </Link>
            {/* mobilecart */}
            <Link
              className="my-3 text-sm text-gray-700 font-medium hover:text-indigo-500 md:hidden"
              to="/cart"
            >
              cart
            </Link>
            {/* mobile login */}
            <div className="my-3">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">{user.name}</span>
                  <button
                    className="text-sm text-red-500 hover:text-red-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  className="my-3 text-sm text-gray-700 font-medium hover:text-indigo-500 md:hidden"
                  to="/login"
                >
                  login
                </Link>
              )}
            </div>
          </div>

          {/* Cart Icon */}
          <div className="flex justify-center md:block">
            <Link
              className="relative text-gray-700 hover:text-gray-600"
              to="/cart"
            >
              <span className="md:hidden">cart</span>
              <BiCart size={30} className="-z-10" />
              {cart.length > 0 && (
                <span className="absolute top-0 left-0 z-10 rounded-full bg-indigo-500 text-white px-1 text-xs">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </Link>
          </div>

          {/* Login/Logout */}
          <div className="ml-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user.name}</span>
                <button
                  className="text-sm text-red-500 hover:text-red-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                className="text-sm text-gray-700 font-medium hover:text-indigo-500"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
