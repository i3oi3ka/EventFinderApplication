export const selectIsLoggedIn = (state) => state.auth.isAuthenticated;

export const selectUserName = (state) => state.auth.user.nickname;

export const selectIsLoading = (state) => state.auth.isLoading;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectUserError = (state) => state.auth.error;
