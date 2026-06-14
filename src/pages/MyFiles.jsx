import { useEffect, useMemo, useState } from "react";

import {
  getFiles,
  deleteFile,
  toggleFavorite,
  renameFile,
  clearFiles,
} from "../utils/fileHistory";

export default function MyFiles() {
  const [files, setFiles] = useState([]);
  const [query, setQuery] = useState("");

  const loadFiles = () => {
    setFiles(getFiles());
  };

  const filteredFiles = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return files;
    return files.filter((file) => [file.name, file.tool, file.createdAt].join(" ").toLowerCase().includes(keyword));
  }, [files, query]);

  useEffect(() => {
    loadFiles();
  }, []);

  const handleRename = (file) => {
    const newName = prompt(
      "輸入新的檔名",
      file.name
    );

    if (!newName) return;

    renameFile(file.id, newName);

    loadFiles();
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            📄 My Files
          </h1>

          <p style={{ color: "var(--muted)" }}>Manage your processed files.</p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋檔名 / 工具 / 日期"
            style={{ height: 42, borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", padding: "0 12px", minWidth: 220 }}
          />
          <button
          onClick={() => {
            if (
              window.confirm(
                "確定清空全部紀錄？"
              )
            ) {
              clearFiles();
              loadFiles();
            }
          }}
          style={styles.clearBtn}
        >
          清空紀錄
          </button>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.statsGrid}>
        <StatCard
          title="Total Files"
          value={files.length}
          icon="📄"
        />

        <StatCard
          title="Favorites"
          value={
            files.filter(
              (f) => f.favorite
            ).length
          }
          icon="⭐"
        />

        <StatCard
          title="Storage"
          value={`${files.reduce((sum, file) => sum + (Number(file.size) || 0), 0)} KB`}
          icon="💾"
        />

        <StatCard
          title="Tools Used"
          value={
            new Set(
              files.map(
                (f) => f.tool
              )
            ).size
          }
          icon="⚡"
        />
      </div>

      {/* FILE LIST */}
      {filteredFiles.length === 0 ? (
        <EmptyState />
      ) : (
        <div style={styles.grid}>
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              style={styles.card}
            >
              <div
                style={{
                  fontSize: 34,
                }}
              >
                📄
              </div>

              <h3>{file.name}</h3>

              <p>Tool: {file.tool}</p>
              <p>Size: {file.size || "Unknown"}</p>
              <p>{new Date(file.createdAt).toLocaleString()}</p>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 12,
                }}
              >
                <button
                  onClick={() => {
                    toggleFavorite(
                      file.id
                    );
                    loadFiles();
                  }}
                >
                  {file.favorite
                    ? "⭐"
                    : "☆"}
                </button>

                <button
                  onClick={() =>
                    handleRename(
                      file
                    )
                  }
                >
                  ✏️
                </button>

                <button
                  onClick={() => {
                    const url = file.blob ? URL.createObjectURL(file.blob) : null;
                    if (url) {
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = file.name || "download.pdf";
                      a.click();
                      URL.revokeObjectURL(url);
                    }
                  }}
                >
                  ⬇️
                </button>

                <button
                  onClick={() => {
                    deleteFile(file.id);
                    loadFiles();
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- */

function EmptyState() {
  return (
    <div
      style={{
        background: "var(--card)",
        borderRadius: 24,
        padding: 60,
        textAlign: "center",
        border:
          "1px solid var(--border)",
      }}
    >
      <div
        style={{
          fontSize: 64,
        }}
      >
        📂
      </div>

      <h2>尚無檔案紀錄</h2>

      <p
        style={{
          color: "var(--muted)",
        }}
      >
        使用 PDF 工具後會自動出現在這裡
      </p>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <div style={styles.statCard}>
      <div
        style={{
          fontSize: 30,
        }}
      >
        {icon}
      </div>

      <div>{title}</div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
        }}
      >
        {value}
      </div>
    </div>
  );
}

const styles = {
  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: 16,
    marginBottom: 24,
  },

  statCard: {
    background: "var(--card)",
    borderRadius: 20,
    padding: 24,
    border: "1px solid var(--border)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill,minmax(280px,1fr))",
    gap: 16,
  },

  card: {
    background: "var(--card)",
    borderRadius: 20,
    padding: 20,
    border: "1px solid var(--border)",
  },

  clearBtn: {
    border: "none",
    background: "#ef4444",
    color: "var(--card)",
    padding: "12px 20px",
    borderRadius: 12,
    cursor: "pointer",
  },
};