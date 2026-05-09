import api from "../lib/api";

export const applicationService = {
  submit: (payload) => api.post("/applications", payload),
  mine: () => api.get("/user/applications"),
  list: (params) => api.get("/admin/applications", { params }),
  getOne: (id) => api.get(`/admin/applications/${id}`),
  updateStatus: (id, status) => api.patch(`/admin/applications/${id}/status`, { status }),
  remove: (id) => api.delete(`/admin/applications/${id}`),
};
