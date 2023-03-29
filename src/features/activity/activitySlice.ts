import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { IActivity } from "../../interfaces/IActivity";
import { getAllActivity } from "./getAllActivity";
import { deleteActivity } from "./deleteActivity";
import { createActivity } from "./createActivity";
import { typeActivity } from "../../constans/typeActivity";
import { updateActivity } from "./updateActivity";

interface IInitialState {
  dataActivity: {
    data: IActivity[];
    isLoading: boolean;
  };
  dataDeleteActivity: {
    id: number | null;
    title: string;
    status: string;
    isLoading: boolean;
  };
  dataCreateActivity: {
    status: string;
    isLoading: boolean;
  };
  dataUpdateActivity: {
    status: string;
    title: string;
    isLoading: boolean;
  };
}

const initialState: IInitialState = {
  dataActivity: {
    data: [],
    isLoading: false,
  },
  dataDeleteActivity: {
    id: null,
    title: "",
    status: "",
    isLoading: false,
  },
  dataCreateActivity: {
    status: "",
    isLoading: false,
  },
  dataUpdateActivity: {
    status: "",
    title: "",
    isLoading: false,
  },
};

export const activitySlice = createSlice({
  name: "activitySlice",
  initialState: initialState,
  reducers: {
    saveIdToDelete: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      state.dataDeleteActivity = {
        ...state.dataDeleteActivity,
        id: action.payload.id,
        title: action.payload.title,
      };
    },
    resetDataActivity: (state, action: PayloadAction<{ type: string }>) => {
      switch (action.payload.type) {
        case typeActivity.create:
          state.dataCreateActivity = {
            ...state.dataCreateActivity,
            status: "",
            isLoading: false,
          };
          break;

        case typeActivity.delete:
          state.dataDeleteActivity = {
            ...state.dataDeleteActivity,
            id: null,
            title: "",
            status: "",
            isLoading: false,
          };
          break;

        case typeActivity.update:
          state.dataUpdateActivity = {
            ...state.dataUpdateActivity,
            status: "",
            isLoading: false,
          };
          break;

        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllActivity.pending, (state) => {
      state.dataActivity = {
        ...state.dataActivity,
        isLoading: true,
      };
    });
    builder.addCase(getAllActivity.fulfilled, (state, { payload }) => {
      if (payload) {
        state.dataActivity = {
          ...state.dataActivity,
          data: payload,
          isLoading: false,
        };
      }
    });
    builder.addCase(getAllActivity.rejected, (state, { payload }) => {
      if (payload) {
        state.dataActivity = {
          ...state.dataActivity,
          isLoading: false,
        };
      }
    });

    // deleteActivity
    builder.addCase(deleteActivity.pending, (state) => {
      state.dataDeleteActivity = {
        ...state.dataDeleteActivity,
        isLoading: true,
      };
    });
    builder.addCase(deleteActivity.fulfilled, (state, { payload }) => {
      state.dataDeleteActivity = {
        ...state.dataDeleteActivity,
        status: "Success",
        isLoading: false,
      };
    });
    builder.addCase(deleteActivity.rejected, (state, { payload }) => {
      state.dataDeleteActivity = {
        ...state.dataDeleteActivity,
        status: "Not Found",
        isLoading: false,
      };
    });

    // createActivity
    builder.addCase(createActivity.pending, (state) => {
      state.dataCreateActivity = {
        ...state.dataCreateActivity,
        isLoading: true,
      };
    });
    builder.addCase(createActivity.fulfilled, (state, { payload }) => {
      state.dataCreateActivity = {
        ...state.dataCreateActivity,
        status: "Success",
        isLoading: false,
      };
    });
    builder.addCase(createActivity.rejected, (state, { payload }) => {
      state.dataCreateActivity = {
        ...state.dataCreateActivity,
        status: "Bad Request",
        isLoading: false,
      };
    });

    // updateActivity
    builder.addCase(updateActivity.pending, (state) => {
      state.dataUpdateActivity = {
        ...state.dataUpdateActivity,
        isLoading: true,
      };
    });
    builder.addCase(updateActivity.fulfilled, (state, { payload }) => {
      if (payload) {
        state.dataUpdateActivity = {
          ...state.dataUpdateActivity,
          status: "Success",
          title: payload.title,
          isLoading: false,
        };
      }
    });
    builder.addCase(updateActivity.rejected, (state, { payload }) => {
      state.dataUpdateActivity = {
        ...state.dataUpdateActivity,
        status: "Bad Request",
        isLoading: false,
      };
    });
  },
});

export const selectDataActivity = (state: RootState) =>
  state.activitySlice.dataActivity;
export const selectDataDeleteActivity = (state: RootState) =>
  state.activitySlice.dataDeleteActivity;
export const selectDataCreateActivity = (state: RootState) =>
  state.activitySlice.dataCreateActivity;
export const selectDataUpdateActivity = (state: RootState) =>
  state.activitySlice.dataUpdateActivity;

export const { saveIdToDelete, resetDataActivity } = activitySlice.actions;
