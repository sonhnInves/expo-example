import {ProfileResponse} from "@/models/profile";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "@/api/intercepter";

interface UserState {
    isLoading: boolean;
    data: Partial<ProfileResponse>
}

const initialState: UserState = {
    isLoading: false,
    data: {}
}
export const getUser = createAsyncThunk('user/getUser', async ({id}: { id: number }, {rejectWithValue}) => {
    try {
        const response = await api.get<ProfileResponse>(`user/${id}`)
        return response.data;
    } catch (e: any) {
        return rejectWithValue(e.response?.data?.message);
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(getUser.rejected, (state) => {
            state.isLoading = false
        })
    }
})
export default userSlice.reducer;
