import Button from "./Button";

export default function ResultBox({
  title,
  description,
  onDownload,
  onReset,
}) {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 16,
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 40 }}>🎉</div>

      <h3 style={{ marginTop: 10 }}>{title}</h3>

      <p style={{ color: "#6b7280", marginTop: 6 }}>
        {description}
      </p>

      <div style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: "center" }}>
        {onDownload && (
          <Button onClick={onDownload}>
            下載檔案
          </Button>
        )}

        {onReset && (
          <Button variant="danger" onClick={onReset}>
            重新開始
          </Button>
        )}
      </div>
    </div>
  );
}