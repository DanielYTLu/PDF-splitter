import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { t } from "../i18n";

export default function Layout() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();
  const notifyRef = useRef();
  const { user } = useUser();
  const lang = user.language;

  // click outside close
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setOpenNotify(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.main}>
        {/* TOP BAR */}
        <header style={styles.header}>
          {/* LEFT */}
          <div style={styles.left}>
            <div style={styles.logo} />
            <h2 style={styles.title}>PDF Workspace</h2>
          </div>

          {/* ACTIONS */}
          <div style={styles.actions}>
            <input
              placeholder={t(lang, "search")}
              style={styles.search}
            />

            {/* 🔔 Notification */}
            <div ref={notifyRef} style={{ position: "relative" }}>
              <button
                className="top-btn"
                onClick={() => setOpenNotify(!openNotify)}
              >
                🔔
              </button>

              {openNotify && (
                <div style={styles.dropdown}>
                  <div style={styles.menuItem}>📄 {t(lang, "pdfDone")}</div>
                  <div style={styles.menuItem}>🔒 {t(lang, "encrypted")}</div>
                  <div style={styles.menuItem}>📥 {t(lang, "update")}</div>
                </div>
              )}
            </div>

            {/* ⚙️ Settings */}
            <div style={{ position: "relative" }}>
              <button
                className="top-btn"
                onClick={() => alert("Settings coming soon")}
              >
                ⚙️
              </button>
            </div>

            {/* 👤 User Menu */}
            <div ref={menuRef} style={{ position: "relative" }}>
              <button
                className="top-btn"
                onClick={() => setOpenMenu(!openMenu)}
              >
                👤
              </button>

              {openMenu && (
                <div style={styles.dropdown}>
                  <div style={styles.menuItem}onClick={() => navigate("/profile")}>👤 {t(lang, "profile")}</div>

                  <div style={styles.menuItem}onClick={() => navigate("/settings")}>⚙️ {t(lang, "settings")}</div>

                  <div style={styles.menuItem}onClick={() => navigate("/my-files")}>📄 {t(lang, "myFiles")}</div>

                  <div style={styles.menuItemDanger}onClick={() => {localStorage.clear();navigate("/");}}>🚪 {t(lang, "logout")}</div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div style={styles.content}>
          <main style={styles.page}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

/* ===================== styles ===================== */

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "var(--bg)",
    color: "var(--text)",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    height: 68,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 28px",

    background: "var(--surface)",
    backdropFilter: "blur(16px)",

    borderBottom: "1px solid var(--border)",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
  },

  title: {
    fontSize: 16,
    fontWeight: 700,
    color: "var(--text)",
  },

  actions: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },

  search: {
    width: 240,
    height: 40,
    borderRadius: 12,
    border: "1px solid var(--border)",
    padding: "0 14px",
    background: "var(--surface)",
    color: "var(--text)",
    outline: "none",
  },

  content: {
    display: "flex",
    flex: 1,
  },

  page: {
    flex: 1,
    padding: 28,
    background: "var(--bg)",
  },

  /* dropdown */
  dropdown: {
    position: "absolute",
    top: 50,
    right: 0,
    width: 200,

    background: "var(--surface)",
    backdropFilter: "blur(16px)",
    border: "1px solid var(--border)",
    borderRadius: 14,

    boxShadow: "var(--shadow)",
    padding: 8,
    zIndex: 100,
  },

  menuItem: {
    padding: "10px 12px",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 14,
  },

  menuItemDanger: {
    padding: "10px 12px",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 14,
    color: "#ef4444",
  },

  divider: {
    height: 1,
    background: "var(--border)",
    margin: "6px 0",
  },
};