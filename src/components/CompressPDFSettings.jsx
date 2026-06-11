import { useMemo } from "react";

export default function CompressPDFSettings({
  settings,
  setSettings,
}) {
  const options = useMemo(
    () => [
      { label: "輕量壓縮", value: "low" },
      { label: "平衡模式", value: "medium" },
      { label: "極致壓縮", value: "high" },
    ],
    []
  );

  const activeIndex = options.findIndex(
    (o) => o.value === settings.level
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.title}>
        壓縮等級
      </div>

      <div style={styles.segment}>
        {/* moving indicator */}
        <div
          style={{
            ...styles.indicator,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />

        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() =>
              setSettings({
                ...settings,
                level: opt.value,
              })
            }
            style={{
              ...styles.option,
              color:
                settings.level === opt.value
                  ? "#0f172a"
                  : "#64748b",
            }}
          >
            {opt.label}
          </button>
        ))}
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
  },

  title: {
    fontSize: 13,
    fontWeight: 600,
    color: "#0f172a",
    marginBottom: 4,
  },

  segment: {
    position: "relative",
    display: "flex",
    background: "#f1f5f9",
    borderRadius: 12,
    padding: 4,
    border: "1px solid #e2e8f0",
    overflow: "hidden",
  },

  option: {
    flex: 1,
    padding: "10px 12px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 13,
    zIndex: 2,
    transition: "all 0.25s ease",
  },

  indicator: {
    position: "absolute",
    top: 4,
    left: 4,
    bottom: 4,
    width: "calc(33.333% - 4px)",
    background: "#ffffff",
    borderRadius: 10,
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: 1,
  },
};