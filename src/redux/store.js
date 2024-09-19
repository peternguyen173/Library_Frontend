import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/Reducer"; // Use default export for consistency

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
