import api from "../Api/axiosinstance";

const handleResponse = (promise) =>
  promise
    .then((res) => res.data)
    .catch((err) => {
      console.error("API Error:", err);
      throw err;
    });

const list = (params) => handleResponse(api.get("/admin/", { params }));
const get = (id) => handleResponse(api.get(`/admin/${id}`));
const create = (payload) => handleResponse(api.post("/admin/", payload));
const update = (id, payload) =>
  handleResponse(api.put(`/admin/${id}`, payload));
const remove = (id) => handleResponse(api.delete(`/admin/${id}`));

export default { list, get, create, update, remove };
