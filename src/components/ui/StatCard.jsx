export default function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: 24,
        border: "1px solid #eef2f7",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          fontSize: 28,
          marginBottom: 12,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        {value}
      </div>

      <div
        style={{
          color: "#64748b",
          marginTop: 6,
        }}
      >
        {title}
      </div>
    </div>
  );
}