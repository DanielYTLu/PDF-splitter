import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f6f7fb",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: 24,
          overflow: "auto",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}