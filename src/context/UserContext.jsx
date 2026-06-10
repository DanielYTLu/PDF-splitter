import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@pdfworkspace.com",
    plan: "Free",
    avatar: "👤",

    theme: "light",
    language: "zh",
    exportFormat: "pdf",
    autoSave: true,
  });

  // ✅ load localStorage
  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // ✅ save localStorage
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(user));
  }, [user]);

  // 🔥 CRITICAL FIX: apply theme to DOM
  useEffect(() => {
    document.body.setAttribute("data-theme", user.theme);
  }, [user.theme]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}