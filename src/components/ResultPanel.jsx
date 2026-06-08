import Button from "./ui/Button";

export default function ResultPanel({
  title = "處理完成",
  description = "你的檔案已成功處理",
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
      {/* ICON */}
      <div style={{ fontSize: 40 }}>🎉</div>

      {/* TITLE */}
      <h3 style={{ marginTop: 10 }}>{title}</h3>

      {/* DESC */}
      <p style={{ color: "#6b7280", marginTop: 6 }}>
        {description}
      </p>

      {/* ACTIONS */}
      <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
        {onDownload && (
          <Button onClick={onDownload}>
            下載結果
          </Button>
        )}

        {onReset && (
          <Button
            variant="danger"
            onClick={onReset}
          >
            重新開始
          </Button>
        )}
      </div>
    </div>
  );
}