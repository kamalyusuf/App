import { IResponseError } from "@app/water";
import { AxiosError } from "axios";
import { QueryClient, QueryFunction } from "react-query";
import { useToastStore } from "../store";
import { api } from "./api";

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  try {
    const { data } = await api.get(`${queryKey}`);
    return data;
  } catch (e) {
    throw e;
  }
};

const onError = (error: any) => {
  const messages: IResponseError[] = [];

  const errors = (error as AxiosError).response?.data
    .errors as IResponseError[];
  if (errors) {
    errors.forEach((e) => messages.push(e));
  } else if (error.request) {
    messages.push({
      message: error.request.statusText ?? "Something went wrong"
    });
  } else {
    messages.push({ message: error.message ?? "Something went wrong" });
  }

  messages.forEach((e) => {
    useToastStore.getState().show(e);
  });
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 60 * 1000 * 5,
      queryFn: defaultQueryFn,
      refetchOnWindowFocus: false,
      onError
    },
    mutations: {
      onError
    }
  }
});
