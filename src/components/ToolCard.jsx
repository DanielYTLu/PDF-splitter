import { Link } from "react-router-dom";

export default function ToolCard({
  tool,
  onClick,
}) {
  return (
    <Link
      to={tool.path}
      onClick={onClick}
      style={{
        textDecoration: "none",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 20,
          padding: 20,
          border: "1px solid var(--border)",

          minHeight: 190,

          display: "flex",
          flexDirection: "column",

          transition: "all .25s ease",

          boxShadow:
            "0 4px 12px rgba(0,0,0,0.04)",

          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-6px)";

          e.currentTarget.style.boxShadow =
            "0 20px 40px rgba(37,99,235,.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0px)";

          e.currentTarget.style.boxShadow =
            "0 4px 12px rgba(0,0,0,0.04)";
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg,#2563eb,#7c3aed)",
          }}
        />

        <div
          style={{
            width: 64,
            height: 64,

            borderRadius: 18,

            background:
              "linear-gradient(135deg,#eff6ff,#dbeafe)",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontSize: 30,

            marginBottom: 18,
          }}
        >
          {tool.icon}
        </div>

        <h3
          style={{
            margin: 0,
            fontSize: 18,
            color: "#0f172a",
          }}
        >
          {tool.title}
        </h3>

        <p
          style={{
            color: "var(--muted)",
            fontSize: 14,
            marginTop: 10,
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          {tool.description ||
            "Professional PDF Tool"}
        </p>

        <div
          style={{
            display: "inline-flex",
            width: "fit-content",

            padding: "6px 12px",

            borderRadius: 999,

            background: "#f1f5f9",

            color: "#475569",

            fontSize: 12,

            fontWeight: 600,

            marginBottom: 16,
          }}
        >
          {tool.category}
        </div>

        <div
          style={{
            color: "#2563eb",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          Open Tool →
        </div>
      </div>
    </Link>
  );
}