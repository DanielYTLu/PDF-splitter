import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";
import "./styles/layout.css";   // ⭐⭐⭐ 加這行（關鍵修復）

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);