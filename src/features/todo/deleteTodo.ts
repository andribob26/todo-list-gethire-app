import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/api";
import { AxiosError } from "axios";
import { ITodoItem } from "../../interfaces/ITodoItem";

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`todo-items/${id}`);
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
