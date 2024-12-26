import { CiUser } from "react-icons/ci";
import { AiOutlineGift } from "react-icons/ai";
import Part from "./part/Partcart";
import { useContext, useState } from "react";
import { Store } from "../../utils/Store";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/Auth";
import Logo from "./part/logo";
import { BiCart, BiMenu } from "react-icons/bi";

function Nav() {
  const { state } = useContext(Store);
  const { cart, user } = state;
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
  const navigate = useNavigate();
  const Auth = useAuth();

  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <nav className="bg-white shadow fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        {/* Logo Section */}
        <div className="flex justify-between items-center">
          <div>
            <a
              className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700"
              href="/"
              style={{ fontFamily: "cursive" }}
            >
              Nuelmart
            </a>
          </div>

          {/* Toggle Button for Small Screens */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
              onClick={() => setMenuOpen(!menuOpen)} // Toggle menu visibility
            >
              <BiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div
          className={`${menuOpen ? "block" : "hidden"} md:flex items-center`} // Conditionally show/hide menu
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <a
              className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              href="/"
            >
              Home
            </a>
            <a
              className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              href="/products"
            >
              Shop
            </a>
            <a
              className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              href="/contact"
            >
              Contact
            </a>
            <a
              className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              href="#about"
            >
              About
            </a>
          </div>

          {/* Cart Icon */}
          <div className="flex justify-center md:block">
            <a
              className="relative text-gray-700 hover:text-gray-600"
              href="/cart"
            >
              <BiCart size={30} className="-z-10" />
              {cart.length > 0 && (
                <span className="absolute top-0 left-0 z-10 rounded-full bg-indigo-500 text-white px-1 text-xs">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </a>
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
              <a
                className="text-sm text-gray-700 font-medium hover:text-indigo-500"
                href="/login"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
