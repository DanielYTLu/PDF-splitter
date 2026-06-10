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

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "32px 20px",
        color: "var(--text)",
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
        }}
      >
        <h1 style={{ fontSize: 42, fontWeight: 800 }}>
          PDF Workspace
        </h1>

        <p style={{ opacity: 0.9 }}>
          Professional PDF Toolkit
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
            marginTop: 20,
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

      {/* SECTION TITLE FIX */}
      <h2 style={{ color: "var(--text)" }}>
        ⚡ Quick Actions
      </h2>

      {/* TOOLS */}
      {tools.map((group) => (
        <div key={group.category} style={{ marginBottom: 40 }}>
          <h2 style={{ color: "var(--text)" }}>
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
            {group.items.map((tool) => (
              <ToolCard key={tool.path} tool={tool} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}