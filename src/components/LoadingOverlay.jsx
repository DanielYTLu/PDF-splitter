export default function LoadingOverlay({
  text = "處理中...",
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: 18,
        zIndex: 9999,
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 40 }}>⏳</div>
      <div style={{ marginTop: 10 }}>{text}</div>
    </div>
  );
}