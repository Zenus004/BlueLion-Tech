import api from "../lib/api";

export const contactService = {
  submit: (payload) => api.post("/contacts", payload),
  list: (params) => api.get("/admin/contacts", { params }),
  getOne: (id) => api.get(`/admin/contacts/${id}`),
  remove: (id) => api.delete(`/admin/contacts/${id}`),
};
