import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useApi } from "../useApi";

interface R {
  message: string;
}

export const useResendVerificationEmailMutation = () => {
  const { send } = useApi<R>({
    url: "/auth/verify/re",
    method: "post"
  });
  return useMutation<R, AxiosError, {}>(send);
};
