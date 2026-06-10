import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";

/* =====================
   CSS ORDER（正確順序）
===================== */
import "./styles/variables.css";
import "./index.css";
import "./styles/layout.css";
import "./styles/components.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);