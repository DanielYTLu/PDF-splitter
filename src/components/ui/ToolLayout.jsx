import { spacing, colors } from "../../styles/designSystem";

export default function ToolLayout({
  title,
  description,
  children,
}) {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          marginBottom: spacing(3),
        }}
      >
        <h1
          style={{
            marginBottom: 6,
            color: colors.gray900,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            color: colors.gray500,
          }}
        >
          {description}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0,1fr) 380px",
          gap: spacing(3),
          alignItems: "start",
        }}
      >
        {children}
      </div>
    </div>
  );
}