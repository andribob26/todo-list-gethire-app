import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/api";
import { AxiosError, AxiosResponse } from "axios";
import { ITodoItem } from "../../interfaces/ITodoItem";

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (
    {
      id,
      is_active,
      title,
      priority,
    }: { id: number; is_active?: boolean; title?: string; priority?: string },
    { rejectWithValue }
  ) => {
    try {
      let response: AxiosResponse;
      if (priority) {
        response = await axios.patch(`todo-items/${id}`, {
          title: title,
          priority: priority,
        });
      } else {
        response = await axios.patch(`todo-items/${id}`, {
          is_active: is_active,
        });
      }
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
