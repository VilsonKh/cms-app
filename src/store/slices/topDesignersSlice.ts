import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchDesigners } from "../../services/api";
import { RootState } from "../store";

interface Designer {
	id: string;
	avatar: string;
	username: string;
	email: string;
	issues: { status: string; date_created: string }[];
}

interface TopDesignersState {
	list: Designer[],
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: TopDesignersState = {
	list: [],
	status: "idle",
};



export const getTopDesigners = createAsyncThunk<Designer[]>("designers/getTopDesigners", async (params: any, { getState }) => {
	const state = getState() as RootState;
	if(state.comments.latest.length > 0) {
		return state.comments.latest
	}
	const response = await fetchDesigners(params);
	return response;
});

const topDesignersSlice = createSlice({
	name: "designers",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTopDesigners.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getTopDesigners.fulfilled, (state, action: PayloadAction<Designer[]>) => {
				state.status = "succeeded";
				// @ts-ignore
				state.list = action.payload;
			})
			.addCase(getTopDesigners.rejected, (state) => {
				state.status = "failed";
			});
	},
});

export default topDesignersSlice.reducer;
