import { useState } from "react";

import Layout from "../components/Layout";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";

import { imageToPDF } from "../utils/imageToPDF";

import toast from "react-hot-toast";

export default function ImageToPDF() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] =
    useState(false);

  const handleConvert =
    async () => {
      if (!files.length) {
        toast.error(
          "請選擇圖片"
        );
        return;
      }

      try {
        setLoading(true);

        await imageToPDF(files);

        toast.success(
          "轉換完成！"
        );
      } catch (err) {
        console.error(err);

        toast.error(
          "轉換失敗"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Layout>
      <h1>
        🖼️ 圖片 轉 PDF
      </h1>

      {loading && (
        <Loading text="正在轉換 PDF..." />
      )}

      <FileUploader
        multiple
        accept="image/png,image/jpeg"
        onFile={(newFiles) =>
          setFiles(
            Array.isArray(newFiles)
              ? newFiles
              : [newFiles]
          )
        }
      />

      <button
        onClick={handleConvert}
        disabled={
          loading ||
          !files.length
        }
        style={{
          marginTop: 20,
          padding:
            "12px 18px",
          borderRadius: 10,
          border: "none",
          background:
            loading
              ? "#a5b4fc"
              : "#4f46e5",
          color: "white",
          fontWeight: 600,
          cursor:
            loading
              ? "not-allowed"
              : "pointer",
        }}
      >
        {loading
          ? "轉換中..."
          : "📄 轉換 PDF"}
      </button>
    </Layout>
  );
}