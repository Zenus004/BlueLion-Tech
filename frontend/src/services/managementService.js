import api from "../lib/api";

export const userManagementService = {
  list: (params) => api.get("/admin/users", { params }),
  getOne: (id) => api.get(`/admin/users/${id}`),
  block: (id) => api.patch(`/admin/users/${id}/block`),
  unblock: (id) => api.patch(`/admin/users/${id}/unblock`),
};

export const adminManagementService = {
  list: (params) => api.get("/admin/admins", { params }),
  create: (payload) => api.post("/admin/admins", payload),
  block: (id) => api.patch(`/admin/admins/${id}/block`),
  unblock: (id) => api.patch(`/admin/admins/${id}/unblock`),
  remove: (id) => api.delete(`/admin/admins/${id}`),
};
