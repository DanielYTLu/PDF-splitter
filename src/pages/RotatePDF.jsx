import { useState } from "react";
import usePDFTool from "../hooks/usePDFTool";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

export default function RotatePDF() {
  const { file, setFile, loading, setLoading, handleSuccess, handleError } =
    usePDFTool();

  const [angle, setAngle] = useState(90);

  const handleRotate = async () => {
    if (!file) {
      toast.error("請先上傳 PDF");
      return;
    }

    try {
      setLoading(true);

      // mock rotate
      console.log("Rotate PDF:", file, angle);

      handleSuccess("旋轉完成！");
    } catch (err) {
      console.error(err);
      handleError(err, "旋轉失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>
        🔄 PDF 旋轉
      </h1>

      {loading && <Loading text="正在旋轉 PDF..." />}

      {!file && (
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
      )}

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

          <div style={{ marginTop: 10 }}>
            <label>旋轉角度：</label>
            <select
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              style={{
                marginLeft: 10,
                padding: 8,
                borderRadius: 8,
              }}
            >
              <option value={90}>90°</option>
              <option value={180}>180°</option>
              <option value={270}>270°</option>
            </select>
          </div>

          <button
            onClick={handleRotate}
            disabled={loading}
            style={{
              marginTop: 20,
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "none",
              background: loading ? "#a5b4fc" : "#4f46e5",
              color: "white",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "處理中..." : "🔄 旋轉 PDF"}
          </button>
        </div>
      )}
    </div>
  );
}