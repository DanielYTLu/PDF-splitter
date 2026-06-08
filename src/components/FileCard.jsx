import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export default function FileCard({ file, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.name,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: isDragging ? "#f3f4f6" : "white",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: isDragging
      ? "0 10px 25px rgba(0,0,0,0.1)"
      : "0 2px 8px rgba(0,0,0,0.04)",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      
      {/* LEFT SIDE (drag handle area) */}
      <div
        {...listeners}
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          cursor: "grab",
          userSelect: "none",
        }}
      >
        {/* drag icon */}
        <span style={{ marginRight: 10, color: "#9ca3af" }}>
          ☰
        </span>

        {/* file info */}
        <div>
          <div style={{ fontWeight: 600 }}>
             {file.name}
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#6b7280",
              marginTop: 4,
            }}
          >
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </div>
        </div>
      </div>

      {/* DELETE BUTTON */}
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(file.name);
        }}
        style={{
          background: "#fee2e2",
          border: "none",
          color: "#dc2626",
          padding: "6px 10px",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        ✕
      </button>
    </div>
  );
}