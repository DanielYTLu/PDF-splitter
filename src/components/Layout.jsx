import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f7fb",
      }}
    >
      <header
        style={{
          background: "white",
          padding: "16px 24px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontWeight: "bold",
            color: "#4f46e5",
            fontSize: 20,
          }}
        >
          PDF Tool Hub
        </Link>
        <Link to="/split">PDF分割</Link>
        <Link to="/merge">PDF合併</Link>
        <Link to="/pdf-to-png">PDF轉PNG</Link>
        <Link to="/delete-pages">PDF刪頁</Link>
        <Link to="/reorder">PDF排序</Link>
        <Link to="/compress">PDF壓縮</Link>
        <Link to="/encrypt">PDF加密</Link>
      </header>

      <main
        style={{
          padding: 24,
        }}
      >
        {children}
      </main>
    </div>
  );
}
