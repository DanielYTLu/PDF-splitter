import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortablePage({
  id,
  thumbnail,
  selected,
  onSelect,
  width,
  height,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,

    border: selected
      ? "2px solid #0ea5e9"
      : "1px solid #e2e8f0",

    borderRadius: 14,
    overflow: "hidden",
    background: "#fff",

    cursor: "pointer",

    opacity: isDragging ? 0.7 : 1,

    boxShadow: selected
      ? "0 12px 30px rgba(14,165,233,.25)"
      : "0 4px 12px rgba(0,0,0,.06)",

    position: "relative",

    // ⭐ 關鍵：依 PDF 比例
    aspectRatio: `${width || 3} / ${height || 4}`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
    >
      <img
  src={thumbnail}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "contain",
    background: "#f8fafc",
  }}
/>

      <div
        style={{
          position: "absolute",
          bottom: 6,
          left: 6,
          fontSize: 11,
          background: "rgba(0,0,0,0.6)",
          color: "#fff",
          padding: "2px 6px",
          borderRadius: 6,
        }}
      >
        {id}
      </div>

      {selected && (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 26,
            height: 26,
            borderRadius: 999,
            background: "#0ea5e9",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          ✓
        </div>
      )}
    </div>
  );
}