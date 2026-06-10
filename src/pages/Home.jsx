import { useState } from "react";
import ToolCard from "../components/ToolCard";
import StatCard from "../components/ui/StatCard";
import { tools } from "../config/tools";

export default function Home() {
  const [query, setQuery] = useState("");

  const allTools = tools.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      category: group.category,
    }))
  );

  const groupedTools = tools;

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "32px 20px",
      }}
    >
      {/* HERO */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#7c3aed)",
          borderRadius: 28,
          padding: "48px 32px",
          textAlign: "center",
          color: "white",
          marginBottom: 40,
          boxShadow:
            "0 20px 50px rgba(59,130,246,0.25)",
        }}
      >
        <h1
          style={{
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          PDF Workspace
        </h1>

        <p
          style={{
            opacity: 0.92,
            fontSize: 18,
            marginBottom: 28,
            lineHeight: 1.6,
          }}
        >
          Professional PDF Toolkit
          <br />
          Fast • Secure • Local Processing
        </p>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋 PDF 工具..."
          style={{
            width: "100%",
            maxWidth: 650,
            padding: "16px 20px",
            borderRadius: 16,
            border: "none",
            outline: "none",
            fontSize: 15,
            color: "#111827",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.12)",
          }}
        />
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 50,
        }}
      >
        <StatCard
          title="Available Tools"
          value={allTools.length}
          icon="🛠️"
        />

        <StatCard
          title="Categories"
          value={tools.length}
          icon="📂"
        />

        <StatCard
          title="Local Processing"
          value="100%"
          icon="🔒"
        />
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ marginBottom: 60 }}>
        <h2
          style={{
            marginBottom: 20,
            fontSize: 24,
          }}
        >
          ⚡ Quick Actions
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 16,
          }}
        >
          {[
            {
              title: "PDF 合併",
              icon: "🧩",
              path: "/merge-pdf",
              category: "快速操作",
              description: "合併多個 PDF 檔案",
            },
            {
              title: "PDF 分割",
              icon: "✂️",
              path: "/split-pdf",
              category: "快速操作",
              description: "快速拆分 PDF 頁面",
            },
            {
              title: "PDF 壓縮",
              icon: "📉",
              path: "/compress-pdf",
              category: "快速操作",
              description: "降低 PDF 檔案大小",
            },
            {
              title: "PDF 轉 PNG",
              icon: "🖼️",
              path: "/pdf-to-png",
              category: "快速操作",
              description: "轉換 PDF 為圖片",
            },
          ].map((tool) => (
            <ToolCard
              key={tool.path}
              tool={tool}
            />
          ))}
        </div>
      </div>

      {/* ALL TOOLS */}
      {groupedTools.map((group) => (
        <div
          key={group.category}
          style={{ marginBottom: 60 }}
        >
          <h2
            style={{
              marginBottom: 20,
              fontSize: 24,
            }}
          >
            {group.category}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(220px,1fr))",
              gap: 16,
            }}
          >
            {group.items
              .filter((tool) =>
                tool.title
                  .toLowerCase()
                  .includes(query.toLowerCase())
              )
              .map((tool) => (
                <ToolCard
                  key={tool.path}
                  tool={{
                    ...tool,
                    category: group.category,
                  }}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}