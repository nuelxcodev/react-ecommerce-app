import Item from "../component/Item";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Part from "../component/part/Partcart";
import { useContext, useState } from "react";
import { Datacontext } from "../../utils/Data";

function Products() {
  const { data } = useContext(Datacontext);

  const [search, setsearch] = useState("");
  const [filteredsearch, setfilteredsearch] = useState([]);
  const route = useNavigate();

  const searchitems = data.products.map((prdt) => {
    return prdt;
  });
  const catergory = [...new Set(searchitems)];

  return (
    <div>
      <div className="container">
        <div className="proccedtocart" onClick={() => route("/cart")}>
          <Part />
          <span>procced to cart</span>
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="search..."
            onChange={(e) => setsearch(e.target.value)}
          />
          <CiSearch
            size={20}
            onClick={() => {
              const searchtext = search.toLowerCase();
              const filtered = catergory.filter((searchresult) => {
                return searchresult.name
                  .toLocaleLowerCase()
                  .includes(searchtext);
              });
              setfilteredsearch(filtered);
            }}
          ></CiSearch>
        </div>

        <div>
          {filteredsearch.length === 0 ? (
            <div className="box">
              {data.products.map((product) => (
                <Item product={product} key={product.slug}></Item>
              ))}
            </div>
          ) : (
            <div className="box">
              {filteredsearch.map((product) => (
                <Item product={product} key={product.slug}></Item>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
