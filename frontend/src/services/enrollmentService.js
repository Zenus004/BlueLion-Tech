import api from "../lib/api";

export const enrollmentService = {
  submit: (payload) => api.post("/enrollments", payload),
  mine: () => api.get("/user/enrollments"),
  list: (params) => api.get("/admin/enrollments", { params }),
  getOne: (id) => api.get(`/admin/enrollments/${id}`),
  updateStatus: (id, status) => api.patch(`/admin/enrollments/${id}/status`, { status }),
  remove: (id) => api.delete(`/admin/enrollments/${id}`),
};
