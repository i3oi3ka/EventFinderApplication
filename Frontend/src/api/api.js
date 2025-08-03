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

export const fetchUser = async (userID) => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/accounts/${userID}/`
  );
  return response.data;
};

export const reserveTickets = async ({ eventId }) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/tickets/`, {
      event: eventId,
    });
    return response.data;
  } catch (error) {
    console.error("Error reserving tickets:", error);
    throw error;
  }
};

export const fetchComments = async (eventId) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/reviews/?event=${eventId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const createComment = async (commentData) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/reviews/`,
      commentData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error.response.data.msg);
    throw new Error(error.response.data.msg);
  }
};
