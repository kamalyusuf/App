import { useQuery } from "react-query";
import { ITeam } from "@app/water";

export const useTeamQuery = (id: string) => {
  const { data, isFetching } = useQuery<ITeam>(`/teams/${id}`, {
    enabled: !!id
  });
  return { team: data, loading: isFetching };
};
