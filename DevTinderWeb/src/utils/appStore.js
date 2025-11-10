import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice.js"
import connectionsReducer from "./connectionsSlice.js"
import requestReducer from "./requestSlice.js"
const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connections:connectionsReducer,
        request:requestReducer,
    },

});

export default appStore;