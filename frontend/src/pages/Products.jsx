import data from "../../utils/Data";
import Item from "../component/Item";
import { CiSearch } from "react-icons/ci";
import {} from "react-icons";

import { useNavigate } from "react-router-dom";
import Part from "../component/part/Partcart";

function Products() {
  const route = useNavigate();
  return (
    <div>
      <div className="container">
        <div className="proccedtocart" onClick={() => route("/cart")}>
          <Part />
          <span>procced to cart</span>
        </div>
        <div className="input">
          <input type="text" placeholder="search..." />
          <CiSearch size={20}></CiSearch>
        </div>
        <div className="box">
          {data.products.map((product) => (
            <Item product={product} key={product.slug}></Item>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
