import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/api";
import { AxiosError } from "axios";
import { ITodoItem } from "./../../interfaces/ITodoItem";

export const getAllTodo = createAsyncThunk(
  "todo/getAllTodo",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`activity-groups/${id}`);
      const data: ITodoItem[] = response.data.todo_items;
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
