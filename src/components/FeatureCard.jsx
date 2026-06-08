export default function FeatureCard({
  icon,
  title,
  desc,
}) {
  return (
    <div
      style={{
        background: "white",
        padding: 24,
        borderRadius: 16,
      }}
    >
      <div
        style={{
          fontSize: 32,
        }}
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{desc}</p>
    </div>
  );
}