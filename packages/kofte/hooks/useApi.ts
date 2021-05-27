import { api } from "../lib";

interface IUseApi {
  url: string;
  method: "get" | "put" | "post" | "patch" | "delete";
}

export const useApi = <TData, TBody = {}>({ url, method }: IUseApi) => {
  const send = async (body?: TBody, params?: object) => {
    const isNotGetOrDelete = method !== "get" && method !== "delete";

    if (isNotGetOrDelete && !body) {
      throw new Error("Request body was not provided");
    }

    try {
      const { data } = await api[method]<TData>(
        url,
        isNotGetOrDelete ? body : undefined,
        { params }
      );
      return data;
    } catch (e) {
      throw e;
    }
  };

  return { send };
};
