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

import { useWorkflow } from "../context/WorkflowContext";
import { getTool } from "../tools";

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { addStep } = useWorkflow();

  const mergeTool = getTool("merge");

  // =========================
  // 🗑 Delete
  // =========================
  const handleDelete = (name) => {
    setFiles(files.filter((f) => f.name !== name));
  };

  // =========================
  // 🔀 Drag reorder
  // =========================
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = files.findIndex((f) => f.name === active.id);
      const newIndex = files.findIndex((f) => f.name === over.id);

      setFiles(arrayMove(files, oldIndex, newIndex));
    }
  };

  // =========================
  // ⚡ Direct Mode
  // =========================
  const handleMergeDirect = async () => {
    if (files.length < 2) {
      toast.error("請至少選擇兩個 PDF");
      return;
    }

    try {
      setLoading(true);

      const blob = await mergeTool.runDirect({
        files,
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();

      URL.revokeObjectURL(url);

      toast.success("合併完成！");
    } catch (err) {
      console.error(err);
      toast.error("合併失敗");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 🔗 Workflow Mode
  // =========================
  const handleAddWorkflow = () => {
    if (files.length < 2) {
      toast.error("請至少選擇兩個 PDF");
      return;
    }

    addStep({
      type: "merge",
      label: "PDF 合併",

      run: async (input) => {
        const blob = await mergeTool.run({
          files: input?.files || files,
        });

        return {
          data: blob.data || blob,
          count: files.length,
          source: "workflow",
        };
      },
    });

    toast.success("已加入 Workflow");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📚 PDF 合併</h2>

      <FileUploader
        multiple
        onFile={(newFiles) => {
          setFiles((prev) => [
            ...prev,
            ...(Array.isArray(newFiles) ? newFiles : [newFiles]),
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
          items={files.map((f) => f.name)}
          strategy={verticalListSortingStrategy}
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
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button
            onClick={handleMergeDirect}
            disabled={loading}
            style={{
              padding: 12,
              background: "#0ea5e9",
              color: "white",
              borderRadius: 8,
              border: "none",
            }}
          >
            ⚡ 直接合併
          </button>

          <button
            onClick={handleAddWorkflow}
            disabled={loading}
            style={{
              padding: 12,
              background: "#4f46e5",
              color: "white",
              borderRadius: 8,
              border: "none",
            }}
          >
            🔗 加入 Workflow
          </button>
        </div>
      )}
    </div>
  );
}