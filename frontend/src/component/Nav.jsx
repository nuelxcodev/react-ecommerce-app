import { CiUser } from "react-icons/ci";
import { AiOutlineDown, AiOutlineGift } from "react-icons/ai";
import Part from "./part/Partcart";


function Nav() {
 
  return (
    <div>
      <nav>
        {}
        <div className="logo-cont"></div>

        <div className="navigation">
          <div className="router-cont">
            <div>
              <a href="/">HOME</a>
            </div>
            <div>
              <a href="/cart">ADMIN</a>
            </div>
            <div>
              <a href="/products">PRODUCT</a>
            </div>
            <div>
              <span>CARTEGORY</span>
              <AiOutlineDown />
            </div>
          </div>

          <div className="icon-container">
            <div>
              <Part />
            </div>
            <div>
              <a href="/shipping">
                <AiOutlineGift size={25}></AiOutlineGift>
              </a>
            </div>
            <div>
              <a href="/login">
                <CiUser size={20}></CiUser>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
