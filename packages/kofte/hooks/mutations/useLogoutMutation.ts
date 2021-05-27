import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useApi } from "../useApi";

export const useLogoutMutation = () => {
  const { send } = useApi<null>({
    url: "/auth/signout",
    method: "post"
  });

  return useMutation<null, AxiosError, {}>(send);
};
