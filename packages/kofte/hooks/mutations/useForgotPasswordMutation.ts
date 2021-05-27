import { useMutation } from "react-query";
import { useApi } from "../useApi";
import { ICredentials } from "@app/water";
import { AxiosError } from "axios";

interface R {
  message: string;
}

export const useForgotPasswordMutation = () => {
  const { send } = useApi<R>({
    url: "/auth/forgot",
    method: "post"
  });

  return useMutation<R, AxiosError, Pick<ICredentials, "email">>(({ email }) =>
    send({ email })
  );
};
