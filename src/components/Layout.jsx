import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Layout() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);

  const menuRef = useRef();
  const notifyRef = useRef();

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
              placeholder="Search tools..."
              style={{
                width: 240,
                height: 40,
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                padding: "0 14px",
                background: "white",
              }}
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
                  <div style={styles.menuItem}>📄 PDF 處理完成</div>
                  <div style={styles.menuItem}>🔒 檔案已加密</div>
                  <div style={styles.menuItem}>📥 新版本更新</div>
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
                  <div style={styles.menuItem}>👤 Profile</div>
                  <div style={styles.menuItem}>⚙️ Settings</div>
                  <div style={styles.menuItem}>📄 My Files</div>

                  <div style={styles.divider}></div>

                  <div style={styles.menuItemDanger}>🚪 Logout</div>
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
    background: "linear-gradient(to bottom, #f8fafc, #eef2ff)",
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
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
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
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
  },

  title: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1e3a8a",
  },

  actions: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },

  content: {
    display: "flex",
    flex: 1,
  },

  page: {
    flex: 1,
    padding: 28,
  },

  /* dropdown */
  dropdown: {
    position: "absolute",
    top: 50,
    right: 0,
    width: 200,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: 14,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
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
    background: "rgba(0,0,0,0.06)",
    margin: "6px 0",
  },
};