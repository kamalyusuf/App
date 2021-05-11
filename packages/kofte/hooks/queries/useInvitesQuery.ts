import { useQuery } from "react-query";
import { IInvite } from "@app/water";

export const useInvitesQuery = () => {
  const { data, isFetching } = useQuery<IInvite[]>("/invites");
  return { invites: data, loading: isFetching };
};
