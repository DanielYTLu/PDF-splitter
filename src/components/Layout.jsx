export default function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f7fb",
      }}
    >
      <main
        style={{
          padding: 24,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}