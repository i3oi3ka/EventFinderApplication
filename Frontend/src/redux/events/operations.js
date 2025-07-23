import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

export const fetchEventsAsync = createAsyncThunk(
  "events/fetchAllEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios("/events/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createEventAsync = createAsyncThunk(
  "events/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/events/", eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
