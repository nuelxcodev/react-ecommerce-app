import Item from "../component/Card";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import Part from "../component/part/Partcart";
import { useContext, useEffect, useState } from "react";
import { Datacontext } from "../../utils/Data";
import Nav from "../component/Nav";
import LoadingSpinner from "../component/loader";

function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);
  const { data, isloading } = useContext(Datacontext);

  const [filteredsearch, setfilteredsearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Price range for filtering
  const [selectedCategory, setSelectedCategory] = useState("");

  const productsPerPage = 8; // Number of products per page

  // Filter categories for the sidebar
  const categories = [
    ...new Set(data.products.map((product) => product.category)),
  ];

  // useEffect(() => {
  //   if (location.state && location.state.previousPage === "/")
  //     setSelectedCategory(
  //       location.state.filterTo.slice(0, location.state.filterTo.length - 1)
  //     );
  // }, []);

  // Filter products by price and category
  const filteredProducts = (
    filteredsearch.length === 0 ? data.products : filteredsearch
  ).filter(
    (product) =>
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (selectedCategory
        ? product.category.toLowerCase() === selectedCategory.toLowerCase()
        : true)
  );

  // Pagination logic
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = filteredProducts.slice(
    firstProductIndex,
    lastProductIndex
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="m-0 w-screen">
      <Nav />
      <div className="border-2 text-sm w-full flex overflow-hidden h-screen bg-neutral-100">
        {/* Sidebar for filters */}
        <div className="bg-neutral-300 w-[20%] p-4 mt-11">
          <button
            className="mt-4 bg-pink-700 text-white px-4 py-2 rounded w-full"
            onClick={() => navigate("/cart")}
          >
            Proceed to Cart
          </button>

          {/* Filter by Category */}
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-2">Filter by Category</h3>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Price */}
          <div className="mt-6 ">
            <h3 className="font-bold text-lg mb-2">Filter by Price</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-[70%] m-auto h-full overflow-hidden ">
          <div className=" h-screen mt-16  overflow-hidden">
            {/* Products */}
            <div className="w-full z-30 overflow-scroll h-full pb-44 pt-4 hidescroll">
              <div className=" card-container">
                {currentProducts.length === 0 ? (
                  <div>No products found.</div>
                ) : isloading ? (
                  <LoadingSpinner />
                ) : (
                  currentProducts.map((product, i) => (
                    <Item product={product} key={i}></Item>
                  ))
                )}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center fixed bg-white mx-auto left-1/2 -mt-32 z-50">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 mx-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-pink-700 text-white"
                      : "bg-white text-pink-800"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
