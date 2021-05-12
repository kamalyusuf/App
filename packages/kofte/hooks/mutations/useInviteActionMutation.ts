import { useMutation } from "react-query";
import { useRequest } from "../useRequest";
import { AxiosError } from "axios";
import { IInvite, IInviteActions } from "@app/water";

interface Body {
  invite_id: string;
}

export const useInviteActionMutation = () => {
  const { doRequest } = useRequest<IInvite, Body>({
    url: "/invites/actions",
    method: "post"
  });

  return useMutation<IInvite, AxiosError, Body & { action: IInviteActions }>(
    ({ invite_id, action }) => doRequest({ invite_id }, { action })
  );
};
