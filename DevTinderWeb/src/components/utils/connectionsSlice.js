import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
name:"connections",
initialState:null,
reducers:{
   addconnections:(state,action)=> action.payload,

},
});

export const {addconnections} = connectionsSlice.actions;

export default connectionsSlice.reducer;