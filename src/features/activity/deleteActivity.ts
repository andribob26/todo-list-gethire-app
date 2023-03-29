import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/api";
import { AxiosError } from "axios";
import { IActivity } from "../../interfaces/IActivity";

export const deleteActivity = createAsyncThunk(
  "activity/deleteActivity",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`activity-groups/${id}`);
      const data: IActivity[] = response.data.data;
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
