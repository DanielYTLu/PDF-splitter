// src/styles/sidebar.js

export const sidebarStyles = {
  sidebar: {
    minHeight: "100vh",
    width: 270,
    background: "var(--card)",
    borderRight: "1px solid rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    transition: "0.25s ease",
    overflow: "hidden",
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
    color: "var(--muted)",
  },

  expandBtn: {
    position: "fixed",
    left: 25,
    top: 16,
    width: 44,
    height: 44,
    borderRadius: 12,
    border: "1px solid rgba(79,70,229,0.2)",
    background: "var(--primary)",
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
    borderRight: "2px solid var(--muted)",
    borderBottom: "2px solid var(--muted)",
    transform: "rotate(135deg)",
  },

  accountSection: {
    marginTop: "auto",
    paddingTop: 16,
    borderTop: "1px solid rgba(0,0,0,0.06)",
  },
};