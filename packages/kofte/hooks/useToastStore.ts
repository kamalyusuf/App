import { useDispatch } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";
import { useCallback } from "react";
import { clear, toast, Toast, store } from "../redux";
import { IResponseError } from "@app/water";

interface R {
  toasts: Toast[];
  toast: (payload: IResponseError) => void;
  clear: (payload: string) => void;
}

export const useToastStore = (): Readonly<R> => {
  const dispatch = useDispatch();
  const { toasts } = useTypedSelector((state) => state.toast);

  return {
    toasts,
    toast: useCallback((payload: IResponseError) => dispatch(toast(payload)), [
      dispatch
    ]),
    clear: useCallback((payload: string) => dispatch(clear(payload)), [
      dispatch
    ])
  };
};

export const showErrorToast = (error: IResponseError) => {
  store.dispatch(toast(error));
};
