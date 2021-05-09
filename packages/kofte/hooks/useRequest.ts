import { api } from "../lib";

interface IUseRequest {
  url: string;
  method: "get" | "put" | "post" | "patch" | "delete";
}

export const useRequest = <ResponseData, RequestBody = {}>({
  url,
  method
}: IUseRequest) => {
  const doRequest = async (body?: RequestBody, params?: object) => {
    const isNotGetOrDelete = method !== "get" && method !== "delete";

    if (isNotGetOrDelete && !body) {
      throw new Error("Request body was not provided");
    }

    try {
      const { data } = await api[method]<ResponseData>(
        url,
        isNotGetOrDelete ? body : undefined,
        { params }
      );
      return data;
    } catch (e) {
      throw e;
    }
  };

  return { doRequest };
};
