import { useState, useEffect } from "react";
import ToolCard from "../components/ToolCard";
import { tools } from "../config/tools";

export default function Home() {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState([]);

  const allTools = tools.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      category: group.category,
    }))
  );

  useEffect(() => {
    const history = JSON.parse(
      localStorage.getItem("recent") || "[]"
    );

    setRecent(history);
  }, []);

  const addRecent = (tool) => {
    const history = JSON.parse(
      localStorage.getItem("recent") || "[]"
    );

    const updated = [
      tool,
      ...history.filter(
        (t) => t.path !== tool.path
      ),
    ].slice(0, 6);

    localStorage.setItem(
      "recent",
      JSON.stringify(updated)
    );

    setRecent(updated);
  };

  const filteredTools = allTools.filter(
    (tool) =>
      tool.title
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <h1>PDF Workspace</h1>

        <p
          style={{
            color: "#6b7280",
            marginTop: 10,
          }}
        >
          專業 PDF 工具平台
        </p>

        <input
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="搜尋工具..."
          style={{
            width: "100%",
            maxWidth: 600,
            padding: 16,
            marginTop: 20,
            borderRadius: 16,
            border: "1px solid #e5e7eb",
          }}
        />
      </div>

      {recent.length > 0 && (
        <>
          <h2>最近使用</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(250px,1fr))",
              gap: 20,
              marginBottom: 40,
            }}
          >
            {recent.map((tool) => (
              <ToolCard
                key={tool.path}
                tool={tool}
              />
            ))}
          </div>
        </>
      )}

      <h2>所有工具</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(250px,1fr))",

          gap: 20,
        }}
      >
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.path}
            tool={tool}
            onClick={() =>
              addRecent(tool)
            }
          />
        ))}
      </div>
    </div>
  );
}