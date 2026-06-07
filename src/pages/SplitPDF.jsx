import { useState } from "react";

import Layout from "../components/Layout";
import PDFViewer from "../components/PDFViewer";
import PDFPreview from "../components/PDFPreview";
import Dropzone from "../components/Dropzone";
import toast from "react-hot-toast";

export default function SplitPDF() {
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [error, setError] = useState(null);

  return (
    <Layout>
      <h1>✂️ PDF 分割工具</h1>
    
      {error && (
        <div
          style={{
            color: "red",
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

        <Dropzone
        onFile={(file) => {
            if (!file) {
            toast.error("請選擇 PDF");
            return;
            }

            setPdfFile(file);
            toast.success("上傳成功！");
        }}
        />
    
      {pdfFile && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            gap: 20,
            marginTop: 20,
          }}
        >
          {/* 左側 PDF 預覽 */}
          <div
            style={{
              background: "white",
              padding: 16,
              borderRadius: 12,
            }}
          >
            <PDFViewer
              file={pdfFile}
              selectedPages={selectedPages}
              setSelectedPages={setSelectedPages}
              setError={setError}
            />
          </div>

          {/* 右側工具面板 */}
          <div
            style={{
              background: "white",
              padding: 16,
              borderRadius: 12,
              height: "fit-content",
            }}
          >
            <PDFPreview
              pdfFile={pdfFile}
              selectedPages={selectedPages}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}