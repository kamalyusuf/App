import { useMutation } from "react-query";
import { useRequest } from "../useRequest";
import { ICredentials } from "@app/water";
import { AxiosError } from "axios";

interface R {
  message: string;
}

export const useForgotPasswordMutation = () => {
  const { doRequest } = useRequest<R>({
    url: "/auth/forgot",
    method: "post"
  });

  return useMutation<R, AxiosError, Pick<ICredentials, "email">>(({ email }) =>
    doRequest({ email })
  );
};
