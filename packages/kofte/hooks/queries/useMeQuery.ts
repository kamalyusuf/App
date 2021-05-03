import { useQuery } from "react-query";
import { IUser } from "@app/water";

export const useMeQuery = () => {
  const { data, isFetching } = useQuery<IUser>("/auth/me");
  return { me: data, loading: isFetching };
};
