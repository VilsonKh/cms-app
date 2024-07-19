import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './slices/commentsSlice';
import designersReducer from './slices/designersSlice';
import tasksReducer from './slices/tasksSlice';
import topDesignersReducer from './slices/topDesignersSlice';


export const store: any = configureStore({
  reducer: {
    comments: commentsReducer,
    designers: designersReducer,
    tasks: tasksReducer,
    topDesigners: topDesignersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
