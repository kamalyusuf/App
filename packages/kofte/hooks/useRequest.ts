import { api } from "../lib";

interface IUseRequest {
  url: string;
  method: "get" | "put" | "post" | "patch" | "delete";
}

export const useRequest = <T>({ url, method }: IUseRequest) => {
  const doRequest = async (body?: object) => {
    try {
      const { data } = await api[method]<T>(url, { ...body });
      return data;
    } catch (e) {
      throw e;
    }
  };

  return { doRequest };
};
