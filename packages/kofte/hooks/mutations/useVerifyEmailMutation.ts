import { useMutation } from "react-query";
import { useRequest } from "../useRequest";
import { IEmailTokenInput, IUser } from "@app/water";

export const useVerifyEmailMutation = () => {
  const { doRequest } = useRequest<IUser>({
    url: "/auth/verify",
    method: "post"
  });

  return useMutation(({ email, token }: IEmailTokenInput) =>
    doRequest({ email, token })
  );
};
