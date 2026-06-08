import { useState } from "react";

import Layout from "../components/Layout";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";

import { editMetadataPDF } from "../utils/editMetadataPDF";

import toast from "react-hot-toast";

export default function MetadataPDF() {
  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [author, setAuthor] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [keywords, setKeywords] =
    useState("");

  const handleSave =
    async () => {
      if (!file) {
        toast.error(
          "請先上傳 PDF"
        );
        return;
      }

      try {
        setLoading(true);

        await editMetadataPDF(
          file,
          {
            title,
            author,
            subject,
            keywords,
          }
        );

        toast.success(
          "Metadata 更新完成！"
        );
      } catch (err) {
        console.error(err);
        toast.error(
          "更新失敗"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Layout>
      <h1>
        📝 PDF Metadata 編輯
      </h1>

      {loading && (
        <Loading text="正在更新 Metadata..." />
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
            background: "white",
            padding: 20,
            borderRadius: 12,
            marginTop: 20,
          }}
        >
          <p>
            📄 {file.name}
          </p>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            placeholder="Author"
            value={author}
            onChange={(e) =>
              setAuthor(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            placeholder="Subject"
            value={subject}
            onChange={(e) =>
              setSubject(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            placeholder="Keywords（逗號分隔）"
            value={keywords}
            onChange={(e) =>
              setKeywords(
                e.target.value
              )
            }
            style={inputStyle}
          />

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
            }}
          >
            💾 儲存 Metadata
          </button>
        </div>
      )}
    </Layout>
  );
}

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #ddd",
};