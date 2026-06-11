import { useState, useMemo } from "react";
import ToolCard from "../components/ToolCard";
import StatCard from "../components/ui/StatCard";
import { tools } from "../config/tools";
import { useUser } from "../context/UserContext";
import { t } from "../i18n";

export default function Home() {
  const [query, setQuery] = useState("");
  const { user } = useUser();
  const lang = user.language;

  const isSearching = query.trim().length > 0;

  const allTools = useMemo(
    () =>
      tools.flatMap((group) =>
        group.items.map((item) => ({
          ...item,
          category: group.category,
        }))
      ),
    []
  );

  const filteredTools = useMemo(() => {
    const keyword = query.toLowerCase();

    return allTools.filter((tool) => {
      const title = t(lang, tool.title).toLowerCase();

      const description = tool.description
        ? t(lang, tool.description).toLowerCase()
        : "";

      const category = t(lang, tool.category).toLowerCase();

      return (
        title.includes(keyword) ||
        description.includes(keyword) ||
        category.includes(keyword) ||
        tool.title.toLowerCase().includes(keyword)
      );
    });
  }, [query, allTools, lang]);

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
          background: "linear-gradient(135deg,#2563eb,#7c3aed)",
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
          {t(lang, "professionalToolkit")}
        </p>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t(lang, "searchTools")}
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

      {/* ========================= */}
      {/* NORMAL MODE (分類模式) */}
      {/* ========================= */}
      {!isSearching && (
        <>
          {tools.map((group) => (
            <div key={group.category} style={{ marginBottom: 40 }}>
              <h2 style={{ color: "var(--text)" }}>
                {t(lang, group.category)}
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
        </>
      )}

      {/* ========================= */}
      {/* SEARCH MODE */}
      {/* ========================= */}
      {isSearching && (
        <>
          <h2 style={{ color: "var(--text)", marginBottom: 16 }}>
            🔍 {t(lang, "searchResults")}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(220px,1fr))",
              gap: 16,
            }}
          >
            {filteredTools.length === 0 ? (
              <div
                style={{
                  padding: 60,
                  textAlign: "center",
                  color: "var(--muted)",
                  gridColumn: "1 / -1",
                }}
              >
                <div style={{ fontSize: 48 }}>🔍</div>
                <h3>{t(lang, "noResults")}</h3>
                <p>{t(lang, "tryAnotherKeyword")}</p>
              </div>
            ) : (
              filteredTools.map((tool) => (
                <ToolCard key={tool.path} tool={tool} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}