import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { activitySlice } from "../features/activity/activitySlice";
import { todoSlice } from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: {
    activitySlice: activitySlice.reducer,
    todoSlice: todoSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
