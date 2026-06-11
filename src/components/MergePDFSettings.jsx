import { useMemo } from "react";

export default function MergePDFSettings({
  settings,
  setSettings,
}) {
  const isReverse = settings.mode === "reverse";

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.title}>合併模式</div>
        <div style={styles.desc}>選擇 PDF 合併順序</div>
      </div>

      {/* SEGMENT CONTROL */}
      <div style={styles.segment}>
        {/* 滑動背景指示器 */}
        <div
          style={{
            ...styles.indicator,
            transform: isReverse
              ? "translateX(100%)"
              : "translateX(0%)",
          }}
        />

        {/* ORDER */}
        <button
          onClick={() =>
            setSettings({ ...settings, mode: "order" })
          }
          style={{
            ...styles.option,
            color: !isReverse ? "#0f172a" : "#64748b",
          }}
        >
          ➡️ 順序
        </button>

        {/* REVERSE */}
        <button
          onClick={() =>
            setSettings({ ...settings, mode: "reverse" })
          }
          style={{
            ...styles.option,
            color: isReverse ? "#0f172a" : "#64748b",
          }}
        >
          ⬅️ 逆序
        </button>
      </div>
    </div>
  );
}

/* =========================
🎨 STRIPE / IOS STYLE
========================= */
const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 6,
  },

  header: {
    marginBottom: 4,
  },

  title: {
    fontSize: 13,
    fontWeight: 600,
    color: "#0f172a",
  },

  desc: {
    fontSize: 12,
    color: "#94a3b8",
  },

  segment: {
    position: "relative",
    display: "flex",
    background: "#f1f5f9",
    borderRadius: 14,
    padding: 4,
    border: "1px solid #e2e8f0",
    overflow: "hidden",
  },

  indicator: {
    position: "absolute",
    top: 4,
    left: 4,
    width: "calc(50% - 4px)",
    height: "calc(100% - 8px)",
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: 0,
  },

  option: {
    flex: 1,
    border: "none",
    background: "transparent",
    padding: "10px 12px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    zIndex: 1,
    transition: "color 0.2s ease",
  },
};