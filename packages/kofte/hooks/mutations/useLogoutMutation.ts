import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useRequest } from "../useRequest";

export const useLogoutMutation = () => {
  const { doRequest } = useRequest<null>({
    url: "/auth/signout",
    method: "post"
  });

  return useMutation<null, AxiosError, {}>(doRequest);
};
