import { useMutation } from "react-query";
import { useRequest } from "../useRequest";
import { IResetPassword } from "@app/water";
import { AxiosError } from "axios";

interface R {
  message: string;
}

export const useResetPasswordMutation = () => {
  const { doRequest } = useRequest<R, IResetPassword>({
    url: "/auth/reset",
    method: "post"
  });

  return useMutation<R, AxiosError, IResetPassword>(({ token, password }) =>
    doRequest({ token, password })
  );
};
