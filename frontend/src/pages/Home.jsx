import Banner1 from "../component/Banner1";
import Nav from "../component/Nav";
import Item from "../component/Card";
import Footer from "../component/Footer";
import { useContext } from "react";
import { Datacontext } from "../../utils/Data";

function Home() {
  const { data } = useContext(Datacontext);
  const categories = []

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navigation */}
      <Nav />

      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[500px] text-center">
        <Banner1 />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-white text-lg mb-6">Discover the best products curated just for you</p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Shop Now
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 flex-1">
        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.slug}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <h3 className="text-lg font-semibold text-gray-800 mt-4">
                  {category.name}
                </h3>
                <button className="mt-2 bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700">
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.products.map((product) => (
              <Item product={product} key={product.slug} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
