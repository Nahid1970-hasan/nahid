import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "",
};



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    initLoader: (state) => {
      if (
          state.loading != "idle"
      ) {
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {

  

  },
});

export const { initLoader } = userSlice.actions;
export default userSlice.reducer;
