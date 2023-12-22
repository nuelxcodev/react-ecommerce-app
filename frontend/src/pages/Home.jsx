import Banner1 from "../component/Banner1";
import Nav from "../component/Nav";
import Item from "../component/Item";
import data from "../../utils/Data";

function Home() {
  return (
    <>
      <Nav />

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
    </>
  );
}

export default Home;
