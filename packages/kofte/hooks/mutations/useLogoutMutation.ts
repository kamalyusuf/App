import { useMutation } from "react-query";
import { useRequest } from "../useRequest";

export const useLogoutMutation = () => {
  const { doRequest } = useRequest({ url: "/auth/signout", method: "post" });

  return useMutation(doRequest);
};
