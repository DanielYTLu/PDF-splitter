import { useState } from "react";

import Layout from "../components/Layout";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";

import { watermarkPDF } from "../utils/watermarkPDF";

import toast from "react-hot-toast";

export default function WatermarkPDF() {
  const [file, setFile] =
    useState(null);

  const [text, setText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleWatermark =
    async () => {
      if (!file)
        return toast.error(
          "請選擇 PDF"
        );

      if (!text)
        return toast.error(
          "請輸入浮水印"
        );

      try {
        setLoading(true);

        await watermarkPDF(
          file,
          text
        );

        toast.success(
          "浮水印完成！"
        );
      } catch (err) {
        console.error(err);

        toast.error(
          "處理失敗"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Layout>
      <h1>
        💧 PDF 浮水印
      </h1>

      {loading && (
        <Loading text="正在加入浮水印..." />
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
        <>
          <div
            style={{
              marginTop: 20,
            }}
          >
            <p>{file.name}</p>

            <input
              value={text}
              onChange={(e) =>
                setText(
                  e.target.value
                )
              }
              placeholder="輸入浮水印文字"
              style={{
                width: "100%",
                padding: 12,
                border:
                  "1px solid #ddd",
                borderRadius: 8,
                marginTop: 10,
              }}
            />
          </div>

          <button
            onClick={
              handleWatermark
            }
            disabled={loading}
            style={{
              marginTop: 20,
              width: "100%",
              padding: 12,
              border: "none",
              borderRadius: 10,
              background:
                loading
                  ? "#93c5fd"
                  : "#2563eb",
              color: "white",
              fontWeight: 600,
            }}
          >
            {loading
              ? "處理中..."
              : "💧 加入浮水印"}
          </button>
        </>
      )}
    </Layout>
  );
}