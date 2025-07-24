import { createSlice } from "@reduxjs/toolkit";
import {
  createEventAsync,
  deleteEventAsync,
  fetchEventsAsync,
} from "./operations";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: {
      results: [],
      count: 0,
    },
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEventsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEventAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEventAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.events.results.push(action.payload);
      })
      .addCase(createEventAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEventAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEventAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.events.results = state.events.results.filter(
          (event) => event.id !== action.payload
        );
      })
      .addCase(deleteEventAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const eventsReducer = eventsSlice.reducer;
