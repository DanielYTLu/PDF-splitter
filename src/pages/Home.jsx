import { useState, useEffect } from "react";
import ToolCard from "../components/ToolCard";
import "../styles/card.css";

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
const featured = tools.slice(0, 6);

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
<div
style={{
background: "linear-gradient(180deg,#eef4ff,#ffffff)",
minHeight: "100vh",
}}
>
{/* HERO */}
<section
style={{
textAlign: "center",
padding: "80px 20px 40px",
}}
>
<h1
  style={{
    fontSize: 68,
    fontWeight: 900,
    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: 12,
  }}
>
  PDF Workspace
</h1>


    <p
      style={{
        fontSize: 18,
        color: "#6b7280",
        maxWidth: 700,
        margin: "0 auto",
        lineHeight: 1.6,
      }}
    >
      Professional PDF Toolkit for Students, Engineers and Creators.
      <br />
      Split, Merge, Convert and Secure PDFs directly in your browser.
    </p>

    {/* SEARCH */}
    <div style={{ marginTop: 30 }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜尋 PDF 工具..."
        style={{
          width: "60%",
          maxWidth: 650,
          padding: "18px 20px",
          borderRadius: 18,
          border: "1px solid #e5e7eb",
          fontSize: 15,
          outline: "none",
          boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
        }}
      />
    </div>
  </section>

  {/* STATS */}
  <section
    style={{
      display: "flex",
      justifyContent: "center",
      gap: 24,
      padding: "0 40px 50px",
      flexWrap: "wrap",
    }}
  >
    <div className="tool-card" style={{ width: 220 }}>
      <h2>12+</h2>
      <p>PDF 工具</p>
    </div>

    <div className="tool-card" style={{ width: 220 }}>
      <h2>100%</h2>
      <p>Browser Processing</p>
    </div>

    <div className="tool-card" style={{ width: 220 }}>
      <h2>Free</h2>
      <p>無需註冊</p>
    </div>
  </section>

  {/* RECENT */}
  {recent.length > 0 && (
    <section style={{ padding: "0 40px 40px" }}>
      <h2 style={{ marginBottom: 20 }}>🕒 最近使用</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 20,
        }}
      >
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

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 20,
      }}
    >
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
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          {cat}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 16,
          }}
        >
          {tools
            .filter(
              (t) =>
                t.category === cat &&
                t.title
                  .toLowerCase()
                  .includes(query.toLowerCase())
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

  {/* FEATURES */}
  <section
    style={{
      padding: "80px 40px",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: 40,
      }}
    >
      為什麼選擇 PDF Workspace？
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 20,
      }}
    >
      <div className="tool-card">
        <h3>⚡ 快速處理</h3>
        <p>所有檔案皆於瀏覽器本地處理。</p>
      </div>

      <div className="tool-card">
        <h3>🔒 安全隱私</h3>
        <p>不上傳伺服器，保護你的文件。</p>
      </div>

      <div className="tool-card">
        <h3>🆓 免費使用</h3>
        <p>提供完整 PDF 工具功能。</p>
      </div>
    </div>
  </section>

  {/* FOOTER */}
  <footer
    style={{
      textAlign: "center",
      padding: 50,
      color: "#9ca3af",
      fontSize: 14,
    }}
  >
    Designed for Students • Built for Productivity • Ready for AI
  </footer>
</div>

);
}
