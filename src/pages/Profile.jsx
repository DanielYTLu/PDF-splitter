import { useUser } from "../context/UserContext";

export default function Profile() {
  const { user, setUser } = useUser();

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        color: "var(--text)",
      }}
    >
      <h1>👤 Profile</h1>

      <p style={{ color: "var(--muted)" }}>
        Manage your account information.
      </p>

      {/* CARD */}
      <div
        style={{
          background: "var(--card)",
          borderRadius: 24,
          padding: 30,
          border: "1px solid var(--border)",
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#4f46e5,#06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              color: "var(--card)",
            }}
          >
            {user.avatar}
          </div>

          <div>
            <h2>{user.name}</h2>
            <p style={{ color: "var(--muted)" }}>
              {user.email}
            </p>

            <span
              style={{
                background: "rgba(79,70,229,0.1)",
                color: "var(--primary)",
                padding: "6px 12px",
                borderRadius: 999,
              }}
            >
              {user.plan} Plan
            </span>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          padding: 30,
          borderRadius: 24,
        }}
      >
        <h2>Account Information</h2>

        <InputField
          label="Name"
          value={user.name}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
        />

        <InputField
          label="Email"
          value={user.email}
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
        />
      </div>
    </div>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ color: "var(--text)" }}>
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          height: 46,
          borderRadius: 12,
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--text)",
        }}
      />
    </div>
  );
}