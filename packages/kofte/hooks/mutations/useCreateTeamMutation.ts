import { useMutation } from "react-query";
import { useApi } from "../useApi";
import { ITeam } from "@app/water";
import { AxiosError } from "axios";

interface Body {
  name: string;
}

export const useCreateTeamMutation = () => {
  const { send } = useApi<ITeam, Body>({
    url: "/teams",
    method: "post"
  });

  return useMutation<ITeam, AxiosError, Body>(({ name }) => send({ name }));
};
