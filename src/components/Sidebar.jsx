import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const tools = [
    { name: "首頁", path: "/" },

    // PDF 編輯
    { name: "PDF 分割", path: "/split-pdf" },
    { name: "PDF 合併", path: "/merge-pdf" },
    { name: "PDF 刪頁", path: "/delete-pages-pdf" },
    { name: "PDF 排序", path: "/reorder-pdf" },
    { name: "PDF 壓縮", path: "/compress-pdf" },
    { name: "PDF 擷取頁面", path: "/extract-pdf" },

    // 轉換
    { name: "PDF 轉 PNG", path: "/pdf-to-png" },
    { name: "圖片轉 PDF", path: "/image-to-pdf" },

    // 安全
    { name: "PDF 加密", path: "/encrypt-pdf" },
    { name: "PDF 解鎖", path: "/unlock-pdf" },

    // 增強
    { name: "PDF 浮水印", path: "/watermark-pdf" },
    { name: "Logo 浮水印", path: "/logo-watermark-pdf" },
    { name: "PDF 頁碼", path: "/page-number-pdf" },
    { name: "Header / Footer", path: "/header-footer-pdf" },
    { name: "PDF Metadata", path: "/metadata-pdf" },
  ];

  return (
    <div
      style={{
        width: 260,
        background: "white",
        borderRight: "1px solid #e5e7eb",
        padding: 16,
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <h2 style={{ marginBottom: 20, fontSize: 18 }}>
        📒 PDF Workspace
      </h2>

      {tools.map((tool) => {
        const active = location.pathname === tool.path;

        return (
          <Link
            key={tool.path}
            to={tool.path}
            style={{
              display: "block",
              padding: "10px 12px",
              marginBottom: 6,
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              color: active ? "white" : "#374151",
              background: active ? "#4f46e5" : "transparent",
              transition: "0.2s",
            }}
          >
            {tool.name}
          </Link>
        );
      })}
    </div>
  );
}