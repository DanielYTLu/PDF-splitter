import { spacing, colors } from "../../styles/designSystem";

export default function ToolLayout({ title, description, children }) {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: spacing(3),
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: spacing(3) }}>
        <h1 style={{ marginBottom: 6, color: colors.gray900 }}>
          {title}
        </h1>
        <p style={{ color: colors.gray500 }}>
          {description}
        </p>
      </div>

      {/* Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: spacing(3),
          alignItems: "start",
        }}
      >
        {children}
      </div>
    </div>
  );
}