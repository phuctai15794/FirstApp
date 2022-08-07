import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchList, fetchListPosts } from '../services/userService';

// Thunk
const fetchUsers = createAsyncThunk('user/fetchList', async () => {
	return await fetchList()
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error;
		});
});
const fetchPosts = createAsyncThunk('user/fetchPosts', async () => {
	return await fetchListPosts()
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error;
		});
});

// State
const state = {
	loading: false,
	registerName: '',
	users: [],
	posts: [],
};

// Slice
const userSlice = createSlice({
	name: 'user',
	initialState: state,
	reducers: {
		setRegister: (state, action) => {
			state.registerName = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state) => {
				state.loading = false;
			})
			.addCase(fetchPosts.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.loading = false;
				state.posts = action.payload;
			})
			.addCase(fetchPosts.rejected, (state) => {
				state.loading = false;
			});
	},
});

export const selectorUser = (state) => state.user;
export { fetchUsers, fetchPosts };
export const { setRegister } = userSlice.actions;
export default userSlice.reducer;
