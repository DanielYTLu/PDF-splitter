import { useState } from "react";
import { pdfToPNG } from "../utils/pdfToPNG";
import Layout from "../components/Layout";
import FileUploader from "../components/FileUploader";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
export default function PDFToPNG() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleConvert = async () => {
console.log("FILE:", file);
  if (!file) {
    toast.error("請選擇 PDF");
    return;
  }

  try {
    setLoading(true);

    await pdfToPNG(file);

    toast.success("轉換完成！");
  } catch (err) {
    console.error(err);
    toast.error("轉換失敗");
  } finally {
    setLoading(false);
  }
};

  return (
    <Layout>
        <div style={{ padding: 40 }}>
      <h1>PDF 轉 PNG</h1>
        {loading && <Loading text="正在轉換 PNG..." />}
       <FileUploader
  onFile={setFile}
/>

      <br />
      <br />

      <button onClick={handleConvert}>
        轉換 PNG
      </button>
    </div>
    </Layout>    
  );
}