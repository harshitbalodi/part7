import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const allUsersSlice = createSlice({
    name:"allUsers",
    initialState,
    reducers:{
        SetAllUsers(state, action){
            return action.payload;
        }
    }
})

export const {SetAllUsers} = allUsersSlice.actions;
export default allUsersSlice.reducer;