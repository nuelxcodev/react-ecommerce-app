import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StoreProvider } from "../utils/Store.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "../utils/Auth.jsx";
import { DataProvider } from "../utils/Data.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider>
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <DataProvider>
          <App />
        </DataProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  </StoreProvider>
);
