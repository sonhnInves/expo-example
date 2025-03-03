import {PostsResponse} from "@/models/posts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "@/api/intercepter";

interface PostsState {
    isLoading: boolean;
    isLoadingMore: boolean;
    data: Partial<PostsResponse>;
}

const initialState: PostsState = {
    isLoading: false,
    isLoadingMore: false,
    data: {},
}

export const getPosts = createAsyncThunk('posts', async ({limit = 10, page = 1, search = ""}: {
        limit?: number
        page?: number
        search?: string
    }, {rejectWithValue}) => {
        try {
            const response = await api.get<PostsResponse>('posts', {
                params: {
                    limit,
                    skip: (page - 1) * limit,
                    search
                }
            });
            return {data: response.data, page};
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Get Posts failed");
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        onRefreshData: (state) => {
            // state.isLoading = true
        },
        onLoadMoreData: (state) => {
            // state.isLoading = false
        },
        onEndData: (state) => {
            // state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state, action) => {
            if (action.meta.arg.page === 1) {
                state.isLoading = true;  // Chỉ hiển thị loading khi load mới
            } else {
                state.isLoadingMore = true; // Load More không làm ảnh hưởng toàn bộ màn hình
            }
        })
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isLoadingMore = false;
            if (action.meta.arg.page === 1) {
                state.data = action.payload.data; // Ghi đè khi load mới
            } else {
                state.data.posts = [...(state.data.posts || []), ...action.payload.data.posts]; // Nối thêm khi load more
            }
        })
        builder.addCase(getPosts.rejected, (state, action) => {
            state.isLoading = false
            state.isLoadingMore = false;
        })
    }
})
export const {onRefreshData, onLoadMoreData, onEndData} = postsSlice.actions
export default postsSlice.reducer
