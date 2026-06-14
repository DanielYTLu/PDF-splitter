import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import SortablePage from "./SortablePage";

export default function PageSelector({
  orderedPages = [],
  setOrderedPages,
  selectedPages = [],
  setSelectedPages,
  allowDrag = true,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = orderedPages.findIndex(
      (p) => p.id === active.id
    );

    const newIndex = orderedPages.findIndex(
      (p) => p.id === over.id
    );

    setOrderedPages(
      arrayMove(orderedPages, oldIndex, newIndex)
    );
  };

  const toggleSelect = (id) => {
    if (!setSelectedPages) return;

    setSelectedPages((prev = []) =>
      prev.includes(id)
        ? prev.filter((pageId) => pageId !== id)
        : [...prev, id]
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderedPages.map((p) => p.id)}
        strategy={rectSortingStrategy}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 16,
            alignItems: "start",
          }}
        >
          {orderedPages.map((page) => (
            <SortablePage
              key={page.id}
              id={page.id}
              thumbnail={page.thumbnail}
              width={page.width}
              height={page.height}
              selected={selectedPages.includes(page.id)}
              onSelect={setSelectedPages ? () => toggleSelect(page.id) : undefined}
              disabled={!allowDrag}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}