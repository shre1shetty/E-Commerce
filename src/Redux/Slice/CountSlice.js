import { createSlice } from "@reduxjs/toolkit";

const CountSlice = createSlice({
  name: "count",
  initialState: {
    count: 0,
  },
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    reset: (state) => {
      state.count = 0;
    },
  },
});

export const { setCount, reset } = CountSlice.actions;

export default CountSlice.reducer;
