import { useState } from "react";
import { NavLink } from "react-router-dom";
import { tools } from "../config/tools";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        ...styles.sidebar,
        width: collapsed ? 80 : 270,
      }}
    >
      <div style={styles.top}>
        <div style={styles.logo}>
          <div style={styles.logoBox} />

          {!collapsed && (
            <div style={styles.logoText}>
              PDF Workspace
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={styles.collapseBtn}
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      <SidebarItem
        to="/"
        label="首頁"
        icon="🏠"
        collapsed={collapsed}
      />

      {tools.map((group) => (
        <div key={group.category}>
          {!collapsed && (
            <div style={styles.sectionTitleSmall}>
              {group.category}
            </div>
          )}

          {group.items.map((tool) => (
            <SidebarItem
              key={tool.path}
              to={tool.path}
              label={tool.title}
              icon={tool.icon}
              collapsed={collapsed}
            />
          ))}
        </div>
      ))}
    </aside>
  );
}

function SidebarItem({
  to,
  label,
  icon,
  collapsed,
}) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...styles.item,
        justifyContent: collapsed
          ? "center"
          : "flex-start",

        color: isActive
          ? "#4f46e5"
          : "#475569",

        background: isActive
          ? "rgba(79,70,229,0.08)"
          : "transparent",

        borderLeft: isActive
          ? "3px solid #4f46e5"
          : "3px solid transparent",
      })}
    >
      <span>{icon}</span>

      {!collapsed && (
        <span>{label}</span>
      )}
    </NavLink>
  );
}

const styles = {
  sidebar: {
    minHeight: "100vh",
    flexShrink: 0,

    background: "white",

    borderRight:
      "1px solid rgba(0,0,0,0.06)",

    display: "flex",
    flexDirection: "column",

    padding: "14px 10px",

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
    background: "#4f46e5",
  },

  logoText: {
    fontWeight: 800,
    color: "#1e293b",
  },

  collapseBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
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
  },
};