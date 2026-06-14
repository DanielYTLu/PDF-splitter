import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext();
const DEFAULT_USER = {
  name: "Guest User",
  email: "guest@pdfworkspace.com",
  plan: "Free",
  avatar: "👤",
  theme: "light",
  language: "zh",
  exportFormat: "pdf",
  autoSave: true,
  isLoggedIn: false,
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(DEFAULT_USER);

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser({ ...DEFAULT_USER, ...parsed, isLoggedIn: Boolean(parsed.isLoggedIn || parsed.email) });
      } catch {
        localStorage.removeItem("userProfile");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(user));
  }, [user]);

  // 🔥 CRITICAL FIX: apply theme to DOM
  useEffect(() => {
    document.body.setAttribute("data-theme", user.theme);
  }, [user.theme]);

  const login = (profile) => {
    setUser({ ...DEFAULT_USER, ...profile, isLoggedIn: true });
  };

  const logout = () => {
    setUser({ ...DEFAULT_USER, isLoggedIn: false });
    localStorage.removeItem("userProfile");
  };

  const value = useMemo(() => ({ user, setUser, login, logout }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}