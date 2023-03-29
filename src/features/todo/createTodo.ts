import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/api";
import { AxiosError } from "axios";
import { ITodoItem } from "../../interfaces/ITodoItem";
interface IDataCreate {
  title: string;
  priority: string;
  activity_group_id: number;
}
export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (
    { title, priority, activity_group_id }: IDataCreate,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`todo-items`, {
        title: title,
        priority: priority,
        activity_group_id: activity_group_id,
      });
      const data: ITodoItem[] = response.data.data;
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          return rejectWithValue(err.response.data);
        }
      }
    }
  }
);
