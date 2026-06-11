import { useUser } from "../context/UserContext";
import { t } from "../i18n";

export default function Settings() {
  const { user, setUser } = useUser();
  const lang = user.language;
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* HEADER */}
      <h1 style={{ fontSize: 32, fontWeight: 800, color: "var(--text)" }}>
        ⚙️ {t(lang, "settings")}
      </h1>

      <p style={{ color: "var(--muted)", marginBottom: 30 }}>
        {t(lang, "customize")}
      </p>

      {/* THEME */}
      <Section title={t(lang, "theme")}>
        <Select
          value={user.theme}
          onChange={(e) =>
            setUser({ ...user, theme: e.target.value })
          }
         options={[
  {
    label: t(lang, "light"),
    value: "light",
  },
  {
    label: t(lang, "dark"),
    value: "dark",
  },
]}
        />
      </Section>

      {/* LANGUAGE */}
      <Section title={t(lang, "language")}>
        <Select
          value={user.language}
          onChange={(e) =>
            setUser({ ...user, language: e.target.value })
          }
          options={[
            { label: "中文", value: "zh" },
            { label: "English", value: "en" },
          ]}
        />
      </Section>

      {/* EXPORT FORMAT */}
      <Section title={t(lang, "exportFormat")}>
        <Select
          value={user.exportFormat}
          onChange={(e) =>
            setUser({ ...user, exportFormat: e.target.value })
          }
          options={[
            { label: "PDF", value: "pdf" },
            { label: "PNG", value: "png" },
          ]}
        />
      </Section>

      {/* AUTO SAVE */}
      <Section title={t(lang, "autoSave")}>
        <label style={{ display: "flex", gap: 10, color: "var(--text)" }}>
          <input
            type="checkbox"
            checked={user.autoSave}
            onChange={(e) =>
              setUser({ ...user, autoSave: e.target.checked })
            }
          />
          {t(lang, "enableAutoSave")}
        </label>
      </Section>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <div
      style={{
        background: "var(--card)",
        color: "var(--text)",
        border: "1px solid var(--border)",
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
      }}
    >
      <h3 style={{ marginBottom: 12 }}>{title}</h3>
      {children}
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        height: 42,
        borderRadius: 10,
        border: "1px solid var(--border)",
        padding: "0 12px",
        background: "var(--card)",
        color: "var(--text)",
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}