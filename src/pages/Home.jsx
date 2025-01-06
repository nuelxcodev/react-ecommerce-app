import Nav from "../component/Nav";
import Item from "../component/Card";
import Footer from "../component/Footer";
import { useContext } from "react";
import { Datacontext } from "../../utils/Data";
import { GiHanger, GiRunningShoe } from "react-icons/gi";
import { BsBag, BsLaptop, BsPhone, BsSmartwatch } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import headerimg from "../../public/images/header.jpg";
import LoadingSpinner from "../component/loader";
import { ToastContainer } from "react-toastify";


function Home({notify}) {
  const { data, isloading } = useContext(Datacontext);
  const router = useNavigate();
  const location = useLocation();

  const categories = [
    {
      name: "Clothes",
      icon: <GiHanger className=" h-7 w-7 md:h-10 md:w-10" />,
    },
    { name: "Bags", icon: <BsBag className=" h-7 w-7 md:h-10 md:w-10" /> },
    { name: "Mobiles", icon: <BsPhone className=" h-7 w-7 md:h-10 md:w-10" /> },
    {
      name: "Laptops",
      icon: <BsLaptop className=" h-7 w-7 md:h-10 md:w-10" />,
    },
    {
      name: "Watches",
      icon: <BsSmartwatch className=" h-7 w-7 md:h-10 md:w-10" />,
    },
    {
      name: "Shoes",
      icon: <GiRunningShoe className=" h-7 w-7 md:h-10 md:w-10" />,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col text-xs m-auto">
      {/* Navigation */}
      <Nav />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-cover bg-center h-[500px] w-screen text-center">
        <img
          src={headerimg}
          alt="Background"
          className="absolute h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-black/70 "></div>
        <div className="relative flex flex-col justify-center items-center md:items-start md:ml-10 h-full text-neutral-300 text-opacity-45">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to Nuelmat</h1>
          <p className="text-lg md:text-xl mb-6 font-light max-w-xl">
            Explore premium products crafted for your style and comfort.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => router("/products")}
              className="bg-pink-600 py-3 px-6 text-white  text-lg font-medium rounded-lg shadow-lg hover:bg-pink-700 transform hover:scale-105 transition duration-300"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col justify-center items-center">
        
        {/* Categories Section */}
        <div className="mb-[20px] md:mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Categories
          </h2>
          <div className=" w-full flex justify-center gap-1 md:gap-3 mt-6">
            {categories.map((categ, i) => (
              <div
                key={i}
                className=" rounded-md flex flex-col items-center bg-neutral-200 shadow-md w-[16.6%] p-2 hover:bg-pink-700 text-xs text-center hover:text-white text-black text-opacity-50"
                onClick={() => {
                  router(`/products?category=${categ.name}`);
                }}
              >
                <span className="text-center ">{categ.icon}</span>
                <span className="text-center ">{categ.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-20 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Our Products
          </h2>
          <div className=" w-full h-full flex justify-center items-center">
            {isloading && <LoadingSpinner />}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
            {!isloading &&
              data.products
                .slice(0, 8)
                .map((product, i) => <Item product={product} key={i} onnotify={notify} />)}
          </div>
        </div>

        {/* Special Offer Section */}
        <div className="bg-gradient-to-r from-lime-700 to-pink-700 text-white py-10 px-6 rounded-lg text-xs mb-20 text-center shadow-xl">
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
