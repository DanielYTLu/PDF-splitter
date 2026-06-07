import { useState } from "react";

import Layout from "../components/Layout";
import FileCard from "../components/FileCard";

import { mergePDF } from "../utils/pdfMerger";
import FileUploader from "../components/FileUploader";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSelect = (e) => {
    const newFiles = Array.from(e.target.files);

    setFiles(newFiles);
  };

  const handleDelete = (name) => {
    setFiles(
      files.filter((f) => f.name !== name)
    );
  };

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
        arrayMove(files, oldIndex, newIndex)
      );
    }
  };

  const handleMerge = async () => {
    console.log("FILES:", files);
  if (files.length < 2) {
    toast.error("請至少選擇兩個 PDF");
    return;
  }

  try {
    setLoading(true);

    await mergePDF(files);

    toast.success("合併完成！");
  } catch (err) {
    console.error(err);
    toast.error("合併失敗");
  } finally {
    setLoading(false);
  }
};

  return (
    <Layout>
      <h1>📚 PDF 合併</h1>
      {loading && <Loading text="正在合併 PDF..." />}
       <FileUploader
  multiple
  onFile={setFiles}
/>
      <br />
      <br />

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={files.map((f) => f.name)}
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
        <button
          onClick={handleMerge}
          style={{
            marginTop: 20,
            padding: 12,
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          合併 PDF
        </button>
      )}
    </Layout>
  );
}