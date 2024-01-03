import Banner1 from "../component/Banner1";
import Nav from "../component/Nav";
import Item from "../component/Item";
import Footer from "../component/Footer";
import { useContext } from "react";
import { Datacontext } from "../../utils/Data";

function Home() {
  const { data } = useContext(Datacontext);
 
  return (
    <>
      <Nav />
      <div className="home">
        <div>
          <Banner1 />
        </div>

        <div className="container">
          <div className="box">
            {data.products.map((product) => (
              <Item product={product} key={product.slug}></Item>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
