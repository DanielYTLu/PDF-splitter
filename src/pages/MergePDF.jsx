import { useState } from "react";

import FileCard from "../components/FileCard";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";

import toast from "react-hot-toast";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { mergePDF } from "../utils/pdfMerger";


export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // 🗑 Delete
  // =========================
  const handleDelete = (name) => {
    setFiles((prev) =>
      prev.filter((f) => f.name !== name)
    );
  };

  // =========================
  // 🔀 Drag reorder
  // =========================
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = files.findIndex(
        (f) => f.name === active.id
      );

      const newIndex = files.findIndex(
        (f) => f.name === over.id
      );

      setFiles(
        arrayMove(
          files,
          oldIndex,
          newIndex
        )
      );
    }
  };

  // =========================
  // 📚 Merge PDF
  // =========================
  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error("請至少選擇兩個 PDF");
      return;
    }

    try {
      setLoading(true);

      const mergedBlob =
        await mergePDF(files);

      const url =
        URL.createObjectURL(mergedBlob);

      const a =
        document.createElement("a");

      a.href = url;
      a.download = "merged.pdf";

      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);

      toast.success("PDF 合併完成！");
    } catch (err) {
      console.error(err);

      toast.error("PDF 合併失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 PDF 合併
      </h1>

      <FileUploader
        multiple
        onFile={(newFiles) => {
          setFiles((prev) => [
            ...prev,
            ...(Array.isArray(newFiles)
              ? newFiles
              : [newFiles]),
          ]);
        }}
      />

      {loading && <Loading />}

      <br />

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={files.map(
            (f) => f.name
          )}
          strategy={
            verticalListSortingStrategy
          }
        >
          {files.map((file) => (
            <FileCard
              key={file.name}
              file={file}
              onDelete={handleDelete}
            />
          ))}
        </SortableContext>
      </DndContext>

      {files.length > 0 && (
        <div
          style={{
            marginTop: 20,
          }}
        >
          <button
            onClick={handleMerge}
            disabled={loading}
            style={{
              padding: 12,
              background: "#0ea5e9",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            📚 開始合併
          </button>
        </div>
      )}
    </div>
  );
}