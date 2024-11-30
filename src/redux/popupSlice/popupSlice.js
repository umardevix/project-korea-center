import { createSlice } from "@reduxjs/toolkit";
const popupSlice = createSlice({
    name:"popup",
    initialState:{popup:false},
    reducers:{
        setPopupSlice(state,action){
            state.popup = action.payload;
        }
    }
})

export const { setPopupSlice } = popupSlice.actions;

export default popupSlice.reducer;