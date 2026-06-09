import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import WorkflowPanel from "./WorkflowPanel";

export default function Layout() {
  return (
    <div style={styles.container}>

      <Sidebar />

      <div style={styles.main}>

        {/* TOP BAR */}
        <header style={styles.header}>
          <div style={styles.left}>
            <div style={styles.logo} />
            <h2 style={styles.title}>PDF Workspace</h2>
          </div>

          <div style={styles.actions}>
            <button className="top-btn">🔔</button>
            <button className="top-btn">⚙️</button>
            <button className="top-btn">👤</button>
          </div>
        </header>

        {/* CONTENT */}
        <div style={styles.content}>

          {/* PAGE */}
          <main style={styles.page}>
            <Outlet />
          </main>

          {/* ⭐ WORKFLOW PANEL（你缺的就是這個） */}
          <aside style={styles.workflow}>
            <WorkflowPanel />
          </aside>

        </div>

      </div>
    </div>
  );
}

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
  },

  content: {
    display: "flex",
    flex: 1,
  },

  page: {
    flex: 1,
    padding: 28,
  },

  workflow: {
    width: 280,
    borderLeft: "1px solid #e5e7eb",
    background: "white",
  },
};