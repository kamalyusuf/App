import { useQuery } from "react-query";
import { IPaginatedResponse, ITeam } from "@app/water";

export const useTeamsQuery = () => {
  const { data, isFetching, refetch } = useQuery<IPaginatedResponse<ITeam>>(
    "/teams"
  );
  return { data, loading: isFetching, refetch };
};
