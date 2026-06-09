import { Link } from "react-router-dom";

export default function ToolCard({ tool, onClick }) {
  return (
    <Link to={tool.path} onClick={onClick} style={{ textDecoration: "none" }}>
      <div className="tool-card">

  <div
    style={{
      width: 60,
      height: 60,
      borderRadius: 16,
      background:
        "linear-gradient(135deg,#eff6ff,#dbeafe)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 30,
      marginBottom: 16,
    }}
  >
    {tool.icon}
  </div>

  <h3
    style={{
      margin: 0,
      fontSize: 18,
      color: "#111827",
    }}
  >
    {tool.title}
  </h3>

  <p
    style={{
      color: "#6b7280",
      fontSize: 13,
      marginTop: 8,
    }}
  >
    {tool.category}
  </p>

  <div
    style={{
      marginTop: 20,
      color: "#2563eb",
      fontSize: 13,
      fontWeight: 600,
    }}
  >
    Open Tool →
  </div>

</div>
    </Link>
  );
}