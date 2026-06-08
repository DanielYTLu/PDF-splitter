import { shadow, radius, colors } from "../../styles/designSystem";

export default function Card({ children }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: radius.lg,
        padding: 16,
        boxShadow: shadow.sm,
        border: `1px solid ${colors.gray200}`,
        transition: "0.2s",
      }}
    >
      {children}
    </div>
  );
}