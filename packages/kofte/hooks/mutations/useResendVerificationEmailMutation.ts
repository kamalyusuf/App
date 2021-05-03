import { useMutation } from "react-query";
import { useRequest } from "../useRequest";

export const useResendVerificationEmailMutation = () => {
  const { doRequest } = useRequest<{ message: string }>({
    url: "/auth/verify/re",
    method: "post"
  });
  return useMutation(doRequest);
};
