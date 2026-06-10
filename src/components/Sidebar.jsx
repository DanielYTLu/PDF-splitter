import { useState } from "react";
import { NavLink } from "react-router-dom";
import { tools } from "../config/tools";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* SIDEBAR */}
      <aside
        style={{
          ...styles.sidebar,
          width: collapsed ? 0 : 270,
          padding: collapsed ? 0 : "14px 10px",
          overflow: "hidden",
        }}
      >
        {!collapsed && (
          <>
            {/* TOP */}
            <div style={styles.top}>
              <div style={styles.logo}>
                <div style={styles.logoBox} />
                <div style={styles.logoText}>
                  PDF Workspace
                </div>
              </div>

              <button
                onClick={() => setCollapsed(true)}
                style={styles.collapseBtn}
                title="收合"
              >
              <div style={styles.arrowIcon} />
              </button>
            </div>

            {/* MENU */}
            <SidebarItem
              to="/"
              label="首頁"
              icon="🏠"
            />

            {tools.map((group) => (
              <div key={group.category}>
                <div style={styles.sectionTitleSmall}>
                  {group.category}
                </div>

                {group.items.map((tool) => (
                  <SidebarItem
                    key={tool.path}
                    to={tool.path}
                    label={tool.title}
                    icon={tool.icon}
                  />
                ))}
              </div>
            ))}
          </>
        )}
      </aside>

      {/* 🔥 永遠存在的展開按鈕（關鍵修復） */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          style={styles.expandBtn}
          title="展開側邊欄"
        >
          ☰
        </button>
      )}
    </>
  );
}

/* ================= ITEM ================= */

function SidebarItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...styles.item,
        color: isActive ? "#4f46e5" : "#475569",
        background: isActive
          ? "rgba(79,70,229,0.08)"
          : "transparent",
        borderLeft: isActive
          ? "3px solid #4f46e5"
          : "3px solid transparent",
      })}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

/* ================= STYLES ================= */

const styles = {
  sidebar: {
    minHeight: "100vh",
    width: 270,
    background: "#fff",
    borderRight: "1px solid rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    transition: "0.25s ease",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  logoBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "linear-gradient(135deg,#4f46e5,#3b82f6)",
  },

  logoText: {
    fontWeight: 800,
    color: "#1e293b",
  },

  collapseBtn: {
  width: 34,
  height: 34,
  borderRadius: 10,

  border: "1px solid rgba(0,0,0,0.06)",
  background: "white",

  cursor: "pointer",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  transition: "0.2s ease",

  color: "#64748b",
  fontSize: 14,
},

  expandBtn: {
    position: "fixed",
    left: 25,
    top: 16,

    width: 44,
    height: 44,
    borderRadius: 12,

    border: "1px solid rgba(79,70,229,0.2)",
    background: "#4f46e5",
    color: "white",

    fontSize: 18,
    cursor: "pointer",

    boxShadow: "0 10px 25px rgba(79,70,229,0.25)",
    zIndex: 9999,
  },

  sectionTitleSmall: {
    fontSize: 11,
    color: "#94a3b8",
    margin: "14px 8px 6px",
    letterSpacing: "0.1em",
  },

  item: {
    display: "flex",
    gap: 10,
    padding: "11px 12px",
    borderRadius: 10,
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
    alignItems: "center",
    transition: "0.2s",
  },
  arrowIcon: {
  width: 10,
  height: 10,
  borderRight: "2px solid #64748b",
  borderBottom: "2px solid #64748b",
  transform: "rotate(135deg)", // ⮜
},
};