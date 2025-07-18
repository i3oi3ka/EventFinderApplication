import axios from "axios";

export const createUser = async (user) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/accounts/`,
      user
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
