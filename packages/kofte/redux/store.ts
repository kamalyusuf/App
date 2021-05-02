import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import { toastReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    toast: toastReducer
  }
});

const setupStore = (ctx: any): EnhancedStore => store;

const makeStore: MakeStore = (ctx) => setupStore(ctx);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper(makeStore);
