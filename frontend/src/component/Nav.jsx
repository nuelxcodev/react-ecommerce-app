/* eslint-disable no-unused-vars */
import { CiUser } from "react-icons/ci";
import { AiOutlineGift } from "react-icons/ai";
import Part from "./part/Partcart";
import { useContext, useEffect } from "react";
import { Store } from "../../utils/Store";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/Auth";
import Logo from "./part/logo";
import { BiMenu } from "react-icons/bi";

function Nav() {
  const { state, dispatch } = useContext(Store);
  const { cart, user } = state;
  const navigate = useNavigate();
  const Auth = useAuth();

  return (
    <div>
      <nav>
        {}
        <div className="navigation">
          <div className="nav-header">
            <a href="/">
              <Logo id="icon" />
            </a>
            <BiMenu
              size={30}
              className="menu"
              onClick={() => {
                document.getElementById("nav").classList.toggle("open");
              }}
            />
          </div>

          <section id="nav">
            <div className="router-cont">
              
              <div>
                <a href="#about">ABOUT</a>
              </div>

              <div>
                <a href="/products">PRODUCT</a>
              </div>
              <div>
                <span>CARTEGORY</span>
              </div>
            </div>

            <div className="icon-container">
              <div>
                <Part />
              </div>
              <div
                style={{ display: "flex" }}
                onClick={() => {
                  cart.length === 0
                    ? (alert(
                        "no cart to ship we are redirection you to shopping page"
                      ),
                      navigate("/products"))
                    : navigate("/shipping");
                }}
              >
                <a>
                  <AiOutlineGift size={25}></AiOutlineGift>
                </a>
                <span className="hidden">SHIPPING</span>
              </div>
              <div style={{ width: "max-content" }}>
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <CiUser
                    size={20}
                    onClick={() => {
                      navigate("/admin");
                    }}
                  ></CiUser>
                  {Auth.user ? (
                    <div className="user">
                      <span className="userSpan">{user.username}</span>
                    </div>
                  ) : (
                    <span>login</span>
                  )}
                </a>
              </div>
            </div>
          </section>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
