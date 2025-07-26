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

export const fetchEventDetails = async (eventId) => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/events/${eventId}/`
  );
  return response.data;
};

export const fetchEventOrganizer = async (userID) => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/accounts/${userID}/`
  );
  return response.data;
};
