import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasks } from '../../services/api';

interface Task {
  week: number;
  profit: number;
  expenses: number;
  net: number;
}

interface TasksState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
};

export const getTasks = createAsyncThunk<Task[]>('tasks/getTasks', async (params) => {
  const response = await fetchTasks(params);
  return response;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default tasksSlice.reducer;
