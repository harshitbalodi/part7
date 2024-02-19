import { createSlice } from "@reduxjs/toolkit";
const initialState = null;
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser(state, action) {
      return action.payload;
    },
    eraseUser(state, action) {
      return null;
    },
  },
});

export const { eraseUser, saveUser } = userSlice.actions;
export default userSlice.reducer;
