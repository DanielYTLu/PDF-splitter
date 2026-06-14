export default function ToolPageShell({ badge, title, subtitle, meta, children, accent = "#7c3aed" }) {
  return (
    <div
      style={{
        padding: 20,
        minHeight: "100vh",
        background: "linear-gradient(180deg, var(--bg) 0%, rgba(124, 58, 237, 0.04) 45%, var(--bg) 100%)",
        color: "var(--text)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          marginBottom: 18,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ color: accent, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", fontSize: 12 }}>{badge}</span>
          </div>
          <h2 style={{ margin: 0, fontSize: 28, color: "var(--text)" }}>{title}</h2>
          <p style={{ margin: "6px 0 0", color: "var(--muted)", maxWidth: 640, lineHeight: 1.5 }}>{subtitle}</p>
        </div>

        {meta && (
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              alignItems: "center",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: "10px 12px",
              boxShadow: "var(--card-shadow)",
            }}
          >
            {meta}
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
