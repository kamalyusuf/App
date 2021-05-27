import { useMutation } from "react-query";
import { useApi } from "../useApi";
import { IResetPassword } from "@app/water";
import { AxiosError } from "axios";

interface R {
  message: string;
}

export const useResetPasswordMutation = () => {
  const { send } = useApi<R, IResetPassword>({
    url: "/auth/reset",
    method: "post"
  });

  return useMutation<R, AxiosError, IResetPassword>(({ token, password }) =>
    send({ token, password })
  );
};
