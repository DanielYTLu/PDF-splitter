import { useState } from "react";

import Layout from "../components/Layout";
import FileUploader from "../components/FileUploader";
import PDFViewer from "../components/PDFViewer";
import Loading from "../components/Loading";

import { extractPDF } from "../utils/extractPDF";

import toast from "react-hot-toast";

export default function ExtractPDF() {
  const [file, setFile] =
    useState(null);

  const [selectedPages,
    setSelectedPages] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");

  const handleExtract =
    async () => {
      if (!file) {
        toast.error(
          "請先上傳 PDF"
        );
        return;
      }

      if (
        !selectedPages.length
      ) {
        toast.error(
          "請選擇頁面"
        );
        return;
      }

      try {
        setLoading(true);

        await extractPDF(
          file,
          selectedPages
        );

        toast.success(
          "擷取完成！"
        );
      } catch (err) {
        console.error(err);

        toast.error(
          "擷取失敗"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Layout>
      <h1>
        📑 PDF 擷取頁面
      </h1>

      {loading && (
        <Loading text="正在擷取頁面..." />
      )}

      {error && (
        <div
          style={{
            color: "red",
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      {!file && (
        <FileUploader
          onFile={(file) => {
            setFile(file);

            toast.success(
              "上傳成功！"
            );
          }}
        />
      )}

      {file && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "3fr 1fr",
            gap: 20,
          }}
        >
          <div
            style={{
              background:
                "white",
              padding: 16,
              borderRadius: 12,
            }}
          >
            <PDFViewer
              file={file}
              selectedPages={
                selectedPages
              }
              setSelectedPages={
                setSelectedPages
              }
              setError={
                setError
              }
            />
          </div>

          <div
            style={{
              background:
                "white",
              padding: 16,
              borderRadius: 12,
            }}
          >
            <h3>
              擷取設定
            </h3>

            <p>
              已選頁面：
            </p>

            <div
              style={{
                minHeight: 60,
                marginBottom: 16,
                color:
                  "#4f46e5",
                fontWeight: 600,
              }}
            >
              {selectedPages
                .length
                ? selectedPages.join(
                    ", "
                  )
                : "尚未選擇"}
            </div>

            <button
              onClick={
                handleExtract
              }
              disabled={
                loading
              }
              style={{
                width: "100%",
                padding: 12,
                background:
                  loading
                    ? "#a5b4fc"
                    : "#4f46e5",
                color:
                  "white",
                border:
                  "none",
                borderRadius: 8,
              }}
            >
              {loading
                ? "處理中..."
                : "📑 擷取頁面"}
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}