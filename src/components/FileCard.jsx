import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export default function FileCard({ file, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: file.name,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: "white",
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div>
        <div style={{ fontWeight: "bold" }}>
          📄 {file.name}
        </div>

        <div
          style={{
            fontSize: 12,
            color: "#666",
          }}
        >
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </div>
      </div>

      <button
        onClick={() => onDelete(file.name)}
      >
        ❌
      </button>
    </div>
  );
}