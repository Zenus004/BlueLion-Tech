import api from "../lib/api";

export const dashboardService = {
  userDashboard: () => api.get("/user/dashboard"),
  userProfile: () => api.get("/user/profile"),
  adminStats: () => api.get("/admin/dashboard/stats"),
};
