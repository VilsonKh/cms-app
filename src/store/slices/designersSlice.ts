import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchDesigners } from "../../services/api";

interface Designer {
	id: string;
	avatar: string;
	username: string;
	email: string;
	issues: { status: string; date_created: string }[];
}

interface DesignersState {
	list: {
		count?: number;
		results?: Designer[];
	};
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: DesignersState = {
	list: {},
	status: "idle",
};

export const getDesigners = createAsyncThunk<Designer[]>("designers/getDesigners", async (params: any) => {
	const response = await fetchDesigners(params);
	return response;
});

const designersSlice = createSlice({
	name: "designers",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getDesigners.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getDesigners.fulfilled, (state, action: PayloadAction<Designer[]>) => {
				state.status = "succeeded";
				// @ts-ignore
				state.list = action.payload;
			})
			.addCase(getDesigners.rejected, (state) => {
				state.status = "failed";
			});
	},
});

export default designersSlice.reducer;
