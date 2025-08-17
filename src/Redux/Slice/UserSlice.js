import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userRole",
  initialState: {
    role: "user",
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    reset: (state, action) => {
      state.role = "user";
    },
  },
});

export const { reset, setRole } = userSlice.actions;

export default userSlice.reducer;
