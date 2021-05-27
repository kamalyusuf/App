import { IResponseError } from "@app/water";
import create from "zustand";
import { combine } from "zustand/middleware";
import { v4 } from "uuid";

interface Toast extends IResponseError {
  id: string;
}

export const useToastStore = create(
  combine(
    {
      toasts: [] as Toast[]
    },
    (set) => ({
      show: (toast: IResponseError) =>
        set((state) => {
          const r: Toast[] = state.toasts.filter(
            (t) => t.message !== toast.message
          );
          return {
            toasts: [...r, { id: v4(), ...toast }]
          };
        }),
      clear: (id: string) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    })
  )
);
