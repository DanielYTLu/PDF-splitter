import { useState } from "react";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import { editMetadataPDF } from "../utils/editMetadataPDF";
import toast from "react-hot-toast";

export default function MetadataPDF() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [keywords, setKeywords] = useState("");
  const [creator, setCreator] = useState("");
  const [producer, setProducer] = useState("");

  const handleSave = async () => {
    if (!file) {
      toast.error("請先上傳 PDF");
      return;
    }

    try {
      setLoading(true);

      await editMetadataPDF(file, {
        title,
        author,
        subject,
        keywords,
        creator,
        producer,
      });

      toast.success("Metadata 更新完成！");
    } catch (err) {
      console.error(err);
      toast.error("更新失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Title */}
      <h1 >
        📝 PDF Metadata 編輯
      </h1>

      {loading && <Loading text="正在更新 Metadata..." />}

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
          <p style={{ fontWeight: 600, marginBottom: 10 }}>
            📄 {file.name}
          </p>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Keywords（逗號分隔）"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            style={inputStyle}
          />
          <input placeholder="Creator" value={creator} onChange={(e) => setCreator(e.target.value)} style={inputStyle} />
          <input placeholder="Producer" value={producer} onChange={(e) => setProducer(e.target.value)} style={inputStyle} />

          <div style={{ marginBottom: 10, padding: 12, borderRadius: 10, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
            <p style={{ margin: "0 0 6px", fontWeight: 600 }}>預覽摘要</p>
            <div style={{ color: "#374151", fontSize: 13 }}>Title: {title || "-"}<br />Author: {author || "-"}<br />Subject: {subject || "-"}</div>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              border: "none",
              borderRadius: 8,
              background: "#4f46e5",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            💾 儲存 Metadata
          </button>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #ddd",
};