import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AuthResponse} from "@/models/auth";
import api from "@/api/intercepter";

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    loading: boolean;
    error: null | string;
    data: Partial<AuthResponse>;
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    token: null,
    data: {},
};
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials: { username: string; password: string }, {rejectWithValue}) => {
        try {
            const response = await api.post<AuthResponse>("auth/login", credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state) {
            state.isAuthenticated = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.token = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.accessToken;
                state.data = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});
export const {loginSuccess} = authSlice.actions;
export default authSlice.reducer;
