import {  CiUser } from "react-icons/ci";

function Nav2() {
 
  return (
    <div className="containter">
      <nav>
        {}
        <div className="logo-cont"></div>

        <div className="navigation">
          <div className="router-cont">
            <div>
              <a href="/">HOME</a>
            </div>
            <div>
              <a href="/admin">ADMIN</a>
            </div>
            <div>
              <a href="/products">PRODUCT</a>
            </div>
           
          </div>

          <div className="icon-container">
                       
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

export default Nav2;
