import api from "../lib/api";

export const authService = {
  userSignup: (payload) => api.post("/auth/user/register", payload),
  userLogin: (payload) => api.post("/auth/user/login", payload),
  userMe: () => api.get("/auth/user/me"),
  adminLogin: (payload) => api.post("/auth/admin/login", payload),
  adminMe: () => api.get("/auth/admin/me"),
};
