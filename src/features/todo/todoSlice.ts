import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { createTodo } from "./createTodo";
import { getAllTodo } from "./getAllTodo";
import { ITodoItem } from "./../../interfaces/ITodoItem";
import { typeTodo } from "../../constans/typeTodo";
import { updateTodo } from "./updateTodo";
import { deleteTodo } from "./deleteTodo";

interface IInitialState {
  dataTodo: {
    status: string;
    data: ITodoItem[];
    isLoading: boolean;
  };
  dataDeleteTodo: {
    singleData: {
      id: number | null;
      title: string;
    };
    status: string;
    isLoading: boolean;
  };
  dataCreateTodo: {
    status: string;
    isLoading: boolean;
  };
  dataUpdateTodo: {
    singleData: {
      id: number | null;
      title: string;
      priority?: string;
    };
    status: string;
    isLoading: boolean;
  };
}

const initialState: IInitialState = {
  dataTodo: {
    status: "",
    data: [],
    isLoading: false,
  },
  dataDeleteTodo: {
    singleData: {
      id: null,
      title: "",
    },
    status: "",
    isLoading: false,
  },
  dataCreateTodo: {
    status: "",
    isLoading: false,
  },
  dataUpdateTodo: {
    singleData: {
      id: null,
      title: "",
      priority: "",
    },
    status: "",
    isLoading: false,
  },
};

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState: initialState,
  reducers: {
    saveDataToState: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        priority?: string;
        type: string;
      }>
    ) => {
      switch (action.payload.type) {
        case typeTodo.update:
          state.dataUpdateTodo = {
            ...state.dataUpdateTodo,
            singleData: {
              id: action.payload.id,
              title: action.payload.title,
              priority: action.payload.priority,
            },
            isLoading: false,
            status: "",
          };
          break;

        case typeTodo.delete:
          state.dataDeleteTodo = {
            ...state.dataDeleteTodo,
            singleData: {
              id: action.payload.id,
              title: action.payload.title,
            },
            isLoading: false,
            status: "",
          };
          break;

        case typeTodo.create:
          state.dataCreateTodo = {
            ...state.dataCreateTodo,
            isLoading: false,
            status: "",
          };
          break;

        default:
          break;
      }
    },
    sortTodo: (state, action: PayloadAction<{ type: string }>) => {
      switch (action.payload.type) {
        case "Terbaru":
          const sortTerbaru = state.dataTodo.data.sort((objA, objB) => {
            return objB.id - objA.id;
          });

          state.dataTodo = {
            ...state.dataTodo,
            data: sortTerbaru,
          };
          break;
        case "Terlama":
          const sortTerlama = state.dataTodo.data.sort((objA, objB) => {
            return objA.id - objB.id;
          });

          state.dataTodo = {
            ...state.dataTodo,
            data: sortTerlama,
          };
          break;
        case "A-Z":
          const sortAZ = state.dataTodo.data.sort((objA, objB) => {
            let a: string = objA.title.toLowerCase();
            let b: string = objB.title.toLowerCase();

            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
          });

          state.dataTodo = {
            ...state.dataTodo,
            data: sortAZ,
          };
          break;
        case "Z-A":
          const sortZA = state.dataTodo.data.sort((objA, objB) => {
            let a: string = objA.title.toLowerCase();
            let b: string = objB.title.toLowerCase();

            if (a < b) {
              return 1;
            }
            if (a > b) {
              return -1;
            }
            return 0;
          });

          state.dataTodo = {
            ...state.dataTodo,
            data: sortZA,
          };
          break;

        case "Belum Selesai":
          const sortBelumSelesai = state.dataTodo.data.sort((objA, objB) => {
            return objB.is_active - objA.is_active;
          });

          state.dataTodo = {
            ...state.dataTodo,
            data: sortBelumSelesai,
          };
          break;

        default:
          break;
      }
    },
    resetDataTodo: (state, action: PayloadAction<{ type: string }>) => {
      switch (action.payload.type) {
        case typeTodo.create:
          state.dataCreateTodo = {
            ...state.dataCreateTodo,
            status: "",
            isLoading: false,
          };
          break;

        case typeTodo.delete:
          state.dataDeleteTodo = {
            ...state.dataDeleteTodo,
            singleData: {
              id: null,
              title: "",
            },
            status: "",
            isLoading: false,
          };
          break;

        case typeTodo.update:
          state.dataUpdateTodo = {
            ...state.dataUpdateTodo,
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
    builder.addCase(getAllTodo.pending, (state) => {
      state.dataTodo = {
        ...state.dataTodo,
        isLoading: true,
      };
    });
    builder.addCase(getAllTodo.fulfilled, (state, { payload }) => {
      if (payload) {
        state.dataTodo = {
          ...state.dataTodo,
          status: "Success",
          data: payload,
          isLoading: false,
        };
      }
    });
    builder.addCase(getAllTodo.rejected, (state, { payload }) => {
      if (payload) {
        state.dataTodo = {
          ...state.dataTodo,
          isLoading: false,
        };
      }
    });
    // createTodo
    builder.addCase(createTodo.pending, (state) => {
      state.dataCreateTodo = {
        ...state.dataCreateTodo,
        isLoading: true,
      };
    });
    builder.addCase(createTodo.fulfilled, (state, { payload }) => {
      state.dataCreateTodo = {
        ...state.dataCreateTodo,
        status: "Success",
        isLoading: false,
      };
    });
    builder.addCase(createTodo.rejected, (state, { payload }) => {
      state.dataCreateTodo = {
        ...state.dataCreateTodo,
        status: "Bad Request",
        isLoading: false,
      };
    });
    // updateTodo
    builder.addCase(updateTodo.pending, (state) => {
      state.dataUpdateTodo = {
        ...state.dataUpdateTodo,
        isLoading: true,
      };
    });
    builder.addCase(updateTodo.fulfilled, (state, { payload }) => {
      state.dataUpdateTodo = {
        ...state.dataUpdateTodo,
        status: "Success",
        isLoading: false,
      };
    });
    builder.addCase(updateTodo.rejected, (state, { payload }) => {
      state.dataUpdateTodo = {
        ...state.dataUpdateTodo,
        status: "Bad Request",
        isLoading: false,
      };
    });

    // deleteTodo
    builder.addCase(deleteTodo.pending, (state) => {
      state.dataDeleteTodo = {
        ...state.dataDeleteTodo,
        isLoading: true,
      };
    });
    builder.addCase(deleteTodo.fulfilled, (state, { payload }) => {
      state.dataDeleteTodo = {
        ...state.dataDeleteTodo,
        status: "Success",
        isLoading: false,
      };
    });
    builder.addCase(deleteTodo.rejected, (state, { payload }) => {
      state.dataDeleteTodo = {
        ...state.dataDeleteTodo,
        status: "Not Found",
        isLoading: false,
      };
    });
  },
});

export const selectDataTodo = (state: RootState) => state.todoSlice.dataTodo;
export const selectDataCreateTodo = (state: RootState) =>
  state.todoSlice.dataCreateTodo;
export const selectDataUpdateTodo = (state: RootState) =>
  state.todoSlice.dataUpdateTodo;
export const selectDataDeleteTodo = (state: RootState) =>
  state.todoSlice.dataDeleteTodo;

export const { resetDataTodo, sortTodo, saveDataToState } = todoSlice.actions;
