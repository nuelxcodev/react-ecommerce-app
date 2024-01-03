/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Store } from "../../utils/Store";
import { GiChart, GiShoppingBag } from "react-icons/gi";
import { BsBank, BsPaypal, BsStripe } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LocationForm from "../component/part/locationForm";

function Shipping() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { cart, location } = state;

  // const startshopping = navigate('p')
  const [shippingLocation, setshipLocation] = useState({});
  const shippingFEE = 20;
  let total = cart.reduce((a, c) => a + c.quantity * c.price, +shippingFEE, 0);

  return (
    <div className="container">
      {location.length === 0 ? (
        <div className="location-form-cont">
          <LocationForm state={state} dispatch={dispatch} />
        </div>
      ) : (
        <div>
          {cart.length === 0 ? (
            (alert("no cart found"), navigate("/products"))
          ) : (
            <section className="shipping">
              <div className="shippingNav-cont">
                <div className="shippingNav">
                  <div onClick={() => navigate("/")}>
                    <span href="/">HOME</span>
                  </div>
                  <div
                    className="continueCART"
                    onClick={() => navigate("/products")}
                  >
                    <GiShoppingBag size={25} color="navy" />
                    <span href="/products">SHOP-MORE</span>
                  </div>
                  <div className="continueCART">
                    <GiChart size={20} />
                    <span>ADMIN-DASHBORD</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="shippingInfo">
                  <div className="cost-cont">
                    <div>
                      <span>TOTAL ITEMS: </span>
                      {cart.reduce((a, c) => a + c.quantity, 0)}
                    </div>
                    <div>
                      <span>TOTAL PRICE:</span> $
                      {cart.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </div>
                  </div>

                  <div>
                    <section className="location">
                      <div>
                        <span>current location: </span>
                        {location.country}, {location.state}, {location.city}
                      </div>
                      <div>
                        <span>delivery location:</span>
                        {location.address2}
                      </div>
                      <div>
                        <span>shipping fee: </span>${`${shippingFEE}`}
                      </div>
                    </section>
                  </div>

                  <div className="payment">
                    select payment method :
                    <div>
                      <div className="method">
                        <div>
                          <BsStripe size={20} color="navy" />
                          <label> stripe</label>
                        </div>
                        <div>
                          <BsPaypal size={20} color="navy" />
                          <label> paypal</label>
                        </div>

                        <div>
                          <BsBank
                            size={20}
                            color="navy"
                            onClick={() => {
                              const bttn = document.getElementById("btn");
                              const div =
                                document.getElementById("accountNumber");
                              bttn.value = "DONE";
                              bttn.addEventListener("click", () => {
                                div.innerHTML = "";
                                bttn.value = "PAY NOW";
                              });
                              div.innerHTML = `3126143071 
                        <p>please make a payment of $${total}
                        to the above account number</p>`;
                            }}
                          />
                          <label> bank transfer</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="accountNumber"></div>

                  <div>
                    <input
                      type="button"
                      value={`PAY NOW ($${total})`}
                      id="btn"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default Shipping;
