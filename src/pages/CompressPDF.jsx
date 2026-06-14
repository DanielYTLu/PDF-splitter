import { useState } from "react";

import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import CompressPDFSettings from "../components/CompressPDFSettings";

import { compressPDF } from "../utils/compressPDF";
import toast from "react-hot-toast";

export default function CompressPDF() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    level: "medium",
  });

  const handleCompress = async () => {
    if (!file) {
      toast.error("Please upload a PDF file");
      return;
    }

    try {
      setLoading(true);

      await compressPDF(file, settings);

      toast.success("Compression completed");
    } catch (err) {
      console.error(err);
      toast.error("Compression failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Compress PDF</h1>
        <p style={styles.subtitle}>
          Reduce file size with adjustable compression levels
        </p>
      </div>

      {/* UPLOAD */}
      <div style={styles.card}>
        <h3 style={styles.step}>Upload</h3>
        <FileUploader
          multiple={false}
          onFile={(f) => setFile(f)}
        />
      </div>

      {/* SETTINGS */}
      <div style={styles.card}>
        <h3 style={styles.step}>Compression Settings</h3>

        <CompressPDFSettings
          settings={settings}
          setSettings={setSettings}
        />
      </div>

      {/* ACTION */}
      {file && (
        <div style={styles.action}>
          <button onClick={handleCompress} style={styles.button}>
            Compress PDF
          </button>
        </div>
      )}

      {loading && <Loading />}
    </div>
  );
}

const styles = {
  page: {
    padding: 24,
    maxWidth: 800,
    margin: "0 auto",
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 700,
  },

  subtitle: {
    color: "var(--muted)",
    fontSize: 13,
  },

  card: {
    background: "var(--card)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    border: "1px solid #eef2f7",
  },

  step: {
    fontSize: 13,
    marginBottom: 10,
    color: "var(--text)",
  },

  action: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },

  button: {
    padding: "12px 20px",
    background: "#0ea5e9",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
};