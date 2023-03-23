import { configureStore } from "@reduxjs/toolkit"; 
import authReducer from "./auth";

export const globalStore = configureStore({
    reducer: {
        authReducer
    }
});
