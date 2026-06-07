import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const tools = [
    { name: "首頁", path: "/" },
    { name: "PDF 分割", path: "/split" },
    { name: "PDF 合併", path: "/merge" },
    { name: "PDF 刪頁", path: "/delete-pages" },
    { name: "PDF 排序", path: "/reorder" },
    { name: "PDF 壓縮", path: "/compress" },
    { name: "PDF 加密", path: "/encrypt" },
    { name: "PDF 轉PNG", path: "/pdf-to-png" },
  ];

  return (
    <div
      style={{
        width: 240,
        background: "white",
        borderRight: "1px solid #e5e7eb",
        padding: 16,
      }}
    >
      <h2 style={{ marginBottom: 20 }}>
        📄 PDF Tool Hub
      </h2>

      {tools.map((tool) => {
        const active =
          location.pathname === tool.path;

        return (
          <Link
            key={tool.path}
            to={tool.path}
            style={{
              display: "block",
              padding: 10,
              marginBottom: 6,
              borderRadius: 8,
              textDecoration: "none",
              color: active ? "white" : "#333",
              background: active
                ? "#4f46e5"
                : "transparent",
            }}
          >
            {tool.name}
          </Link>
        );
      })}
    </div>
  );
}