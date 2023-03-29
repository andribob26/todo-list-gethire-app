import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/api";
import { AxiosError } from "axios";
import { IActivity } from "../../interfaces/IActivity";

export const createActivity = createAsyncThunk(
  "activity/createActivity",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`activity-groups`, {
        title: "New Activity",
        email: "andri.feb.26@gmail.com",
      });
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
