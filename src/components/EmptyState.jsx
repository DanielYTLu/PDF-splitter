import Button from "./ui/Button";

export default function EmptyState({
  title = "尚未上傳 PDF",
  description = "拖曳檔案或點擊上傳開始使用",
  onAction,
}) {
  return (
    <div
      style={{
        padding: 40,
        textAlign: "center",
        border: "2px dashed #e5e7eb",
        borderRadius: 16,
        background: "#fafafa",
      }}
    >
      <div style={{ fontSize: 40 }}></div>

      <h3 style={{ marginTop: 10 }}>{title}</h3>

      <p style={{ color: "#6b7280", marginTop: 6 }}>
        {description}
      </p>

      {onAction && (
        <div style={{ marginTop: 16 }}>
          <Button onClick={onAction}>
            選擇檔案
          </Button>
        </div>
      )}
    </div>
  );
}