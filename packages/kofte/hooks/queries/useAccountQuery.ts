import { useQuery } from "react-query";
import { IAccount } from "@app/water";

export const useAccountQuery = () => {
  const { data, isFetching } = useQuery<IAccount>("/account");
  return { account: data, loading: isFetching };
};
