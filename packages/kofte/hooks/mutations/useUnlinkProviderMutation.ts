import { useMutation } from "react-query";
import { useApi } from "../useApi";
import { IAccount } from "@app/water";
import { AxiosError } from "axios";

export const useUnlinkProviderMutation = () => {
  const { send } = useApi<IAccount>({
    url: "/account/unlink",
    method: "patch"
  });

  return useMutation<IAccount, AxiosError, { provider: string }>(
    ({ provider }) => send({}, { provider })
  );
};
