import { colors, radius } from "../../styles/designSystem";

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}) {
  const styles = {
    primary: {
      background: disabled ? colors.primaryLight : colors.primary,
      color: "white",
    },
    success: {
      background: disabled ? colors.successLight : colors.success,
      color: "white",
    },
    danger: {
      background: disabled ? colors.dangerLight : colors.danger,
      color: "white",
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(-1px)";
        }
      }}

      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(0px)";
        }
      }}
      style={{
        padding: "12px 16px",
        borderRadius: radius.md,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 600,
        width: "100%",
        transition: "0.2s",
        ...styles[variant],
      }}
    >
      {children}
    </button>
  );
}