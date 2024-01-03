/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";

import { useContext } from "react";
import { Store } from "../../utils/Store";
import Nav from "../component/Nav";
import { Datacontext } from "../../utils/Data";

function ProductScreen() {
  const { data } = useContext(Datacontext);
  const { state, dispatch } = useContext(Store);
  const { user } = state;

  const location = useLocation();
  const name = location.pathname;
  const product = data.products.find(
    (product) => product.slug === name.slice(1)
  );
  const products = data.products.find((x) => x.slug === product.slug);
  if (!product) {
    return <div>product not available</div>;
  }

  return (
    <div>
      <Nav />
      <div className="container">
        <div className="slug-cont">
          <div className="mockimages-cont">
            <div className="image-conatainer">
              <img src={products.image} alt={products.name} />
            </div>
            <div className="moreimages-cont">
              <img src={products.image} alt={products.name} />
              <img src={products.image} alt={products.name} />
              <img src={products.image} alt={products.name} />
            </div>
          </div>

          <div className="slugInformation">
            <div className="header">
              <h1>{product.name}</h1>
              <h2>${product.price}</h2>
            </div>
            <div className="quantity">
              <b>instock:</b>
              {products.countInStock}
            </div>

            <div className="slugBody">
              <section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
                cupiditate, consectetur officia quam quaerat, a alias, totam ad
                eum error optio dolore inventore deleniti delectus sed molestias
                ducimus omnis non.
                <p></p> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Debitis animi nihil id porro illo dicta suscipit dolorum
                laudantium necessitatibus, eum voluptatem ipsum quibusdam
                molestiae modi placeat non voluptas voluptate accusamus.
              </section>
            </div>

            <div className="addtoCart">
              <input type="button" value="add to cart" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductScreen;
