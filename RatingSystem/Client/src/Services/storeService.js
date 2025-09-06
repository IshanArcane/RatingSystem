import api from "../Api/axiosinstance";

const handleResponse = (promise) =>
  promise
    .then((response) => response.data)
    .catch((error) => {
      console.error("API Error:", error);
      throw error;
    });

const list = (params) => handleResponse(api.get("/stores", { params }));

const get = (id) => handleResponse(api.get(`/stores/${id}`));

const create = (payload) => handleResponse(api.post("/stores", payload));

const update = (id, payload) =>
  handleResponse(api.put(`/stores/${id}`, payload));

const remove = (id) => handleResponse(api.delete(`/stores/${id}`));

export default { list, get, create, update, remove };
