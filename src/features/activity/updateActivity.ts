import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/api";
import { AxiosError } from "axios";
import { IActivity } from "../../interfaces/IActivity";
import { IData } from "../../interfaces/IData";

export const updateActivity = createAsyncThunk(
  "activity/updateActivity",
  async ({ id, title }: IData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`activity-groups/${id}`, {
        title: title,
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
