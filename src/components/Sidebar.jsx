import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const recent = [
    { to: "/split-pdf", label: "PDF分割", icon: "✂️" },
    { to: "/merge-pdf", label: "PDF合併", icon: "🧩" },
    { to: "/compress-pdf", label: "PDF壓縮", icon: "📉" },
  ];

  return (
    <aside style={{ ...styles.sidebar, width: collapsed ? 80 : 270 }}>

      {/* HEADER */}
      <div style={styles.top}>
        <div style={styles.logo}>
          <div style={styles.logoBox} />
          {!collapsed && <div style={styles.logoText}>PDF 工具箱</div>}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={styles.collapseBtn}
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* RECENT */}
      {!collapsed && (
        <div style={styles.recentBox}>
          <div style={styles.sectionTitle}>最近使用</div>

          {recent.map((item) => (
            <SidebarItem key={item.to} {...item} collapsed={collapsed} />
          ))}
        </div>
      )}

      {/* MAIN */}
      <div style={styles.sectionTitleSmall}>工具</div>

      <SidebarItem to="/" label="儀表板" icon="🏠" collapsed={collapsed} />

      <SidebarItem to="/split-pdf" label="PDF分割" icon="✂️" collapsed={collapsed} />
      <SidebarItem to="/merge-pdf" label="PDF合併" icon="🧩" collapsed={collapsed} />
      <SidebarItem to="/delete-pages-pdf" label="刪除頁面" icon="🗑️" collapsed={collapsed} />
      <SidebarItem to="/reorder-pdf" label="頁面排序" icon="🔀" collapsed={collapsed} />
      <SidebarItem to="/compress-pdf" label="PDF壓縮" icon="📉" collapsed={collapsed} />
      <SidebarItem to="/extract-pdf" label="提取頁面" icon="📄" collapsed={collapsed} />
      <SidebarItem to="/rotate-pdf" label="旋轉PDF" icon="🔄" collapsed={collapsed} />

      <div style={styles.sectionTitleSmall}>轉換</div>

      <SidebarItem to="/pdf-to-png" label="PDF轉圖片" icon="🖼️" collapsed={collapsed} />
      <SidebarItem to="/image-to-pdf" label="圖片轉PDF" icon="🧾" collapsed={collapsed} />

      <div style={styles.sectionTitleSmall}>安全</div>

      <SidebarItem to="/encrypt-pdf" label="加密PDF" icon="🔒" collapsed={collapsed} />
      <SidebarItem to="/unlock-pdf" label="解鎖PDF" icon="🔓" collapsed={collapsed} />
    </aside>
  );
}

/* ===== ITEM (UX升級重點) ===== */
function SidebarItem({ to, label, icon, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "item " + (isActive ? "active" : "")
      }
      style={({ isActive }) => ({
        ...styles.item,
        justifyContent: collapsed ? "center" : "flex-start",
        color: isActive ? "#4f46e5" : "#475569",
        background: isActive ? "rgba(79,70,229,0.08)" : "transparent",
        borderLeft: isActive ? "3px solid #4f46e5" : "3px solid transparent",
      })}
      title={collapsed ? label : ""}
    >
      <span style={styles.icon}>{icon}</span>

      {!collapsed && (
        <span style={styles.label}>{label}</span>
      )}
    </NavLink>
  );
}

/* ===== STYLE ===== */
const styles = {
  sidebar: {
    minHeight: "100vh",
    background: "rgba(255,255,255,0.85)",
    borderRight: "1px solid rgba(0,0,0,0.06)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    padding: "14px 10px",
    transition: "0.25s ease",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
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
    fontSize: 16,
    fontWeight: 800,
    color: "#1e293b",
  },

  collapseBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#64748b",
    margin: "10px 8px",
  },

  sectionTitleSmall: {
    fontSize: 11,
    color: "#94a3b8",
    margin: "14px 8px 6px",
    letterSpacing: "0.1em",
  },

  recentBox: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: "1px solid rgba(0,0,0,0.06)",
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "11px 12px",
    borderRadius: 10,
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
    transition: "all 0.15s ease",
  },

  icon: {
    fontSize: 16,
    transition: "transform 0.15s ease",
  },

  label: {
    fontSize: 14,
  },
};
<div style={styles.recentBox}>
  <div style={styles.sectionTitle}>📄 目前文件</div>

  <div style={{ padding: "0 10px", fontSize: 13, color: "#475569" }}>
    {/* 之後接 workspace files */}
    <div>尚未載入</div>
  </div>
</div>