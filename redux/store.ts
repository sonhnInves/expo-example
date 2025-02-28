import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import authMeReducer from "./profileSlice";

export const storeApp = configureStore({
    reducer: {
        auth: authReducer,
        authMe: authMeReducer,
    },
});

export type RootState = ReturnType<typeof storeApp.getState>;
export type AppDispatch = typeof storeApp.dispatch;
