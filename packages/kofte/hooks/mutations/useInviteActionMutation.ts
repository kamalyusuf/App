import { useMutation } from "react-query";
import { useApi } from "../useApi";
import { AxiosError } from "axios";
import { IInvite, IInviteActions } from "@app/water";

interface Body {
  invite_id: string;
}

export const useInviteActionMutation = () => {
  const { send } = useApi<IInvite, Body>({
    url: "/invites/actions",
    method: "post"
  });

  return useMutation<IInvite, AxiosError, Body & { action: IInviteActions }>(
    ({ invite_id, action }) => send({ invite_id }, { action })
  );
};
