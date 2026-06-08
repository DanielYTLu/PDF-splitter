import { Link } from "react-router-dom";

export default function ToolCard({ tool, onClick }) {
  return (
    <Link to={tool.path} onClick={onClick} style={{ textDecoration: "none" }}>
      <div className="tool-card">

        {/* ICON */}
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "#eff6ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20
        }}>
          {tool.icon}
        </div>

        {/* TITLE */}
        <h3 style={{
          marginTop: 12,
          fontWeight: 700,
          fontSize: 16,
          color: "#111827"
        }}>
          {tool.title}
        </h3>

        {/* CATEGORY */}
        <p style={{
          marginTop: 6,
          fontSize: 12,
          color: "#6b7280"
        }}>
          {tool.category}
        </p>

      </div>
    </Link>
  );
}