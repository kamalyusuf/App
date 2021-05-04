import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useRequest } from "../useRequest";

interface R {
  message: string;
}

export const useResendVerificationEmailMutation = () => {
  const { doRequest } = useRequest<R>({
    url: "/auth/verify/re",
    method: "post"
  });
  return useMutation<R, AxiosError, {}>(doRequest);
};
