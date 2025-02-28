import {ProfileResponse} from "@/models/profile";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "@/api/intercepter";

interface ProfileState {
    loading: boolean;
    data: Partial<ProfileResponse>
}

const initialState: ProfileState = {
    loading: false,
    data: {}
}
export const getProfile = createAsyncThunk('auth/me', async (_, {rejectWithValue}) => {
        try {
            const response = await api.get<ProfileResponse>('auth/me');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Get Profile failed");
        }
    }
);

const profileSlice = createSlice({
    name: "me",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, (state) => {
            state.loading = true;
            state.data = {}
        })
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        builder.addCase(getProfile.rejected, (state) => {
            state.loading = false;
        })
    }
})
export default profileSlice.reducer;
