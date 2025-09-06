import api from "../Api/axiosinstance";

const submitRating = async (payload) => {
  try {
    const response = await api.post("/ratings", payload);
    return response.data;
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw error;
  }
};

const fetchStoreRatings = async (storeId) => {
  try {
    const response = await api.get(`/ratings/store/${storeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching store ratings:", error);
    throw error;
  }
};

export default { submitRating, fetchStoreRatings };
