import { shadow, radius, colors } from "../../styles/designSystem";

export default function Card({ children }) {
  return (
    <div
      style={{
        background: "var(--card)",
        borderRadius: radius.lg,
        padding: 16,
        boxShadow: "var(--card-shadow)",
        border: "1px solid var(--border)",
        transition: "0.2s",
        color: "var(--text)",
      }}
    >
      {children}
    </div>
  );
}