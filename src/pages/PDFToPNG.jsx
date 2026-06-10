import { useState } from "react";
import { pdfToPNG } from "../utils/pdfToPNG";
import FileUploader from "../components/FileUploader";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import usePDFTool from "../hooks/usePDFTool";

export default function PDFToPNG() {
  const {
    file,
    setFile,
    loading,
    setLoading,
    handleSuccess,
    handleError,
  } = usePDFTool();

  const handleConvert = async () => {
    console.log("FILE:", file);

    if (!file) {
      toast.error("請選擇 PDF");
      return;
    }

    try {
      setLoading(true);

      await pdfToPNG(file);

      handleSuccess("轉換完成！");
    } catch (err) {
      handleError(err, "轉換失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Title */}
      <h1 >
        📄 PDF 轉 PNG
      </h1>

      {loading && <Loading text="正在轉換 PNG..." />}

      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 12,
          border: "1px solid #e5e7eb",
          marginBottom: 20,
        }}
      >
        <FileUploader
          onFile={(file) => {
            setFile(file);
            toast.success("上傳成功！");
          }}
        />
      </div>

      {file && (
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            border: "1px solid #e5e7eb",
          }}
        >
          <p style={{ fontWeight: 600 }}>{file.name}</p>

          <button
            onClick={handleConvert}
            disabled={loading || !file}
            style={{
              marginTop: 20,
              padding: "12px 18px",
              borderRadius: 10,
              border: "none",
              fontWeight: 600,
              fontSize: 14,
              cursor: loading || !file ? "not-allowed" : "pointer",
              background: loading || !file ? "#a5b4fc" : "var(--primary)",
              color: "white",
              boxShadow: "0 6px 16px rgba(79,70,229,0.25)",
              transition: "all 0.2s ease",
              width: "100%",
            }}
            onMouseOver={(e) => {
              if (!loading && file) {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(79,70,229,0.35)";
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(79,70,229,0.25)";
            }}
          >
            {loading ? "轉換中..." : "轉換 PNG"}
          </button>
        </div>
      )}
    </div>
  );
}