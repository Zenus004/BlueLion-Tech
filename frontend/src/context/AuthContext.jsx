import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const AUTH_KEY = "bluelion_auth";

const getStoredAuth = () => {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth());

  const setSession = ({ token, role, profile }) => {
    const next = { token, role, profile };
    localStorage.setItem(AUTH_KEY, JSON.stringify(next));
    setAuth(next);
  };

  const clearSession = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuth(null);
  };

  const value = useMemo(
    () => ({
      auth,
      isAuthenticated: Boolean(auth?.token),
      isAdmin: auth?.role === "admin" || auth?.role === "super_admin",
      isUser: auth?.role === "user",
      setSession,
      clearSession,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
