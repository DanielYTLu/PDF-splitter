export default function Loading({ text }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 18,
        zIndex: 9999,
      }}
    >
      ⏳ {text || "處理中..."}
    </div>
  );
}