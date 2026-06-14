import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Check } from "lucide-react";

export default function SortablePage({
  id,
  thumbnail,
  width,
  height,
  selected = false,
  onSelect,
  disabled = false,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: selected ? "2px solid #0ea5e9" : "1px solid var(--border)",
    borderRadius: 18,
    overflow: "hidden",
    background: selected ? "linear-gradient(180deg, rgba(14,165,233,0.14), var(--card))" : "var(--card)",
    cursor: disabled ? "default" : onSelect ? "pointer" : "grab",
    opacity: isDragging ? 0.72 : 1,
    boxShadow: selected
      ? "0 18px 34px rgba(14,165,233,0.18)"
      : "0 10px 24px rgba(15, 23, 42, 0.08)",
    position: "relative",
    aspectRatio: `${width || 3} / ${height || 4}`,
    userSelect: "none",
    touchAction: disabled ? "auto" : "none",
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
          background: "linear-gradient(135deg, rgba(148,163,184,0.12), rgba(124,58,237,0.12))",
          display: "block",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          background: "rgba(15, 23, 42, 0.72)",
          color: "#fff",
          padding: "4px 7px",
          borderRadius: 999,
          backdropFilter: "blur(6px)",
        }}
      >
        <GripVertical size={12} />
        第 {id} 頁
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
            background: "linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 18px rgba(14, 165, 233, 0.35)",
          }}
        >
          <Check size={14} />
        </div>
      )}
    </div>
  );
}