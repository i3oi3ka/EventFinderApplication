import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {name: '', email: '' },
    token: null,
    isLoading: false,
    isRefreshing: false,
    isAuthenticated: false,
    error: null,
  })