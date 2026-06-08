import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/card.css";

import ToolCard from "../components/ToolCard";

export default function Home() {
  const tools = [
    // 編輯
    { title: "PDF 分割", icon: "✂️", path: "/split-pdf", category: "編輯" },
    { title: "PDF 合併", icon: "📚", path: "/merge-pdf", category: "編輯" },
    { title: "PDF 旋轉", icon: "🔄", path: "/rotate-pdf", category: "編輯" },
    { title: "PDF 擷取", icon: "📑", path: "/extract-pdf", category: "編輯" },

    // 轉換
    { title: "PDF 轉 PNG", icon: "🖼️", path: "/pdf-to-png", category: "轉換" },
    { title: "PNG 轉 PDF", icon: "📄", path: "/image-to-pdf", category: "轉換" },

    // 進階
    { title: "浮水印", icon: "💧", path: "/watermark-pdf", category: "進階" },
    { title: "Logo 浮水印", icon: "🖼️", path: "/logo-watermark-pdf", category: "進階" },
    { title: "頁碼", icon: "🔢", path: "/page-number-pdf", category: "進階" },
    { title: "Header/Footer", icon: "📄", path: "/header-footer-pdf", category: "進階" },

    // 安全
    { title: "加密", icon: "🔒", path: "/encrypt-pdf", category: "安全" },
    { title: "解鎖", icon: "🔓", path: "/unlock-pdf", category: "安全" },
  ];

  const categories = ["編輯", "轉換", "進階", "安全"];
  const featured = tools.slice(0, 4);

  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    setRecent(JSON.parse(localStorage.getItem("recent") || "[]"));
  }, []);

  const addRecent = (tool) => {
    const history = JSON.parse(localStorage.getItem("recent") || "[]");

    const updated = [
      tool,
      ...history.filter((t) => t.path !== tool.path),
    ].slice(0, 6);

    localStorage.setItem("recent", JSON.stringify(updated));
    setRecent(updated);
  };

  return (
    <div style={{
      background: "linear-gradient(180deg,#f6f7fb,#ffffff)",
      minHeight: "100vh"
    }}>

      {/* HERO */}
      <section style={{
        textAlign: "center",
        padding: "80px 20px 30px"
      }}>
        <h1 style={{
          fontSize: 52,
          fontWeight: 800,
          letterSpacing: "-1px"
        }}>
          PDF Workspace
        </h1>

        <p style={{
          fontSize: 18,
          color: "#6b7280",
          maxWidth: 700,
          margin: "16px auto"
        }}>
          Professional PDF Toolkit for Students, Engineers and Creators.
        </p>

        {/* SEARCH */}
        <div style={{ marginTop: 20 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋 PDF 工具，例如：split / encrypt / png"
            style={{
              width: "60%",
              padding: "14px 16px",
              borderRadius: 14,
              border: "1px solid #e5e7eb",
              fontSize: 14,
              outline: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}
          />
        </div>
      </section>

      {/* RECENT */}
      {recent.length > 0 && (
        <section style={{ padding: "0 40px 40px" }}>
          <h2 style={{ marginBottom: 20 }}>🕒 最近使用</h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 20
          }}>
            {recent.map((tool) => (
              <ToolCard
                key={tool.path}
                tool={tool}
                onClick={() => {}}
              />
            ))}
          </div>
        </section>
      )}

      {/* FEATURED */}
      <section style={{ padding: "40px" }}>
        <h2 style={{ marginBottom: 20 }}>⭐ 熱門工具</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 20
        }}>
          {featured.map((tool) => (
            <ToolCard
              key={tool.path}
              tool={tool}
              onClick={() => addRecent(tool)}
            />
          ))}
        </div>
      </section>

      {/* CATEGORY */}
      <section style={{ padding: "40px" }}>
        {categories.map((cat) => (
          <div key={cat} style={{ marginBottom: 50 }}>
            <h2 style={{ marginBottom: 20 }}>{cat}</h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 16
            }}>
              {tools
                .filter(
                  (t) =>
                    t.category === cat &&
                    t.title.toLowerCase().includes(query.toLowerCase())
                )
                .map((tool) => (
                  <ToolCard
                    key={tool.path}
                    tool={tool}
                    onClick={() => addRecent(tool)}
                  />
                ))}
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign: "center",
        padding: 50,
        color: "#9ca3af",
        fontSize: 14
      }}>
        Designed for Students • Built for Productivity • Ready for AI
      </footer>

    </div>
  );
}