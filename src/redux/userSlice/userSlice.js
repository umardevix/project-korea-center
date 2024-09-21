import { createSlice } from "@reduxjs/toolkit";

// Retrieve user from localStorage if it exists
const initialUserState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: { user: initialUserState },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // Save user to localStorage when it's set
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      // Remove user from localStorage when clearing
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
