import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/Auth";

function Admin() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <div className="admin-dashboard">
        <nav className="admin-nav">
          <a href="/">
            <span>HOME</span>
          </a>
          <a href="/sell">
            <span>sell</span>
          </a>
          <a href="/flow">
            <span>DASHBOARD</span>
          </a>
        </nav>

        <input
          type="button"
          value="logout"
          onClick={() => {
            auth.logout();
            navigate("/");
          }}
        />
      </div>
      <div className="container">
        <div>
          <div className="profile">
            <section>
              <h1>{auth.user.username}:</h1>

              <div className="image">
                <input type="file" name="userprofile" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
