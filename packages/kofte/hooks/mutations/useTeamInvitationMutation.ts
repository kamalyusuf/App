import { useMutation } from "react-query";
import { useRequest } from "../useRequest";
import { IInvite, TeamPermissions } from "@app/water";
import { AxiosError } from "axios";

interface Body {
  team_id: string;
  invite_to_email: string;
  permissions: TeamPermissions[];
}

export const useTeamInvitationMutation = () => {
  const { doRequest } = useRequest<IInvite, Body>({
    url: "/invites",
    method: "post"
  });

  return useMutation<IInvite, AxiosError, Body>(
    ({ team_id, invite_to_email, permissions }) =>
      doRequest({ team_id, invite_to_email, permissions })
  );
};
