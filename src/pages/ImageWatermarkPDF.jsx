import { useState } from "react";

import Layout from "../components/Layout";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";

import { imageWatermarkPDF }
  from "../utils/imageWatermarkPDF";

import toast from "react-hot-toast";

export default function ImageWatermarkPDF() {
  const [pdfFile, setPdfFile] =
    useState(null);

  const [imageFile, setImageFile] =
    useState(null);

  const [opacity, setOpacity] =
    useState(0.3);

  const [loading, setLoading] =
    useState(false);

  const handleProcess =
    async () => {
      if (!pdfFile)
        return toast.error(
          "請上傳 PDF"
        );

      if (!imageFile)
        return toast.error(
          "請上傳圖片"
        );

      try {
        setLoading(true);

        await imageWatermarkPDF(
          pdfFile,
          imageFile,
          opacity
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
        🖼️ Logo 浮水印
      </h1>

      {loading && (
        <Loading text="正在加入 Logo..." />
      )}

      {!pdfFile && (
        <>
          <h3>上傳 PDF</h3>

          <FileUploader
            onFile={(file) => {
              setPdfFile(file);
              toast.success(
                "PDF 上傳成功"
              );
            }}
          />
        </>
      )}

      {pdfFile && !imageFile && (
        <>
          <h3>
            上傳 Logo
          </h3>

          <FileUploader
            accept="image/*"
            onFile={(file) => {
              setImageFile(file);
              toast.success(
                "圖片上傳成功"
              );
            }}
          />
        </>
      )}

      {pdfFile &&
        imageFile && (
          <div
            style={{
              marginTop: 20,
            }}
          >
            <label>
              透明度：
              {opacity}
            </label>

            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={opacity}
              onChange={(e) =>
                setOpacity(
                  Number(
                    e.target.value
                  )
                )
              }
              style={{
                width: "100%",
              }}
            />

            <button
              onClick={
                handleProcess
              }
              style={{
                width: "100%",
                marginTop: 20,
                padding: 12,
                border: "none",
                borderRadius: 8,
                background:
                  "#2563eb",
                color:
                  "white",
              }}
            >
              🖼️ 加入 Logo
            </button>
          </div>
        )}
    </Layout>
  );
}