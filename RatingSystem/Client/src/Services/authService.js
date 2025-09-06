import api from "../Api/axiosinstance";

const handleResponse = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error.response?.data || error.message || "An error occurred";
  }
};

const register = (payload) =>
  handleResponse(() => api.post("/auth/register", payload));

const login = (payload) =>
  handleResponse(() => api.post("/auth/login", payload));

const logout = () => handleResponse(() => api.post("/auth/logout"));

export default { register, login, logout };
