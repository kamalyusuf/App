import { useMutation } from "react-query";
import { useApi } from "../useApi";
import { IEmailTokenInput, IUser } from "@app/water";
import { AxiosError } from "axios";

export const useVerifyEmailMutation = () => {
  const { send } = useApi<IUser>({
    url: "/auth/verify",
    method: "post"
  });

  return useMutation<IUser, AxiosError, IEmailTokenInput>(({ email, token }) =>
    send({ email, token })
  );
};
