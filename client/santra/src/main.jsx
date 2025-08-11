import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartUserProvider } from "./contextApi/Auth/Auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartUserProvider>
      <App />
    </CartUserProvider>
  </React.StrictMode>
);
