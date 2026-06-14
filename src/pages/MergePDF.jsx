import { useState, useMemo } from "react";

import FileCard from "../components/FileCard";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import MergePDFSettings from "../components/MergePDFSettings";
import ToolPageShell from "../components/ToolPageShell";

import toast from "react-hot-toast";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { mergePDF } from "../utils/pdfMerger";
import { saveFile } from "../utils/fileHistory";

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    mode: "order",
  });

  // =========================
  // 🧠 UI ORDER LAYER（核心升級）
  // =========================
  const orderedFiles = useMemo(() => {
    if (settings.mode === "reverse") {
      return [...files].slice().reverse();
    }
    return files;
  }, [files, settings.mode]);

  // =========================
  // 🗑 Delete
  // =========================
  const handleDelete = (name) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  // =========================
  // 🔀 Drag reorder（修正版：永遠操作 source）
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
  // 📚 Merge PDF
  // =========================
  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error("請至少選擇兩個 PDF");
      return;
    }

    try {
      setLoading(true);

      const mergedBlob = await mergePDF(files, settings);

      await saveFile({
        name: "merged.pdf",
        tool: "Merge PDF",
        size: `${(mergedBlob.size / 1024 / 1024).toFixed(2)} MB`,
        blob: mergedBlob,
      });

      const url = URL.createObjectURL(mergedBlob);

      const a = document.createElement("a");
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
    <ToolPageShell
      badge="Merge PDF"
      title="📚 Merge PDF"
      subtitle="上傳多個檔案、調整順序與模式，再一鍵輸出成新的 PDF。"
      meta={<><span style={{ color: "var(--muted)" }}>檔案</span><strong style={{ color: "var(--text)" }}>{files.length} 個</strong></>}
    >

      {/* STEP 1 UPLOAD */}
      <div style={styles.card}>
        <div style={styles.stepTitle}>1️⃣ 上傳檔案</div>
        <FileUploader
          multiple
          onFile={(newFiles) => {
            setFiles((prev) => [
              ...prev,
              ...(Array.isArray(newFiles) ? newFiles : [newFiles]),
            ]);
          }}
        />
      </div>

      {/* STEP 2 SETTINGS */}
      <div style={styles.card}>
        <div style={styles.stepTitle}>2️⃣ 合併模式</div>
        <MergePDFSettings
          settings={settings}
          setSettings={setSettings}
        />
      </div>

      {/* STEP 3 ORDER */}
      <div style={styles.card}>
        <div style={styles.stepTitle}>3️⃣ 排序檔案</div>

        {files.length === 0 ? (
          <div style={styles.empty}>
            尚未上傳 PDF，請先加入檔案
          </div>
        ) : (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={orderedFiles.map((f) => f.name)}
              strategy={verticalListSortingStrategy}
            >
              <div style={styles.list}>
                {orderedFiles.map((file) => (
                  <div
                    key={file.name}
                    style={styles.item}
                  >
                    <FileCard
                      file={file}
                      onDelete={handleDelete}
                    />
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* STEP 4 ACTION */}
      {files.length > 0 && (
        <div style={styles.actionBar}>
          <button
            onClick={handleMerge}
            disabled={loading}
            style={styles.button}
          >
            🚀 合併 PDF
          </button>
        </div>
      )}

      {loading && <Loading />}
    </ToolPageShell>
  );
}

/* =========================
🎨 PRODUCT LEVEL UI
========================= */
const styles = {
  page: {
    padding: 24,
    maxWidth: 900,
    margin: "0 auto",
  },

  header: {
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: 700,
  },

  subtitle: {
    color: "var(--muted)",
    fontSize: 13,
    marginTop: 6,
  },

  card: {
    background: "var(--card)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    border: "1px solid #eef2f7",
  },

  stepTitle: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 10,
    color: "var(--text)",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  item: {
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
  },

  empty: {
    padding: 20,
    textAlign: "center",
    color: "#94a3b8",
    background: "#f8fafc",
    borderRadius: 10,
  },

  actionBar: {
    position: "sticky",
    bottom: 20,
    display: "flex",
    justifyContent: "center",
  },

  button: {
    padding: "12px 22px",
    background: "linear-gradient(135deg,#0ea5e9,#2563eb)",
    color: "white",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 10px 25px rgba(14,165,233,0.3)",
  },
};