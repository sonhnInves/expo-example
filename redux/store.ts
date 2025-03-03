import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import authMeReducer from "./profileSlice";
import postsReducer from "./postsSlice";
import userReducer from "./userSlice";

export const storeApp = configureStore({
    reducer: {
        auth: authReducer,
        authMe: authMeReducer,
        posts: postsReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof storeApp.getState>;
export type AppDispatch = typeof storeApp.dispatch;
