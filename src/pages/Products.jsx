import Item from "../component/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Datacontext } from "../../utils/Data";
import Nav from "../component/Nav";
import LoadingSpinner from "../component/loader";
import { BiEdit } from "react-icons/bi";


function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);
  const { data, isloading } = useContext(Datacontext);

  const [filteredsearch, setfilteredsearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Price range for filtering
  const [selectedCategory, setSelectedCategory] = useState("");
  const [mobilefilteropen, setmfopen] = useState(true);

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
    <div className=" relative m-auto w-screen">
      <Nav />

      {/* mobile toggle for the filter */}
      <div className="md:hidden absolute z-50 bottom-0 right-0 m-6 shadow-lg bg-pink-700 h-11 w-11 rounded-full flex justify-center items-center ">
        <BiEdit
          size={30}
          fill="white"
          onClick={() => {
            console.log(mobilefilteropen);
            setmfopen((curr) => (curr === true ? false : true));
          }}
        />
      </div>

      <div className="text-sm w-screen flex flex-col-reverse md:flex-row h-screen bg-neutral-100">
        {/* Sidebar for filters */}
        <div
          className={`bg-neutral-300 w-full md:w-[25%] lg:w-[25%] p-4 mt-11 ${
            mobilefilteropen === true ? "hidden md:block" : "block"
          }`}
        >
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
            <button
              className="mt-4 bg-pink-700 text-white px-4 py-2 rounded w-full"
              onClick={() => navigate("/cart")}
            >
              Proceed to Cart
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className=" relative w-full md:w-[75%]  lg:w-[75%] m-auto h-full overflow-hidden ">
          <div className=" absolute bottom-0 z-40 bg-white w-full flex justify-center p-4 m-0">
            {/* pagination */}
            <div className="flex ">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 mx-1 border h-min rounded ${
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

          <div className=" h-screen flex justify-center items-center">
            <div className="md:h-[80%] h-[90%] w-full">
              {/* Products */}
              <div className="w-full z-30 overflow-scroll h-full pb-5 pt-4 px-1 md:p-3 hidescroll">
                {isloading ? (
                  <div className=" w-full h-full flex justify-center items-center ">
                    <LoadingSpinner />
                  </div>
                ) : currentProducts.length === 0 ? (
                  <div>No products found.</div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
                    {currentProducts.map((product, i) => (
                      <Item product={product} key={i}></Item>
                    ))}
                  </div>
                )}
              </div>

              {/* Pagination */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
