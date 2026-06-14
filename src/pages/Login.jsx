import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [form, setForm] = useState({ email: "demo@pdfworkspace.com", password: "demo1234" });
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => form.email.trim().length > 0 && form.password.trim().length > 0, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("請輸入有效的 email。")
      return;
    }

    if (form.password.length < 4) {
      setError("密碼至少需 4 碼。");
      return;
    }

    login({
      email: form.email.trim(),
      password: form.password,
      name: form.email.split("@")[0] || "PDF User",
      avatar: "👤",
      plan: "Pro",
      theme: "light",
      language: "zh",
      exportFormat: "pdf",
      autoSave: true,
      lastLoginAt: new Date().toISOString(),
    });

    navigate("/", { replace: true });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>PDF Workspace</div>
        <h1 style={styles.title}>登入您的工作區</h1>
        <p style={styles.subtitle}>使用 demo 帳號即可立即體驗：demo@pdfworkspace.com / demo1234</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            style={styles.input}
          />

          {error ? <p style={styles.error}>{error}</p> : null}

          <button type="submit" disabled={!canSubmit} style={styles.button}>登入</button>
        </form>

        <div style={styles.footer}>
          <span>🔒 本地 demo 登入，資料保存在瀏覽器中。</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg, #0f172a, #111827)",
    color: "#fff",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 460,
    borderRadius: 28,
    background: "rgba(15,23,42,0.92)",
    border: "1px solid rgba(148,163,184,0.2)",
    boxShadow: "0 24px 60px rgba(15,23,42,0.45)",
    padding: 28,
  },
  badge: { display: "inline-flex", padding: "6px 10px", borderRadius: 999, background: "rgba(79,70,229,0.18)", color: "#c4b5fd", fontSize: 12, fontWeight: 700, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 800, margin: "0 0 8px" },
  subtitle: { color: "#cbd5e1", lineHeight: 1.5, marginBottom: 18 },
  form: { display: "grid", gap: 10 },
  label: { color: "#e2e8f0", fontSize: 13, fontWeight: 700 },
  input: { height: 46, borderRadius: 12, border: "1px solid rgba(148,163,184,0.25)", background: "#111827", color: "#fff", padding: "0 12px" },
  button: { height: 48, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#4f46e5,#06b6d4)", color: "#fff", fontWeight: 800, cursor: "pointer" },
  error: { color: "#fecaca", fontSize: 13 },
  footer: { marginTop: 14, color: "#cbd5e1", fontSize: 12 },
};
