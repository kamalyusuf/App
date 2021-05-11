import { useQuery } from "react-query";
import { ITeamMember } from "@app/water";

export const useTeamMembersQuery = (teamId: string) => {
  const { data, isFetching } = useQuery<ITeamMember[]>(
    `/teams/${teamId}/team-members`,
    {
      enabled: !!teamId
    }
  );

  return { members: data, loading: isFetching };
};
