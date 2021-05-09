import { useMutation } from "react-query";
import { useRequest } from "../useRequest";
import { IAccount } from "@app/water";
import { AxiosError } from "axios";

export const useUnlinkProviderMutation = () => {
  const { doRequest } = useRequest<IAccount>({
    url: "/account/unlink",
    method: "patch"
  });

  return useMutation<IAccount, AxiosError, { provider: string }>(
    ({ provider }) => doRequest({}, { provider })
  );
};
