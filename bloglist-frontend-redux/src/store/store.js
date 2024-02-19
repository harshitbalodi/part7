import { configureStore } from "@reduxjs/toolkit";
import NotificationSlice from "./NotificationSlice";
import blogSlice from "./blogSlice";
import userSlice from "./userSlice";
import allUsersSlice from "./allUsersSlice";

const store = configureStore({
    reducer:{
        notification: NotificationSlice,
        blogs:blogSlice,
        user:userSlice,
        allUsers:allUsersSlice
    }
})

export default store;