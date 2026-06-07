import { Link } from "react-router-dom";
import Layout from "../components/Layout";
export default function Home() {
  const tools = [
    {
      title: "PDF 分割",
      path: "/split",
      icon: "✂️",
    },
    {
      title: "PDF 合併",
      path: "/merge",
      icon: "📚",
    },
    {
      title: "PDF 轉 PNG",
      path: "/pdf-to-png",
      icon: "🖼️",
    },
    {
    title: "PDF頁面刪除",
    path: "/delete-pages",
    icon: "🗑️",
    },
    {
    title: "PDF頁面排序",
    path: "/reorder",
    icon: "🔀",
    },
    {
    title: "PDF壓縮",
    path: "/compress",
    icon: "🗜",
    },
    {
    title: "PDF加密",
    path: "/encrypt",
    icon: "🔒",
    }
  ];

  return (
    <Layout>
    <div style={{ padding: 40 }}>
      <h1>PDF Tool Hub</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 20,
          marginTop: 30,
        }}
      >
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <div
              style={{
                background: "white",
                padding: 30,
                borderRadius: 12,
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <h2>{tool.icon}</h2>
              <h3>{tool.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </Layout>
    
  );
}