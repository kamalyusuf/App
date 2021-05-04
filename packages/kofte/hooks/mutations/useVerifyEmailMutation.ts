import { useMutation } from "react-query";
import { useRequest } from "../useRequest";
import { IEmailTokenInput, IUser } from "@app/water";
import { AxiosError } from "axios";

export const useVerifyEmailMutation = () => {
  const { doRequest } = useRequest<IUser>({
    url: "/auth/verify",
    method: "post"
  });

  return useMutation<IUser, AxiosError, IEmailTokenInput>(({ email, token }) =>
    doRequest({ email, token })
  );
};
