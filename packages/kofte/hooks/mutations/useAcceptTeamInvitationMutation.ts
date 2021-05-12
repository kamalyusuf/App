import { useMutation } from "react-query";
import { useRequest } from "../useRequest";
import { AxiosError } from "axios";
import { IInvite } from "@app/water";

interface Body {
  invite_id: string;
}

export const useAcceptTeamInvitationMutation = () => {
  const { doRequest } = useRequest<IInvite, Body>({
    url: "/invites/accept",
    method: "post"
  });

  return useMutation<IInvite, AxiosError, Body>(({ invite_id }) =>
    doRequest({ invite_id })
  );
};
