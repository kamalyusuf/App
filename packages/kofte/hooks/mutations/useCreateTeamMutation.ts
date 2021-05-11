import { useMutation } from "react-query";
import { useRequest } from "../useRequest";
import { ITeam } from "@app/water";
import { AxiosError } from "axios";

interface Body {
  name: string;
}

export const useCreateTeamMutation = () => {
  const { doRequest } = useRequest<ITeam, Body>({
    url: "/teams",
    method: "post"
  });

  return useMutation<ITeam, AxiosError, Body>(({ name }) =>
    doRequest({ name })
  );
};
