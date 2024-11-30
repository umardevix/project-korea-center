import { createSlice } from "@reduxjs/toolkit";
const totalSlice = createSlice({
    name:"total",
    initialState:{total:0},
    reducers:{
        setTotaSlice:(state,action)=>{
            state.total=action.payload;
        }
    }

})

export const {setTotaSlice}=totalSlice.actions;

export default totalSlice.reducer;