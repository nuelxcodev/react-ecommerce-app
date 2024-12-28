import Banner1 from "../component/Banner1";
import Nav from "../component/Nav";
import Item from "../component/Card";
import Footer from "../component/Footer";
import { useContext } from "react";
import { Datacontext } from "../../utils/Data";
import {
  GiBallerinaShoes,
  GiHanger,
  GiRunningShoe,
  GiSlippers,
} from "react-icons/gi";
import { BsBag, BsLaptop, BsPhone, BsSmartwatch } from "react-icons/bs";
import {} from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import headerimg from "../../public/images/header.jpg";
import LoadingSpinner from "../component/loader";
import CheckoutForm from "../component/checkoutform";
import StripeWrapper from "../component/checkoutform";

function Home() {
  const { data, isloading } = useContext(Datacontext);
  const router = useNavigate();
  const location = useLocation();

  const categories = [
    { name: "Clothes", icon: <GiHanger size={40} /> },
    { name: "Bags", icon: <BsBag size={40} /> },
    { name: "Mobiles", icon: <BsPhone size={40} /> },
    { name: "Laptops", icon: <BsLaptop size={40} /> },
    { name: "Watches", icon: <BsSmartwatch size={40} /> },
    { name: "Shoes", icon: <GiRunningShoe size={40}/> },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col text-xs">
      {/* Navigation */}
      <Nav />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-cover bg-center h-[500px] w-screen text-center">
        <img
          src={headerimg}
          alt="Background"
          className="absolute h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
        <div className="relative flex flex-col justify-center items-center h-full text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Welcome to Nuelmat
          </h1>
          <p className="text-lg md:text-2xl mb-6 font-light max-w-xl">
            Explore premium products crafted for your style and comfort.
          </p>
          <div className="flex gap-4">
            <button className="bg-pink-600 py-3 px-6 text-lg font-medium rounded-lg shadow-lg hover:bg-pink-700 transform hover:scale-105 transition duration-300">
              Shop Now
            </button>
            <button className="bg-gray-100 text-gray-800 py-3 px-6 text-lg font-medium rounded-lg shadow-lg hover:bg-gray-200 transform hover:scale-105 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 flex-1">
        {/* Categories Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Categories
          </h2>
          <div className=" flex justify-center mt-6">
            <div className="icon-grid w-[700px] bg-neutral-300 p-6 rounded shadow-lg">
              {categories.map((categ, i) => (
                <div
                  key={i}
                  className=" flex flex-col items-center hover:text-blue-700 w-[25%] text-center text-neutral-700"
                  onClick={() =>
                    router(`/products`, { state: categ.name })
                  }
                >
                  <span className="w-full">{categ.icon}</span>
                  <span className=" w-full">{categ.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-20 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Our Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isloading && <LoadingSpinner/>}
            {!isloading &&
              data.products
                .slice(0, 8)
                .map((product, i) => <Item product={product} key={i} />)}
          </div>
        </div>

        {/* Special Offer Section */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white py-10 px-6 rounded-lg text-xs mb-20 text-center shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Special Offers</h2>
          <p className="text-lg mb-6">
            Shop now and enjoy up to 50% off on selected items. Limited time
            only!
          </p>
          <button className="bg-white text-pink-600 py-3 px-6 rounded-lg font-medium shadow-lg hover:bg-pink-100 transform hover:scale-105 transition duration-300">
            Explore Deals
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
