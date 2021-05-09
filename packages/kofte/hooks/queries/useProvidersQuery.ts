import { useQuery } from "react-query";
import { IProvider } from "@app/water";

export const useProvidersQuery = () => {
  const { data, isFetching } = useQuery<IProvider[]>("/providers");
  return { providers: data, loading: isFetching };
};
