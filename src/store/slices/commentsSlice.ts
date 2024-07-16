import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchComments } from "../../services/api";

interface Comment {
	id: string;
	designer: {
		avatar: string;
		username: string;
	};
	username: string;
	date_created: string;
	issue: string;
	message: string;
}

interface CommentsState {
	latest: Comment[];
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CommentsState = {
	latest: [],
	status: "idle",
};

export const getComments = createAsyncThunk<Comment[]>("comments/getComments", async () => {
	const response = await fetchComments();
	return response;
});

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getComments.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
				state.status = "succeeded";
				state.latest = action.payload;
			})
			.addCase(getComments.rejected, (state) => {
				state.status = "failed";
			});
	},
});

export default commentsSlice.reducer;
