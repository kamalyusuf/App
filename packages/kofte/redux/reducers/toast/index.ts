import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { IResponseError } from "@app/water";

export type Toast = {
  id: string;
  message: string;
  field?: string;
};

interface IState {
  toasts: Toast[];
}

const initialState: IState = {
  toasts: []
};

export const toastSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    toast: (state, { payload }: PayloadAction<IResponseError>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.message !== payload.message
      );
      // state.toasts.unshift({ id: v4(), ...payload });
      state.toasts.push({ id: v4(), ...payload });
    },
    clear: (state, { payload }: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== payload);
    }
  }
});

export const { clear, toast } = toastSlice.actions;

export const toastReducer = toastSlice.reducer;
