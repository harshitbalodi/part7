import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    errorMessage:null,
    addMessage:null
}
const notificationSlice = createSlice({
    name:"notification",
    initialState,
    reducers:{
        setAddMessage(state, action){
            state.addMessage = action.payload;
        },
        resetAddmessage(state){
            state.addMessage = null;
        },
        setErrorMessage(state, action){
            state.errorMessage = action.payload;
        },
        resetErrorMessage(state){
            state.errorMessage = null;
        }

    }
})

export const {setAddMessage,setErrorMessage, resetAddmessage, resetErrorMessage } = notificationSlice.actions;
export default notificationSlice.reducer;