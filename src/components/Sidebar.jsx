import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { tools } from "../config/tools";
import { sidebarStyles as styles } from "../styles/sidebar";
import { useUser } from "../context/UserContext";
import { t } from "../i18n";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");
  const { user } = useUser();
  const lang = user.language;

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.body.dataset.theme || "light");
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    setTheme(document.body.dataset.theme || "light");

    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  return (
    <aside
      style={{
        ...styles.sidebar,
        width: collapsed ? 0 : 270,
        padding: collapsed ? 0 : "14px 10px",
        background: "var(--card)",
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

          {/* HOME */}
          <SidebarItem
            to="/"
            label={t(lang, "nav.home")}
            icon="🏠"
            isDark={isDark}
          />

          {/* TOOLS */}
          {tools.map((group) => (
            <div key={group.category}>
              <div style={styles.sectionTitleSmall}>
                {t(lang, `categories.${group.category}`)}
              </div>

              {group.items.map((item) => (
                <SidebarItem
                  key={item.path}
                  to={item.path}
                  label={t(lang, `tools.${item.title}`)}
                  icon={item.icon}
                  isDark={isDark}
                />
              ))}
            </div>
          ))}

          {/* SYSTEM */}
          <div style={styles.accountSection}>
            <SidebarItem
              to="/my-files"
              label={t(lang, "common.myFiles")}
              icon="📁"
              isDark={isDark}
            />

            <SidebarItem
              to="/profile"
              label={t(lang, "common.profile")}
              icon="👤"
              isDark={isDark}
            />

            <SidebarItem
              to="/settings"
              label={t(lang, "common.settings")}
              icon="⚙️"
              isDark={isDark}
            />
          </div>
        </>
      )}

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          style={styles.expandBtn}
        >
          ☰
        </button>
      )}
    </aside>
  );
}

/* ================= ITEM ================= */

function SidebarItem({ to, label, icon, isDark }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...styles.item,

        color: isDark
          ? isActive
            ? "#fff"
            : "rgba(255,255,255,0.75)"
          : isActive
          ? "#4f46e5"
          : "#475569",

        background: isDark
          ? isActive
            ? "rgba(255,255,255,0.12)"
            : "transparent"
          : isActive
          ? "rgba(79,70,229,0.08)"
          : "transparent",

        borderLeft: isDark
          ? isActive
            ? "3px solid #fff"
            : "3px solid transparent"
          : isActive
          ? "3px solid #4f46e5"
          : "3px solid transparent",
      })}
    >
      <span style={{ width: 22 }}>{icon}</span>
      {label}
    </NavLink>
  );
}