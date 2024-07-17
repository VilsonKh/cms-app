import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchDesigners } from '../../services/api';

interface Designer {
  id: string;
  avatar: string;
  name: string;
  email: string;
  issues: []
}

interface DesignersState {
  list: {
    count?: number,
    results?: Designer[],
  },
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: DesignersState = {
  list: {},
  status: 'idle',
};

export const getDesigners = createAsyncThunk<Designer[]>('designers/getDesigners', async (params) => {
  const response = await fetchDesigners(params);
  return response;
});

const designersSlice = createSlice({
  name: 'designers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDesigners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDesigners.fulfilled, (state, action: PayloadAction<Designer[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(getDesigners.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default designersSlice.reducer;
